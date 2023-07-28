const { Post } = require("../db")

const createPost = async (
    name,
    imagen,
    resumen,
    spoonacularScore,
    healthScore,
    pasoApaso,
    dietIds // Pasamos el array de IDs de los tipos de dieta a la función createRecipe
  ) => {
    const newPost = await Post.create({name, imagen, resumen, spoonacularScore, healthScore, pasoApaso,})
    newPost.setRecipe(dietIds);
    return newPost
  };

  module.exports=createPost;