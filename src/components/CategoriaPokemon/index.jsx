import React, { useContext } from "react";
import { useParams } from "react-router-dom/dist";
import { FirebaseContexto } from "../../FireBase/DatosFirebase";
import styled from "@emotion/styled";

import { Link } from "react-router-dom";
import { BiUndo } from "react-icons/bi";
import { BiTrash, BiPencil } from "react-icons/bi";

import { categoriaRef } from "../../FireBase/DatosFirebase";
import { doc, deleteDoc } from "firebase/firestore";

const CategoriaPokemon = () => {
  const { categoriaName } = useParams();
  const { pokemon, tipoPokemon } = useContext(FirebaseContexto);

  const categoriaSelect = tipoPokemon.find(
    (tipo) => tipo.tipo === categoriaName
  );

  const pokemons = pokemon
    .filter((poke) => poke.tipoPokemon === categoriaSelect.tipo)
    .map((filterImagen) => ({
      img: filterImagen.linkImagen,
      name: filterImagen.name,
    }));

    const eliminarPokemon = async (id) => {
      try {
        const tipoPokemonRefe = doc(categoriaRef, id);
        await deleteDoc(tipoPokemonRefe);
        alert("Tipo de Pokemon eliminado correctamente");
        window.location.reload();
      } catch (error) {
        console.error("Error al eliminar el documento:", error);
      }
    };
  
  return (
    <ContenedorPokemon>
      {categoriaSelect ? (
        <ContenedorTarjeta>
          <ContenedorTitulo>
            <ContenedorUno>
              <PokemonName color={categoriaSelect.color}>
                {categoriaSelect.tipo}
              </PokemonName>
              <PokemonCreador>
                Creador : {categoriaSelect.creador}
              </PokemonCreador>
            </ContenedorUno>
            <ContenedorDos>
              <ImagenCon
                src={categoriaSelect.logo}
                alt={categoriaSelect.tipo}
              />
            </ContenedorDos>
            <ContenedorTres to={`/`}>
              <HoverableBiUndo size={30} />
            </ContenedorTres>
          </ContenedorTitulo>
          <ContenedorParrafo>
            {categoriaSelect.descripcion}
          </ContenedorParrafo>
          <ContenedorImgVideo>
            {pokemons.map((pokemon) => (
              <ContenedorPoke>
                <ImagenPokemon src={pokemon.img} alt={pokemon.name} />
                <TituloName>{pokemon.name} </TituloName>
              </ContenedorPoke>
            ))}
          </ContenedorImgVideo>
          <ContenedorFuture>
              <Link
                to={`/tipo-pokemon/editar/${categoriaSelect.id}`}
              >
                <Pencil size={25} />
              </Link>
              <Trash
                size={23}
                onClick={() => eliminarPokemon(categoriaSelect.id)}
              />
            </ContenedorFuture>
        </ContenedorTarjeta>
      ) : (
        <h2>No se encontró información para el Tipo {categoriaName}</h2>
      )}
    </ContenedorPokemon>
  );
};

export default CategoriaPokemon;

const ContenedorPokemon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 25px auto;
  min-height: 80vh;
`;
const ContenedorTarjeta = styled.div`
  background-color: #f4f4f4;
  max-width: 450px;
  height: auto;
  border-radius: 10px;
  @media only screen and (max-width: 426px) {
    max-width: 270px;
    margin:5px auto;
  }
`;
const PokemonName = styled.h2`
  font-size: 35px;
  color: ${({ color }) => color};
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
const ContenedorTres = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  &:hover {
    filter: drop-shadow(-2px 2px 15px rgba(0, 0, 0, 0.7));
  }
`;
const ContenedorParrafo = styled.p`
  color: #000;
text-align: center;
font-size:15px;
font-weight: 500;
margin: 20px;
padding: 0 15px;

`
const ImagenCon = styled.img`
  width: 45px;
  margin: 0 5px;
  object-fit: cover;
  text-align: center;
`;
const ImagenPokemon = styled.img`
  width: auto;
  max-height: 150px;
  margin: 5px;
  padding: 15px;
  object-fit: cover;
  text-align: center;
  filter: drop-shadow(-2px 2px 15px rgba(0, 0, 0, 0.7));
`;
const HoverableBiUndo = styled(BiUndo)`
  transition: color 0.3s ease;
  color: black;
  &:hover {
    color: #2e8686;
    scale: 1.3;
  }
`;
const PokemonCreador = styled.h3`
  font-size: 11px;
  font-weight: 400;
  color: #8c8c8c;
`;
const ContenedorImgVideo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: auto;
  margin: auto;
`;
const TituloName = styled.h3`
  color: #000;
  padding-bottom: 5px;

`
const ContenedorPoke = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
`
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
