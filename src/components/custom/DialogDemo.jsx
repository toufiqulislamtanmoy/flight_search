import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FlightStore } from "@/store/store";

export function DialogDemo() {
  // Access the current traveler_details from the store
  const { adults, children, infants } = FlightStore.useState((s) => s.traveler_details);


  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Traveler Details</DialogTitle>
        <DialogDescription>Enter the traveler details here.</DialogDescription>
      </DialogHeader>
      
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="adults" className="text-right">Adults</Label>
            <Input
              id="adults"
              name="adults"
              type="number"
              value={adults || ""}
              onChange={(e) =>
                FlightStore.update((s) => {
                  s.traveler_details.adults = e.target.value;
                })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="children" className="text-right">Children</Label>
            <Input
              id="children"
              name="children"
              type="number"
              value={children || ""}
              onChange={(e) =>
                FlightStore.update((s) => {
                  s.traveler_details.children = e.target.value;
                })
              }
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="infants" className="text-right">Infants</Label>
            <Input
              id="infants"
              name="infants"
              type="number"
              value={infants || ""}
              onChange={(e) =>
                FlightStore.update((s) => {
                  s.traveler_details.infants = e.target.value;
                })
              }
              className="col-span-3"
            />
        </div>
      </div>
    </DialogContent>
  );
}
