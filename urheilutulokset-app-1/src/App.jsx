import React from "react";
import { BrowserRouter as Router, Link /*Route, Routes*/ } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Button, Container, Divider, Skeleton, Typography, createTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import { Page } from "./pages/Page";
import { parseData } from "./utils/dataParsers";

import hockeyService from "./services/hockeyService";

const App = () => {
  const [hockeyData, setHockeyData] = React.useState([]);

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

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        let dataArray = await hockeyService.getPages("221-233");
        setHockeyData(dataArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const parsedData = parseData(hockeyData);

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
          <Typography fontSize={14}>
            {parsedData ? parsedData.map((page, index) => <Page key={index} page={page} />) : <Skeleton variant="rectangular" />}
          </Typography>
          <Divider hidden style={{ height: "34px" }} />
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
