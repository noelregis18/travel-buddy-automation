
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

export interface EmailClientData {
  to: string;
  subject: string;
  message: string;
}

interface EmailClientProps {
  onSubmit: (data: EmailClientData) => void;
  initialData?: Partial<EmailClientData>;
  travelData: {
    clientName: string;
    flightCode: string;
    flightDate: string;
    hotelName: string;
    hotelPrice: string;
  };
}

const EmailClient: React.FC<EmailClientProps> = ({ 
  onSubmit, 
  initialData,
  travelData 
}) => {
  const defaultEmailContent = `Dear ${travelData.clientName},

I hope this email finds you well. I'm pleased to share the travel details for your upcoming trip to Dubai:

Departure Date: ${travelData.flightDate}
Flight: ${travelData.flightCode} (New Delhi to Dubai)

Hotel: ${travelData.hotelName}
Package: Bed & Breakfast for 6 adults (3 rooms)
Duration: 3 nights
Total Price: ${travelData.hotelPrice}

The hotel is conveniently located near Dubai Marina as requested. I will confirm the pricing for the go-karting activity for 6 adults shortly.

Please review these details and let me know if you have any questions or if you'd like me to make any adjustments to the itinerary.

Best regards,
Your Travel Agent`;

  const { register, handleSubmit, formState: { errors } } = useForm<EmailClientData>({
    defaultValues: {
      to: initialData?.to || "sameep@stayoften.com",
      subject: initialData?.subject || "Assignment",
      message: initialData?.message || defaultEmailContent,
    },
  });

  const onSubmitForm = (data: EmailClientData) => {
    toast({
      title: "Email Composed",
      description: "Client email is ready to be sent",
    });
    onSubmit(data);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Compose Client Email
      </h2>
      <p className="text-center mb-6 text-gray-600">
        Send email to client with trip details
      </p>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="to">To</Label>
              <Input
                id="to"
                type="email"
                {...register("to", { required: "Recipient email is required" })}
              />
              {errors.to && (
                <p className="text-sm text-red-500">{errors.to.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                {...register("subject", { required: "Subject is required" })}
              />
              {errors.subject && (
                <p className="text-sm text-red-500">{errors.subject.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                rows={12}
                {...register("message", { required: "Message is required" })}
                className="font-mono text-sm"
              />
              {errors.message && (
                <p className="text-sm text-red-500">{errors.message.message}</p>
              )}
            </div>

            <div className="flex justify-center mt-6">
              <Button type="submit" className="px-6">
                Prepare Email & Continue
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <div className="text-center text-sm text-gray-500 mt-4">
        This will prepare the email to be sent to the client with all the trip details.
      </div>
    </div>
  );
};

export default EmailClient;
