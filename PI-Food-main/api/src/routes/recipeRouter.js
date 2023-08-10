const { Router } = require('express');
const { createRecipe, searchRecipeByName} = require("../controllers/recipeControllers");

const {
    getRecipesHandler,
    getRecipesIdHandler,
} = require("../handlers/recipesHandler");

const recipeRouter = Router();

recipeRouter.get("/", getRecipesHandler);
recipeRouter.get("/:id", getRecipesIdHandler);
recipeRouter.post("/", createRecipe);
recipeRouter.get("/search", searchRecipeByName); // Ruta para la búsqueda

module.exports = recipeRouter;
