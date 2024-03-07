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
            paper: prefersDarkMode ? "#222229" : "#FFFFFF",
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
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between"}}>
            <Button
              component={Link}
              to="/"
              variant="contained"
              color="primary"
              sx={{ width: "22%", m: "12px" }}
            >
              Home
            </Button>
            <Button variant="contained" sx={{ width: "22%", m: "12px" }}>Test</Button>
            <Button variant="contained" sx={{ width: "22%", m: "12px" }}>Test</Button>
            <Button variant="contained" sx={{ width: "22%", m: "12px" }}>Test</Button>
          </div>
          <Divider hidden style={{ height: "34px" }} />
          <Routes>
            <Route exact path="/" element={<HockeyPage />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
