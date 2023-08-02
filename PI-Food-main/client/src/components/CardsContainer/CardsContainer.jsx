import Card from "../Card/Card";
import style from "./CardsContainer.module.css"
import { useSelector } from "react-redux";

const CardsContainer = () =>{

const recipes = useSelector (state=> state.recipes)

    return(
        <div className={style.container}>
           {recipes.map(r=>{
            return <Card
                imagen={r.imagen}
                nombre={r.nombre}
                dietas={r.dietas}
            />
           })}
        </div>
    )
        }

export default CardsContainer;