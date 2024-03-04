import axios from "axios";
import { API_BASE_URL } from "../../.constants.js";
import { API_KEY, API_ID } from "../../.secrets.js";

export const getPages = async (pageNbrs) => {
  const pageRange = pageNbrs.split("-");
  let allPages = [];
  for (let i = pageRange[0]; i <= pageRange[1]; i++) {
    try {
      const url = `${API_BASE_URL}${i}.json${API_ID}${API_KEY}`;
      console.log(url);
      const response = await axios.get(url);
      console.log(response.data.teletext);
      allPages.push(response.data.teletext.page)
      console.log(allPages);
    } catch (error) {
      continue;
    }
  }
  return allPages;
};

export default { getPages };
