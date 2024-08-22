import React from "react";
import pageService from "../../services/pageService";
import { parseData } from "../../utils/dataParsers";
import { GeneralPage } from "../../modules/GeneralPage";
import { CircularProgress, Container, Typography } from "@mui/material";

export const FootballPage = () => {
  const [footballData, setFootballData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        let dataArray = await pageService.getPages("241-250");
        setFootballData(dataArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const parsedData = parseData(footballData);

  if (footballData.length === 0) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", m: "12px" }}>
        <CircularProgress />
      </Container>
    );
  } else if (footballData === "error") {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", m: "12px" }}>
        <Typography>No pages found.</Typography>
      </Container>
    );
  }
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between" }}>
      {parsedData && parsedData.map((data, index) => <GeneralPage key={index} page={data} />)}
    </div>
  );
};
