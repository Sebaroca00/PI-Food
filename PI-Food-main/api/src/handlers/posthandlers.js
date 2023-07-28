const {createPost} = require("../controllers/postControllers");





const createPostHandler = async (req, res) => {
  const {
      name,
      imagen,
      resumen,
      spoonacularScore,
      healthScore,
      pasoApaso,
      dietIds, // Array de IDs de los tipos de dieta seleccionados
    } = req.body;
    try {
    const newPost= await createPost(
      name,
      imagen,
      resumen,
      spoonacularScore,
      healthScore,
      pasoApaso,
      dietIds // Pasamos el array de IDs de los tipos de dieta a la función createRecipe
    );
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports=createPostHandler;