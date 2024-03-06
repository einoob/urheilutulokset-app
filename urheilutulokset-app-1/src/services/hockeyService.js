import { API_BASE_URL } from "../../.constants.js";
import { API_ID, API_KEY } from "../../.secrets.js";
import axios from "axios";

const getPages = async (pageRange) => {
  let allPages = [];
  let [firstPage, lastPage] = pageRange.split("-")
  for (let pageNbr = firstPage; pageNbr <= lastPage; pageNbr++) {
    try {
      const { data } = await axios.get(`${API_BASE_URL}${pageNbr}.json${API_ID}${API_KEY}`);
      allPages.push(data.teletext.page.subpage);
    } catch (error) {
      continue;
    }
  }
  return allPages;
};

export default { getPages };
