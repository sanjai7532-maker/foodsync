// Comprehensive mock & real-world operational data for FoodSync AI

export const FACILITIES = [
  {
    id: "fac-1",
    name: "Apex Central Kitchen & Hospitality Hub",
    type: "Institutional Kitchen",
    location: "Sector 62, Noida, NCR",
    dailyCapacity: "12,000 meals/day",
    headchef: "Chef Vikram Malhotra",
    activeSensors: 14,
    coords: [28.6280, 77.3649]
  },
  {
    id: "fac-2",
    name: "Metro Agro-Food Processing Unit 4",
    type: "Food Processing Plant",
    location: "Industrial Corridor, Okhla Phase III, Delhi",
    dailyCapacity: "25 Tons/day",
    headchef: "Dr. Sunita Rao (Ops Dir)",
    activeSensors: 28,
    coords: [28.5355, 77.2650]
  }
];

export const INITIAL_METRICS = {
  totalFoodSavedKg: 18450,
  mealsRedistributed: 41000,
  co2eAvoidedKg: 46125, // approx 2.5 kg CO2e per kg food saved (FAO/IPCC)
  waterSavedLitres: 22140000, // approx 1,200 L water per kg food saved
  operationalCostSavedInr: 1845000, // ₹100/kg avg cost saved
  redistributionSuccessRate: 97.4,
  activeAlertsCount: 3
};

export const RECENT_ALERTS = [
  {
    id: "alt-1",
    severity: "critical",
    facility: "Cold Room 02 (Dairy & Desserts)",
    title: "Temperature Anomaly: +8.4°C (Limit: +4°C)",
    detail: "Compressor cycle fluctuation detected. Immediate risk for 140L pasteurized milk and 60kg paneer batches.",
    timestamp: "6 mins ago",
    actionRequired: "Divert cooling auxiliary circuit or expedite kitchen prep"
  },
  {
    id: "alt-2",
    severity: "warning",
    facility: "Central Kitchen — Hot Holding Counter 3",
    title: "Impending Surplus: 65 Servings Vegetable Pulao",
    detail: "Lunch service attendance down 18% due to hybrid remote work shift. High-quality hot food remaining.",
    timestamp: "18 mins ago",
    actionRequired: "Redistribution match algorithm initialized"
  },
  {
    id: "alt-3",
    severity: "info",
    facility: "Processing Line 2 (Sorting & Packaging)",
    title: "Trimming Loss Anomaly Detected: 12.8% (Target: <7%)",
    detail: "Mechanical peeler blade alignment requires calibration on Batch #FP-884.",
    timestamp: "42 mins ago",
    actionRequired: "Technician dispatched to line"
  }
];

