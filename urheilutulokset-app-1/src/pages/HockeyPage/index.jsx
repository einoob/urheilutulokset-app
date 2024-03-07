import React from "react";
import hockeyService from "../../services/hockeyService";
import { parseData } from "../../utils/dataParsers";
import { GeneralPage } from "../GeneralPage";

export const HockeyPage = () => {
  const [hockeyData, setHockeyData] = React.useState([]);


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

  console.log("parsedData", parsedData);

  if (!parsedData) {
    return <div>hockey page</div>
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