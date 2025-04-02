
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
  // Dubai Hotels
  {
    id: "MARINA-1", 
    name: "Barcelo Residences Dubai Marina",
    area: "Marina",
    destination: "Dubai",
    board: "Breakfast",
    costPerPersonSmallGroup: "₹30,000",
    costPerPersonLargeGroup: "₹27,000",
    totalFor3Nights: "AED 7,650", 
    rating: "4.5",
    amenities: ["Breakfast Included", "Free WiFi", "Pool", "Gym"],
    distance: "0.2 km from Marina"
  },
  {
    id: "MARINA-2",
    name: "Barcelo Residences Dubai Marina",
    area: "Marina",
    destination: "Dubai",
    board: "Room only",
    costPerPersonSmallGroup: "₹25,000",
    costPerPersonLargeGroup: "₹20,000",
    totalFor3Nights: "AED 6,000", 
    rating: "4.5",
    amenities: ["Free WiFi", "Pool", "Gym", "Kitchen"],
    distance: "0.2 km from Marina"
  },
  {
    id: "OUDMETHA-1",
    name: "Mövenpick Hotel & Apartments Bur Dubai",
    area: "Oud Metha",
    destination: "Dubai",
    board: "Breakfast",
    costPerPersonSmallGroup: "₹40,000",
    costPerPersonLargeGroup: "₹32,000",
    totalFor3Nights: "AED 10,800", 
    rating: "4.8",
    amenities: ["Breakfast Included", "Free WiFi", "Spa", "Pool"],
    distance: "5.8 km from Dubai Mall"
  },
  {
    id: "OUDMETHA-2",
    name: "Mövenpick Hotel & Apartments Bur Dubai",
    area: "Oud Metha",
    destination: "Dubai",
    board: "Room only",
    costPerPersonSmallGroup: "₹35,000",
    costPerPersonLargeGroup: "₹30,000",
    totalFor3Nights: "AED 9,000", 
    rating: "4.8",
    amenities: ["Free WiFi", "Spa", "Pool", "Restaurant"],
    distance: "5.8 km from Dubai Mall"
  },
  
  // Thailand Hotels
  {
    id: "PHUKET-1",
    name: "The Nai Harn Phuket",
    area: "Nai Harn Beach",
    destination: "Thailand",
    board: "Breakfast",
    costPerPersonSmallGroup: "₹32,000",
    costPerPersonLargeGroup: "₹28,000",
    totalFor3Nights: "THB 30,600",
    rating: "4.7",
    amenities: ["Breakfast Included", "Free WiFi", "Ocean View", "Spa"],
    distance: "Direct beach access"
  },
  {
    id: "PHUKET-2",
    name: "Amari Phuket",
    area: "Patong",
    destination: "Thailand",
    board: "Breakfast",
    costPerPersonSmallGroup: "₹29,000",
    costPerPersonLargeGroup: "₹25,000",
    totalFor3Nights: "THB 27,000",
    rating: "4.6",
    amenities: ["Breakfast Included", "Free WiFi", "2 Pools", "Fitness Center"],
    distance: "5 min walk to Patong Beach"
  },
  {
    id: "BANGKOK-1",
    name: "Chatrium Hotel Riverside Bangkok",
    area: "Riverside",
    destination: "Thailand",
    board: "Breakfast",
    costPerPersonSmallGroup: "₹26,000",
    costPerPersonLargeGroup: "₹22,000",
    totalFor3Nights: "THB 24,300",
    rating: "4.5",
    amenities: ["Breakfast Included", "River View", "Infinity Pool", "Spa"],
    distance: "Near Asiatique Night Market"
  },
  
  // Vietnam Hotels
  {
    id: "PHUQUOC-1",
    name: "The Shells Resort and Spa Phu Quoc",
    area: "Phu Quoc",
    destination: "Vietnam",
    board: "Breakfast",
    costPerPersonSmallGroup: "₹31,000",
    costPerPersonLargeGroup: "₹26,000",
    totalFor3Nights: "VND 16,200,000",
    rating: "4.6",
    amenities: ["Breakfast Included", "Private Beach", "Spa", "Pool"],
    distance: "Beachfront property"
  },
  {
    id: "PHUQUOC-2",
    name: "InterContinental Phu Quoc Long Beach Resort",
    area: "Phu Quoc",
    destination: "Vietnam",
    board: "Breakfast",
    costPerPersonSmallGroup: "₹38,000",
    costPerPersonLargeGroup: "₹32,000",
    totalFor3Nights: "VND 19,800,000",
    rating: "4.8",
    amenities: ["Breakfast Included", "Luxury Spa", "4 Pools", "Kids Club"],
    distance: "Direct beach access"
  },
  {
    id: "HANOI-1",
    name: "Sofitel Legend Metropole Hanoi",
    area: "Hanoi",
    destination: "Vietnam",
    board: "Breakfast",
    costPerPersonSmallGroup: "₹35,000",
    costPerPersonLargeGroup: "₹30,000",
    totalFor3Nights: "VND 18,000,000",
    rating: "4.9",
    amenities: ["Breakfast Included", "Historic Property", "Spa", "Pool"],
    distance: "Central location in Old Quarter"
  }
];

