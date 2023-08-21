const { Dog, Temperaments } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");

const filterApi = (dataApi) => {
  if (!Array.isArray(dataApi)) {
    throw new Error("dataApi must be an array");
  }
  return dataApi.map((dog) => {
    return {
      id: dog.id,
      name: dog.name.toLowerCase(),
      image:
        "https://cdn2.thedogapi.com/images/" + dog.reference_image_id + ".jpg",
      min_height: parseInt(dog.height.metric.split("-")[0]),
      max_height: parseInt(dog.height.metric.split("-")[1]),
      min_weight: parseInt(dog.weight.metric.split("-")[0]),
      max_weight: parseInt(dog.weight.metric.split("-")[1]),
      life_span: dog.life_span,
      Temperaments: dog.temperament,
      fromApi: true,
    };
  });
};

const getDogs = async () => {
  const api = await axios.get("https://api.thedogapi.com/v1/breeds");
  const getDogsApi = api.data;
  const getDogsBd = await Dog.findAll({
    include: {
      model: Temperaments,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  const dogsApi = filterApi(getDogsApi);

  const results = [...getDogsBd, ...dogsApi];
  return results;
};

const getDogsId = async (id) => {
  console.log("id", id);
  if (id.length < 4) {
    if (id > 265 || id < 0) {
      throw new Error("No existen Dogs con ese ID");
    } else {
      const api = await axios.get("https://api.thedogapi.com/v1/breeds");
      const getDogsApi = api.data;
      const dogsById = getDogsApi.find((dogs) => dogs.id == id);
      let arrayEmpty = [];
      arrayEmpty[0] = dogsById;
      const dogi = filterApi(arrayEmpty);
      if (dogi !== undefined) {
        const perritos = dogi[0];
        return perritos;
      } else {
        throw new Error();
      }
    }
  } else {
    const dogsByIdBd = await Dog.findByPk(id, {
      include: {
        model: Temperaments,
        attributes: ["name", "id"],
        through: {
          attributes: [],
        },
      },
    });

    const dog = dogsByIdBd;
    const temperaments = dog.Temperaments?.map(
      (temperament) => temperament.name
    ).join(", ");
    dog.dataValues.Temperaments = temperaments;
    return dog;
  }
};

const getDogsByName = async (name) => {
  const api = await axios.get("https://api.thedogapi.com/v1/breeds");
  const apiDogs = api.data;
  const dogsByName = apiDogs.filter(
    (dog) => dog.name.toLowerCase() == name.toLowerCase()
  );

  const dogsApi = filterApi(dogsByName);

  const dogsDb = await Dog.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
    include: {
      model: Temperaments,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  const results = [...dogsDb, ...dogsApi];
  return results;
};

const createDogs = async ({
  name,
  max_height,
  min_height,
  max_weight,
  min_weight,
  life_span,
  image,
  temperaments,
}) => {
  const found = await Dog.findOne({ where: { name } });

  if (found) throw new Error("This breed already exists");

  const newDog = await Dog.create({
    name,
    max_height,
    min_height,
    max_weight,
    min_weight,
    life_span,
    image,
    temperaments,
  });
  await newDog.addTemperaments(temperaments);
  return newDog;
};
module.exports = {
  getDogs,
  getDogsId,
  getDogsByName,
  createDogs,
};
