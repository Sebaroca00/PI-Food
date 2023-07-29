const { createRecipe, 
    getRecipeById, 
    searchRecipeByName, 
    getAllRecipes 
} = require("../controllers/recipeControllers")



const getRecipesHandler = async ( req, res) => {
const { name } = req.query;

const results = name ? await searchRecipeByName(name) : await getAllRecipes();

res.status(200).json(results);
};

const getRecipesIdHandler = async ( req, res) => {
const {id} = req.params

const source = isNaN(id) ? "bdd" : "api"

try{
    const recipe = await getRecipeById(id, source);
    res.status(200).json(recipe);
} catch (error){
    res.status(400).json({ error:error.message})
}
};

const createRecipesHandler = async (req, res) => {
    try {
      const { name, imagen, resumen, spoonacularScore, healthScore, pasoApaso, dietas } = req.body;
      if (!name || !resumen || !dietas || dietas.length === 0) {
        return res.status(400).json({ error: 'Please provide name, resumen, and at least one dieta for the recipe.' });
      }
  
      // Llamar al controlador para crear la receta
      const newRecipe = await createRecipe(name, imagen, resumen, spoonacularScore, healthScore, pasoApaso, dietas);
      res.status(201).json(newRecipe);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
  

module.exports = {
getRecipesHandler,
getRecipesIdHandler,
createRecipesHandler 

}