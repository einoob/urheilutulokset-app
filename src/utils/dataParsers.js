const makeArrays = (parsedData) => {
  let newArray = [];
  let currentPage = [];
  let currentSubpage = null;

  for (let i = 0; i < parsedData.length; i++) {
    const item = parsedData[i];

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
  if (data === "error") return;
  let parsedData = [];
  let previousPage = null;
  let previousSubpage = null;
  for (const page of data) {
    for (const subpage of page) {
      if (previousSubpage !== subpage) {
        parsedData.push("SUBPAGECHANGE");
      }
      for (const contentItem of subpage.content) {
        let foundFirstBrace = false;
        for (const lineItem of contentItem.line) {
          if (!foundFirstBrace && lineItem?.Text) {
            if (lineItem.Text.includes("{")) {
              foundFirstBrace = true;
            }
          }
          if (foundFirstBrace && lineItem.Text) {
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
    data
      .replaceAll("{SB}", "")
      .replaceAll("#######################################", "")
      .replaceAll("\n", "")
      .replace(/^\s(?!\s)/, "")
  );
  parsedData = parsedData.map((data) => data.replaceAll(/(\d+){([^{}]*)}([A-Za-z]+)/g, "$1 $3"));
  parsedData = parsedData.map((data) => data.replaceAll(/(\D+)(\d+-\d+)/g, "$1 $2"));

  parsedData = parsedData.map((data) =>
    data.replaceAll(/(\d+)\.(\d{2})(\d+)-(\d+)/g, "$1.$2 $3-$4")
  );
  parsedData = makeArrays(parsedData);
  return parsedData;
};
