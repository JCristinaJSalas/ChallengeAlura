import React, { useState } from "react";
import { InputForm, TextDescription} from "../InputFormulario";
import Boton from "../Boton";
import { MuiColorInput } from "mui-color-input";
import styled from "styled-components";
import { categoriaRef } from "../../FireBase/DatosFirebase";
import {
  validarNombre,
  validarDescripcion,
  validarLogo,
  validarCreador,
} from "./validaciones";
import { addDoc } from "firebase/firestore";

const TipoPokemon = () => {
  const [tipo, setTipo] = useState({ value: "", valid: null });
  const [descripcion, setDescripcion] = useState({ value: "", valid: null });
  const [color, setColor] = useState("#2A7AE4");
  const [creador, setCreador] = useState({ value: "", valid: null });
  const [logo, setLogo] = useState({ value: "", valid: null });

  const labelStyle = {
    color: color,
  };

  const SubmitTipo = async (e) => {

    e.preventDefault();
    if (
      tipo.value &&
      descripcion.value &&
      color !== "#2A7AE4" &&
      creador.value &&
      logo.value
    ) {
      try {
        await addDoc(categoriaRef, {
          tipo: tipo.value,
          descripcion: descripcion.value,
          color,
          creador: creador.value,
          logo: logo.value,
        });
        setTipo({ value: "", valid: null });
        setDescripcion({ value: "", valid: null });
        setColor("#ffffff");
        setCreador({ value: "", valid: null });
        setLogo({ value: "", valid: null });
        window.location.reload();
        window.location.href = "/";
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Debes ingresar toda la informacion o cambiar de color");
    }
    console.log(
      tipo.value,
      descripcion.value,
      color,
      creador.value,
      logo.value
    );
  };

  return (
    <>
      <TituloForm>Nuevo Tipo de Pokemon</TituloForm>
      <Formulario>
        <InputForm
          text="Tipo de Pokemon..."
          type="text"
          error={tipo.valid === false}
          value={tipo.value}
          textoayuda={tipo.valid === false && "Ingresa un nombre válido."}
          funcion={(e) => {
            const nombre = e.target.value;
            const nombreValid = validarNombre(nombre);
            setTipo({ value: nombre, valid: nombreValid });
          }}
        />
        <br />
        <br />
        <TextDescription
          text="Descripcion..."
          error={descripcion.valid === false}
          value={descripcion.value}
          textoayuda={
            descripcion.valid === false && "Ingresa un descripcion válida."
          }
          funcion={(e) => {
            const descripcion = e.target.value;
            const descripcionValid = validarDescripcion(descripcion);
            setDescripcion({ value: descripcion, valid: descripcionValid });
          }}
        />
        <br />
        <br />
        <InputForm
          text="URL: Logo del tipo de pokemon..."
          type="text"
          error={logo.valid === false}
          value={logo.value}
          textoayuda={logo.valid === false && "Ingresa un logo válido."}
          funcion={(e) => {
            const logo = e.target.value;
            const nombreValid = validarLogo(logo);
            setLogo({ value: logo, valid: nombreValid });
          }}
        />
        <br />
        <br />
        <ColorInput
          value={color}
          format="hex8"
          inputProps={{ style: labelStyle }}
          onChange={(e) => {
            setColor(e);
          }}
        />
        <br />

        <InputForm
          text="Creador..."
          type="text"
          error={creador.valid === false}
          value={creador.value}
          textoayuda={creador.valid === false && "Ingresa un creador válido."}
          funcion={(e) => {
            const creador = e.target.value;
            const nombreValid = validarCreador(creador);
            setCreador({ value: creador, valid: nombreValid });
          }}
        />
        <br />
        <br />

        <Botonesdiv>
          <Boton
            type="submit"
            text="+ Tipo Pokemon"
            variant="contained"
            color="#2e8686"
            palabra="eleccion"
            funcion={SubmitTipo}
          />
          <Boton
            text="Limpiar"
            type="reset"
            variant="outlined"
            color="#f32c1e"
            palabra="eleccion"
          />
        </Botonesdiv>
      </Formulario>
    </>
  );
};

export default TipoPokemon;

const Formulario = styled.form`
  background: #4d555c;
  width: 60vw;
  max-width: 550px;
  margin: 30px auto 50px auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  font-family: "Roboto";
  text-align: center;
  border-radius: 15px;
  @media only screen and (max-width: 768px){
    width: 90vw;
    font-size:10px;
  }
`;
const TituloForm = styled.h2`
  font-weight: 400;
  font-size: 35px;
  text-align: center;
  color: #2e8686;
  margin: 30px auto 0 auto;
  @media only screen and (max-width: 425px){
    font-size: 25px;
  }
`;
const ColorInput = styled(MuiColorInput)`
  .css-1o9s3wi-MuiInputBase-input-MuiOutlinedInput-input {
    font-size: 1rem;
    letter-spacing: 5px;
    padding-left: 25px;
    background: #53585d;
    border-radius: 4px;
    margin: 15px 0;
    text-align: center;
  }
`;
const Botonesdiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
