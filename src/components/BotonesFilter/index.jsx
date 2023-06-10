import React from "react";
import Boton from "../Boton";
import { styled } from "styled-components";

const BotonesFilter = ({ tipoPokemon, funcion }) => {
  return (
    <ContendorBotones>
      {tipoPokemon.map((categoria) => {
        return (
            <ContenedorBoton key={categoria.id}>
              <Boton
                text={categoria.value}
                variant="outlined"
                funcion={() => {
                  funcion(categoria.value);
                }}
                palabra="eleccion"
                color={categoria.color}
              />
            </ContenedorBoton>
        );
      })}
    </ContendorBotones>
  );
};

export default BotonesFilter;
const ContendorBotones = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100vw;
  padding-bottom: 20px;
`;

const ContenedorBoton = styled.div`
  margin: 5px;
`;