export const IOT_SENSORS = [
  {
    id: "sensor-cr1",
    name: "Cold Room A (Fresh Produce)",
    facilityId: "fac-1",
    type: "Refrigeration Unit",
    temp: 3.8,
    targetTemp: 4.0,
    tempUnit: "°C",
    humidity: 89,
    humidityUnit: "%",
    ethylene: 0.18,
    ethyleneUnit: "ppm",
    voc: 42,
    vocUnit: "ppb",
    status: "optimal",
    lastUpdated: "Just now",
    history: [3.9, 3.8, 3.7, 3.8, 4.0, 3.9, 3.8]
  },
  {
    id: "sensor-cr2",
    name: "Cold Room B (Dairy & Proteins)",
    facilityId: "fac-1",
    type: "Deep Chiller",
    temp: 8.4,
    targetTemp: 3.5,
    tempUnit: "°C",
    humidity: 94,
    humidityUnit: "%",
    ethylene: 0.05,
    ethyleneUnit: "ppm",
    voc: 185,
    vocUnit: "ppb",
    status: "critical",
    lastUpdated: "12s ago",
    history: [3.5, 4.2, 5.8, 6.9, 7.5, 8.1, 8.4]
  },
  {
    id: "sensor-ds1",
    name: "Dry Storage Room 1 (Grains & Pulses)",
    facilityId: "fac-1",
    type: "Ambient Warehouse",
    temp: 21.2,
    targetTemp: 22.0,
    tempUnit: "°C",
    humidity: 54,
    humidityUnit: "%",
    ethylene: 0.02,
    ethyleneUnit: "ppm",
    voc: 30,
    vocUnit: "ppb",
    status: "optimal",
    lastUpdated: "1m ago",
    history: [21.0, 21.1, 21.3, 21.2, 21.2, 21.1, 21.2]
  },
  {
    id: "sensor-hh1",
    name: "Hot Holding Station Alpha (Cooked Food)",
    facilityId: "fac-1",
    type: "Thermal Bain-Marie",
    temp: 68.5,
    targetTemp: 65.0,
    tempUnit: "°C",
    humidity: 40,
    humidityUnit: "%",
    ethylene: 0.0,
    ethyleneUnit: "ppm",
    voc: 55,
    vocUnit: "ppb",
    status: "optimal",
    lastUpdated: "45s ago",
    history: [67.8, 68.1, 68.4, 68.2, 68.6, 68.3, 68.5]
  },
  {
    id: "sensor-fp1",
    name: "Flash Freezing Tunnel #2",
    facilityId: "fac-2",
    type: "Cryogenic Tunnel",
    temp: -22.4,
    targetTemp: -24.0,
    tempUnit: "°C",
    humidity: 98,
    humidityUnit: "%",
    ethylene: 0.01,
    ethyleneUnit: "ppm",
    voc: 12,
    vocUnit: "ppb",
    status: "optimal",
    lastUpdated: "Just now",
    history: [-23.5, -23.2, -23.0, -22.8, -22.5, -22.4, -22.4]
  },
  {
    id: "sensor-fp2",
    name: "Curing & Fermentation Vault 3",
    facilityId: "fac-2",
    type: "Bio-Controlled Chamber",
    temp: 16.2,
    targetTemp: 15.0,
    tempUnit: "°C",
    humidity: 78,
    humidityUnit: "%",
    ethylene: 0.95,
    ethyleneUnit: "ppm",
    voc: 310,
    vocUnit: "ppb",
    status: "warning",
    lastUpdated: "3m ago",
    history: [14.8, 15.1, 15.4, 15.8, 16.0, 16.1, 16.2]
  }
];

