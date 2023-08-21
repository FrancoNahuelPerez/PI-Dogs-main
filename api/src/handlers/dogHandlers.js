const { response } = require("express");
const { getDogs,
        getDogsId,
        getDogsByName,
        createDogs } = require("../controllers/dogControllers");

const getDogsHandler = async (require, response) => {
  const {name} = require.query;
  const dogs = name ? await getDogsByName(name) : await getDogs();
  try {
    response.status(200).send(dogs);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

const getDogsIdHandler = async (require, response) =>{
    const {id} = require.params;
    try {
    const dogs = await getDogsId(id)
    response.status(200).json(dogs)
    } catch (error) {
    response.status(400).json({error: error.message})
    }
}

const createDogsHandler = async(require,response) =>{
  try {
    const dogs = await createDogs(require.body)
    response.status(200).json(dogs)
  } catch (error) {
    response.status(404).json({error: error.message})
  }
}



module.exports={
    getDogsHandler,
    getDogsIdHandler,
    createDogsHandler,
}