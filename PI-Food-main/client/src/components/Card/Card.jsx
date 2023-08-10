import React from "react";
import { Link } from "react-router-dom";
import style from "./Card.module.css";

const Card = (props) => {
  

  const dietasAsociadas = props.diets && Array.isArray(props.diets)
    ? props.diets.map((dietId) => props.diets.find((diet) => diet.id === dietId))
    : [];
  return (
    <div className={style.cardContainer}>
     <Link to={`/detail/${props.name}`} className={style.cardLink}>
        <img src={props.image} alt={props.name} className={style.cardImage} />
        <p>Nombre: {props.name}</p>
      </Link>
      {dietasAsociadas.length > 0 && (
        <p>Dietas: {props.diets.join(", ")}</p>
      )}
    </div>
  );
};

export default Card;
