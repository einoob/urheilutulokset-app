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

export const parseData = (data) => {
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
  parsedData = parsedData.map((data) =>
    data.replaceAll(/(\d+)\.(\d{2})(\d+)-(\d+)/g, "$1.$2 $3-$4")
  );
  parsedData = makeArrays(parsedData);
  return parsedData;
};
