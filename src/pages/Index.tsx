
import React, { useState } from "react";
import Layout from "@/components/Layout";
import LeadForm, { LeadFormData } from "@/components/LeadForm";
import FlightSelection, { FlightData } from "@/components/FlightSelection";
import HotelSelection, { HotelData } from "@/components/HotelSelection";
import EmailClient, { EmailClientData } from "@/components/EmailClient";
import EmailSupplier, { EmailSupplierData } from "@/components/EmailSupplier";
import CompletionStep from "@/components/CompletionStep";
import { format } from "date-fns";
import { hotelData as hotelDataset, leadData } from "@/data/travelData";

const Index = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [leadInfo, setLeadInfo] = useState<LeadFormData | null>(null);
  const [flightData, setFlightData] = useState<FlightData | null>(null);
  const [hotelData, setHotelData] = useState<HotelData | null>(null);
  const [clientEmailData, setClientEmailData] = useState<EmailClientData | null>(null);
  const [supplierEmailData, setSupplierEmailData] = useState<EmailSupplierData | null>(null);

  // Use the demo data for Aditya Sharma (our current lead)
  const currentLead = leadData.find(lead => lead.name === "Aditya Sharma");

  const handleLeadSubmit = (data: LeadFormData) => {
    setLeadInfo(data);
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
    setLeadInfo(null);
    setFlightData(null);
    setHotelData(null);
    setClientEmailData(null);
    setSupplierEmailData(null);
    setCurrentStep(1);
  };

  // Get hotel details from our real dataset
  const getHotelDetails = (hotelId: string | undefined) => {
    if (!hotelId) return { name: "", price: "" };
    
    const hotel = hotelDataset.find(h => h.id === hotelId);
    
    if (!hotel) return { name: "", price: "" };
    return { 
      name: hotel.name, 
      price: hotel.totalFor3Nights 
    };
  };

  // Generate email data based on selected options
  const emailData = {
    clientName: leadInfo?.name || "",
    flightCode: flightData?.flightOption || "",
    flightDate: flightData?.date ? format(flightData.date, 'PP') : "",
    hotelName: getHotelDetails(hotelData?.hotelOption).name,
    hotelPrice: getHotelDetails(hotelData?.hotelOption).price,
  };

  const supplierData = {
    travelDate: flightData?.date ? format(flightData.date, 'PP') : "",
    numTravelers: leadInfo?.travelGroup || 0,
  };

  return (
    <Layout currentStep={currentStep}>
      {currentStep === 1 && (
        <LeadForm 
          onSubmit={handleLeadSubmit} 
          initialData={leadInfo || (currentLead ? {
            name: currentLead.name,
            email: "aditya.sharma@example.com",
            phone: "",
            source: "New Delhi",
            destination: currentLead.destination,
            travelGroup: 6,
            rooms: 3,
            requirements: currentLead.activity1
          } : undefined)} 
        />
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
      
      {currentStep === 6 && leadInfo && flightData && hotelData && (
        <CompletionStep 
          onReset={resetProcess} 
          processData={{ 
            lead: leadInfo, 
            flight: flightData, 
            hotel: hotelData 
          }} 
        />
      )}
    </Layout>
  );
};

export default Index;
