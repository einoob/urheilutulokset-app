import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#2d5e42",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          width: "30%", 
        },
      },
    },
  },
});

export default theme;
