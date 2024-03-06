import React from "react";
import { BrowserRouter as Router, Link /*Route, Routes*/ } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Button, Container, Divider, Typography, createTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import { Page } from "./pages/Page";

import hockeyService from "./services/hockeyService";

const makeArrays = (parsedData) => {
  let newArray = [];
  let currentPage = [];
  let currentSubpage = null;

  for (const item of parsedData) {
    if (item === "PAGECHANGE") {
      if (currentSubpage !== null) {
        currentPage.push(currentSubpage);
      }
      if (currentPage.length > 0) {
        newArray.push(currentPage);
      }
      currentPage = [];
      currentSubpage = null;
    } else if (item === "SUBPAGECHANGE") {
      if (currentSubpage !== null) {
        currentPage.push(currentSubpage);
      }
      currentSubpage = [];
    } else {
      if (currentSubpage !== null) {
        currentSubpage.push(item);
      }
    }
  }

  if (currentSubpage !== null) {
    currentPage.push(currentSubpage);
  }
  if (currentPage.length > 0) {
    newArray.push(currentPage);
  }
  return newArray;
};

const parseData = (data) => {
  let parsedData = [];
  let previousPage = null;
  let previousSubpage = null;
  for (const page of data) {
    for (const subpage of page) {
      if (previousSubpage !== subpage) {
        parsedData.push("SUBPAGECHANGE");
      }
      for (const contentItem of subpage.content) {
        for (const lineItem of contentItem.line) {
          if (lineItem.Text && lineItem.Text.includes("{")) {
            parsedData.push(lineItem.Text);
          }
        }
      }
    }
    if (previousPage !== page) {
      parsedData.push("PAGECHANGE");
    }
  }
  parsedData = parsedData.map((data) =>
    data.replaceAll("{SB}", "").replaceAll("#", "").replaceAll("\n", "")
  );
  parsedData = parsedData.map((data) => data.replaceAll(/\{[^}]*\}/g, ""));
  parsedData = makeArrays(parsedData);
  return parsedData;
};

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
  console.log(parsedData);

  return (
    <ThemeProvider theme={appliedTheme}>
      <Router>
        <Container
          style={{ display: "flex", flexDirection: "column", width: "95%" }}
          sx={{ py: "12px" }}
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
            {parsedData && parsedData.map((page, index) => <Page key={index} page={page} />)}
          </Typography>
          <Divider hidden style={{ height: "34px" }} />
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
