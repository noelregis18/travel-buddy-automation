
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";

export interface HotelData {
  hotelOption: string;
}

interface HotelSelectionProps {
  onSubmit: (data: HotelData) => void;
  initialData?: Partial<HotelData>;
}

// Sample hotel options near Marina (for demo)
const hotelOptions = [
  {
    id: "MARINA-1",
    name: "Marina Bay Hotel",
    location: "Dubai Marina",
    rating: "4.5",
    price: "AED 850",
    total: "AED 7,650",
    amenities: ["Breakfast Included", "Free WiFi", "Pool", "Gym"],
    distance: "0.2 km from Marina"
  },
  {
    id: "MARINA-2",
    name: "Dubai Marina Suites",
    location: "Dubai Marina Walk",
    rating: "4.8",
    price: "AED 1,200",
    total: "AED 10,800",
    amenities: ["Breakfast Included", "Free WiFi", "Spa", "Beach Access"],
    distance: "0.5 km from Marina"
  },
  {
    id: "MARINA-3",
    name: "Marina View Apartments",
    location: "Marina Promenade",
    rating: "4.2",
    price: "AED 720",
    total: "AED 6,480",
    amenities: ["Breakfast Included", "Free WiFi", "Kitchen", "Balcony"],
    distance: "0.8 km from Marina"
  }
];

const HotelSelection: React.FC<HotelSelectionProps> = ({ onSubmit, initialData }) => {
  const { control, handleSubmit, formState: { errors } } = useForm<HotelData>({
    defaultValues: {
      hotelOption: initialData?.hotelOption || "MARINA-2",
    },
  });

  const onSubmitForm = (data: HotelData) => {
    const selectedHotel = hotelOptions.find(hotel => hotel.id === data.hotelOption);
    toast({
      title: "Hotel Selected",
      description: `You've selected ${selectedHotel?.name} for 3 nights`,
    });
    onSubmit(data);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Select Hotel and Rates
      </h2>
      <p className="text-center mb-6 text-gray-600">
        Filter for hotels near Marina with Bed & Breakfast options for 6 adults in 3 rooms
      </p>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <h3 className="font-medium text-blue-700">Booking Details</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2 text-sm">
                  <div>
                    <p className="text-gray-500">Location</p>
                    <p className="font-medium">Dubai Marina</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Guests</p>
                    <p className="font-medium">6 Adults</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Rooms</p>
                    <p className="font-medium">3 Rooms</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Duration</p>
                    <p className="font-medium">3 Nights</p>
                  </div>
                </div>
              </div>
            
              <Label>Available Hotel Options (with Breakfast Included)</Label>
              <Controller
                control={control}
                name="hotelOption"
                rules={{ required: "Please select a hotel option" }}
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="space-y-4"
                  >
                    {hotelOptions.map((hotel) => (
                      <div
                        key={hotel.id}
                        className={cn(
                          "rounded-lg border p-4",
                          field.value === hotel.id
                            ? "border-primary bg-primary/5"
                            : "border-border"
                        )}
                      >
                        <div className="flex items-start">
                          <RadioGroupItem value={hotel.id} id={hotel.id} className="mt-1" />
                          <Label
                            htmlFor={hotel.id}
                            className="flex-1 cursor-pointer ml-2"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-lg">{hotel.name}</h3>
                                <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                                  {hotel.rating} ★
                                </div>
                              </div>
                              
                              <p className="text-sm text-gray-600">{hotel.location} • {hotel.distance}</p>
                              
                              <div className="flex flex-wrap gap-2 mt-2">
                                {hotel.amenities.map((amenity, index) => (
                                  <span 
                                    key={index} 
                                    className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full"
                                  >
                                    {amenity}
                                  </span>
                                ))}
                              </div>
                              
                              <Separator className="my-3" />
                              
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="text-sm text-gray-600">Per night, per room</p>
                                  <p className="font-semibold text-primary">{hotel.price}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-sm text-gray-600">Total for 3 nights (3 rooms)</p>
                                  <p className="font-bold text-lg text-primary">{hotel.total}</p>
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
              {errors.hotelOption && (
                <p className="text-sm text-red-500">
                  {errors.hotelOption.message}
                </p>
              )}
            </div>

            <div className="flex justify-center mt-6">
              <Button type="submit" className="px-6">
                Confirm Hotel & Continue
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <div className="text-center text-sm text-gray-500 mt-4">
        Note: All hotel options include Bed & Breakfast for all guests as requested.
      </div>
    </div>
  );
};

export default HotelSelection;