// Flight options (now grouped by destination)
export const flightOptions = [
  // Dubai Flights
  {
    id: "AI-123",
    destination: "Dubai",
    airline: "Air India",
    departureTime: "09:45",
    arrivalTime: "12:30",
    duration: "3h 45m",
    price: "₹18,500",
    stops: "Non-stop",
    date: new Date(2024, 4, 2) // May 2, 2024
  },
  {
    id: "EK-456",
    destination: "Dubai",
    airline: "Emirates",
    departureTime: "14:15",
    arrivalTime: "17:00",
    duration: "3h 45m",
    price: "₹21,700",
    stops: "Non-stop",
    date: new Date(2024, 4, 3) // May 3, 2024
  },
  {
    id: "IX-789",
    destination: "Dubai",
    airline: "Air India Express",
    departureTime: "01:20",
    arrivalTime: "04:05",
    duration: "3h 45m",
    price: "₹16,300",
    stops: "Non-stop",
    date: new Date(2024, 4, 5) // May 5, 2024
  },
  
  // Thailand Flights
  {
    id: "TG-345",
    destination: "Thailand",
    airline: "Thai Airways",
    departureTime: "01:05",
    arrivalTime: "06:45",
    duration: "4h 40m",
    price: "₹22,600",
    stops: "Non-stop",
    date: new Date(2024, 5, 1) // June 1, 2024
  },
  {
    id: "SQ-789",
    destination: "Thailand",
    airline: "Singapore Airlines",
    departureTime: "08:15",
    arrivalTime: "16:30",
    duration: "7h 15m",
    price: "₹24,300",
    stops: "1 stop via Singapore",
    date: new Date(2024, 5, 3) // June 3, 2024
  },
  {
    id: "AI-567",
    destination: "Thailand",
    airline: "Air India",
    departureTime: "23:55",
    arrivalTime: "05:35",
    duration: "4h 40m",
    price: "₹19,800",
    stops: "Non-stop",
    date: new Date(2024, 5, 2) // June 2, 2024
  },
  
  // Vietnam Flights
  {
    id: "VJ-910",
    destination: "Vietnam",
    airline: "VietJet Air",
    departureTime: "07:30",
    arrivalTime: "16:15",
    duration: "7h 45m",
    price: "₹17,200",
    stops: "1 stop via Bangkok",
    date: new Date(2024, 3, 20) // April 20, 2024
  },
  {
    id: "VN-246",
    destination: "Vietnam",
    airline: "Vietnam Airlines",
    departureTime: "20:45",
    arrivalTime: "07:30",
    duration: "9h 45m",
    price: "₹23,900",
    stops: "1 stop via Ho Chi Minh",
    date: new Date(2024, 3, 18) // April 18, 2024
  },
  {
    id: "SQ-135",
    destination: "Vietnam",
    airline: "Singapore Airlines",
    departureTime: "11:20",
    arrivalTime: "22:05",
    duration: "9h 45m",
    price: "₹26,500",
    stops: "1 stop via Singapore",
    date: new Date(2024, 3, 19) // April 19, 2024
  }
];

// Function to fetch real-time flight data (simulated)
export const fetchRealtimeFlightData = (destination: string) => {
  console.log(`Fetching real-time flight data for ${destination} from Skyscanner API...`);
  // In a real app, this would be an API call to Skyscanner or similar service
  // For demo purposes, we're filtering our existing data
  return flightOptions.filter(flight => flight.destination.toLowerCase() === destination.toLowerCase());
};

// Function to fetch real-time hotel data (simulated)
export const fetchRealtimeHotelData = (destination: string, area?: string) => {
  console.log(`Fetching real-time hotel data for ${destination} ${area ? 'in ' + area : ''}...`);
  // In a real app, this would be an API call to a hotel booking API
  // For demo purposes, we're filtering our existing data
  const hotels = hotelData.filter(hotel => hotel.destination.toLowerCase() === destination.toLowerCase());
  
  if (area) {
    return hotels.filter(hotel => hotel.area.toLowerCase().includes(area.toLowerCase()));
  }
  
  return hotels;
};
