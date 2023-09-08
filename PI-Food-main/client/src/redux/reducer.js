import { combineReducers } from 'redux';
import { GET_RECIPES, SET_DIETS, GET_BY_NAME } from './actions';

const initialState = {
  recipes: [],
  diets: [],
};

const recipesReducer = (state = initialState.recipes, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return action.payload;
    case GET_BY_NAME:
      // Si la acción GET_BY_NAME no debe afectar el estado, simplemente retorna el estado anterior
      return state;
    default:
      return state;
  }
};

const dietsReducer = (state = initialState.diets, action) => {
  switch (action.type) {
    case SET_DIETS:
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  recipes: recipesReducer,
  diets: dietsReducer,
});

export default rootReducer;
