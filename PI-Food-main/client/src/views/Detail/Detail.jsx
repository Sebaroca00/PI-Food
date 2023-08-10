import React from "react";
import { useParams } from "react-router-dom"; // Importa useParams para obtener los parámetros de la URL
import { useSelector } from "react-redux";

const Detail = () => {
  const { name } = useParams(); // Obtén el ID de la receta de los parámetros de la URL
  const recipes = useSelector((state) => state.recipes);

  // Busca la receta específica por ID
  const recipe = recipes.find((r) => r.name === name);

  if (!recipe) {
    return <div>No se encontró la receta.</div>;
  }

  return (
    <div>
      <h2>DETAIL PAGE</h2>
      <p>ID: {recipe.id}</p>
      <p>Nombre: {recipe.name}</p>
      <p>Resumen del plato: {recipe.resumenDelPlato}</p>
      <p>Nivel de comida saludable: {recipe.nivelDeComidaSaludable}</p>
      <p>Paso a paso:</p>
      <ul>
        {recipe.pasoApaso.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ul>
      <img src={recipe.image} alt={recipe.name} />
      <p>Tipos de dieta: {recipe.tipoDeDietas.join(", ")}</p>
    </div>
  );
};

export default Detail;
