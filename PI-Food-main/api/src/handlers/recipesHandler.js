const { createRecipe, 
    getRecipeById, 
    searchRecipeByName, 
    getAllRecipes 
} = require("../controllers/recipeControllers")
const axios = require("axios");
const { Recipe, Diets } = require('../db');
const { Op } = require("sequelize");
require('dotenv').config();
const { api_key } = process.env;

///////////////////////////////////////////////////
const cleanArray = (arr, source) => {
  if (source === "api") {
    // Procesar datos de la API
    return arr.map((elem) => {
      const steps = elem.analyzedInstructions?.[0]?.steps?.map((step) => step.step) || [];

      return {
        id: elem.id,
        name: elem.title,
       // name: elem.name,
        image: elem.image,
        nivelDeComidaSaludable: elem.healthScore,
        resumenDelPlato: elem.summary,
        pasoApaso: steps,
        diets: elem.diets?.map((diet) => diet) || [],
        created: false
      };
    });

  } else {
    // Procesar datos de la base de datos
    return arr.map((elem) => ({
      id: elem.id,
      name: elem.name,
      diets: elem.diets?.map((diet) => diet) || [],
      created: elem.created
    }));
  }
};
////////////////////////////////////////////////

const getRecipesHandler = async (req, res) => {
    const { name } = req.query;
  
    try {
      let dbRecipes = [];
      let apiRecipes = [];
  
      if (name) {
        dbRecipes = await Recipe.findAll({
          where: {
            name: { [Op.like]: `%${name}%` },
          },
          include: {
            model: Diets,
            as: 'diets' 
          }
        });
      } else {
        dbRecipes = await Recipe.findAll({
          include: {
            model: Diets,
            as: 'diets' 
          }
        });
      }
  
      // Consultar las recetas desde la API externa
      try {
        const response = (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${api_key}&number=100&addRecipeInformation=true`
        )
        ).data;
        
        apiRecipes = cleanArray(response.results, "api");
      } catch (error) {
        console.error("Error al obtener recetas de la API externa:", error);
      }
  
      // Combinar los resultados de la base de datos y la API
      const combinedRecipes = [...dbRecipes, ...apiRecipes];
  
      res.status(200).json(combinedRecipes);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error al obtener las recetas", message: error.message });
    }
  };
  
  

const getRecipesIdHandler = async (req, res) => {
  const { id } = req.params;

  const source = isNaN(id) ? "bdd" : "api";

  try {
    const recipe = await getRecipeById(id, source);
    res.status(200).json(recipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createRecipesHandler = async (req, res) => {
  try {
    const { name, imagen, resumenDelPlato, nivelDeComidaSaludable, pasoApaso, tipoDeDietas } = req.body;
    if (!name || !resumenDelPlato || !tipoDeDietas || tipoDeDietas.length === 0) {
      return res.status(400).json({ error: 'Please provide name, resumenDelPlato, and at least one tipoDeDietas for the recipe.' });
    }

    // Llamar al controlador para crear la receta
    const newRecipe = await createRecipe(name, imagen, resumenDelPlato, nivelDeComidaSaludable, pasoApaso, tipoDeDietas);
    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getRecipesHandler,
  getRecipesIdHandler,
  createRecipesHandler
};
