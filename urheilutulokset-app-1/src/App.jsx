import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Button, Container, Divider, createTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";

import { HockeyPage } from "./pages/HockeyPage";
import { FootballPage } from "./pages/FootballPage";
import { BasketballPage } from "./pages/BasketballPage";
import { NhlPage } from "./pages/NhlPage";
import { EuroFootballPage } from "./pages/EuroFootballPage";

const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const lightTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#36651a", // Light theme primary color
      },
      secondary: {
        main: "#1A3665", // Example secondary color for light mode
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
        main: "#8481C7", // Example secondary color for dark mode
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
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "left" }}>
            <Button component={Link} to="/" sx={{ width: "17%", m: "12px" }}>
              Football
            </Button>
            <Button component={Link} to="/europe" sx={{ width: "17%", m: "12px" }}>
              Europe
            </Button>
            <Button component={Link} to="/hockey" sx={{ width: "17%", m: "12px" }}>
              Hockey
            </Button>
            <Button component={Link} to="/nhl" sx={{ width: "17%", m: "12px" }}>
              NHL
            </Button>
            <Button component={Link} to="/basketball" sx={{ width: "17%", m: "12px" }}>
              Basketball
            </Button>
          </div>
          <Divider hidden style={{ height: "34px" }} />
          <Routes>
            <Route exact path="/" element={<FootballPage />} />
            <Route path="europe" element={<EuroFootballPage />} />
            <Route path="/hockey" element={<HockeyPage />} />
            <Route path="/nhl" element={<NhlPage />} />
            <Route path="/basketball" element={<BasketballPage />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
