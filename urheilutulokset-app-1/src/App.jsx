import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Button, Container, Divider, Typography, createTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";

import hockeyService from "./services/hockeyService";

const makeArrays = (parsedData) => {
  let newArray = [];
  let currentPage = null;
  let currentSubpage = null;

  for (const item of parsedData) {
    if (item === "PAGECHANGE") {
      if (currentPage) {
        newArray.push(currentPage);
      }
      currentPage = [];
      currentSubpage = null;
    } else if (item === "SUBPAGECHANGE") {
      if (currentPage && currentSubpage) {
        currentPage.push(currentSubpage);
      }
      currentSubpage = [];
    } else {
      if (currentSubpage) {
        currentSubpage.push(item);
      }
    }
  }

  if (currentSubpage) {
    // If there's a current subpage at the end, push it to currentPage
    if (currentPage) {
      currentPage.push(currentSubpage);
    }
  } else {
    // If there's no current subpage at the end, push currentPage as is
    if (currentPage) {
      newArray.push(currentPage);
    }
  }
  console.log("arrays", newArray);
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
  parsedData = parsedData.map((data) => data.replaceAll("{SB}", "\n"));
  parsedData = parsedData.map((data) => data.replaceAll(/\{[^}]*\}/g, ""));
  //console.log(parsedData);
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
            default: prefersDarkMode ? "#202026" : "#FFFFFF",
          },
        },
      }),
    [prefersDarkMode]
  );

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        let dataArray = await hockeyService.getPages();
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
        <Container style={{ padding: "24px", display: "flex", flexDirection: "column" }}>
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
          <Typography>
            {parsedData &&
              parsedData.map((text, index) => (
                <span key={index}>
                  {text}
                  <br />
                </span>
              ))}
          </Typography>
          <Divider hidden style={{ height: "34px" }} />

          <Routes>
            <Route
              path="/"
              element={
                <Button variant="contained" sx={{ width: "30%" }}>
                  Hello world
                </Button>
              }
            ></Route>
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App;
