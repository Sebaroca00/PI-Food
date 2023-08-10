import style from "./Landing.module.css";
import { Link } from "react-router-dom"; // Importa el componente Link

const Landing = () => {
    return (
        <div>
            <div className={style.fondo}></div>
            <div className={style.overlay}></div>
            <div className={style.centered}>
                <h1 className={style.texto}>Bienvenidos a mi Proyecto Individual</h1>
                <Link to="/home" className={style.button}>Home</Link>
            </div>
        </div>
    );
};

export default Landing;
