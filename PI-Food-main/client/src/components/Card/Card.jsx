import style from "./Card.module.css"

const Card = (props) =>{
    return(
        <div className={style.cardContainer}>
            <p>Imagen:{props.imagen}</p> 
            <p>Nombre:{props.nombre}</p> 
            <p>Dietas:{props.dietas}</p> 
        </div>
    )
}

export default Card;