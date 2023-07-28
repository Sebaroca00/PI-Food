require('dotenv').config();
const axios = require("axios")
const { Recipe } = require ("../db");
const {
    api_key, URL
  } = process.env;
  const { Op } = require("sequelize");

/*const cleanArray = (arr) => 
  arr.map((elem) => {
    return{
        id: elem.id,
        name: elem.name,
        created: false
    };
  })*/

  const cleanArray = (arr, source) => {
    if (source === "api") {
      // Procesar datos de la API
      return arr.map((elem) => {
        const steps = elem.analyzedInstructions?.[0]?.steps?.map((step) => step.step) || [];
  
        return {
          id: elem.id,
          nombre: elem.title,
          name: elem.name,
          imagen: elem.image,
          nivelDeComidaSaludable: elem.healthScore,
          resumenDelPlato: elem.summary,
          pasoApaso: steps,
          dietas: elem.diets?.map((diet) => diet) || [],
          created: false
        };
      });

    } else {
      // Procesar datos de la base de datos
      return arr.map((elem) => ({
        id: elem.id,
        nombre: elem.name,
        created: elem.created
      }));
    }
  };


const createRecipe = async (name, imagen, resumen, spoonacularScore, healthScore, pasoApaso) => 
await Recipe.create ({ name, imagen, resumen, spoonacularScore, healthScore, pasoApaso
});

const getRecipeById = async (id, source) => {
  if (source === "api") {
    const apiRecipeRaw = (
      await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${api_key}&number=100&addRecipeInformation=true`)
    ).data;

    const apiRecipe = cleanArray([apiRecipeRaw], "api")[0]; 
    // Pasamos el objeto apiRecipeRaw como un arreglo de un solo elemento a cleanArray 
    //y obtenemos el primer elemento del resultado.
    
    return apiRecipe;
}  else{
    await Recipe.findByPk(id)
    
    return Recipe;
}

};


/*const getAllRecipes = async () => {

    const dbRecipes = await Recipe.findAll();

    const apiRecipes = (
        await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=253f29d2367049e288f7cd58c60f0e26&number=40&addRecipeInformation=true`)
        ).data

        const result = [...dbRecipes, ...apiRecipes];
        return result;
}*/
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

///*
const searchRecipeByName = async (name) => {
    // Búsqueda de recetas en la API externa
    const apiRecipesRaw = (
      await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${api_key}&query=${name.toLowerCase()}`)
    ).data;
  //console.log(apiRecipesRaw)
    const apiRecipes = cleanArray(apiRecipesRaw.results , "api");
  
    // Búsqueda de recetas en la base de datos por nombre (insensible a mayúsculas y minúsculas)
    const dbRecipes = await Recipe.findAll({
      where: {
        name: { [Op.iLike]: `%${name}%` }
      }
    });
  
    // Combinar los resultados de la API y la base de datos
    const recipes = [...apiRecipes, ...dbRecipes];
  
    if (recipes.length === 0) {
      // No se encontraron recetas
      return { message: 'No se encontraron recetas con el nombre proporcionado.' };
    }
  
    return recipes;
  };
// */
  
/*
const searchRecipeByName = async (name) => {
    const dbRecipes = await Recipe.findAll({where: {name}});

    const apiRecipesRaw = (
        await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=253f29d2367049e288f7cd58c60f0e26`)
    ).data

    const apiRecipes = cleanArray(apiRecipesRaw)

    const filteredApi = apiRecipes.filter((recipe)=> recipe.name === name);

    return [...filteredApi, ...dbRecipes]

};
*/



module.exports = { createRecipe, getRecipeById, searchRecipeByName, getAllRecipes }

//axios.get(`${URL}apiKey=${api_key}&number=100&addRecipeInformation=true`)
//https://api.spoonacular.com/recipes/${id}/information?api_key=${api_key}&addRecipeInformation=true