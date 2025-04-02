
import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

export interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  source: string;
  destination: string;
  travelGroup: number;
  rooms: number;
  requirements: string;
}

interface LeadFormProps {
  onSubmit: (data: LeadFormData) => void;
  initialData?: Partial<LeadFormData>;
}

const LeadForm: React.FC<LeadFormProps> = ({ onSubmit, initialData }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LeadFormData>({
    defaultValues: {
      name: initialData?.name || "Aditya Sharma",
      email: initialData?.email || "aditya.sharma@example.com",
      phone: initialData?.phone || "",
      source: initialData?.source || "New Delhi",
      destination: initialData?.destination || "Dubai",
      travelGroup: initialData?.travelGroup || 6,
      rooms: initialData?.rooms || 3,
      requirements: initialData?.requirements || "Go-karting activity",
    },
  });

  const onSubmitForm = (data: LeadFormData) => {
    toast({
      title: "Lead Information Saved",
      description: "Lead has been added to the pipeline",
    });
    onSubmit(data);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
        Add Lead to Pipeline
      </h2>
      <p className="text-center mb-6 text-gray-600">
        Record client details as a new lead in the pipeline
      </p>

      <Card className="mb-6">
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Client Name</Label>
                <Input
                  id="name"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  {...register("phone")}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="source">Source Location</Label>
                <Input
                  id="source"
                  {...register("source", { required: "Source is required" })}
                />
                {errors.source && (
                  <p className="text-sm text-red-500">{errors.source.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <Input
                  id="destination"
                  {...register("destination", { required: "Destination is required" })}
                />
                {errors.destination && (
                  <p className="text-sm text-red-500">{errors.destination.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="travelGroup">Number of Travelers</Label>
                <Input
                  id="travelGroup"
                  type="number"
                  {...register("travelGroup", { 
                    required: "Number of travelers is required",
                    min: { value: 1, message: "Minimum 1 traveler" } 
                  })}
                />
                {errors.travelGroup && (
                  <p className="text-sm text-red-500">{errors.travelGroup.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="rooms">Number of Rooms</Label>
                <Input
                  id="rooms"
                  type="number"
                  {...register("rooms", { 
                    required: "Number of rooms is required",
                    min: { value: 1, message: "Minimum 1 room" } 
                  })}
                />
                {errors.rooms && (
                  <p className="text-sm text-red-500">{errors.rooms.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="requirements">Special Requirements</Label>
              <Input
                id="requirements"
                {...register("requirements")}
              />
            </div>

            <div className="flex justify-center mt-6">
              <Button type="submit" className="px-6">
                Save Lead & Continue
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <div className="text-center text-sm text-gray-500 mt-4">
        Once submitted, this information will be added to your Pipeline Sheet.
      </div>
    </div>
  );
};

export default LeadForm;
