import ComboBox from "./components/custom/ComboBox";
import video from "./assets/bg_video.mp4";
import { useEffect } from "react";
import { fetchAirports, FlightStore } from "./store/store";
import SelectDropDown from "./components/custom/SelectDropDown";
import { DatePickerDemo } from "./components/custom/DatePickerDemo";
import { Button } from "./components/ui/button";
import { Dialog, DialogTrigger } from "./components/ui/dialog";
import { DialogDemo } from "./components/custom/DialogDemo";
import { FaUserLarge } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { baggageOption, bookingClassOptions, flightTypeOptions, tripTypeOptions } from "./utilits/selectDropDownOptions";


const App = () => {
  const navigate = useNavigate();
  const { from, to, date, returnDate, tripType, flightType, booking_class, baggage_option, traveler_details } =
    FlightStore.useState((s) => ({
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


  useEffect(() => {
    fetchAirports();
  }, []);

  const handleSearch = () => {
    const searchData = {
      journey_type: tripType,
      segment: [
        {
          departure_airport_type: from?.airport_name,
          departure_airport_code: from?.city_name,
          arrival_airport_type: to?.airport_name,
          arrival_airport_code: to?.city_name,
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
    navigate("/flight/search");
  };

  return (
    <div className="relative w-full h-screen">
      <video
        src={video}
        autoPlay
        loop
        muted
        autoFocus
        className="w-full h-full object-cover"
      ></video>
      {/* overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* flight filter section  with glass background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:w-2/3 w-[90%] p-4 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-30 border border-gray-100">
        {/* title of the section */}
        <h3 className="text-2xl text-center my-4 text-white">
          Find Your Dream Flight
        </h3>
        {/* round up or one way dropdown section */}
        <div className="my-4 lg:flex lg:flex-wrap lg:justify-start grid grid-cols-2 gap-4 ">
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[130px]"
                >
                  <FaUserLarge  />
                </Button>
              </DialogTrigger>
              <DialogDemo />
            </Dialog>
          </div>
          <div>
            <SelectDropDown storeKey="tripType" options={tripTypeOptions} placeholder="Select Trip Type" classNames="w-[130px]" />
          </div>
          <div>
            <SelectDropDown storeKey="flightType" options={flightTypeOptions} placeholder="Select Flight Type" classNames="w-[130px]" />
          </div>
          <div>
            <SelectDropDown storeKey="booking_class" options={bookingClassOptions} placeholder="Select Booking Class" classNames="w-[130px]" />
          </div>
          <div>
            <SelectDropDown storeKey="baggage_option" options={baggageOption} placeholder="Select Baggage Option" classNames="w-[130px]" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-4">
          <DatePickerDemo placeholder="Departure Date" storeKey="date" />
          {tripType == "RoundTrip" && (
            <DatePickerDemo placeholder="Return Date" storeKey="returnDate" />
          )}
        </div>

        <div className="flex justify-center">
          <Button
            onClick={handleSearch}
           className="rounded-full bg-pink-500/50 text-white hover:text-black transition-all duration-300 hover:bg-yellow-500/50"
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default App;
