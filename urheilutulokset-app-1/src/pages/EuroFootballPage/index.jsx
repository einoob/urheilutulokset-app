import React from "react";
import hockeyService from "../../services/hockeyService";
import { parseData } from "../../utils/dataParsers";
import { GeneralPage } from "../GeneralPage";
import { CircularProgress, Container } from "@mui/material";

export const EuroFootballPage = () => {
  const [footballData, setHockeyData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        let dataArray = await hockeyService.getPages("673-696");
        setHockeyData(dataArray);
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
  }

  if (parsedData) {
    return (
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent:"space-between"}}>
        {parsedData && parsedData.map((data, index) => (
          <GeneralPage key={index} page={data} />
        ))}
      </div>
    );
  }
};