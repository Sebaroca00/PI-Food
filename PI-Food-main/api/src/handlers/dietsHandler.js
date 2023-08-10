const { api_key } = process.env;
const axios = require("axios");

const fetchDietsFromAPI = async () => {
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${api_key}&number=100&addRecipeInformation=true`);
    const dietsFromAPI = response.data.results.map((recipe) => recipe.diets.map((dietName) => dietName.toLowerCase()));
    
    const allDiets = dietsFromAPI.reduce((diets, recipeDiets) => {
      return [...diets, ...recipeDiets];
    }, []);
    
    const uniqueDiets = [...new Set(allDiets)];
    
    // Arreglo con los 10 tipos de dietas únicos
    const top10Diets = uniqueDiets.slice(0, 10).map((dietName) => ({ name: dietName }));

    console.log(top10Diets); // Imprimir en la consola los 10 tipos de dietas únicos
    
    return top10Diets;
  } catch (error) {
    console.error("Error fetching diets from API:", error.message);
    return [];
  }
};

module.exports = { fetchDietsFromAPI };
