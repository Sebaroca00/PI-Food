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
   
const createRecipesHandler = async (req,res) => {
    try {
    const{ name, imagen, resumen, spoonacularScore, healthScore, pasoApaso } = req.body;
   const newRecipe = await createRecipe(name, imagen, resumen, spoonacularScore, healthScore, pasoApaso);
    res.status(201).json(newRecipe)
} catch (error) {
    res.status(400).json({ error: error.message});
    };
};
   
module.exports = {
    getRecipesHandler,
    getRecipesIdHandler,
    createRecipesHandler 

}