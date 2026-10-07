export type DifficultyLevel = 'Easy' | 'Moderate' | 'Difficult' | 'Challenging';

export type RiskLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'VERY_HIGH';

export interface Waypoint {
  id: string;
  name: string;
  type: 'start' | 'camp' | 'water' | 'viewpoint' | 'summit' | 'medical' | 'hazard' | 'parking';
  lat: number;
  lng: number;
  elevationM: number;
  description: string;
}

export interface ElevationPoint {
  distanceKm: number;
  elevationM: number;
  label?: string;
}

export interface EmergencyInfo {
  nearestHospital: string;
  hospitalDistanceKm: number;
  hospitalPhone: string;
  policeStation: string;
  policePhone: string;
  forestRangeOffice: string;
  forestPhone: string;
  nationalEmergency: string;
  nearestTown: string;
}

export interface Trek {
  id: string;
  name: string;
  tagline: string;
  city: string;
  state: string;
  region: string;
  difficulty: DifficultyLevel;
  distanceKm: number;
  durationDays: number;
  estimatedDurationHours: number;
  maxAltitudeM: number;
  minAltitudeM: number;
  elevationGainM: number;
  bestSeason: string;
  rating: number;
  reviewsCount: number;
  estimatedCostINR: number;
  fitnessLevelRequired: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  shortDescription: string;
  detailedOverview: string;
  terrainType: string;
  wildlifeInfo: string;
  waterAvailability: string;
  campingAllowed: boolean;
  campingInfo: string;
  highlights: string[];
  imageUrl: string;
  startPoint: {
    name: string;
    lat: number;
    lng: number;
    elevationM: number;
  };
  summitPoint: {
    name: string;
    lat: number;
    lng: number;
    elevationM: number;
  };
  routeCoordinates: [number, number][]; // [lat, lng] array
  waypoints: Waypoint[];
  elevationProfile: ElevationPoint[];
  emergencyInfo: EmergencyInfo;
}

export interface WeatherData {
  date: string;
  tempC: number;
  feelsLikeC: number;
  tempMinC: number;
  tempMaxC: number;
  rainProbability: number; // 0 - 100
  precipitationMm: number;
  humidity: number; // 0 - 100
  windSpeedKmh: number;
  windGustKmh: number;
  visibilityKm: number;
  uvIndex: number;
  weatherCode: number;
  conditionText: string;
  isThunderstorm: boolean;
  sunrise: string;
  sunset: string;
  extremeWarning?: string;
}

export interface MLPrediction {
  predictedRiskLevel: RiskLevel;
  confidenceScore: number; // 0 - 1
  ensembleVotes: {
    low: number;
    moderate: number;
    high: number;
    veryHigh: number;
  };
  featureImportances: {
    featureName: string;
    weightPercent: number;
    currentValue: string;
    impact: 'Low Hazard' | 'Moderate Concern' | 'Severe Risk';
  }[];
  algorithmName: string;
}

export interface RiskAnalysis {
  riskScore: number; // 0 - 100
  safetyScore: number; // 0 - 100
  riskLevel: RiskLevel;
  components: {
    weatherRisk: number; // 0 - 25
    rainfallRisk: number; // 0 - 30
    temperatureRisk: number; // 0 - 15
    windRisk: number; // 0 - 10
    visibilityRisk: number; // 0 - 10
    terrainRisk: number; // 0 - 10
  };
  explanation: string;
  recommendations: string[];
  severeWarning?: string;
  mlPrediction: MLPrediction;
}

export interface ChecklistItem {
  id: string;
  name: string;
  category: 'Clothing' | 'Gear' | 'Hydration & Food' | 'Medical & Safety' | 'Documents & Tech';
  mandatory: boolean;
  packed: boolean;
  reason?: string;
  isDynamicallyAdded?: boolean;
}

export interface UserPreferences {
  fitnessLevel: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  preferredDuration: 'Any' | 'Day Hike' | 'Weekend (2 Days)' | 'Multi-day Expedition';
  preferredTerrain: string[];
  hasMedicalCondition: boolean;
  medicalNotes: string;
  altitudeExperience: boolean;
}

export interface PlannedTrek {
  trekId: string;
  date: string;
  checklistItems: ChecklistItem[];
  notes?: string;
  savedAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  authProvider?: 'google' | 'email';
  avatarUrl?: string;
  preferences: UserPreferences;
  savedTrekIds: string[];
  plannedTreks: PlannedTrek[];
  pastAssessments: {
    id: string;
    trekId: string;
    trekName: string;
    date: string;
    safetyScore: number;
    riskLevel: RiskLevel;
    timestamp: string;
  }[];
}
