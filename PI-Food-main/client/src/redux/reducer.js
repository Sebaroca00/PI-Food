import { combineReducers } from 'redux';
import { GET_RECIPES, SET_DIETS } from './actions';

const initialState = {
  recipes: [],
  diets: [],
};

const recipesReducer = (state = initialState.recipes, action) => {
  switch (action.type) {
    case GET_RECIPES:
      return action.payload;
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
