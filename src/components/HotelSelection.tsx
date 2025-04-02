
import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { fetchRealtimeHotelData } from "@/data/travelData";

export interface HotelData {
  hotelOption: string;
}

interface HotelSelectionProps {
  onSubmit: (data: HotelData) => void;
  initialData?: Partial<HotelData>;
  destination?: string;
  area?: string;
}

const HotelSelection: React.FC<HotelSelectionProps> = ({
  onSubmit,
  initialData,
  destination = "Dubai",
  area
}) => {
  const [hotels, setHotels] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadHotelData = async () => {
      setIsLoading(true);
      try {
        // Simulate API delay
        setTimeout(() => {
          const hotelData = fetchRealtimeHotelData(destination, area);
          setHotels(hotelData);
          setIsLoading(false);
          
          // Set default hotel option if available
          if (hotelData.length > 0 && !initialData?.hotelOption) {
            setValue("hotelOption", hotelData[0].id);
          }
        }, 1000);
      } catch (error) {
        console.error("Error fetching hotel data:", error);
        toast({
          title: "Error",
          description: "Failed to fetch hotel data. Please try again.",
          variant: "destructive",
        });
        setIsLoading(false);
      }
    };
    
    loadHotelData();
  }, [destination, area]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<HotelData>({
    defaultValues: {
      hotelOption: initialData?.hotelOption || ""
    }
  });
  
  const onSubmitForm = (data: HotelData) => {
    const selectedHotel = hotels.find(hotel => hotel.id === data.hotelOption);
    toast({
      title: "Hotel Selected",
      description: `You've selected ${selectedHotel?.name} for 3 nights`
    });
    onSubmit(data);
  };
  
  // Get appropriate default booking details based on destination
  const getBookingDetails = () => {
    switch(destination.toLowerCase()) {
      case "thailand":
        return {
          location: area || "Phuket",
          guests: 6,
          rooms: 3,
          nights: 3
        };
      case "vietnam":
        return {
          location: area || "Phu Quoc",
          guests: 6,
          rooms: 3,
          nights: 3
        };
      default: // Dubai
        return {
          location: area || "Dubai Marina",
          guests: 6,
          rooms: 3,
          nights: 3
        };
    }
  };
  
  const bookingDetails = getBookingDetails();
  
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Select Hotel for {destination}
      </h2>
      <p className="text-center mb-6 text-gray-600">
        Real-time hotel options with best available rates for your stay
      </p>

      <Card className="mb-6">
        <CardContent className="pt-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <p className="ml-4 text-primary">Fetching hotel data for {destination}...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <h3 className="font-medium text-blue-700">Booking Details</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 text-sm">
                    <div>
                      <p className="text-gray-500">Location</p>
                      <p className="font-medium">{bookingDetails.location}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Guests</p>
                      <p className="font-medium">{bookingDetails.guests} Adults</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Rooms</p>
                      <p className="font-medium">{bookingDetails.rooms} Rooms</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Duration</p>
                      <p className="font-medium">{bookingDetails.nights} Nights</p>
                    </div>
                  </div>
                </div>
              
                <Label>Available Hotels in {destination} ({hotels.length} options)</Label>
                {hotels.length > 0 ? (
                  <Controller 
                    control={control} 
                    name="hotelOption" 
                    rules={{
                      required: "Please select a hotel option"
                    }} 
                    render={({ field }) => (
                      <RadioGroup 
                        value={field.value} 
                        onValueChange={field.onChange} 
                        className="space-y-4"
                      >
                        {hotels.map(hotel => (
                          <div 
                            key={hotel.id} 
                            className={cn(
                              "rounded-lg border p-4", 
                              field.value === hotel.id ? "border-primary bg-primary/5" : "border-border"
                            )}
                          >
                            <div className="flex items-start">
                              <RadioGroupItem value={hotel.id} id={hotel.id} className="mt-1" />
                              <Label htmlFor={hotel.id} className="flex-1 cursor-pointer ml-2">
                                <div className="space-y-1">
                                  <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-lg">{hotel.name}</h3>
                                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                                      {hotel.rating} ★
                                    </div>
                                  </div>
                                  
                                  <p className="text-sm text-gray-600">{hotel.area} • {hotel.distance}</p>
                                  
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {hotel.amenities.map((amenity: string, index: number) => (
                                      <span key={index} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">
                                        {amenity}
                                      </span>
                                    ))}
                                  </div>
                                  
                                  <Separator className="my-3" />
                                  
                                  <div className="flex justify-between items-center">
                                    <div>
                                      <p className="text-sm text-gray-600">Total for {bookingDetails.nights} nights</p>
                                      <p className="font-semibold text-primary">{hotel.totalFor3Nights}</p>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-sm text-gray-600">Per person</p>
                                      <p className="font-semibold text-primary">{hotel.costPerPersonLargeGroup}</p>
                                    </div>
                                  </div>
                                </div>
                              </Label>
                            </div>
                          </div>
                        ))}
                      </RadioGroup>
                    )} 
                  />
                ) : (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">No hotels available for the selected criteria.</p>
                  </div>
                )}
                {errors.hotelOption && (
                  <p className="text-sm text-red-500">
                    {errors.hotelOption.message}
                  </p>
                )}
              </div>

              <div className="flex justify-center mt-6">
                <Button type="submit" className="px-6" disabled={hotels.length === 0}>
                  Confirm Hotel & Continue
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
      
      <div className="text-center text-sm text-gray-500 mt-4">
        Note: Prices shown are for {bookingDetails.guests} travelers in {bookingDetails.rooms} rooms for {bookingDetails.nights} nights.
      </div>
    </div>
  );
};

export default HotelSelection;
