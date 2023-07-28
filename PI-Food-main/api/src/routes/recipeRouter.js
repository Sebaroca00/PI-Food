const { Router } = require('express');

const {
    getRecipesHandler,
    getRecipesIdHandler,
    createRecipesHandler
} = require("../handlers/recipesHandler")
const { searchRecipeByName } = require('../controllers/recipeControllers');

const recipeRouter = Router();


recipeRouter.get("/", getRecipesHandler)

recipeRouter.get("/:id", getRecipesIdHandler);

recipeRouter.post("/", createRecipesHandler );


module.exports=recipeRouter;