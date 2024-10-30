import ComboBox from "./components/custom/ComboBox";
import video from "./assets/bg_video.mp4";
import { useEffect } from "react";
import { fetchAirports } from "./store/store";
const App = () => {
  useEffect(() => {
    fetchAirports();
  }, []);
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
      </div>
    </div>
  );
};

export default App;
