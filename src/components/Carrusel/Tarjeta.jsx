import React from "react";
import { styled } from "styled-components";
import { BiTrash, BiPencil } from "react-icons/bi";
import { Link } from "react-router-dom";
import { pokemonRef } from "../../FireBase/DatosFirebase";
import { doc, deleteDoc } from "firebase/firestore";

const Tarjeta = ({ id, name, tipoPokemon, linkImagen, logo, color }) => {
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
    <ContenedorDiv color={color}>
      <Root>
        <ContenedorInfo>
          <Tipo>
            <TitlePokemon>Tipo de Pokemon :</TitlePokemon>
            <Categoria color={color}>{tipoPokemon}</Categoria>
            <ImagenLogo src={logo} alt={name}  />
          </Tipo>

          <NavLink to={`/pokemon/${name}`} color={color}>
            {name}
          </NavLink>
        </ContenedorInfo>
        <NavLink to={`/pokemon/${name}`} color={color}>
          <ImagenPokemon src={linkImagen} alt={name} />
        </NavLink>
      </Root>
      <ContenedorFuture>
        <Link to={`/tipo-pokemon/editarPokemon/${id}`}>
          <Pencil size={25} />
        </Link>
        <Trash size={23} onClick={() => eliminarPokemon(id)} />
      </ContenedorFuture>
    </ContenedorDiv>
  );
};

export default Tarjeta;
const ContenedorDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #fafafa;
  height: 470px;
  border-radius: 5px;
  text-decoration: none;
  margin: 10px;
  &:hover {
    border: 5px solid ${(props) => props.color};
  }
  @media only screen and (max-width: 417px) {
    height: auto;
  }
`;
const Root = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 25px;
  overflow: hidden;
  width: 100%;
  flex-wrap:wrap;
  @media only screen and (max-width: 417px) {
    padding: 0px;
  }
`;
const ContenedorInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  padding: 10px;
`;
const Tipo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
`;

const TitlePokemon = styled.h3`
  color: #9b9b9b;
  font-size: 14px;
  font-weight: 500;
  padding-right: 20px;
`;
const ImagenPokemon = styled.img`
  height: 250px;
  width: 300px;
  object-fit: contain;
  @media only screen and (max-width: 417px) {
    height: 180px;
    width: 150px;
  }
`;

const Categoria = styled.h2`
  color: ${(props) => props.color};
  font-size: 16px;
  font-weight: 700;
  padding-right: 20px;
`;
const ImagenLogo = styled.img`
  width: 50px;
  @media only screen and (max-width:417px) {
    width: 30px;
    
  }
`
const NavLink = styled(Link)`
  color: ${(props) => props.color};
  text-decoration: none;
  font-size: 20px;
  font-weight: 700;
  box-shadow: inset 0 0 0 0 ${(props) => props.color};
  margin: 0 -0.25rem;
  padding: 0 0.25rem;
  transition: color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  &:hover {
    box-shadow: inset 350px 0 0 0 ${(props) => props.color};
    color: white;
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
