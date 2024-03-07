import React from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Button, Container, Divider, createTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";

import { HockeyPage } from "./pages/HockeyPage";
import { FootballPage } from "./pages/FootballPage";
import { BasketballPage } from "./pages/BasketballPage";

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
          secondary: {
            main: "#868686",
          },
          background: {
            default: prefersDarkMode ? "#222229" : "#FFFFFF",
            paper: prefersDarkMode ? "#222229" : "#FFFFFF",
          },
        },
      }),
    [prefersDarkMode]
  );

  const lightTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#234111", // Light theme primary color
      },
      secondary: {
        main: "#1976d2", // Example secondary color for light mode
      },
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#81c784", // Dark theme primary color
      },
      secondary: {
        main: "#90caf9", // Example secondary color for dark mode
      },
      background: {
        default: "#222229",
        paper: "#222229",
      },
    },
  });

  return (
    <ThemeProvider theme={prefersDarkMode ? darkTheme : lightTheme}>
      <Router>
        <Container
          style={{ display: "flex", flexDirection: "column", width: "95%" }}
          sx={{ py: "12px", height: "100vh", maxHeight: "100vh" }}
        >
          <CssBaseline />
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
            <Button component={Link} to="/" color="primary" sx={{ width: "22%", m: "12px" }}>
              Football
            </Button>
            <Button
              component={Link}
              to="/hockey"
              variant="text"
              color="primary"
              sx={{ width: "22%", m: "12px" }}
            >
              Hockey
            </Button>
            <Button
              component={Link}
              to="/basketball"
              color="primary"
              sx={{ width: "22%", m: "12px" }}
            >
              Basketball
            </Button>
          </div>
          <Divider hidden style={{ height: "34px" }} />
          <Routes>
            <Route path="/hockey" element={<HockeyPage />} />
            <Route exact path="/" element={<FootballPage />} />
            <Route path="/basketball" element={<BasketballPage />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
