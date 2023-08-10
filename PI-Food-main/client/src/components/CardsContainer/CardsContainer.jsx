import React from "react";
import Card from "../Card/Card";
import style from "./CardsContainer.module.css";

const CardsContainer = ({ recipes, searchError }) => {
  if (searchError) {
    return <p>{searchError}</p>;
  }

  if (!recipes || recipes.length === 0) {
    return <div>Cargando Recetas.</div>;
  }

  return (
    <div className={style.container}>
      {recipes.map((r) => (
      <Card
      key={r.id}
      image={r.image}
      name={r.name}
      diets={r.diets}
    />     
      ))}
    </div>
  );
};

export default CardsContainer;


