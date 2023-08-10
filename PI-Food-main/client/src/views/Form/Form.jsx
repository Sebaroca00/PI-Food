import { useState } from "react";
import axios from 'axios';


const Form = () =>{

const [form, setForm] = useState({
    nombre:"",
    resumenDelPlato:"",
    nivelDeComidaSaludable:"",
    pasoApaso:"",
    imagen:"",
    tipoDeDietas:""
});

const [errors, setErrors]= useState({
    nombre:"",
    nivelDeComidaSaludable:"",

})

const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value

    validate({...form, [property]:value})
    setForm({...form, [property]:value})
}

const validate = (form) => {
  const char = /^[a-zA-Z\s]*$/;

  if (form.nombre.match(char) ) {
      setErrors({...errors,nombre:""})
}else{
    setErrors({...errors,nombre:"El nombre solo debe contener letras y espacios."})
  };
  if(form.nombre==="") setErrors({...errors, nombre:"*Campo requerido"})

  
};

const submitHandler = (event) => {
    event.preventDefault();

    if (!errors.nombre && !errors.nivelDeComidaSaludable) {
        axios.post("http://localhost:3001/recipe", form)
            .then(res => alert("Receta creada con éxito"))
            .catch(err => alert(`Error al crear la receta: ${err.response.data.error}`)); // Mostrar el mensaje de error real
    }
}


    return(
        <form onSubmit={submitHandler}>
           <div>
             <label>Nombre: </label>
             <input type="text" value={form.nombre} onChange={changeHandler} name="nombre"/>
             {errors.nombre && <span>{errors.nombre}</span>}
            </div>

            <div>
             <label>Resumen del plato: </label>
             <input type="text" value={form.resumenDelPlato} onChange={changeHandler} name="resumenDelPlato"/>
            </div>

            <div>
             <label>Nivel de comida saludable: </label>
             <input type="text" value={form.nivelDeComidaSaludable} onChange={changeHandler} name="nivelDeComidaSaludable"/>
            </div>

            <div>
             <label>Paso a Paso: </label>
             <input type="text" value={form.pasoApaso} onChange={changeHandler} name="pasoApaso"/>
            </div>
            
            <div>
             <label>Imagen: </label>
             <input type="text" value={form.imagen} onChange={changeHandler} name="imagen"/>
            </div>
              
           <div>
             <label>Tipo de Dieta: </label>
             <input type="text" value={form.tipoDeDietas} onChange={changeHandler} name="tipoDeDietas"/>
    </div>
              
            <div>
             <button type="submit">CREAR</button>
            </div>
            
          </form>
    )
}

export default Form;