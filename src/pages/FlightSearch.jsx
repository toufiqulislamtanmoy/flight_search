import ComboBox from "@/components/custom/ComboBox";
import { DatePickerDemo } from "@/components/custom/DatePickerDemo";
import { DialogDemo } from "@/components/custom/DialogDemo";
import SelectDropDown from "@/components/custom/SelectDropDown";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { fetchAirports, FlightStore } from "@/store/store";
import {
  baggageOption,
  bookingClassOptions,
  flightTypeOptions,
  tripTypeOptions,
} from "@/utilits/selectDropDownOptions";
import { useEffect, useState } from "react";
import { FaHouseMedical, FaUserLarge } from "react-icons/fa6";
import flightData from "../data/flight_search_result.json";
import FlightCard from "@/components/custom/Cards/FlightCard";
import { Link, useLocation } from "react-router-dom";

import ListSkeleton from "@/components/custom/Skeleton/ListSkeleton";
import notFound from "../assets/not_found.png";
import { filterFlights } from "../utilits/flightSearch";
import Swal from "sweetalert2";

const FlightSearch = () => {
  const [visibleCount, setVisibleCount] = useState(10);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  let searchData = location.state;
  console.log(loading);
  const [flightDatas, setFlightData] = useState([]);

  // show more and show less functionllity
  const handleViewMore = () => {
    if (visibleCount >= flightDatas?.data?.length) {
      setVisibleCount(10);
    } else {
      setVisibleCount(visibleCount + 10);
    }
  };

  useEffect(() => {
    fetchAirports();
    const filteredFlights = filterFlights(flightData.data, searchData);
    setFlightData({ data: filteredFlights });
    setLoading(false);
  }, [searchData]);

  const {
    from,
    to,
    date,
    returnDate,
    tripType,
    flightType,
    booking_class,
    baggage_option,
    traveler_details,
  } = FlightStore.useState((s) => ({
    from: s.from,
    to: s.to,
    date: s.date,
    returnDate: s.returnDate,
    tripType: s.tripType,
    flightType: s.flightType,
    booking_class: s.booking_class,
    baggage_option: s.baggage_option,
    traveler_details: s.traveler_details,
  }));

  const handleSearch = () => {
    setLoading(true);
    const searchData = {
      journey_type: tripType,
      leaving_airport: from?.airport_name,
      destination_airport: to?.airport_name,
      departure_date: date,
      return_date: returnDate,
      travelers_adult: traveler_details?.adults,
      travelers_child: traveler_details?.children,
      travelers_infant: traveler_details?.infants,
      non_stop_flight: flightType,
      baggage_option: baggage_option,
      booking_class: booking_class,
    };
    if (searchData?.leaving_airport === searchData?.destination_airport) {
      Swal.fire({
        title: "Departure and Destination are same",
        icon: "info",
        html: `
          You must select <b>Departure</b>, and <b>Destination</b> as different airports.
        `,
        showCloseButton: true
      });
      setLoading(false);
      return;
    }
    const filteredFlights = filterFlights(flightData.data, searchData);
    setFlightData({ data: filteredFlights });
    setLoading(false);
  };

  // function filterFlights(flights, searchParams) {
  //   // journey type filter
  //   let filteredFlights = flights.filter((flight) => {
  //     return flight.journey_type === searchParams?.journey_type;
  //   });
  //   // how many stop filter
  //   if (searchParams?.non_stop_flight !== "any") {
  //     filteredFlights = filteredFlights?.filter((flight) => {
  //       return (
  //         flight?.flight_group?.[0].no_of_stops ===
  //         parseInt(searchParams?.non_stop_flight)
  //       );
  //     });
  //   }
  //   // booking class filter
  //   if (searchParams?.booking_class !== "any") {
  //     filteredFlights = filteredFlights?.filter((flight) => {
  //       const val =
  //         flight?.flight_group?.[0]?.routes?.[0]?.booking_class?.cabin_class
  //           .toLowerCase()
  //           .includes(searchParams.booking_class.toLowerCase());
  //       return val;
  //     });
  //   }
  //   // leaving form filter
  //   filteredFlights = filteredFlights?.filter((flight) => {
  //     let leaving_place =
  //       flight?.flight_group?.[0]?.routes?.[0]?.origin_airport?.name
  //         ?.toLowerCase()
  //         .includes(searchParams?.leaving_airport?.toLowerCase());
  //     let destination_place = flight?.flight_group?.[0]?.routes?.[
  //       flight.flight_group[0].routes.length - 1
  //     ]?.destination_airport?.name
  //       ?.toLowerCase()
  //       .includes(searchParams?.destination_airport?.toLowerCase());
  //     return leaving_place && destination_place;
  //   });
  //   // departure date filter and if the trip type is round trip then filter also return date
  //   if (searchParams?.departure_date) {
  //     filteredFlights = filteredFlights?.filter((flight) => {
  //       let data = flight?.calendar_flight_date;
  //       let formattedDate = format(searchParams?.departure_date, "yyyy-MM-dd");
  //       return data === formattedDate;
  //     });
  //   }
  //   if (searchParams?.tripType === "RoundTrip" && searchParams?.return_date) {
  //     filteredFlights = filteredFlights?.filter((flight) => {
  //       let data = flight?.calendar_flight_date;
  //       let formattedDate = format(searchParams?.return_date, "yyyy-MM-dd");
  //       return data === formattedDate;
  //     });
  //   }
  //   return filteredFlights;
  // }

  return (
    <main className="container mx-auto font-poppins px-4">
      {/* search form */}
      <section className="lg:sticky lg:top-0 static bg-gradient-to-r from-red-50 to-gray-200/50 p-4 shadow-lg rounded-md">
        {/* trip type, flight type, booking class, baggage option, traveler details section*/}
        <div className="flex flex-col lg:flex-row justify-between items-center">
          {/* retrun home icon with button */}
          <div className="flex items-center gap-2">
            <Link to="/">
              <FaHouseMedical
                className=" bg-gradient-to-r from-red-50 to-gray-200/50 "
                size={20}
              />
            </Link>
          </div>
          <div className="my-4 lg:flex lg:flex-wrap lg:justify-end grid grid-cols-2 gap-4 ">
            <div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="">
                    <FaUserLarge />
                  </Button>
                </DialogTrigger>
                <DialogDemo />
              </Dialog>
            </div>
            <div>
              <SelectDropDown
                storeKey="tripType"
                options={tripTypeOptions}
                defaultValue={tripType}
                placeholder="Select Trip Type"
              />
            </div>
            <div>
              <SelectDropDown
                storeKey="flightType"
                options={flightTypeOptions}
                defaultValue={flightType}
                placeholder="Select Flight Type"
              />
            </div>
            <div>
              <SelectDropDown
                storeKey="booking_class"
                options={bookingClassOptions}
                defaultValue={booking_class}
                placeholder="Select Booking Class"
              />
            </div>
            <div>
              <SelectDropDown
                storeKey="baggage_option"
                options={baggageOption}
                defaultValue={baggage_option}
                placeholder="Select Baggage Option"
              />
            </div>
          </div>
        </div>
        {/* departure section */}
        <div
          className={`mt-10 mb-5 grid grid-cols-1 ${
            tripType == "RoundTrip" ? "lg:grid-cols-5" : "lg:grid-cols-4"
          } gap-4`}
        >
          <ComboBox
            placeholder="Select Departure"
            searchPlaceholder="Search airport"
            storeKey="from"
          />
          <ComboBox
            placeholder="Select Destination"
            searchPlaceholder="Search airport"
            storeKey="to"
          />

          <DatePickerDemo
            defaultValue={date}
            placeholder="Departure Date"
            storeKey="date"
          />
          {tripType == "RoundTrip" && (
            <DatePickerDemo
              defaultValue={returnDate}
              placeholder="Return Date"
              storeKey="returnDate"
            />
          )}

          <Button
            className="rounded-full bg-pink-500/50 text-white hover:text-black transition-all duration-300 hover:bg-yellow-500/50"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
      </section>

      <section className="my-10 grid grid-cols-1 gap-10">
        {loading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <ListSkeleton className="w-full h-[200px]" key={index} />
          ))
        ) : flightDatas?.data?.length === 0 ? (
          <div className="flex justify-center items-center h-[30vh] gap-3">
            <img
              src={notFound}
              alt="not found"
              className="w-1/12 inline-block"
            />
            <p className="text-2xl font-bold">Oops!! No flights found</p>
          </div>
        ) : (
          flightDatas?.data
            ?.slice(0, visibleCount)
            .map((flight, index) => (
              <FlightCard key={index} flightData={flight} />
            ))
        )}
      </section>

      {/* View More/See Less Button */}
      {flightDatas?.data?.length > 10 && (
        <div className="flex justify-center my-5">
          <Button
            variant="outline"
            onClick={handleViewMore}
            className="rounded-full bg-pink-500/50 text-white transition-all duration-300 hover:bg-yellow-500/50 hover:text-black"
          >
            {visibleCount >= flightDatas?.data?.length
              ? "See Less"
              : "View More"}
          </Button>
        </div>
      )}
    </main>
  );
};

export default FlightSearch;
