const { response } = require("express");
const { getTemperaments } = require("../controllers/tempControllers");

const getTemperamentsHandler = async (require, response) => {
  try {
    const temperaments = await getTemperaments();
    response.status(200).json(temperaments);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
};

module.exports = {
  getTemperamentsHandler,
};
