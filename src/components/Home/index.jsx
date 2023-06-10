import React, { useContext, useState, useEffect } from "react";
import Banner from "../Banner";
import Carrusel from "../Carrusel";
import BotonesFilter from "../BotonesFilter";
import { FirebaseContexto } from "../../FireBase/DatosFirebase";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import Boton from "../Boton";
import Categoria from "../Categorias";

const Home = () => {
  const { pokemon, tipoPokemon } = useContext(FirebaseContexto);
  const uniqueTypes = tipoPokemon.filter(
    (tipo, index, self) =>
      self.findIndex((t) => t.tipo === tipo.tipo) === index
  );
  const allCategorias = [
    { value: "All", color: "#2A7AE4" , id: '001'},
    ...uniqueTypes.map((tipo) => ({ value: tipo.tipo, color: tipo.color, id: tipo.id }))
  ];
  const [pokeData, setPokeData] = useState([]);
  const [showComponent, setShowComponent] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const filteredPokemon =
      selectedCategory === "All"
        ? pokemon
        : pokemon.filter((pokemon) => pokemon.tipoPokemon === selectedCategory);

    setPokeData(filteredPokemon);
  }, [pokemon, selectedCategory]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowComponent(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const filterTipo = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <Banner />
      <ContenedorTitulo>
        <Titulo>Tipos de Pokemon</Titulo>
        <Link to="/nuevo-tipo-de-pokemon">
          <Boton text="+ Tipo Pokemon" variant="contained" color="#2e8686" palabra = 'eleccion'/>
        </Link>
      </ContenedorTitulo>
      {showComponent ? (
        <BotonesFilter tipoPokemon={allCategorias} funcion={filterTipo} />
      ) : null}
      <Carrusel pokemon={pokeData} tipoPokemon={tipoPokemon} />
      <hr/>
      <Categoria/>
    </>
  );
};

export default Home;
const ContenedorTitulo = styled.div`
  display: flex;
  align-items: center;
justify-content: center;
margin: 1rem auto;
width: 100vw;

`;
const Titulo = styled.h2`
  color : #fff;
  margin: 10px 20px;
` 