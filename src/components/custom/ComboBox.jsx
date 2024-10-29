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

  //getting the state from the global store
  const state = FlightStore.useState((s) => s[storeKey]);

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
            ? airports.find((framework) => framework.value === state)?.label
            : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder={searchPlaceholder} className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {airports.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={() => handleSelect(framework.value)}
                >
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
