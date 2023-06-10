import React, { useState } from "react";
import Boton from "../Boton";
import styled from "styled-components";
import { pokemonRef } from "../../FireBase/DatosFirebase";
import { addDoc } from "firebase/firestore";
import { InputForm, TextDescription, SelectOpcion } from "../InputFormulario";

import {
  validarNombre,
  validarDescripcion,
  validarLogo,
  validarCreador,
  validarTipo,
  validarPuntos
} from "../TipoPokemon/validaciones";


const NuevoPokemon = () => {
  const [name, setName] = useState({ value: "", valid: null });
  const [descripcion, setDescripcion] = useState({ value: "", valid: null });
  const [linkVideo, setLinkVideo] = useState({ value: "", valid: null });
  const [linkImagen, setLinkImagen] = useState({ value: "", valid: null });
  const [creador, setCreador] = useState({ value: "", valid: null });
  const [tipoPokemon, setTipoPokemon] = useState({ value: "", valid: null });
  const [puntosVida, setPuntosVida] = useState({ value: "", valid: null })


  const SubmitPokemon = async (e) => {
    e.preventDefault();
    if (
      name.value &&
      descripcion.value &&
      linkVideo.value &&
      linkImagen.value &&
      tipoPokemon.value &&
      creador.value &&
      puntosVida.value
    ) {
      try {
        await addDoc(pokemonRef, {
          name: name.value,
          descripcion: descripcion.value,
          linkVideo: linkVideo.value,
          linkImagen: linkImagen.value,
          tipoPokemon: tipoPokemon.value,
          creador: creador.value,
          puntosVida:puntosVida.value
        });
        setName({ value: "", valid: null });
        setDescripcion({ value: "", valid: null });
        setCreador({ value: "", valid: null });
        setLinkVideo({ value: "", valid: null });
        setLinkImagen({ value: "", valid: null });
        setTipoPokemon({ value: "", valid: null });
        setPuntosVida({ value: "", valid: null });
        window.location.reload();
        window.location.href = "/";
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Debes ingresar toda la informacion");
    }
  };

  return (
    <>
      <TituloForm>Nuevo Pokemon</TituloForm>
      <Formulario>
        <InputForm
          text="Nuevo Pokemon"
          type="text"
          error={name.valid === false}
          value={name.value}
          textoayuda={name.valid === false && "Ingresa un nombre válido."}
          funcion={(e) => {
            const nombre = e.target.value;
            const nombreValid = validarNombre(nombre);
            setName({ value: nombre, valid: nombreValid });
          }}
        />
        <br />
        <InputForm
          text="Puntos de Vida"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          error={puntosVida.valid === false}
          value={puntosVida.value}
          textoayuda={puntosVida.valid === false && "Ingresa un numero."}
          funcion={(e) => {
            const puntos = e.target.value;
            const puntosValid = validarPuntos(puntos);
            setPuntosVida({ value: puntos, valid: puntosValid });
          }}
        />
        <br />
        <br />
        <SelectOpcion
          text="Categoria del Pokemon"
          tipoPoke={tipoPokemon}
          setTipoPokemon={setTipoPokemon}
          error={tipoPokemon.valid === false}
          textoayuda={
            tipoPokemon.valid === false && "Ingresa un nombre válido."
          }
          funcion={(e) => {
            const tipoPoke = e.target.value;
            const tipoPokeValid = validarTipo(tipoPoke);
            setTipoPokemon({ value: tipoPoke, valid: tipoPokeValid });
          }}
        />

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
        <InputForm
          text="URL: Imagen Pokemon ..."
          type="text"
          error={linkImagen.valid === false}
          value={linkImagen.value}
          textoayuda={linkImagen.valid === false && "Ingresa una URL válida."}
          funcion={(e) => {
            const linkImagen = e.target.value;
            const nombreValid = validarLogo(linkImagen);
            setLinkImagen({ value: linkImagen, valid: nombreValid });
          }}
        />
        <br />

        <InputForm
          text="URL: Link video Pokemon ..."
          type="text"
          error={linkVideo.valid === false}
          value={linkVideo.value}
          textoayuda={linkVideo.valid === false && "Ingresa una URL válida."}
          funcion={(e) => {
            const linkVideo = e.target.value;
            const nombreValid = validarLogo(linkVideo);
            setLinkVideo({ value: linkVideo, valid: nombreValid });
          }}
        />
        <br />
        <InputForm
          text="Creador ..."
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
            text="+ Pokemon"
            variant="contained"
            color="#2e8686"
            palabra="eleccion"
            funcion={SubmitPokemon}
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

export default NuevoPokemon;
const Botonesdiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
const Formulario = styled.form`
  background: #4d555c;
  width: 50vw;
  margin: 30px auto 50px auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  font-family: "Roboto";
  text-align: center;
  border-radius: 15px;
`;
const TituloForm = styled.h2`
  font-weight: 400;
  font-size: 35px;
  text-align: center;
  color: #2e8686;
  margin: 30px auto 0 auto;
`;
