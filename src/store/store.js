import { Store } from "pullstate";

export const FlightStore = new Store({
  airports: [],
  from: "",
  to: "",
  date: "",
  returnDate: "",
  airportsLoading: true,
});

// fetching all the airports from the api
export const fetchAirports = async () => {
  try {
    // fetch data using fetch 
    const response = await fetch("https://api.innotraveltech.com/tools/airport-autosuggetion-data", {
      method: "GET",
      headers: {
        "apikey": import.meta.env.VITE_API_KEY,
        "secretecode": import.meta.env.VITE_SECRET_CODE,
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    });
    const data = await response.json();
    console.log(data);
    FlightStore.update((s) => {
      s.airports = data;
      s.airportsLoading = false;
    });
  } catch (error) {
    console.error("Error fetching airports:", error);
    FlightStore.update((s) => {
      s.airportsLoading = false;
    });
  }
};

