
import React, { useState } from "react";
import Layout from "@/components/Layout";
import LeadForm, { LeadFormData } from "@/components/LeadForm";
import FlightSelection, { FlightData } from "@/components/FlightSelection";
import HotelSelection, { HotelData } from "@/components/HotelSelection";
import EmailClient, { EmailClientData } from "@/components/EmailClient";
import EmailSupplier, { EmailSupplierData } from "@/components/EmailSupplier";
import CompletionStep from "@/components/CompletionStep";
import { format } from "date-fns";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [leadData, setLeadData] = useState<LeadFormData | null>(null);
  const [flightData, setFlightData] = useState<FlightData | null>(null);
  const [hotelData, setHotelData] = useState<HotelData | null>(null);
  const [clientEmailData, setClientEmailData] = useState<EmailClientData | null>(null);
  const [supplierEmailData, setSupplierEmailData] = useState<EmailSupplierData | null>(null);

  const handleLeadSubmit = (data: LeadFormData) => {
    setLeadData(data);
    setCurrentStep(2);
  };

  const handleFlightSubmit = (data: FlightData) => {
    setFlightData(data);
    setCurrentStep(3);
  };

  const handleHotelSubmit = (data: HotelData) => {
    setHotelData(data);
    setCurrentStep(4);
  };

  const handleClientEmailSubmit = (data: EmailClientData) => {
    setClientEmailData(data);
    setCurrentStep(5);
  };

  const handleSupplierEmailSubmit = (data: EmailSupplierData) => {
    setSupplierEmailData(data);
    setCurrentStep(6);
  };

  const resetProcess = () => {
    setLeadData(null);
    setFlightData(null);
    setHotelData(null);
    setClientEmailData(null);
    setSupplierEmailData(null);
    setCurrentStep(1);
  };

  // Map hotel ID to hotel name and price
  const getHotelDetails = (hotelId: string | undefined) => {
    const hotels: Record<string, { name: string; price: string }> = {
      "MARINA-1": { name: "Marina Bay Hotel", price: "AED 7,650" },
      "MARINA-2": { name: "Dubai Marina Suites", price: "AED 10,800" },
      "MARINA-3": { name: "Marina View Apartments", price: "AED 6,480" },
    };
    
    if (!hotelId) return { name: "", price: "" };
    return hotels[hotelId] || { name: "", price: "" };
  };

  // Generate email data based on selected options
  const emailData = {
    clientName: leadData?.name || "",
    flightCode: flightData?.flightOption || "",
    flightDate: flightData?.date ? format(flightData.date, 'PP') : "",
    hotelName: getHotelDetails(hotelData?.hotelOption).name,
    hotelPrice: getHotelDetails(hotelData?.hotelOption).price,
  };

  const supplierData = {
    travelDate: flightData?.date ? format(flightData.date, 'PP') : "",
    numTravelers: leadData?.travelGroup || 0,
  };

  return (
    <Layout currentStep={currentStep}>
      {currentStep === 1 && (
        <LeadForm onSubmit={handleLeadSubmit} initialData={leadData || undefined} />
      )}
      
      {currentStep === 2 && (
        <FlightSelection onSubmit={handleFlightSubmit} initialData={flightData || undefined} />
      )}
      
      {currentStep === 3 && (
        <HotelSelection onSubmit={handleHotelSubmit} initialData={hotelData || undefined} />
      )}
      
      {currentStep === 4 && (
        <EmailClient 
          onSubmit={handleClientEmailSubmit} 
          initialData={clientEmailData || undefined} 
          travelData={emailData}
        />
      )}
      
      {currentStep === 5 && (
        <EmailSupplier 
          onSubmit={handleSupplierEmailSubmit} 
          initialData={supplierEmailData || undefined}
          travelData={supplierData}
        />
      )}
      
      {currentStep === 6 && leadData && flightData && hotelData && (
        <CompletionStep 
          onReset={resetProcess} 
          processData={{ 
            lead: leadData, 
            flight: flightData, 
            hotel: hotelData 
          }} 
        />
      )}
    </Layout>
  );
};

export default Index;
