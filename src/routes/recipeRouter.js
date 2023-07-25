const { Router } = require('express');

const {
    getRecipesHandler,
    getRecipesIdHandler,
    postRecipesHandler 
} = require("../handlers/recipesHandler")

const recipeRouter = Router();


recipeRouter.get("/", getRecipesHandler)

recipeRouter.get("/:id", getRecipesIdHandler);

recipeRouter.post("/", postRecipesHandler );

module.exports=recipeRouter;