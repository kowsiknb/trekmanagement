# TrekSafe: Mountain Trek Management & Climate Safety Intelligence System

A full-stack Trek Management and Mountain Safety Web Application designed for outdoor adventurers and built as an **AIML Capstone Project**. TrekSafe enables users to search trekking destinations across India, analyze climate and weather hazards for any selected date, predict risk using an ensemble **Random Forest Classifier**, visualize interactive trail topography and elevation profiles, and pack using condition-responsive smart checklists.

---

## 🌟 Core Highlights & Features

1. **City & State Trek Discovery**
   - Search across Indian states and cities (Bengaluru, Karnataka, Maharashtra, Himachal Pradesh, Uttarakhand, Kerala, Goa, etc.).
   - Instant filtering by difficulty (Easy, Moderate, Difficult, Challenging), duration, altitude, and region.
   - Geolocation-based "Near Me" trail discovery.

2. **Date-Based Climate & Weather Risk Engine**
   - High-resolution weather forecast integration with Open-Meteo API and regional high-altitude seasonal fallback models.
   - Evaluates ambient temperature, rainfall volume, precipitation probability, wind gusts, relative humidity, atmospheric visibility, and thunderstorm risks.
   - Calculates a normalized **Safety Score (0–100)** and **Risk Score (0–100)** with transparent human-readable explanations.
   - Color-coded risk tiers: Low (🟢 0–30), Moderate (🟡 31–60), High (🟠 61–80), Very High (🔴 81–100).

3. **Machine Learning Component (College AIML Project & Viva Ready)**
   - **Primary Model**: Random Forest Classifier with an ensemble of 50 decision trees trained with bootstrap aggregating (bagging) and random feature subsets.
   - **Gini Impurity Feature Importances**:
     - Rainfall & Precipitation: 35%
     - Ambient Temperature & Altitude: 20%
     - Ridge Wind & Gusts: 15%
     - Terrain Gradient & Exposure: 15%
     - Atmospheric Visibility & Fog: 10%
     - Relative Air Humidity: 5%
   - **Interactive Safety Lab & Viva Sandbox**: Allows viva examiners or students to manipulate environmental sliders and observe real-time ensemble tree voting and classification shifts.

4. **Interactive Leaflet Route Maps & Topography**
   - Displays trailhead start marker, summit target marker, water sources, campsites, ridge cautions, and emergency hospitals.
   - Polyline trail path rendering with map bounds auto-fitting and live trail metric pills.

5. **Dynamic SVG Elevation Profiles**
   - Calculates cumulative vertical ascent, descent, base elevation, and maximum peak altitude.
   - Interactive hover tooltips displaying waypoint names, distance markers, and elevations.

6. **Smart Condition-Based Gear Checklist**
   - Base essentials automatically adjusted for trek difficulty and duration.
   - Dynamic weather rules:
     - Rain probability > 50% → adds seam-sealed poncho, pack rain cover, and dry electronics pouches.
     - Temp < 12°C or altitude > 2,500m → adds thermal base layers, fleece, and alpine windproof gloves.
     - Multi-day expeditions → adds 3-season tent, sub-zero sleeping bag, and water purification.
     - Strenuous routes → adds trekking poles and blister moleskin kits.
   - Packing progress percentage and custom gear additions.

7. **Emergency Directory & SOS Protocols**
   - Verified hospital contacts with approximate distances, local police stations, forest range officers, and national emergency lines (`112`).
   - First-aid guidance for Acute Mountain Sickness (AMS), trail sprains, hypothermia, and sudden storms.

8. **Trek Comparison Matrix**
   - Side-by-side comparison of 2 to 4 routes across distance, difficulty, elevation gain, cost, season, and terrain.
   - Automatic awards ("Best for Beginners", "Most Scenic", "Most Challenging").

9. **Personalization & User Dashboard**
   - User profile with cardio endurance, duration preferences, and medical sensitivity tracking.
   - Tailored route suggestions based on fitness level.
   - Saved favorite treks, upcoming expedition schedules, and historical risk audit logs.
   - 1-Click demo authentication for quick evaluation.

---

## 🛠️ Architecture & Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Motion, Lucide Icons, Leaflet
- **Backend**: Node.js & Express REST APIs with tsx runtime
- **Weather Provider**: Open-Meteo REST API + Regional Meteorological Models
- **Typography**: Cabinet Grotesk (display), Plus Jakarta Sans (body), JetBrains Mono (metrics)

---

## 📡 REST API Endpoints

- `GET /api/treks?location=Bengaluru&difficulty=Moderate` - Filter and retrieve trekking trails.
- `GET /api/treks/:id` - Retrieve full specifications, terrain notes, and emergency data for a trek.
- `GET /api/treks/:id/route` - Retrieve GPS waypoints and polyline coordinates.
- `GET /api/treks/:id/checklist` - Retrieve generated gear checklist items.
- `POST /api/risk-analysis` - Calculate risk score, explanations, and ML ensemble predictions for given weather payload.
- `GET /api/health` - Health check status.

---

## 🚀 Deploying to Vercel

The project is configured for Vercel deployment with serverless functions and Single Page Application (SPA) routing.

### Option 1: Deploy via GitHub (Recommended)

1. Push this repository to **GitHub**.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Vercel will automatically detect **Vite**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Under **Environment Variables**, add:
   - `VITE_GOOGLE_MAPS_API_KEY`: *(Your Google Maps API key, pre-configured in code)*
6. Click **Deploy**.

### Option 2: Deploy via Vercel CLI

```bash
# 1. Install Vercel CLI (if not already installed)
npm install -g vercel

# 2. Login to your Vercel account
vercel login

# 3. Deploy to preview
vercel

# 4. Deploy to production
vercel --prod
```

### Configuration Files Added for Vercel:
- **`vercel.json`**: Sets up SPA routing for the React frontend (`dist/index.html`) and forwards `/api/*` requests to the serverless function.
- **`api/index.ts`**: Express REST API serverless handler for `/api/treks`, `/api/health`, and `/api/risk-analysis`.
- **`.vercelignore`**: Excludes local cache and sensitive files from the Vercel deployment bundle.

