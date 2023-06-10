import React from "react";
import images from "../../imagenes/Logo-pokelura.jpg";
import Boton from "../Boton";
import { Link } from "react-router-dom";
import styled from "styled-components";

const linkStyle = {
  textDecoration: "none",
  height: 70,
};

const Header = () => {
  return (
    <ContenedorHeader>
      <Link to="/" style={linkStyle}>
        <ImagenLogo src={images} alt="Pokelura-logo" />
      </Link>
      <Link to="/nuevo-pokemon">
        <Boton text="Nuevo Pokemon" variant="contained" />
      </Link>
    </ContenedorHeader>
  );
};

export default Header;
const ContenedorHeader = styled.nav`
  background-color: #212b34;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 10px 50px;
  height: 5em;
  border-bottom: 4px solid #2a7ae4;
  text-align: center;
`;

const ImagenLogo = styled.img`
  object-fit: contain;
  height: 100%;
`;
