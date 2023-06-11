import React from "react";
import styled from "styled-components";
import ImagenBack from "../../imagenes/Hero.jpg";
/* Imagen tomada de https://wallpapersafari.com/w/vuzLfA */

const Banner = () => {
  
  return (
    <Hero>
      <Titulo>Agrega tu Pokemon favorito</Titulo>
      <Parrafo>
        Este es un ALURA-Challenge,
        <br />
        donde puse en practica mis conocimiento con React ensenados en <br />{" "}
        <br />
        <b style={{ color: "#2A7AE4", fontSize: "25px" }}>Alura Latam</b>
      </Parrafo>
    </Hero>
  );
};

export default Banner;
const Hero = styled.div`
    background-color: #212b34;
    height: calc(100vh - 7em);
    background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
      url(${ImagenBack});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 25px;

  `;
  const Titulo = styled.h2`
    color: #f5f5f5;
    font-style: normal;
    font-weight: 400;
    font-size: 35px;
    padding-bottom: 30px;
    @media only screen and (max-width: 426px) {
      font-size: 20px;
    }
  `;
  const Parrafo = styled.p`
    color: #f5f5f5;
    font-weight: 500;
    font-size: 1.25rem;
    text-align: center;
    @media only screen and (max-width: 426px) {
      font-size: 15px;
    }
  `;