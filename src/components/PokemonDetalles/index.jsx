import styled from "@emotion/styled";
import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { BiUndo } from "react-icons/bi";
import { BiTrash, BiPencil } from "react-icons/bi";
import { Link } from "react-router-dom";
import Boton from "../Boton";
import { FirebaseContexto } from "../../FireBase/DatosFirebase";
import { pokemonRef } from "../../FireBase/DatosFirebase";
import { doc, deleteDoc } from "firebase/firestore";
import Modal from "../Modal";

const PokemonDetalles = () => {
  const { pokemonName } = useParams();
  const { pokemon, tipoPokemon } = useContext(FirebaseContexto);
  const [estadoModal, setEstadoModal] = useState(false);

  const pokemonSeleccionado = pokemon.find((poke) => poke.name === pokemonName);

  const logo = tipoPokemon
    .filter((categoria) => categoria.tipo === pokemonSeleccionado.tipoPokemon)
    .map((filterCategoria) => filterCategoria.logo);
  const color = tipoPokemon
    .filter((categoria) => categoria.tipo === pokemonSeleccionado.tipoPokemon)
    .map((filterCategoria) => filterCategoria.color)
    .toString();

  const eliminarPokemon = async (id) => {
    try {
      const pokemonRefe = doc(pokemonRef, id);
      await deleteDoc(pokemonRefe);
      alert("Tipo de Pokemon eliminado correctamente");
      window.location.reload();
    } catch (error) {
      console.error("Error al eliminar el documento:", error);
    }
  };

  return (
    <ContenedorPokemon>
      {pokemonSeleccionado ? (
        <>
          <Modal
            pokemonVideo={pokemonSeleccionado.linkVideo}
            estadoModal={estadoModal}
            cambiarEstado={setEstadoModal}
            name={pokemonSeleccionado.name}
            color={color}
          />
          <ContenedorTarjeta>
            <ContenedorTitulo>
              <ContenedorUno>
                <PokemonName color={color}>
                  {pokemonSeleccionado.name}
                </PokemonName>
                <PokemonCreador>
                  Creador del Pokemon : {pokemonSeleccionado.creador}
                </PokemonCreador>
              </ContenedorUno>
              <ContenedorDos>
                <PokemonTipo>PS: {pokemonSeleccionado.puntos}</PokemonTipo>
                <ImagenCon src={logo} alt={pokemonSeleccionado.name} />
              </ContenedorDos>
              <ContenedorTres to={`/`}>
                <HoverableBiUndo size={30} />
              </ContenedorTres>
            </ContenedorTitulo>
            <ContenedorImgVideo>
              <ImagenPoke src={pokemonSeleccionado.linkImagen} />
              <Boton
                text="Ver Video"
                variant="outlined"
                palabra="eleccion"
                color={color}
                funcion={() => {
                  setEstadoModal(!estadoModal)
                }}
              />
            </ContenedorImgVideo>
            <Parrafo>{pokemonSeleccionado.descripcion}</Parrafo>
            <ContenedorFuture>
              <Link
                to={`/tipo-pokemon/editarPokemon/${pokemonSeleccionado.id}`}
              >
                <Pencil size={25} />
              </Link>
              <Trash
                size={23}
                onClick={() => eliminarPokemon(pokemonSeleccionado.id)}
              />
            </ContenedorFuture>
          </ContenedorTarjeta>
        </>
      ) : (
        <h2>No se encontró información para el Pokémon {pokemonName}</h2>
      )}
    </ContenedorPokemon>
  );
};

export default PokemonDetalles;

const ContenedorPokemon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 450px;
  margin: 25px auto;
`;
const ContenedorTarjeta = styled.div`
  background-color: #f4f4f4;
  width: 85vw;
  height: auto;
  margin: 15px;
  border-radius: 10px;
`;
const ContenedorTitulo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  margin: 10px 0;
`;
const ContenedorUno = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const ContenedorDos = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImagenCon = styled.img`
  width: 45px;
  margin: 0 5px;
  object-fit: cover;
  text-align: center;
`;
const ContenedorImgVideo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: auto;
  margin: auto;
  flex-direction: column;
`;
const ImagenPoke = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  margin: 15px 0 35px 0;

  filter: drop-shadow(-2px 2px 15px rgba(0, 0, 0, 0.7));
`;
const Parrafo = styled.p`
  padding: 20px 50px;
  font-size: 16px;
  text-align: center;
  font-family: "Roboto", sans-serif;
`;
const PokemonName = styled.h2`
  font-size: 35px;
  color: ${({ color }) => color};
`;
const PokemonCreador = styled.h3`
  font-size: 11px;
  font-weight: 400;
  color: #8c8c8c;
`;
const PokemonTipo = styled.h3`
  font-size: 15px;
  font-weight: 600;
  color: #000;
  text-align: center;
`;
const HoverableBiUndo = styled(BiUndo)`
  transition: color 0.3s ease;
  color: black;
  &:hover {
    color: #2e8686;
    scale: 1.3;
  }
`;
const ContenedorTres = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  &:hover {
    filter: drop-shadow(-2px 2px 15px rgba(0, 0, 0, 0.7));
  }
`;
const ContenedorFuture = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #212b34;
  width: 100%;
  padding: 10px;
  margin-top: 20px;
`;

const Pencil = styled(BiPencil)`
  transition: color 0.3s ease;
  color: #2e8686;
  cursor: pointer;
  &:hover {
    color: #46923c;
    scale: 1.3;
  }
`;
const Trash = styled(BiTrash)`
  transition: color 0.3s ease;
  color: #d0312d;
  cursor: pointer;
  &:hover {
    color: #e3242b;
    scale: 1.3;
  }
`;
