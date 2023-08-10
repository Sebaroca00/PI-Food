import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesByName } from "../../redux/actions";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleSearch = async () => {
    try {
      const response = await dispatch(getRecipesByName(searchTerm));
      if (response.payload.length === 0) {
        //console.log("No se encontraron resultados.");
      } else {
        //console.log("Resultados de búsqueda:", response.payload);
      }
      onSearch(response.payload);
    } catch (error) {
      //console.error("Error fetching search results:", error);
      onSearch([]); // Manejar el error pasando un array vacío
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="button" onClick={handleSearch}>
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
