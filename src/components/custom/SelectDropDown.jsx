import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FlightStore } from "@/store/store";

const SelectDropDown = ({ storeKey, options,placeholder }) => {
  const handleChange = (value) => {
    FlightStore.update((s) => {
      s[storeKey] = value;
    });
  };
  return (
    <>
      <Select onValueChange={(value) => handleChange(value)}>
        <SelectTrigger className="w-[130px]">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options?.map((option, index) => (
              <SelectItem key={index} value={option?.value}>
                {option?.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};

export default SelectDropDown;
