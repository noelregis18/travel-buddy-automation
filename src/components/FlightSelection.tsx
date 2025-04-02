
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";

export interface FlightData {
  date: Date;
  flightOption: string;
}

interface FlightSelectionProps {
  onSubmit: (data: FlightData) => void;
  initialData?: Partial<FlightData>;
}

// Sample flight options for the demo
const flightOptions = [
  {
    id: "AI-123",
    airline: "Air India",
    departure: "05:30 AM",
    arrival: "08:15 AM",
    price: "₹18,500",
    date: new Date(2024, 4, 2), // May 2, 2024
  },
  {
    id: "EK-456",
    airline: "Emirates",
    departure: "11:00 AM",
    arrival: "01:30 PM",
    price: "₹21,700",
    date: new Date(2024, 4, 3), // May 3, 2024
  },
  {
    id: "IX-789",
    airline: "Air India Express",
    departure: "02:45 PM",
    arrival: "05:10 PM",
    price: "₹16,300",
    date: new Date(2024, 4, 5), // May 5, 2024
  },
];

const FlightSelection: React.FC<FlightSelectionProps> = ({ onSubmit, initialData }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    initialData?.date || new Date(2024, 4, 2) // Default to May 2, 2024
  );

  const { control, handleSubmit, formState: { errors }, setValue } = useForm<FlightData>({
    defaultValues: {
      date: initialData?.date || new Date(2024, 4, 2),
      flightOption: initialData?.flightOption || "EK-456",
    },
  });

  const onSubmitForm = (data: FlightData) => {
    toast({
      title: "Flight Selected",
      description: `You've selected flight ${data.flightOption} on ${format(data.date, 'PP')}`,
    });
    onSubmit(data);
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setValue("date", date);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Select Flight Dates
      </h2>
      <p className="text-center mb-6 text-gray-600">
        Find the best flight options for the first week of May
      </p>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
            <div className="space-y-4">
              <Label>Select Travel Date (First Week of May)</Label>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Controller
                    control={control}
                    name="date"
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              field.onChange(date);
                              handleDateChange(date);
                            }}
                            disabled={(date) => {
                              // Only allow first week of May 2024
                              return (
                                date < new Date(2024, 4, 1) ||
                                date > new Date(2024, 4, 7)
                              );
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                </div>
                
                <div className="space-y-2 flex items-center">
                  <p className="text-sm text-primary font-medium">
                    Selected Date: {selectedDate && format(selectedDate, "PPPP")}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Available Flight Options</Label>
              <Controller
                control={control}
                name="flightOption"
                rules={{ required: "Please select a flight option" }}
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="space-y-4"
                  >
                    {flightOptions.map((flight) => (
                      <div
                        key={flight.id}
                        className={cn(
                          "flex items-center space-x-2 rounded-lg border p-4",
                          field.value === flight.id
                            ? "border-primary bg-primary/5"
                            : "border-border"
                        )}
                      >
                        <RadioGroupItem value={flight.id} id={flight.id} />
                        <Label
                          htmlFor={flight.id}
                          className="flex-1 cursor-pointer"
                        >
                          <div className="grid md:grid-cols-4 gap-3 w-full">
                            <div>
                              <p className="font-semibold">{flight.airline}</p>
                              <p className="text-sm text-muted-foreground">
                                {flight.id}
                              </p>
                            </div>
                            <div>
                              <p className="font-medium">{flight.departure}</p>
                              <p className="text-sm text-muted-foreground">
                                Delhi
                              </p>
                            </div>
                            <div>
                              <p className="font-medium">{flight.arrival}</p>
                              <p className="text-sm text-muted-foreground">
                                Dubai
                              </p>
                            </div>
                            <div>
                              <p className="font-semibold text-primary">
                                {flight.price}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                per person
                              </p>
                            </div>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              />
              {errors.flightOption && (
                <p className="text-sm text-red-500">
                  {errors.flightOption.message}
                </p>
              )}
            </div>

            <div className="flex justify-center mt-6">
              <Button type="submit" className="px-6">
                Confirm Flight & Continue
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <div className="text-center text-sm text-gray-500 mt-4">
        Note: Flight prices and availability are based on real-time data from Skyscanner or Google Flights.
      </div>
    </div>
  );
};

export default FlightSelection;
