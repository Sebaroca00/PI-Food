import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, getDiets } from "../../redux/actions";
import SearchBar from "../../components/SearchBar/SearchBar";
import CardsContainer from "../../components/CardsContainer/CardsContainer";

const Home = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState(null);
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);
  const diets = useSelector((state) => state.diets);

  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getDiets());
  }, [dispatch]);

  const handleSearch = (results) => {
    if (results.length === 0) {
      setSearchError("No se encontró ninguna receta.");
    } else {
      setSearchError(null);
    }
    setSearchResults(results);
  };

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {searchError ? (
        <p>{searchError}</p>
      ) : (
        <CardsContainer
        recipes={searchResults.length > 0 ? searchResults : recipes}
        diets={diets} // Pasa las dietas al componente CardsContainer
      />
      )}
    </>
  );
};

export default Home;