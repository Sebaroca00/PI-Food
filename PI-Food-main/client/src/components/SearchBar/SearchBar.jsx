import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesByName } from "../../redux/actions";
import styles from "./SearchBar.module.css"; 

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleSearch = async () => {
    try {
      const response = await dispatch(getRecipesByName(searchTerm));
      onSearch(response.payload); // Pasar directamente el payload al callback
    } catch (error) {
      console.error("Error fetching search results:", error);
      onSearch([]); // Manejar el error pasando un array vacío
    }
  };

  return (
    <div className={styles.searchBarContainer}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput} 
      />
      <button
        type="button"
        onClick={handleSearch}
        className={styles.searchButton} 
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
