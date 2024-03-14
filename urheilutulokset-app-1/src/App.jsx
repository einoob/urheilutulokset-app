/* eslint-disable no-dupe-keys */
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Container, Divider, Hidden, IconButton, SwipeableDrawer } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";

import MenuIcon from "@mui/icons-material/Menu";

import { lightTheme, darkTheme } from "../theme";

import { HockeyPage } from "./pages/HockeyPage";
import { FootballPage } from "./pages/FootballPage";
import { BasketballPage } from "./pages/BasketballPage";
import { NhlPage } from "./pages/NhlPage";
import { EuroFootballPage } from "./pages/EuroFootballPage";
import { AboutPage } from "./pages/AboutPage";
import { DrawerList } from "./modules/DrawerList";

const App = () => {
  const [drawerOpen, setDrawer] = React.useState(false);
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const toggleDrawer = (event, isOpen) => {
    if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawer(isOpen);
  };

  return (
    <ThemeProvider theme={prefersDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <Container
          style={{ display: "flex", flexDirection: "column", width: "95%" }}
          sx={{ py: "12px", height: "100vh", maxHeight: "100vh" }}
        >
          <div>
            <Hidden xlUp>
              <IconButton size="large" onClick={() => toggleDrawer(null, !drawerOpen)}>
                <MenuIcon />
              </IconButton>
            </Hidden>
          </div>
          <Hidden xlUp>
            <SwipeableDrawer
              anchor="left"
              open={drawerOpen}
              onClose={() => toggleDrawer(null, false)}
              onOpen={() => toggleDrawer(null, true)}
              PaperProps={{ sx: { width: "250px" } }}
              swipeAreaWidth={40}
              onKeyDown={() => toggleDrawer(false)}
              role="presentation"
            >
              <DrawerList toggleDrawer={toggleDrawer} isOpen={drawerOpen} />
            </SwipeableDrawer>
          </Hidden>
          <Hidden xlDown>
            <SwipeableDrawer
              anchor="left"
              open={drawerOpen}
              onClose={() => toggleDrawer(null, false)}
              onOpen={() => toggleDrawer(null, true)}
              PaperProps={{ sx: { width: "250px" } }}
              swipeAreaWidth={40}
              onKeyDown={() => toggleDrawer(false)}
              variant="permanent"
            >
              <DrawerList toggleDrawer={toggleDrawer} isOpen={drawerOpen} />
            </SwipeableDrawer>
          </Hidden>
          <Divider hidden style={{ height: "34px" }} />
          <Routes>
            <Route exact path="/" element={<FootballPage />} />
            <Route path="europe" element={<EuroFootballPage />} />
            <Route path="/hockey" element={<HockeyPage />} />
            <Route path="/nhl" element={<NhlPage />} />
            <Route path="/basketball" element={<BasketballPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
