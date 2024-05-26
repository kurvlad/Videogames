const dataHistoryArray = [];

function setDataHistoryArray(item) {
  const midleDataHistory = dataHistoryArray
    .map((data) => {
      return data.id === item.id ? null : data;
    })
    .filter((data) => data !== null);
  dataHistoryArray.length = 0;
  dataHistoryArray.unshift(...midleDataHistory);
  dataHistoryArray.unshift(item);
}

export { dataHistoryArray, setDataHistoryArray };
