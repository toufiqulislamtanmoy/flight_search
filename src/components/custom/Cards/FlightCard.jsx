import { Button } from "@/components/ui/button";
import { format } from "date-fns";

const FlightCard = ({ flightData }) => {
  console.log(flightData, "flightData");
  return (
    <div className="bg-gradient-to-r from-red-50 to-gray-200/50 p-4 shadow-lg rounded-md">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* leaving from */}
        <div>
          <p className="text-start text-sm font-thin text-gray-500">
            Leaving from
          </p>
          <div className="text-center">
            {/* time */}
            <h5 className="text-2xl font-semibold text-gray-700">
              {flightData?.flight_group[0]?.routes[0]?.departure_time &&
                format(
                  new Date(flightData.flight_group[0].routes[0].departure_time),
                  "HH:mm"
                )}
            </h5>

            {/* date */}
            <p className="text-xxs text-gray-500">
              {flightData?.flight_group[0]?.routes[0]?.flight_date &&
                format(
                  new Date(flightData.flight_group[0].routes[0].flight_date),
                  "EEE, dd MMM yyyy"
                )}
            </p>
            {/* city */}
            <h5 className="text-xl font-semibold text-gray-700">
              {flightData?.flight_group[0]?.routes[0]?.origin_airport?.city}
            </h5>
            {/* airport name */}
            <p className="text-xs text-gray-500">
              {flightData?.flight_group[0]?.routes[0]?.origin_airport?.name}
            </p>
          </div>
        </div>
        {/* flight duration */}
        <div className="flex flex-col items-center h-full justify-center">
          <p className="text-sm">Flight duration</p>
          <div className="h-[1px] w-2/5 mx-auto my-2 bg-gray-300"></div>
          <div className="flex gap-1">
            <p>
              { flightData?.flight_group[0]?.routes[
                flightData?.flight_group[0]?.routes?.length - 1
              ]?.lay_over === "not-applicable" ? "Non Stop" :
              flightData?.flight_group[0]?.routes[
                flightData?.flight_group[0]?.routes?.length - 1
              ]?.lay_over?.slice(2)}
            </p>
            -
            <p>
              {" "}
              {
                flightData?.flight_group[0]?.routes[
                  flightData?.flight_group[0]?.routes?.length - 1
                ]?.distance
              }{" "}
              Km
            </p>
          </div>
        </div>
        {/* arriving to */}
        <div>
          <p className="text-end text-sm font-thin text-gray-500">
            Arriving to
          </p>
          <div className="text-center">
            {/* time */}
            <h5 className="text-2xl font-semibold text-gray-700">
              {flightData?.flight_group[0]?.routes[
                flightData?.flight_group[0]?.routes?.length - 1
              ]?.arrival_time &&
                format(
                  new Date(
                    flightData.flight_group[0].routes[
                      flightData?.flight_group[0]?.routes?.length - 1
                    ].arrival_time
                  ),
                  "HH:mm"
                )}
            </h5>
            {/* date */}
            {flightData?.flight_group[0]?.routes[
              flightData?.flight_group[0]?.routes?.length - 1
            ]?.flight_date && (
              <p className="text-xxs text-gray-500">
                {format(
                  new Date(
                    flightData?.flight_group[0]?.routes[
                      flightData?.flight_group[0]?.routes?.length - 1
                    ]?.flight_date
                  ),
                  "EEE, dd MMM yyyy"
                )}
              </p>
            )}
            {/* city */}
            <h5 className="text-xl font-semibold text-gray-700">
              {
                flightData?.flight_group[0]?.routes[
                  flightData?.flight_group[0]?.routes?.length - 1
                ]?.destination_airport?.city
              }
            </h5>
            {/* airport name */}
            <p className="text-xs text-gray-500">
              {
                flightData?.flight_group[0]?.routes[
                  flightData?.flight_group[0]?.routes?.length - 1
                ]?.destination_airport?.name
              }
            </p>
          </div>
        </div>
        {/* flight price */}
        <div className="flex flex-row lg:flex-col lg:items-end items-center h-full lg:justify-center justify-between">
          {/*price */}
          <p className="text-xl font-semibold text-gray-700 my-2">
            {flightData?.price?.total + " " + flightData?.price?.currency}
          </p>
          {/* details button */}
          <Button
            variant="outline"
            className="rounded-full bg-pink-500/50 text-white transition-all duration-300 hover:bg-yellow-500/50"
          >
            Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
