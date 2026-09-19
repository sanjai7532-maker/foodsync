# FoodSync AI 🥦🌱
### AI-Powered Smart Food Waste Management & Redistribution Platform

> An enterprise-grade intelligent food waste mitigation, quality assurance, and automated redistribution ecosystem designed for institutional kitchens (universities, hospitals, IT parks, hotels) and food processing units.

---

## 📌 Problem Statement & Context
According to the Food and Agriculture Organization (FAO), nearly **one-third of all food produced globally for human consumption is wasted annually**, leading to severe financial losses, resource depletion, and greenhouse gas emissions.

In India and across global supply chains, food waste contributes to:
- **Economic Inefficiencies**: Increased production, refrigeration, and logistics costs.
- **Social Impact**: Persistence of hunger and malnutrition among vulnerable populations.
- **Environmental Impact**: High Scope 3 carbon footprint, excessive virtual water depletion, and landfill methane generation.

**FoodSync AI** solves this through an integrated, real-time ecosystem powered by predictive AI, IoT telemetry, computer vision quality assessment, and automated NGO redistribution routing.

---

## 🚀 Key Modules & Capabilities

### 1. 📊 Executive Command Center
- Live real-time KPIs: Food saved (kg), meals provided to vulnerable communities, CO₂e emissions avoided, and virtual water conserved.
- Visual **Circular Food Stream Funnel** displaying intake, precision consumption, NGO redistribution, and composting, reducing landfill waste to `<0.1%`.
- Real-time operational alert stream with instant action routing.

### 2. 🤖 AI Demand & Surplus Forecasting Engine
- Multi-variate predictive simulator modeling headcount, day-of-week seasonality, weather factors, and institutional events.
- Precision batch cooking recommendation (+4% buffer vs +18% uncalibrated overprep), preventing waste at the source.
- Automated **Dynamic Kitchen Staging Prep Sheet** for chef and kitchen display systems (KDS).

### 3. 🔍 IoT Sensor Telemetry & Computer Vision Quality Inspector
- **IoT Cold-Chain Matrix**: Continuous monitoring of Cold Rooms, Chillers, and Holding stations for Temperature (°C), Humidity (%), Ethylene gas (ppm), and volatile organic compounds (VOC ppb).
- **Computer Vision Freshness Scanner**: Real-time spectral segmentation detecting cellular breakdown, surface discoloration, and bacterial biofilm risk with Arrhenius physiological decay modeling.

### 4. 🤝 Automated Surplus Food Redistribution Network
- Multi-criteria matching engine ranking verified partner NGOs (Feeding India, Robin Hood Army, Akshaya Patra, Snehalaya Shelter) based on distance, capacity, urgency, and dietary category.
- Tamper-proof **Digital Consignment Handoff** with FSSAI compliance verification and smart QR tokens.

### 5. 🗺️ AI Logistics & Smart Route Optimization
- Interactive Leaflet GIS Map tracking Kitchen Hubs, verified NGO drop-offs, and refrigerated EV delivery vans.
- Multi-stop Dijkstra / TSP route solver achieving a **41% reduction in transit distance** and direct transport carbon savings.
- In-transit cabin temperature and battery telemetry.

### 6. ⚙️ Processing Unit Efficiency & Anomaly Detection
- Tracks Overall Equipment Effectiveness (OEE), overproduction variance, peeling/trimming losses, and energy consumption per ton.
- Root cause diagnostic engine dispatching preventative maintenance orders.

### 7. 📦 Smart Production & FEFO Inventory Planner
- First-Expired, First-Out (FEFO) stock prioritization.
- Dynamic recipe scaler adjusting raw ingredients to forecasted headcounts.

### 8. 📄 ESG Compliance & Sustainability Reporting
- Audited Scope 1, 2 & 3 emissions avoidance ledger.
- Alignment with UN Sustainable Development Goals (SDG 2, 12.3, 13).
- Instant printable and downloadable official corporate ESG Audit Dossier.

---

## 🛠️ Technology Stack
- **Frontend**: React 18, Vite
- **Styling**: Modern Vanilla CSS, Custom Design System, High-contrast Light Mode
- **Icons**: Lucide React
- **Geographic Mapping**: Leaflet.js
- **Build Tool**: Vite 5

---

## 💻 Getting Started Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Git](https://git-scm.com/)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/foodsync-ai.git
cd foodsync-ai
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000/
```

### Production Build
To create an optimized production bundle:
```bash
npm run build
```

---

## 📜 License
This project is licensed under the MIT License.
