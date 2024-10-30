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
import { CommandLoading } from "cmdk";

const airports = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

export default function ComboBox({ placeholder, searchPlaceholder, storeKey }) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  //getting the state from the global store
  const state = FlightStore.useState((s) => s[storeKey]);

  const airportsData = FlightStore.useState((s) => s.airports);
  const isLoading = FlightStore.useState((s) => s.airportsLoading);

  // Filter airports based on search input, then slice
  const filteredAirports = airportsData
    ?.filter((airport) =>
      airport?.search_contents
        ?.toLowerCase()
        ?.includes(searchValue?.toLowerCase())
    )
    ?.slice(0, 3);

  const handleSelect = (currentValue) => {
    // Update the selected value in the global store
    FlightStore.update((s) => {
      s[storeKey] = currentValue === state ? "" : currentValue;
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
          {state
            ? airportsData?.find(
                (airport) => airport?.search_contents === state
              )?.airport_name // Changed from search_contents to airport_name
            : placeholder}
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
            {isLoading || <CommandEmpty>No airports found.</CommandEmpty>}
            <CommandGroup>
              {isLoading ? (
                <div className="flex justify-center items-center h-full">
                  <div className="border-gray-300 h-7 w-7 animate-spin rounded-full border-8 border-t-blue-600" />
                </div>
              ) : (
                filteredAirports?.map((airport, index) => (
                  <CommandItem
                    key={index}
                    value={airport.search_contents}
                    onSelect={() => handleSelect(airport?.search_contents)}
                  >
                    {airport.search_contents} - {airport.airport_name}{" "}
                    {/* Updated to show both */}
                  </CommandItem>
                ))
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
