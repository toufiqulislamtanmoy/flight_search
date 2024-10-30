import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { FlightStore } from "@/store/store";

export default function ComboBox({ placeholder, searchPlaceholder, storeKey }) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const state = FlightStore.useState((s) => s[storeKey]);
  const airportsData = FlightStore.useState((s) => s.airports);
  const isLoading = FlightStore.useState((s) => s.airportsLoading);

  // Filter airports based on search input
  const filteredAirports = airportsData
    ?.filter((airport) =>
      airport?.search_contents
        ?.toLowerCase()
        ?.includes(searchValue?.toLowerCase())
    )
    ?.slice(0, 3);

  const handleSelect = (airport) => {
    // Update the selected value in the global store
    FlightStore.update((s) => {
      s[storeKey] = {
        city_name: airport.city_name,
        airport_name: airport.airport_name,
        search_contents: airport.search_contents,
      };
    });
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {state?.city_name ? `${state.city_name} (${state.airport_name})` : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput
            placeholder={searchPlaceholder}
            className="h-9"
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandList>
            {isLoading ? (
              <div className="flex justify-center items-center h-full">
                <div className="border-gray-300 h-7 w-7 animate-spin rounded-full border-8 border-t-blue-600" />
              </div>
            ) : filteredAirports.length === 0 ? (
              <CommandEmpty>No airports found.</CommandEmpty>
            ) : (
              <CommandGroup>
                {filteredAirports?.map((airport, index) => (
                  <CommandItem
                    key={index}
                    value={airport.search_contents}
                    onSelect={() => handleSelect(airport)} // Pass the whole airport object
                  >
                    {airport?.search_contents}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
