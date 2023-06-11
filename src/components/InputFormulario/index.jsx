import React, { useContext} from "react";
import TextField from "@mui/material/TextField";
import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FirebaseContexto } from "../../FireBase/DatosFirebase";
import { styled  as styledSystem} from '@mui/system';

const theme = createTheme({
  palette: {
    primary: {
      main: "#2e8686",
      contrastText: "#2e8686",
    },
  },

});

export const InputForm = ({ text, error, textoayuda, funcion, value, type,inputMode, pattern }) => {
  return (
    <ThemeProvider theme={theme}>
      <TextoField
        label={text}
        variant="standard"
        color="primary"
        error={error}
        inputlabelprops={{
          style: { color: theme.palette.primary.contrastText },
        }}
        onChange={funcion}
        helperText={textoayuda}
        value={value}
        type={type}
        inputMode={inputMode}
        pattern={pattern}
        required
      />
    </ThemeProvider>
  );
};
const TextoField = styledSystem(TextField)(({ theme }) => ({
  '& .MuiFormLabel-root': {
    fontSize: 12, // Tamaño de fuente base
    [theme.breakpoints.down('sm')]: {
      fontSize: 12, // Tamaño de fuente para pantallas de hasta 'sm'
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: 14, // Tamaño de fuente para pantallas entre 'sm' y 'md'
    },
    [theme.breakpoints.up('md')]: {
      fontSize: 16, // Tamaño de fuente para pantallas a partir de 'md'
    },
  },
}));
export const TextDescription = ({
  text,
  error,
  textoayuda,
  funcion,
  value,
  
}) => {
  return (
    <ThemeProvider theme={theme}>
      <TextoField
        label={text}
        variant="standard"
        color="primary"
        multiline
        error={error}
        onChange={funcion}
        helperText = {textoayuda}
        value={value}
        rows={4}
        required
        inputlabelprops={{
          style: { color: theme.palette.primary.contrastText },
        }}
      />
    </ThemeProvider>
  );
};

export const SelectOpcion = ({
  tipoPoke,
  error,
  textoayuda,
  funcion,
}) => {
  const { tipoPokemon } = useContext(FirebaseContexto);

  return (
    <ThemeProvider theme={theme}>
      <FormControl error= {error}>
        <InputLabel id="demo-simple-select-label">Tipo de Pokemon</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={tipoPoke.value}
          label="Tipo de Pokemon"
          onChange={funcion}
        >
          {tipoPokemon.map((tipo) => (
            <MenuItem
              key={tipo.id}
              value={tipo.tipo}
              inputlabelprops={{
                style: { color: theme.palette.primary.contrastText },
              }}
            >
              {tipo.tipo}
            </MenuItem>
          ))}
        </Select>
        {error && <FormHelperText>{textoayuda}</FormHelperText>}
      </FormControl>
    </ThemeProvider>
  );
};
