
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

export interface EmailSupplierData {
  to: string;
  subject: string;
  message: string;
}

interface EmailSupplierProps {
  onSubmit: (data: EmailSupplierData) => void;
  initialData?: Partial<EmailSupplierData>;
  travelData: {
    travelDate: string;
    numTravelers: number;
  };
}

const EmailSupplier: React.FC<EmailSupplierProps> = ({ 
  onSubmit, 
  initialData,
  travelData 
}) => {
  const defaultEmailContent = `Hello,

I'm requesting pricing information for a go-karting activity in Dubai for ${travelData.numTravelers} adults.

Travel Date: ${travelData.travelDate}
Number of Adults: ${travelData.numTravelers}

Could you please provide the pricing details and availability for this activity?

Thank you for your assistance.

Best regards,
Travel Agent`;

  const { register, handleSubmit, formState: { errors } } = useForm<EmailSupplierData>({
    defaultValues: {
      to: initialData?.to || "info@stayoften.com",
      subject: initialData?.subject || "Assignment",
      message: initialData?.message || defaultEmailContent,
    },
  });

  const onSubmitForm = (data: EmailSupplierData) => {
    toast({
      title: "Supplier Email Prepared",
      description: "Email to activity supplier is ready to be sent",
    });
    onSubmit(data);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Email Activity Supplier
      </h2>
      <p className="text-center mb-6 text-gray-600">
        Request go-karting activity pricing from supplier
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
                rows={10}
                {...register("message", { required: "Message is required" })}
                className="font-mono text-sm"
              />
              {errors.message && (
                <p className="text-sm text-red-500">{errors.message.message}</p>
              )}
            </div>

            <div className="flex justify-center mt-6">
              <Button type="submit" className="px-6">
                Prepare Supplier Email
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <div className="text-center text-sm text-gray-500 mt-4">
        This email will request pricing for the go-karting activity from the supplier.
      </div>
    </div>
  );
};

export default EmailSupplier;
