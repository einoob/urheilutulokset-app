import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#36651a",
    },
    secondary: {
      main: "#12648a",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1600,
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#81c784",
    },
    secondary: {
      main: "#4fcdd6",
    },
    background: {
      default: "#222229",
      paper: "#222229",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1600,
    },
  },
});

darkTheme.typography.body1 = {
  fontSize: "0.77rem",
  fontFamily: "Roboto Mono, monospace",
  "@media (max-width: 460px)": {
    fontSize: "0.65rem",
  },
  "@media (max-width: 375px)": {
    fontSize: "0.55rem",
  },
  "@media (max-width: 330px)": {
    fontSize: "0.50rem",
  },
};

lightTheme.typography.body1 = {
  fontSize: "0.77rem",
  fontFamily: "Roboto Mono, monospace",
  "@media (max-width: 460px)": {
    fontSize: "0.65rem",
  },
  "@media (max-width: 375px)": {
    fontSize: "0.55rem",
  },
  "@media (max-width: 330px)": {
    fontSize: "0.50rem",
  },
};
