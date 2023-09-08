import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import style from "./Detail.module.css";

const Detail = () => {
  const { title } = useParams();
  const recipes = useSelector((state) => state.recipes);

  const recipe = recipes.find((r) => r.title === title);

  if (!recipe) {
    return <div>No se encontró la receta.</div>;
  }

  const renderHTML = (rawHTML) => {
    return <div dangerouslySetInnerHTML={{ __html: rawHTML }} />;
  };

  return (
    <div className={style.detailContainer}>
      <h2 className={style.detailTitle}>DETAIL PAGE</h2>
      <p>ID: {recipe.id}</p>
      <p>Nombre: {recipe.name}</p>
      <p className={style.detailInfo}>Resumen del plato: {renderHTML(recipe.resumenDelPlato)}</p>
      <p className={style.detailInfo}>Nivel de comida saludable: {recipe.nivelDeComidaSaludable}</p>
      <p className={style.detailInfo}>Paso a paso:</p>
      <ul className={style.detailSteps}>
        {recipe.pasoApaso.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
      <img src={recipe.image} alt={recipe.name} className={style.detailImage} />
      <p className={style.detailDiets}>Tipos de dieta: {recipe.diets.join(", ")}</p>
    </div>
  );
};

export default Detail;
