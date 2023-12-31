const { Recipe, Diets } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");
require('dotenv').config();
const { api_key } = process.env;

/*const cleanArray = (arr, source) => {
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
        tipoDeDietas: elem.diets?.map((diet) => diet) || [],
        created: false
      };
    });

  } else {
    // Procesar datos de la base de datos
    return arr.map((elem) => ({
      id: elem.id,
      name: elem.name,
      tipoDeDietas: elem.diets?.map((diet) => diet) || [],
      created: elem.created
    }));
  }
};*/

//////////////////////////////////////////////////////////////////////////////

const createRecipe = async (req, res) => {
  try {
    const { name, imagen, resumenDelPlato, nivelDeComidaSaludable, pasoApaso, tipoDeDietas } = req.body;

    "name:", name
    "imagen:", imagen
    "resumenDelPlato:", resumenDelPlato
    "nivelDeComidaSaludable:", nivelDeComidaSaludable
    "pasoApaso:", pasoApaso
    "tipoDeDietas:", tipoDeDietas

    const recipe = await Recipe.create({
      name,
      imagen,
      resumenDelPlato,
      nivelDeComidaSaludable,
      pasoApaso,
    });

    // Obtener las dietas asociadas a través de sus names
    const diets = await Diets.findAll({
      where: {
        name: tipoDeDietas,
      },
    });

    // Asociar las dietas con la receta a través de la tabla intermedia RecipeDiets
   // await recipe.setDiets(diets);

    res.status(201).json(recipe);
  } catch (error) {
    console.error("Error creating recipe:", error.message);
    res.status(500).json({ error: "aca" });
  }
};



/////////////////////////////////////////////////////////////////////////////

const getRecipeById = async (id, source) => {
  if (source === "api") {
    const apiRecipeRaw = (
      await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${api_key}&number=100&addRecipeInformation=true`)
    ).data;

    const apiRecipe = cleanArray([apiRecipeRaw], "api")[0];
    // Pasamos el objeto apiRecipeRaw como un arreglo de un solo elemento a cleanArray 
    //y obtenemos el primer elemento del resultado.
    
    return apiRecipe;
  } else {
    return await Recipe.findByPk(id);
  }
};



///////////////////////////////////////////////////////////////////////////////

const getAllRecipes = async () => {
  const dbRecipes = await Recipe.findAll();

  const apiRecipesRaw = (
    await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${api_key}&number=100&addRecipeInformation=true`
    )
  ).data;

  const apiRecipes = cleanArray(apiRecipesRaw.results, "api");

  const result = [...dbRecipes, ...apiRecipes];
  return result;
};


////////////////////////////////////////////////////////////////////////
  const searchRecipeByName = async (name) => {
  // Búsqueda de recetas en la API externa
  const apiRecipesRaw = (
    await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${api_key}&query=${name.toLowerCase()}`)
  ).data;

  const apiRecipes = cleanArray(apiRecipesRaw.results , "api");

  // Búsqueda de recetas en la base de datos por name (insensible a mayúsculas y minúsculas)
  const dbRecipes = await Recipe.findAll({
    where: {
      name: { [Op.iLike]: `%${name}%` }
    }
  });

  // Combinar los resultados de la API y la base de datos
  const recipes = [...apiRecipes, ...dbRecipes];

  if (recipes.length === 0) {
    // No se encontraron recetas
    return { message: 'No se encontraron recetas con el name proporcionado.' };
  }

  return recipes;
};

module.exports = { createRecipe, getRecipeById, searchRecipeByName, getAllRecipes };
