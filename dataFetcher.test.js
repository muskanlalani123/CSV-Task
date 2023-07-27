const axios = require("axios");
const { fetchDataFromAPI, createCSV } = require("./dataFetcher");

jest.mock("axios");

describe("fetchDataFromAPI", () => {
  test("should return data from API", async () => {
    const mockData = [
      { id: 1, title: "Post 1", body: "This is post 1" },
      { id: 2, title: "Post 2", body: "This is post 2" },
    ];

    axios.get.mockResolvedValueOnce({ data: mockData });

    const data = await fetchDataFromAPI();

    expect(data).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/posts"
    );
  });

  test("should return an API error", async () => {
    const errorMessage = "404 API Error";
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    const data = await fetchDataFromAPI();
    expect(data).toEqual({});

    createCSV();
  });
});

describe("createCSV", () => {
  test("should create a CSV file with data", () => {
    const data = [
      { id: 1, title: "Post 1", body: "This is post 1" },
      { id: 2, title: "Post 2", body: "This is post 2" },
    ];

    createCSV(data);
  });
});
