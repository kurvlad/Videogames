// import { VolcanoRounded } from "@mui/icons-material";

async function dataItemFetch() {
  const key = "adad01d209954268b9d9ea27cfea0bb5";
  const url = `https://api.rawg.io/api/games?key=${key}`;
  // const url2 = "https://jsonplaceholder.typicode.com/posts";

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // "Access-Control-Allow-Origin": "*",
    },
  })
    .then((resp) => resp.json())
    .then((data) => data.results)
    .then((results) => {
      return results;
    })
    .catch((rej) => {
      console.log("не пришло с сервера");
      return [];
    });

  return res;
}

async function dataItemDescriptionFetch(id) {
  const key = "adad01d209954268b9d9ea27cfea0bb5";
  const url = `https://api.rawg.io/api/games/${id}?key=${key}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resp) => resp.json())
    .then((data) => {
      return data;
    })
    .catch((rej) => {
      return [];
    });
  return res;
}

export { dataItemFetch, dataItemDescriptionFetch };
