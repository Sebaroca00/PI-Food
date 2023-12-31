import axios from "axios";


export const GET_RECIPES = "GET_RECIPES"
export const GET_RECIPE = "GET_RECIPE"
export const GET_BY_NAME = "GET_BY_NAME"
export const SET_DIETS = 'SET_DIETS';

export const getRecipes= () =>{
    return async function (dispatch){
        const apiData = await axios.get(
           `http://localhost:3001/recipe`
            //`https://api.spoonacular.com/recipes/complexSearch?apiKey=253f29d2367049e288f7cd58c60f0e26&number=100&addRecipeInformation=true`
        );
        const recipes = apiData.data
        dispatch({type: GET_RECIPES, payload: recipes });
       // console.log(apiData)
    };
};


export const getRecipe = (id) =>{
    return async function (dispatch){
        const apiData = await axios.get(
            `http://localhost:3001/recipe/${id}`
            //`https://api.spoonacular.com/recipes/${id}/information?apiKey=253f29d2367049e288f7cd58c60f0e26number=100&addRecipeInformation=true`
        );
        const recipe = apiData.data
        dispatch({type: GET_RECIPE, payload: recipe });
       // console.log(apiData)
    };
};

export const filterBySource = () => {
  //  dispatch({ type: "FILTER_BY_SOURCE"})
}


export const getRecipesByName = (name) => {
  return async function (dispatch) {
    try {
      const response = await axios.get(`http://localhost:3001/recipe/?name=${name}`);
      const data = response.data; // Supongamos que los resultados están en la propiedad 'data'
      
      // Devolver una acción con la estructura adecuada
      return dispatch({
        type: GET_BY_NAME,
        payload: data.results, // Asegúrate de ajustar esto según la estructura de tu respuesta
      });
    } catch (error) {
      console.error("Error fetching search results:", error);
      // Manejar el error devolviendo una acción con un array vacío
      return dispatch({
        type: GET_BY_NAME,
        payload: [], // Devolver un array vacío en caso de error
      });
    }
  };
};



export const setDiets = (diets) => ({
  type: SET_DIETS,
  payload: diets,
});

export const getDiets = () => async (dispatch) => {
  try {
    const response = await axios.get('http://localhost:3001/diets');
    dispatch(setDiets(response.data));
  } catch (error) {
    
  }
};