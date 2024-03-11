import { Link } from "react-router-dom";

import { List, ListItem, Button } from "@mui/material";

import SportsHockeyIcon from "@mui/icons-material/SportsHockey";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";

export const DrawerList = ({ toggleDrawer }) => (
  <List style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
    <ListItem onClick={() => toggleDrawer(null, false)}>
      <Button
        component={Link}
        to="/"
        sx={{ width: "200px", m: "24px", justifyContent: "left", fontSize: 16 }}
        startIcon={<SportsSoccerIcon />}
      >
        Football
      </Button>
    </ListItem>
    <ListItem onClick={() => toggleDrawer(null, false)}>
      <Button
        component={Link}
        to="/europe"
        sx={{ width: "200px", m: "24px", justifyContent: "left", fontSize: 16 }}
        startIcon={<SportsSoccerIcon />}
      >
        Europe
      </Button>
    </ListItem>
    <ListItem onClick={() => toggleDrawer(null, false)}>
      <Button
        component={Link}
        to="/hockey"
        sx={{ width: "200px", m: "24px", justifyContent: "left", fontSize: 16 }}
        startIcon={<SportsHockeyIcon />}
      >
        Hockey
      </Button>
    </ListItem>
    <ListItem onClick={() => toggleDrawer(null, false)}>
      <Button
        component={Link}
        to="/nhl"
        sx={{ width: "200px", m: "24px", justifyContent: "left", fontSize: 16 }}
        startIcon={<SportsHockeyIcon />}
      >
        NHL
      </Button>
    </ListItem>
    <ListItem onClick={() => toggleDrawer(null, false)}>
      <Button
        component={Link}
        to="/basketball"
        sx={{ width: "200px", m: "24px", justifyContent: "left", fontSize: 16 }}
        startIcon={<SportsBasketballIcon />}
      >
        Basketball
      </Button>
    </ListItem>
  </List>
);
