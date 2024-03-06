import { API_BASE_URL } from "../../.constants.js";
import { API_ID, API_KEY } from "../../.secrets.js";
import axios from "axios";

const getPages = async () => {
  let allPages = [];
  for (let pageNbr = 221; pageNbr <= 233; pageNbr++) {
    try {
      const { data } = await axios.get(`${API_BASE_URL}${pageNbr}.json${API_ID}${API_KEY}`);
      allPages.push(data.teletext.page.subpage);
      // console.log(allPages)
    } catch (error) {
      continue;
    }
  }
  return allPages;
};

export default { getPages };
