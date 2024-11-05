import { format } from "date-fns";
export function filterFlights(flights, searchParams) {
    // journey type filter
    let filteredFlights = flights.filter((flight) => {
      return flight.journey_type === searchParams?.journey_type;
    });
    // how many stop filter
    if (searchParams?.non_stop_flight !== "any") {
      filteredFlights = filteredFlights?.filter((flight) => {
        return (
          flight?.flight_group?.[0].no_of_stops ===
          parseInt(searchParams?.non_stop_flight)
        );
      });
    }
    // booking class filter
    if (searchParams?.booking_class !== "any") {
      filteredFlights = filteredFlights?.filter((flight) => {
        const val =
          flight?.flight_group?.[0]?.routes?.[0]?.booking_class?.cabin_class
            .toLowerCase()
            .includes(searchParams.booking_class.toLowerCase());
        return val;
      });
    }
    // leaving form filter
    filteredFlights = filteredFlights?.filter((flight) => {
      let leaving_place =
        flight?.flight_group?.[0]?.routes?.[0]?.origin_airport?.name
          ?.toLowerCase()
          .includes(searchParams?.leaving_airport?.toLowerCase());
      let destination_place = flight?.flight_group?.[0]?.routes?.[
        flight.flight_group[0].routes.length - 1
      ]?.destination_airport?.name
        ?.toLowerCase()
        .includes(searchParams?.destination_airport?.toLowerCase());
      return leaving_place && destination_place;
    });
    // departure date filter and if the trip type is round trip then filter also return date
    if (searchParams?.departure_date) {
      filteredFlights = filteredFlights?.filter((flight) => {
        let data = flight?.calendar_flight_date;
        let formattedDate = format(searchParams?.departure_date, "yyyy-MM-dd");
        return data === formattedDate;
      });
    }
    if (searchParams?.tripType === "RoundTrip" && searchParams?.return_date) {
      filteredFlights = filteredFlights?.filter((flight) => {
        let data = flight?.calendar_flight_date;
        let formattedDate = format(searchParams?.return_date, "yyyy-MM-dd");
        return data === formattedDate;
      });
    }
    return filteredFlights;
  }