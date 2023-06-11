import React from "react";
import { FirebaseProveedor } from "./FireBase/DatosFirebase";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import styled from "styled-components";
import Home from "./components/Home";
import PokemonDetalles from "./components/PokemonDetalles";
import Footer from "./components/Footer";
import NuevoPokemon from "./components/NuevoPokemon";
import TipoPokemon from "./components/TipoPokemon";
import EditarCategoria from "./components/EditarCategoria";
import EditarPokemon from "./components/EditarPokemon";
import CategoriaPokemon from "./components/CategoriaPokemon";

export default function Root() {
  return (
    <FirebaseProveedor>
      <App />
    </FirebaseProveedor>
  );
}

export function App() {
  
  return (
    <Router>
      <ContenedorHome>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:pokemonName" element={<PokemonDetalles />}/>
          <Route path="/categoria/:categoriaName" element={<CategoriaPokemon/>}/>
          <Route path="/nuevo-pokemon" element={<NuevoPokemon />} />
          <Route path="/nuevo-tipo-de-pokemon" element={<TipoPokemon />} /> 
          <Route path="/tipo-pokemon/editar/:id" element={<EditarCategoria />}/>
          
          <Route path="/pokemon/editarPokemon/:id" element={<EditarPokemon />}/>
        </Routes>
        <Footer/>
      </ContenedorHome>
    </Router>
  );
}

const ContenedorHome = styled.div`
  background: #000;
`;
