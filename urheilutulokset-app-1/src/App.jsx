import React from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import {
  Button,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  SwipeableDrawer,
  createTheme,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";

import SportsHockeyIcon from "@mui/icons-material/SportsHockey";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import MenuIcon from "@mui/icons-material/Menu";

import { HockeyPage } from "./pages/HockeyPage";
import { FootballPage } from "./pages/FootballPage";
import { BasketballPage } from "./pages/BasketballPage";
import { NhlPage } from "./pages/NhlPage";
import { EuroFootballPage } from "./pages/EuroFootballPage";

const App = () => {
  const [drawerOpen, setDrawer] = React.useState(false);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const lightTheme = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#36651a",
      },
      secondary: {
        main: "#12648a",
      },
    },
  });

  const darkTheme = createTheme({
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
  });

  const toggleDrawer = (event, isOpen) => {
    if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawer(isOpen);
  };

  return (
    <ThemeProvider theme={prefersDarkMode ? darkTheme : lightTheme}>
      <Router>
        <Container
          style={{ display: "flex", flexDirection: "column", width: "95%" }}
          sx={{ py: "12px", height: "100vh", maxHeight: "100vh" }}
        >
          <CssBaseline />
          <div style={{ display: "flex", justifyContent: "right"}}>
            <IconButton onClick={() => toggleDrawer(null, !drawerOpen)}>
              <MenuIcon />
            </IconButton>
          </div>
          <SwipeableDrawer
            anchor="left"
            open={drawerOpen}
            onClose={() => toggleDrawer(null, false)}
            onOpen={() => toggleDrawer(null, true)}
            PaperProps={{ sx: { width: "250px" } }}
            swipeAreaWidth={60}
            onKeyDown={() => toggleDrawer(false)}
            role="presentation"
          >
            <List style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
              <ListItem onClick={() => toggleDrawer(null, false)}>
                <Button
                  component={Link}
                  to="/"
                  sx={{ width: "200px", m: "12px", ml: "20px", justifyContent: "left" }}
                  startIcon={<SportsSoccerIcon />}
                >
                  Football
                </Button>
              </ListItem>
              <ListItem onClick={() => toggleDrawer(null, false)}>
                <Button
                  component={Link}
                  to="/europe"
                  sx={{ width: "200px", m: "24px", justifyContent: "left" }}
                  startIcon={<SportsSoccerIcon />}
                >
                  Europe
                </Button>
              </ListItem>
              <ListItem onClick={() => toggleDrawer(null, false)}>
                <Button
                  component={Link}
                  to="/hockey"
                  sx={{ width: "200px", m: "24px", justifyContent: "left" }}
                  startIcon={<SportsHockeyIcon />}
                >
                  Hockey
                </Button>
              </ListItem>
              <ListItem onClick={() => toggleDrawer(null, false)}>
                <Button
                  component={Link}
                  to="/nhl"
                  sx={{ width: "200px", m: "24px", justifyContent: "left" }}
                  startIcon={<SportsHockeyIcon />}
                >
                  NHL
                </Button>
              </ListItem>
              <ListItem onClick={() => toggleDrawer(null, false)}>
                <Button
                  component={Link}
                  to="/basketball"
                  sx={{ width: "200px", m: "24px", justifyContent: "left" }}
                  startIcon={<SportsBasketballIcon />}
                >
                  Basketball
                </Button>
              </ListItem>
            </List>
          </SwipeableDrawer>
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
