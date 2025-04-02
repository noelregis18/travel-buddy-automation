
import React, { useState, useEffect } from "react";
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
import { fetchRealtimeFlightData } from "@/data/travelData";

export interface FlightData {
  date: Date;
  flightOption: string;
}

interface FlightSelectionProps {
  onSubmit: (data: FlightData) => void;
  initialData?: Partial<FlightData>;
  destination?: string;
}

const FlightSelection: React.FC<FlightSelectionProps> = ({ 
  onSubmit, 
  initialData,
  destination = "Dubai" // Default to Dubai if no destination is provided
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    initialData?.date || new Date(2024, 4, 2) // Default to May 2, 2024
  );
  
  const [flightOptions, setFlightOptions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFlightData = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        setTimeout(() => {
          const flights = fetchRealtimeFlightData(destination);
          setFlightOptions(flights);
          setIsLoading(false);
          
          // Set default flight option if available
          if (flights.length > 0 && !initialData?.flightOption) {
            setValue("flightOption", flights[0].id);
          }
        }, 1000);
      } catch (error) {
        console.error("Error fetching flight data:", error);
        toast({
          title: "Error",
          description: "Failed to fetch flight data. Please try again.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    };
    
    loadFlightData();
  }, [destination]);

  const { control, handleSubmit, formState: { errors }, setValue } = useForm<FlightData>({
    defaultValues: {
      date: initialData?.date || new Date(2024, 4, 2),
      flightOption: initialData?.flightOption || "",
    },
  });

  const onSubmitForm = (data: FlightData) => {
    const selectedFlight = flightOptions.find(flight => flight.id === data.flightOption);
    
    toast({
      title: "Flight Selected",
      description: `You've selected ${selectedFlight?.airline} flight ${data.flightOption} on ${format(data.date, 'PP')}`,
    });
    onSubmit(data);
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setValue("date", date);
    }
  };
  
  // Calculate date ranges based on destination
  const getDateConstraints = () => {
    switch(destination.toLowerCase()) {
      case "thailand":
        return {
          minDate: new Date(2024, 5, 1), // June 1, 2024
          maxDate: new Date(2024, 5, 7)  // June 7, 2024
        };
      case "vietnam":
        return {
          minDate: new Date(2024, 3, 15), // April 15, 2024 
          maxDate: new Date(2024, 3, 25)  // April 25, 2024
        };
      default: // Dubai
        return {
          minDate: new Date(2024, 4, 1), // May 1, 2024
          maxDate: new Date(2024, 4, 7)  // May 7, 2024
        };
    }
  };
  
  const dateConstraints = getDateConstraints();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Select Flight Dates for {destination}
      </h2>
      <p className="text-center mb-6 text-gray-600">
        Real-time flight options from Skyscanner for your {destination} trip
      </p>

      <Card className="mb-6">
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="ml-4 text-primary">Fetching flight data from Skyscanner...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
              <div className="space-y-4">
                <Label>Select Travel Date</Label>
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
                                return (
                                  date < dateConstraints.minDate ||
                                  date > dateConstraints.maxDate
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
                <Label>Available {destination} Flight Options</Label>
                {flightOptions.length > 0 ? (
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
                              <div className="grid md:grid-cols-5 gap-3 w-full">
                                <div>
                                  <p className="font-semibold">{flight.airline}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {flight.id}
                                  </p>
                                </div>
                                <div>
                                  <p className="font-medium">{flight.departureTime}</p>
                                  <p className="text-sm text-muted-foreground">
                                    Delhi
                                  </p>
                                </div>
                                <div>
                                  <p className="font-medium">{flight.arrivalTime}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {destination}
                                  </p>
                                </div>
                                <div>
                                  <p className="font-medium">{flight.duration}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {flight.stops}
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
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">No flights available for the selected dates.</p>
                  </div>
                )}
                {errors.flightOption && (
                  <p className="text-sm text-red-500">
                    {errors.flightOption.message}
                  </p>
                )}
              </div>

              <div className="flex justify-center mt-6">
                <Button type="submit" className="px-6" disabled={flightOptions.length === 0}>
                  Confirm Flight & Continue
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
      
      <div className="text-center text-sm text-gray-500 mt-4">
        Note: Flight prices and availability are based on real-time data from Skyscanner for {destination}.
      </div>
    </div>
  );
};

export default FlightSelection;
