import React from 'react'
import styled from "styled-components";
import imagen from "../../imagenes/Logo-pokelura.jpg" 

const Footer = () => {
  return (
    <FooterA>
      <ImagenLogo src={imagen} alt="Logo Pokelura"/>
    </FooterA>
  )
}

export default Footer

const FooterA = styled.footer`
display: flex;
background: #212b34;
align-items: center;
justify-content: center;
border-top: 2px solid #2a7ae4;
padding: 20px;
`;
const ImagenLogo = styled.img`
width: 35%;
`;