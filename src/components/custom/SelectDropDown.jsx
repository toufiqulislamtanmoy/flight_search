import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FlightStore } from "@/store/store";

const SelectDropDown = ({ storeKey, options,placeholder,classNames,defaultValue }) => {
  const handleChange = (value) => {
    FlightStore.update((s) => {
      s[storeKey] = value;
    });
  };
  return (
    <>
      <Select defaultValue={defaultValue} onValueChange={(value) => handleChange(value)}>
        <SelectTrigger className={`${classNames}`}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options?.map((option, index) => (
              <SelectItem  key={index} value={option?.value}>
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