export const CV_SAMPLE_ITEMS = [
  {
    id: "cv-sample-1",
    name: "Fresh Honeycrisp Apples (Cold Store)",
    category: "Fresh Fruits",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&auto=format&fit=crop&q=80",
    freshnessScore: 94,
    condition: "Prime Quality",
    shelfLifeRemainingHours: 168, // 7 days
    detectedAnomalies: ["None", "Turgor pressure intact", "Skin gloss 96%"],
    recommendation: "Safe for normal inventory storage & standard distribution.",
    statusBadge: "prime",
    boxColor: "#10B981",
    boxCoordinates: { x: 18, y: 15, width: 64, height: 70 }
  },
  {
    id: "cv-sample-2",
    name: "Ripe Table Bananas (Fruit Bay 4)",
    category: "Fresh Produce",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=80",
    freshnessScore: 68,
    condition: "Peak Ripeness / Fast Maturation",
    shelfLifeRemainingHours: 24, // 1 day
    detectedAnomalies: [
      "Surface sugar spotting (28% coverage)",
      "High ethylene emission phase",
      "Starch conversion >85%"
    ],
    recommendation: "Prioritize for same-day dessert prep or immediate NGO breakfast donation.",
    statusBadge: "near-expiry",
    boxColor: "#F59E0B",
    boxCoordinates: { x: 15, y: 20, width: 70, height: 60 }
  },
  {
    id: "cv-sample-3",
    name: "Prepared Shahi Paneer & Jeera Rice (Catering Batch)",
    category: "Cooked Hot Meals",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80",
    freshnessScore: 91,
    condition: "Freshly Cooked (Safe for Human Consumption)",
    shelfLifeRemainingHours: 5,
    detectedAnomalies: [
      "Holding temp 67°C verified",
      "No bacterial biofilm or separation",
      "Sensory profile optimal"
    ],
    recommendation: "Eligible for 1-Click NGO redistribution within 4 hours cold-chain or hot-pack window.",
    statusBadge: "prime",
    boxColor: "#10B981",
    boxCoordinates: { x: 10, y: 10, width: 80, height: 75 }
  },
  {
    id: "cv-sample-4",
    name: "Mixed Salad Greens (Hydroponic Bin)",
    category: "Leafy Greens",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80",
    freshnessScore: 42,
    condition: "Wilting & Moisture Breakdown",
    shelfLifeRemainingHours: 8,
    detectedAnomalies: [
      "Chlorophyll degradation detected (45% yellowing)",
      "Cell wall softening & weeping",
      "Microbial risk index elevated"
    ],
    recommendation: "Unfit for human consumption. Automatically route to Composting / Anaerobic Bio-methanation.",
    statusBadge: "deteriorated",
    boxColor: "#EF4444",
    boxCoordinates: { x: 12, y: 14, width: 76, height: 68 }
  },
  {
    id: "cv-sample-5",
    name: "Artisan Multigrain Bread Loaves",
    category: "Bakery",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80",
    freshnessScore: 78,
    condition: "Good - Mild Moisture Staling",
    shelfLifeRemainingHours: 36,
    detectedAnomalies: [
      "Crust retrogradation 14%",
      "Zero surface mold hyphae detected",
      "Moisture loss within safe limits"
    ],
    recommendation: "Eligible for Community Kitchen breakfast redistribution or secondary discount bakery outlet.",
    statusBadge: "near-expiry",
    boxColor: "#F59E0B",
    boxCoordinates: { x: 20, y: 22, width: 60, height: 55 }
  }
];

export const VERIFIED_NGOS = [
  {
    id: "ngo-1",
    name: "Feeding India by Zomato",
    category: "Large-Scale Food Bank",
    contactPerson: "Ritika Sharma",
    phone: "+91 98110 44219",
    coords: [28.5800, 77.3200],
    distanceKm: 4.8,
    etaMinutes: 18,
    dailyCapacityMeals: 4000,
    currentAvailableCapacity: 1200,
    acceptedTypes: ["Cooked Hot Meals", "Packaged Goods", "Bakery", "Fresh Fruits"],
    hasColdChainFleet: true,
    verificationTier: "Tier 1 FSSAI Verified",
    rating: 4.9
  },
  {
    id: "ngo-2",
    name: "Robin Hood Army (Noida Central Chapter)",
    category: "Volunteer Community Network",
    contactPerson: "Arjun Mehta",
    phone: "+91 97180 33810",
    coords: [28.6150, 77.3750],
    distanceKm: 2.3,
    etaMinutes: 11,
    dailyCapacityMeals: 800,
    currentAvailableCapacity: 450,
    acceptedTypes: ["Cooked Hot Meals", "Bakery", "Dry Ration"],
    hasColdChainFleet: false,
    verificationTier: "Tier 1 FSSAI Verified",
    rating: 4.8
  },
  {
    id: "ngo-3",
    name: "Akshaya Patra Foundation Kitchen Depot",
    category: "Institutional Mega-Kitchen",
    contactPerson: "Naveen Swaroop",
    phone: "+91 99530 11984",
    coords: [28.6600, 77.2900],
    distanceKm: 8.5,
    etaMinutes: 26,
    dailyCapacityMeals: 15000,
    currentAvailableCapacity: 3500,
    acceptedTypes: ["Fresh Produce", "Cooked Hot Meals", "Bulk Raw Ingredients"],
    hasColdChainFleet: true,
    verificationTier: "Tier 1 FSSAI & ISO 22000",
    rating: 5.0
  },
  {
    id: "ngo-4",
    name: "Snehalaya Women & Children Shelter",
    category: "Grassroots Shelter & Community Kitchen",
    contactPerson: "Sister Maria",
    phone: "+91 98711 77342",
    coords: [28.6010, 77.3450],
    distanceKm: 3.6,
    etaMinutes: 14,
    dailyCapacityMeals: 350,
    currentAvailableCapacity: 180,
    acceptedTypes: ["Cooked Hot Meals", "Dairy", "Fresh Fruits", "Bakery"],
    hasColdChainFleet: false,
    verificationTier: "Tier 2 Local Council Verified",
    rating: 4.7
  },
  {
    id: "ngo-5",
    name: "GreenBio Energy Solutions (Bio-Waste Partner)",
    category: "Secondary Biomass & Composting",
    contactPerson: "Dr. K. V. Raman",
    phone: "+91 94120 55891",
    coords: [28.5100, 77.4100],
    distanceKm: 12.0,
    etaMinutes: 35,
    dailyCapacityMeals: 20000, // kg processing capacity
    currentAvailableCapacity: 8000,
    acceptedTypes: ["Spoiled Food", "Trimmed Kitchen Waste", "Expired Dairy"],
    hasColdChainFleet: false,
    verificationTier: "Pollution Control Board Certified",
    rating: 4.6
  }
];

