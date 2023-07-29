const { Diets } = require("../db");
const { fetchDietsFromAPI } = require("../handlers/dietsHandler");

const createDietsHandler = async (req, res) => {
  try {
    const dietsFromAPI = await fetchDietsFromAPI();
    if (dietsFromAPI.length === 0) {
      return res.status(500).json({ error: "No diets fetched from API" });
    }
    console.log(dietsFromAPI)

    // Eliminamos las dietas existentes en la base de datos antes de crear las nuevas.
    await Diets.destroy({ where: {} });

    // Creamos las dietas en la base de datos.
    await Diets.bulkCreate(dietsFromAPI);
    res.status(200).json({ message: "Diets fetched from API and saved in the database." });
  } catch (error) {
    console.error("Error creating diets:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { createDietsHandler };

