import styled from "@emotion/styled";
import React from "react";
import ReactPlayer from "react-player";
import { BiXCircle } from "react-icons/bi";

const Modal = ({ pokemonVideo, estadoModal, cambiarEstado, name, color }) => {
  return (
    <>
      {estadoModal && (
        <Overlay>
          <ContenedorModal>
            <Encabezado color={color}>
              <h3>{name}</h3>
            </Encabezado>
            <BotonCerrar>
              <Close
                size={23}
                onClick={() => {
                  cambiarEstado(false);
                }}
              />
            </BotonCerrar>
            <ReactPlayer url={pokemonVideo} controls={true} width={"100%"} />
          </ContenedorModal>
        </Overlay>
      )}
    </>
  );
};

export default Modal;
const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #080808ed;
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 222;
`;
const ContenedorModal = styled.div`
  width: 600px;
  min-height: 200px;
  background-color: #000000ee;
  position: relative;
  border-radius: 5px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 20px;
`;
const Encabezado = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1.5px solid #e8e8e8;
  h3 {
    font-weight: 500;
    font-size: 19px;
    color: ${({ color }) => color};
    padding-left: 25px;
  }
`;
const BotonCerrar = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border: none;
  cursor: pointer;
  background: none;
  transition: 0.3s ease all;
  border-radius: 5px;
`;
const Close = styled(BiXCircle)`
  transition: color 0.3s ease;
  color: #d0312d;
  cursor: pointer;
  &:hover {
    scale: 1.3;
  }
`;
