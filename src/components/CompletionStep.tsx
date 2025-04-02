
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { format } from "date-fns";
import { flightOptions, hotelData } from "@/data/travelData";

interface CompletionStepProps {
  onReset: () => void;
  processData: {
    lead: {
      name: string;
      source: string;
      destination: string;
      travelGroup: number;
      rooms: number;
    };
    flight: {
      date: Date;
      flightOption: string;
    };
    hotel: {
      hotelOption: string;
    };
  };
}

const CompletionStep: React.FC<CompletionStepProps> = ({ 
  onReset,
  processData
}) => {
  // Get flight details from our dataset
  const getFlightDetails = (flightCode: string) => {
    const flight = flightOptions.find(f => f.id === flightCode);
    return flight || { airline: "Unknown", price: "Unknown" };
  };
  
  // Get hotel details from our dataset
  const getHotelDetails = (hotelCode: string) => {
    const hotel = hotelData.find(h => h.id === hotelCode);
    
    if (!hotel) return { name: "Unknown", price: "Unknown", total: "Unknown" };
    
    return { 
      name: hotel.name, 
      price: hotel.board === "Breakfast" ? hotel.costPerPersonLargeGroup : hotel.costPerPersonLargeGroup, 
      total: hotel.totalFor3Nights 
    };
  };
  
  const flightDetails = getFlightDetails(processData.flight.flightOption);
  const hotelDetails = getHotelDetails(processData.hotel.hotelOption);

  return (
    <div>
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Automation Complete!
        </h2>
        <p className="text-center text-gray-600 mt-2">
          All steps have been processed successfully
        </p>
      </div>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4 border-b pb-2">Trip Summary</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Client</p>
                  <p className="font-medium">{processData.lead.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Route</p>
                  <p className="font-medium">{processData.lead.source} to {processData.lead.destination}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Group Size</p>
                  <p className="font-medium">{processData.lead.travelGroup} Adults, {processData.lead.rooms} Rooms</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Date</p>
                  <p className="font-medium">{format(processData.flight.date, 'PPP')}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4 border-b pb-2">Flight Details</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Flight Code</p>
                  <p className="font-medium">{processData.flight.flightOption}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Airline</p>
                  <p className="font-medium">{flightDetails.airline}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Date</p>
                  <p className="font-medium">{format(processData.flight.date, 'PPP')}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Price Per Person</p>
                  <p className="font-medium">{flightDetails.price}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4 border-b pb-2">Hotel Details</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Hotel</p>
                  <p className="font-medium">{hotelDetails.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Location</p>
                  <p className="font-medium">Dubai Marina</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Package</p>
                  <p className="font-medium">Bed & Breakfast</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Price (3 Nights)</p>
                  <p className="font-medium">{hotelDetails.total}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4 border-b pb-2">Email Status</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <p>Client email prepared to sameep@stayoften.com</p>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <p>Supplier email prepared to info@stayoften.com</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <Button onClick={onReset} className="px-6">
                Process New Trip Request
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="text-center text-sm text-gray-500 mt-4">
        All steps have been completed successfully. The lead has been added to the pipeline,
        flight and hotel have been selected, and emails have been prepared for both client and supplier.
      </div>
    </div>
  );
};

export default CompletionStep;
