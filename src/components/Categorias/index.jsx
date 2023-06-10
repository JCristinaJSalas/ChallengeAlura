import React, { useContext } from "react";
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

const Categoria = () => {
  const { tipoPokemon } = useContext(FirebaseContexto);

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
    <ContenedorTabla>
      <Titulo>Tipos de Pokemon</Titulo>
      <Table
        sx={{ width: "auto ", color: "#fff", m: 10, borderColor: "#2e8686" }}
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
                {tipo.tipo}
              </StyledTableCell>
              <StyledTableCell align="center">
                {tipo.descripcion}
              </StyledTableCell>
              <StyledTableCell align="center">{tipo.creador}</StyledTableCell>
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
  width: 80%;
  box-sizing: border-box;
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
`;