export const INITIAL_SURPLUS_BATCHES = [
  {
    id: "batch-sp-101",
    title: "Vegetable Biryani & Dal Makhani",
    category: "Cooked Hot Meals",
    servings: 120,
    weightKg: 48,
    preparedAt: "Today, 11:30 AM",
    safeUntil: "Today, 04:30 PM",
    timeLeftMinutes: 195,
    dietary: "Vegetarian",
    temperatureLogged: "66.5°C (Safe Holding)",
    currentStatus: "ready_to_match",
    matchedNgoId: null,
    co2eAvoidableKg: 120,
    waterAvoidableL: 57600
  },
  {
    id: "batch-sp-102",
    title: "Fresh Table Bananas & Seasonal Apples",
    category: "Fresh Produce",
    servings: 90,
    weightKg: 35,
    preparedAt: "Yesterday, 06:00 PM",
    safeUntil: "Tomorrow, 12:00 PM",
    timeLeftMinutes: 1240,
    dietary: "Vegan / Fresh",
    temperatureLogged: "14.0°C",
    currentStatus: "claimed",
    matchedNgoId: "ngo-2",
    assignedVan: "Van Eco-3 (Cold-insulated)",
    co2eAvoidableKg: 87.5,
    waterAvoidableL: 42000
  },
  {
    id: "batch-sp-103",
    title: "Artisan Whole Wheat Pav & Baguettes",
    category: "Bakery",
    servings: 150,
    weightKg: 25,
    preparedAt: "Today, 07:00 AM",
    safeUntil: "Tomorrow, 08:00 AM",
    timeLeftMinutes: 980,
    dietary: "Vegetarian",
    temperatureLogged: "22.0°C",
    currentStatus: "in_transit",
    matchedNgoId: "ngo-4",
    assignedVan: "Van Eco-1",
    co2eAvoidableKg: 62.5,
    waterAvoidableL: 30000
  }
];

export const DELIVERY_FLEET = [
  {
    id: "van-eco-1",
    name: "Reefer EV Van #104",
    driver: "Mohd. Shakeel",
    vehicleType: "Refrigerated EV Carrier (Tata Ace EV)",
    currentCoords: [28.6100, 77.3550],
    batteryLevel: 78,
    cabinTemp: 4.2,
    cabinTempTarget: 4.0,
    status: "Delivering to Snehalaya Shelter",
    speedKmh: 34,
    stopsRemaining: 1
  },
  {
    id: "van-eco-2",
    name: "Cargo EV Van #208",
    driver: "Ramesh Chand",
    vehicleType: "Dry Ambient EV Van",
    currentCoords: [28.6300, 77.3400],
    batteryLevel: 92,
    cabinTemp: 21.0,
    cabinTempTarget: 22.0,
    status: "Idle at Hub — Ready for Dispatch",
    speedKmh: 0,
    stopsRemaining: 0
  },
  {
    id: "van-eco-3",
    name: "Chilled Fleet Runner #312",
    driver: "Gurpreet Singh",
    vehicleType: "Multi-Temp Dual Zone Reefer",
    currentCoords: [28.5900, 77.3600],
    batteryLevel: 64,
    cabinTemp: 2.8,
    cabinTempTarget: 3.0,
    status: "En Route to Robin Hood Hub",
    speedKmh: 42,
    stopsRemaining: 2
  }
];

