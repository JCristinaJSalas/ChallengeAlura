import React from "react";
import Tarjeta from "./Tarjeta";
import { styled } from "styled-components";
import Boton from "../Boton";
import { Link } from "react-router-dom";

import Slider from "react-slick";
import "../../Modelos/slick.css";
import "../../Modelos/slick-theme.css";

const Carrusel = ({ pokemon, tipoPokemon }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1023,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 698,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <ContenedorSlider>
      {pokemon.length > 0 ? (
        <Slider {...settings}>
          {pokemon.map((pokemon, index) => (
            <ContenedorTarjeta key={index}>
              <Tarjeta
                id = {pokemon.id}
                name={pokemon.name}
                descripcion={pokemon.descripcion}
                linkImagen={pokemon.linkImagen}
                key={pokemon.name}
                logo={tipoPokemon
                  .filter((categoria) => categoria.tipo === pokemon.tipoPokemon)
                  .map((filterCategoria) => filterCategoria.logo)}
                tipoPokemon={tipoPokemon
                  .filter((categoria) => categoria.tipo === pokemon.tipoPokemon)
                  .map((filterCategoria) => filterCategoria.tipo)}
                color={tipoPokemon
                  .filter((categoria) => categoria.tipo === pokemon.tipoPokemon)
                  .map((filterCategoria) => filterCategoria.color)}
              />
            </ContenedorTarjeta>
          ))}
        </Slider>
      ) : (
        <ContenedorAviso>
        <Parrafo>Aun no hay registrado ningun pokemon...<br/> Pero adelante agrega tu favorito!</Parrafo>
        <Link to="/nuevo-pokemon">
          <Boton text="+ Pokemon" variant="contained" color="#2A7AE4" palabra = 'eleccion'/>
        </Link>
        </ContenedorAviso>
      )}
    </ContenedorSlider>
  );
};

export default Carrusel;

const ContenedorSlider = styled.div`
  padding: 30px 40px 60px 40px;
  border-radius: 5px;
`;
const ContenedorTarjeta = styled.div`
  margin: 5%;
  overflow: hidden;

`;
const Parrafo = styled.p`
color: #fff;
padding-bottom: 20px;
text-align: center;
`
const ContenedorAviso = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

`