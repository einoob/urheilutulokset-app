import React from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Button, Container, Divider, createTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";

import { HockeyPage } from "./pages/HockeyPage";

const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const appliedTheme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
          primary: {
            main: "#234111",
          },
          background: {
            default: prefersDarkMode ? "#222229" : "#FFFFFF",
            paper: prefersDarkMode ? "#222229" : "#FDFDFD",
          },
        },
      }),
    [prefersDarkMode]
  );


  return (
    <ThemeProvider theme={appliedTheme}>
      <Router>
        <Container
          style={{ display: "flex", flexDirection: "column", width: "95%" }}
          sx={{ py: "12px", height: "100vh", maxHeight: "100vh" }}
        >
          <CssBaseline />

          <Button
            component={Link}
            to="/"
            variant="contained"
            color="primary"
            sx={{ width: "30%", mb: "12px" }}
          >
            Home
          </Button>
          <Divider hidden style={{ height: "34px" }} />
          <Routes>
            <Route exact path="/" element={<HockeyPage />}/>
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
