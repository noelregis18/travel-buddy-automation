
// Lead data from the pipeline sheet
export const leadData = [
  {
    code: "M25001",
    name: "Tania Patni",
    destination: "Thailand",
    areas: "Phuket",
    month: "June",
    departureStatus: "Flexible",
    departureNotes: "Should include 3rd June",
    departureDate: "01/06/2025",
    dateDetails: "Tentative",
    flightStatus: "Shortlisted",
    onwardFlight: "6E 1071",
    returnFlight: "6E 1071",
    hotelStatus: "Yet to shortlist",
    hotelOption1: "NA",
    hotelOption2: "NA",
    activitiesStatus: "Yet to shortlist",
    activity1: "NA"
  },
  {
    code: "M25002",
    name: "Deepanshu Singh",
    destination: "Vietnam",
    areas: "Phu Quoc",
    month: "April",
    departureStatus: "Exact",
    departureNotes: "Flight tickets booked",
    departureDate: "20/04/2025",
    dateDetails: "Final",
    flightStatus: "Shortlisted and sent",
    onwardFlight: "VJ 910, VJ 451",
    returnFlight: "VJ 346, VJ 883",
    hotelStatus: "Shortlisted and sent",
    hotelOption1: "The Shells Resort and Spa Phu Quoc",
    hotelOption2: "InterContinental: Phu Quoc Long Beach Resort",
    activitiesStatus: "Not needed",
    activity1: "NA"
  },
  {
    code: "M25003",
    name: "Aditya Sharma",
    destination: "Dubai",
    areas: "Marina",
    month: "May",
    departureStatus: "Flexible",
    departureNotes: "First week of May",
    departureDate: "01/05/2025",
    dateDetails: "Tentative",
    flightStatus: "Not shortlisted",
    onwardFlight: "",
    returnFlight: "",
    hotelStatus: "Not shortlisted",
    hotelOption1: "",
    hotelOption2: "",
    activitiesStatus: "Required",
    activity1: "Go-karting"
  }
];

// Hotel data from the hotel spreadsheet
export const hotelData = [
  {
    id: "MARINA-1", 
    name: "Barcelo Residences Dubai Marina",
    area: "Marina",
    board: "Breakfast",
    costPerPersonSmallGroup: "₹30,000",
    costPerPersonLargeGroup: "₹27,000",
    totalFor3Nights: "AED 7,650", // Converted for demo consistency
    rating: "4.5",
    amenities: ["Breakfast Included", "Free WiFi", "Pool", "Gym"],
    distance: "0.2 km from Marina"
  },
  {
    id: "MARINA-2",
    name: "Barcelo Residences Dubai Marina",
    area: "Marina",
    board: "Room only",
    costPerPersonSmallGroup: "₹25,000",
    costPerPersonLargeGroup: "₹20,000",
    totalFor3Nights: "AED 6,000", // Converted for demo consistency
    rating: "4.5",
    amenities: ["Free WiFi", "Pool", "Gym", "Kitchen"],
    distance: "0.2 km from Marina"
  },
  {
    id: "OUDMETHA-1",
    name: "Mövenpick Hotel & Apartments Bur Dubai",
    area: "Oud Metha",
    board: "Breakfast",
    costPerPersonSmallGroup: "₹40,000",
    costPerPersonLargeGroup: "₹32,000",
    totalFor3Nights: "AED 10,800", // Converted for demo consistency
    rating: "4.8",
    amenities: ["Breakfast Included", "Free WiFi", "Spa", "Pool"],
    distance: "5.8 km from Dubai Mall"
  },
  {
    id: "OUDMETHA-2",
    name: "Mövenpick Hotel & Apartments Bur Dubai",
    area: "Oud Metha",
    board: "Room only",
    costPerPersonSmallGroup: "₹35,000",
    costPerPersonLargeGroup: "₹30,000",
    totalFor3Nights: "AED 9,000", // Converted for demo consistency
    rating: "4.8",
    amenities: ["Free WiFi", "Spa", "Pool", "Restaurant"],
    distance: "5.8 km from Dubai Mall"
  }
];

// Flight options (simplified for demo)
export const flightOptions = [
  {
    id: "AI-123",
    airline: "Air India",
    departureTime: "09:45",
    arrivalTime: "12:30",
    duration: "3h 45m",
    price: "₹18,500",
    stops: "Non-stop"
  },
  {
    id: "EK-456",
    airline: "Emirates",
    departureTime: "14:15",
    arrivalTime: "17:00",
    duration: "3h 45m",
    price: "₹21,700",
    stops: "Non-stop"
  },
  {
    id: "IX-789",
    airline: "Air India Express",
    departureTime: "01:20",
    arrivalTime: "04:05",
    duration: "3h 45m",
    price: "₹16,300",
    stops: "Non-stop"
  }
];
