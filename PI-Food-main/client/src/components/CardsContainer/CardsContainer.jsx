import React, { useState } from "react";
import Card from "../Card/Card";
import style from "./CardsContainer.module.css";

const CardsContainer = ({ recipes, diets, searchError }) => {
  if (searchError) {
    return <p>{searchError}</p>;
  }
  if (!recipes || recipes.length === 0) {
    return (
      <div className={style.loading}>
        <div className={style.spinner}></div>
        Cargando Recetas...
      </div>
    );
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