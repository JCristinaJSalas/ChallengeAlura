import React, { useContext} from "react";
import { styled as estilo } from "@mui/material/styles";
import { FirebaseContexto } from "../../FireBase/DatosFirebase";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styled from "styled-components";
import { BiTrash, BiPencil } from "react-icons/bi";
import { Link } from "react-router-dom";
import { categoriaRef } from "../../FireBase/DatosFirebase";
import { doc, deleteDoc } from "firebase/firestore";
import useMediaQuery from "@mui/material/useMediaQuery";

const Categoria = () => {
  const { tipoPokemon } = useContext(FirebaseContexto);
  const screenMobile = useMediaQuery("(max-width:650px)");

  const eliminar = async (id) => {
    try {
      const categoriaRefe = doc(categoriaRef, id);
      await deleteDoc(categoriaRefe);
      alert("Tipo de Pokemon eliminado correctamente");
      window.location.reload();
    } catch (error) {
      console.error("Error al eliminar el documento:", error);
    }
  };

  return (
    <>
      <Titulo>Tipos de Pokemon</Titulo>
      {screenMobile === true ? (
        <ContenedorTabla>
          {tipoPokemon.map((tipo) => (
            <ContenedorTipo>
              <NaviLink to={`/categoria/${tipo.tipo}`} color={tipo.color}>
                <img src={tipo.logo} width={50} alt={tipo.tipo} />
              </NaviLink>
              <ContenedorName>
                <NaviLink to={`/categoria/${tipo.tipo}`} color={tipo.color}>
                  <TituloTipo>{tipo.tipo}</TituloTipo>
                </NaviLink>
                <ContenedorFuture>
                  <Link to={`/tipo-pokemon/editar/${tipo.id}`}>
                    <Pencil size={23} />
                  </Link>
                  <Trash size={20} onClick={() => eliminar(tipo.id)} />
                </ContenedorFuture>
              </ContenedorName>
            </ContenedorTipo>
          ))}
        </ContenedorTabla>
      ) : (
        <ContenedorTabla>
          <Table
            sx={{
              width: "auto ",
              color: "#fff",
              m: 10,
              borderColor: "#2e8686",
            }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>LOGO</StyledTableCell>
                <StyledTableCell align="center">TIPO</StyledTableCell>
                <StyledTableCell align="center">DESCRIPCION</StyledTableCell>
                <StyledTableCell align="center">CREADOR</StyledTableCell>
                <StyledTableCell align="center">EDITAR</StyledTableCell>
                <StyledTableCell align="center">REMOVER</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tipoPokemon.map((tipo) => (
                <StyledTableRow key={tipo.tipo}>
                  <StyledTableCell component="th" scope="row">
                    <img src={tipo.logo} width={50} alt={tipo.tipo} />
                  </StyledTableCell>
                  <StyledTableCell align="center" style={{ color: tipo.color }}>
                    <NaviLink to={`/pokemon/${tipo.name}`} color={tipo.color}>
                      {tipo.tipo}
                    </NaviLink>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {tipo.descripcion}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {tipo.creador}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Link to={`/tipo-pokemon/editar/${tipo.id}`}>
                      <Pencil size={23} />
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Trash size={20} onClick={() => eliminar(tipo.id)} />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </ContenedorTabla>
      )}
    </>
  );
};

export default Categoria;

const StyledTableCell = estilo(TableCell)(({ theme, color }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#101010",
    color: "#2A7AE4",
    borderColor: "#2A7AE4",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    color: "white",
  },
}));

const StyledTableRow = estilo(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#212b34",
    color: "white",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#212b34aa",
    color: "white",
  },
  // hide last border
  "& td, & th": {
    borderColor: "#2A7AE4",
  },
}));

const ContenedorTabla = styled.div`
  margin: 35px auto;
  width: 90%;
  box-sizing: border-box;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
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

const Pencil = styled(BiPencil)`
  transition: color 0.3s ease;
  color: #2e8686;
  
  cursor: pointer;
  &:hover {
    color: #46923c;
    scale: 1.3;
  }
`;
const Titulo = styled.h3`
  color: #fff;
  text-align: center;
  margin: 25px;
`;
const NaviLink = styled(Link)`
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
const TituloTipo = styled.h4`
  font-size: 15px;
  font-weight: 500;
`;

const ContenedorTipo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 155px;
  padding: 10px;
  margin: 10px;
  border: 1px solid #fff;
  border-radius:5px;
`;
const ContenedorName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 5px;
  width: 75px;
`;
const ContenedorFuture = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding-top: 8px;
  width: 100%;

`