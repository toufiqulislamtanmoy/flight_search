import { Store } from "pullstate";

export const FlightStore = new Store({
  airports: [],
  from: { city_name: "", airport_name: "", search_contents: "" },
  to: { city_name: "", airport_name: "", search_contents: "" },
  date: "",
  returnDate: "",
  airportsLoading: true,
  tripType: "OneWay",
  flightType: "any",
  booking_class: "any",
  baggage_option: "any",
  traveler_details: {
    adults: 0,
    children: 0,
    infants: 0,
  },
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

