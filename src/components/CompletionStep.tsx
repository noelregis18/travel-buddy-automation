import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Mail, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { flightOptions, hotelData } from "@/data/travelData";
import { toast } from "@/components/ui/use-toast";

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
  const [isSending, setIsSending] = useState(false);
  const [emailsSent, setEmailsSent] = useState(false);

  // Get flight details from our dataset
  const getFlightDetails = (flightCode: string) => {
    const flight = flightOptions.find(f => f.id === flightCode);
    return flight || {
      airline: "Unknown",
      price: "Unknown"
    };
  };

  // Get hotel details from our dataset
  const getHotelDetails = (hotelCode: string) => {
    const hotel = hotelData.find(h => h.id === hotelCode);
    if (!hotel) return {
      name: "Unknown",
      price: "Unknown",
      total: "Unknown"
    };
    return {
      name: hotel.name,
      price: hotel.board === "Breakfast" ? hotel.costPerPersonLargeGroup : hotel.costPerPersonLargeGroup,
      total: hotel.totalFor3Nights
    };
  };

  const flightDetails = getFlightDetails(processData.flight.flightOption);
  const hotelDetails = getHotelDetails(processData.hotel.hotelOption);

  const sendEmails = async () => {
    setIsSending(true);
    
    // Build email content
    const clientEmailContent = `
Dear ${processData.lead.name},

I hope this email finds you well. I'm pleased to share the travel details for your upcoming trip to Dubai:

Departure Date: ${format(processData.flight.date, 'PPP')}
Flight: ${processData.flight.flightOption} (${processData.lead.source} to ${processData.lead.destination})

Hotel: ${hotelDetails.name}
Package: Bed & Breakfast for ${processData.lead.travelGroup} adults (${processData.lead.rooms} rooms)
Duration: 3 nights
Total Price: ${hotelDetails.total}

The hotel is conveniently located near Dubai Marina as requested. I will confirm the pricing for the go-karting activity shortly.

Best regards,
Your Travel Agent
    `;

    const supplierEmailContent = `
Hello,

I'm requesting pricing information for a go-karting activity in Dubai for ${processData.lead.travelGroup} adults.

Travel Date: ${format(processData.flight.date, 'PPP')}
Number of Adults: ${processData.lead.travelGroup}

Could you please provide the pricing details and availability for this activity?

Thank you for your assistance.

Best regards,
Travel Agent
    `;

    try {
      // Try to send emails using fetch to simulate sending emails
      // In a real app, this would connect to a backend service
      
      console.log("Sending client email to: sameep@stayoften.com");
      console.log("Client email content:", clientEmailContent);
      
      console.log("Sending supplier email to: info@stayoften.com");
      console.log("Supplier email content:", supplierEmailContent);
      
      // Simulate network call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Emails Sent Successfully",
        description: "Trip details sent to sameep@stayoften.com and info@stayoften.com",
      });
      
      setEmailsSent(true);
    } catch (error) {
      console.error("Error sending emails:", error);
      toast({
        title: "Email Sending Failed",
        description: "Could not send emails. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
    }
  };

  return <div>
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
                  
                  
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4 border-b pb-2">Email Status</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  {emailsSent ? (
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center mr-2">
                      <Mail className="h-4 w-4 text-yellow-600" />
                    </div>
                  )}
                  <p>Client email {emailsSent ? "sent" : "prepared"} to sameep@stayoften.com</p>
                </div>
                <div className="flex items-center">
                  {emailsSent ? (
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center mr-2">
                      <Mail className="h-4 w-4 text-yellow-600" />
                    </div>
                  )}
                  <p>Supplier email {emailsSent ? "sent" : "prepared"} to info@stayoften.com</p>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-6 gap-4 flex-wrap">
              {!emailsSent && (
                <Button 
                  onClick={sendEmails} 
                  className="px-6 bg-blue-600 hover:bg-blue-700"
                  disabled={isSending}
                >
                  {isSending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending Emails...
                    </>
                  ) : (
                    <>Send Emails</>
                  )}
                </Button>
              )}
              
              <Button 
                onClick={onReset} 
                className="px-6"
                disabled={isSending || !emailsSent}
              >
                Process New Trip Request
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="text-center text-sm text-gray-500 mt-4">
        {emailsSent 
          ? "Emails have been sent to both client and supplier. You can now process a new trip request."
          : "Please send the emails to complete the process before starting a new trip request."
        }
      </div>
    </div>;
};

export default CompletionStep;
