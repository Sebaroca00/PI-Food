const { Router } = require('express');
const { createRecipe } = require("../controllers/recipeControllers");

const {
    getRecipesHandler,
    getRecipesIdHandler,
    createRecipesHandler
} = require("../handlers/recipesHandler")
//const { searchRecipeByName } = require('../controllers/recipeControllers');

const recipeRouter = Router();


recipeRouter.get("/", getRecipesHandler)

recipeRouter.get("/:id", getRecipesIdHandler);

recipeRouter.post("/", createRecipe);


module.exports=recipeRouter;