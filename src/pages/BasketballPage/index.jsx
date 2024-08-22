import React from "react";
import pageService from "../../services/pageService";
import { parseData } from "../../utils/dataParsers";
import { GeneralPage } from "../../modules/GeneralPage";
import { CircularProgress, Container, Typography } from "@mui/material";

export const BasketballPage = () => {
  const [basketballData, setBasketballData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        let dataArray = await pageService.getPages("271-279");
        setBasketballData(dataArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const parsedData = parseData(basketballData);

  if (basketballData.length === 0) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", m: "12px" }}>
        <CircularProgress />
      </Container>
    );
  } else if (basketballData === "error") {
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
