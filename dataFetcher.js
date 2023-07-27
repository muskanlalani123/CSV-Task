const cron = require("node-cron");
const axios = require("axios");
const fs = require("fs");
const fastcsv = require("fast-csv");

const date = Date.now();

const fetchDataFromAPI = async () => {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return response.data;
  } catch (error) {
    return {};
  }
};

const createCSV = (data) => {
  const filename =
    data && Object.keys(data).length !== 0 ? `post-${date}.csv` : "blank.csv";
  const csvStream = fastcsv.format({ headers: true });
  const writableStream = fs.createWriteStream(filename);
  csvStream.pipe(writableStream);

  if (data && Object.keys(data).length !== 0) {
    data.forEach((row) => csvStream.write(row));
  }
  csvStream.end();
};

cron.schedule("* * * * *", async () => {
  const data = await fetchDataFromAPI();
  createCSV(data);
});

module.exports = { fetchDataFromAPI, createCSV };
