import React from "react";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2A7AE4",
      contrastText: "#fff",
    },
  },
});

const Boton = ({ color, text, funcion, type = "text", variant, palabra }) => {
  const updatedTheme = createTheme({
    ...theme,
    overrides: {
      MuiButton: {
        root: {
          [theme.breakpoints.down("sm")]: {
            fontSize: "10px",
          },
        },
      },
    },
    palette: {
      ...theme.palette,
      eleccion: {
        main: color,
        contrastText: "#fff",
        dark: `${color}70`,
      },
    },
  });

  return (
    <ThemeProvider theme={updatedTheme}>
      <Button
        variant={variant}
        onClick={funcion}
        type={type}
        color={palabra}
      >
        {text}
      </Button>
    </ThemeProvider>
  );
};

export default Boton;
