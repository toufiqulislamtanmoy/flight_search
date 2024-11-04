import ComboBox from "@/components/custom/ComboBox";
import { DatePickerDemo } from "@/components/custom/DatePickerDemo";
import { DialogDemo } from "@/components/custom/DialogDemo";
import SelectDropDown from "@/components/custom/SelectDropDown";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { fetchAirports, FlightStore } from "@/store/store";
import { baggageOption, bookingClassOptions, flightTypeOptions, tripTypeOptions } from "@/utilits/selectDropDownOptions";
import { useEffect, useState } from "react";
import { FaHouseMedical, FaUserLarge } from "react-icons/fa6";
import flightData from "../data/flight_search_result.json"
import FlightCard from "@/components/custom/Cards/FlightCard";
import { Link } from "react-router-dom";

const FlightSearch = () => {
  const [flightDatas, setFlightData] = useState(flightData);
  console.log(flightDatas?.data[0]?.flight_group)
  useEffect(() => {
    fetchAirports();
  }, []);
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
    const searchData = {
      journey_type: tripType,
      segment: [
        {
          departure_airport_type: from?.airport_name,
          departure_airport_city: from?.city_name,
          arrival_airport_type: to?.airport_name,
          arrival_airport_city: to?.city_name,
          departure_date: date,
          return_date: returnDate,
        },
      ],
      travelers_adult: traveler_details?.adults,
      travelers_child: traveler_details?.children,
      travelers_infant: traveler_details?.infants,
      preferred_carrier: [],
      non_stop_flight: flightType,
      baggage_option: baggage_option,
      booking_class: booking_class,
      supplier_uid: "all",
      partner_id: "",
      language: "en",
      short_ref: "12121212121",
    };
    console.log(searchData);
  };

  return (
    <main className="container mx-auto font-poppins px-4">
      {/* search form */}
      <section className="lg:sticky lg:top-0 static bg-gradient-to-r from-red-50 to-gray-200/50 p-4 shadow-lg rounded-md">
        {/* trip type, flight type, booking class, baggage option, traveler details section*/}
        <div className="flex flex-col lg:flex-row justify-between items-center">
          {/* retrun home icon with button */}
          <div className="flex items-center gap-2">
            <Link to="/">
              <FaHouseMedical className=" bg-gradient-to-r from-red-50 to-gray-200/50 " size={20}/>
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
        <div className={`mt-10 mb-5 grid grid-cols-1 ${tripType == "RoundTrip" ? "lg:grid-cols-5" : "lg:grid-cols-4"} gap-4`}>
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

          <DatePickerDemo defaultValue={date} placeholder="Departure Date" storeKey="date" />
          {tripType == "RoundTrip" && (
            <DatePickerDemo defaultValue={returnDate} placeholder="Return Date" storeKey="returnDate" />
          )}

          <Button
             className="rounded-full bg-pink-500/50 text-white hover:text-black transition-all duration-300 hover:bg-yellow-500/50"
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>
      </section>

      {/* flight card section */}
      <section className="my-10 grid grid-cols-1 gap-10">
        {
            flightDatas?.data?.slice(0,10)?.map((flight,index)=>{
                return(
                    <FlightCard key={index} flightData={flight} />
                )
            })
        }
      </section>
    </main>
  );
};

export default FlightSearch;