export const INDUSTRIAL_EFFICIENCY_METRICS = {
  oee: 84.6, // Overall Equipment Effectiveness %
  overproductionRate: 4.2, // % above target demand
  targetOverproductionRate: 2.0,
  rawMaterialYield: 91.8, // %
  targetYield: 95.0,
  trimmingLoss: 8.2, // %
  energyConsumptionKwhPerTon: 184,
  targetEnergyKwhPerTon: 165,
  anomalies: [
    {
      id: "anom-1",
      machine: "Vegetable Continuous Dicer & Peeler Line 3",
      issue: "Blade dulling causing 3.4% excessive flesh loss on carrots & potatoes",
      impact: "Loss of ₹14,200/day in raw ingredient wastage",
      recommendation: "Switch to automated honing cycle & recalibrate pressure guide",
      status: "action_needed"
    },
    {
      id: "anom-2",
      machine: "Blast Chiller Room 2 Compressor",
      issue: "Thermal duty cycle 28% longer than baseline (heat exchanger fouling)",
      impact: "Excess energy consumption of 46 kWh/day",
      recommendation: "Execute condenser coil ultrasonic wash during scheduled 15:00 maintenance window",
      status: "scheduled"
    },
    {
      id: "anom-3",
      machine: "Steam Jacketed Kettle K-04",
      issue: "Steam valve minor bypass leak, 4°C overshoot during simmering phase",
      impact: "Slight scorch risk on delicate sauces",
      recommendation: "Seal actuator gasket and adjust PID loop",
      status: "resolved"
    }
  ]
};

export const INVENTORY_ITEMS = [
  {
    id: "inv-01",
    name: "Basmati Rice Grade-A",
    category: "Grains",
    quantity: 650,
    unit: "kg",
    storageLocation: "Dry Silo 2",
    receivedDate: "2026-09-01",
    expiryDate: "2027-03-01",
    daysToExpiry: 164,
    fefoPriority: "Low",
    costPerUnit: 78
  },
  {
    id: "inv-02",
    name: "Fresh Paneer (Cottage Cheese)",
    category: "Dairy",
    quantity: 85,
    unit: "kg",
    storageLocation: "Cold Room B",
    receivedDate: "2026-09-16",
    expiryDate: "2026-09-19",
    daysToExpiry: 1,
    fefoPriority: "Critical",
    costPerUnit: 340
  },
  {
    id: "inv-03",
    name: "Desi Tomatoes (Hybrid)",
    category: "Fresh Produce",
    quantity: 140,
    unit: "kg",
    storageLocation: "Cold Room A",
    receivedDate: "2026-09-15",
    expiryDate: "2026-09-21",
    daysToExpiry: 3,
    fefoPriority: "High",
    costPerUnit: 42
  },
  {
    id: "inv-04",
    name: "Cooking Butter Unsalted",
    category: "Dairy",
    quantity: 60,
    unit: "kg",
    storageLocation: "Chiller 1",
    receivedDate: "2026-09-10",
    expiryDate: "2026-10-10",
    daysToExpiry: 22,
    fefoPriority: "Medium",
    costPerUnit: 460
  },
  {
    id: "inv-05",
    name: "English Spinach & Baby Greens",
    category: "Vegetables",
    quantity: 35,
    unit: "kg",
    storageLocation: "Hydroponic Bay",
    receivedDate: "2026-09-17",
    expiryDate: "2026-09-20",
    daysToExpiry: 2,
    fefoPriority: "Critical",
    costPerUnit: 65
  }
];
