import { Trek } from '../types/trek';

export const TREKS_DATA: Trek[] = [
  {
    id: 'kudremukh',
    name: 'Kudremukh Trek',
    tagline: 'The iconic horse-faced peak amidst rolling Shola grasslands',
    city: 'Chikkamagaluru',
    state: 'Karnataka',
    region: 'Western Ghats, South India',
    difficulty: 'Moderate',
    distanceKm: 18,
    durationDays: 1,
    estimatedDurationHours: 8.5,
    maxAltitudeM: 1894,
    minAltitudeM: 800,
    elevationGainM: 1094,
    bestSeason: 'October to February',
    rating: 4.8,
    reviewsCount: 1420,
    estimatedCostINR: 2200,
    fitnessLevelRequired: 'Intermediate',
    shortDescription: 'Traverse endless emerald rolling hills, misty cloud forests, and crystalline streams in Karnataka’s protected national park.',
    detailedOverview: 'Kudremukh (meaning "Horse-face" in Kannada) is Karnataka’s third highest peak situated in Kudremukh National Park. The trail winds through dense Shola forests, multiple stream crossings, and sprawling meadows known as the Western Ghats grasslands. Trekking requires an official Forest Department permit and must be completed before sundown as camping on the peak is strictly prohibited for wildlife conservation.',
    terrainType: 'Dense Shola forest, loose mud, rolling grass slopes, granite boulders near the summit ridge.',
    wildlifeInfo: 'Lion-tailed macaques, spotted deer, Malabar giant squirrels, leeches in monsoon, and occasional leopard sightings.',
    waterAvailability: 'Plentiful natural fresh mountain streams up to the Ontimara tree landmark; purify before drinking.',
    campingAllowed: false,
    campingInfo: 'Peak camping banned by Forest Department. Homestays and eco-tents available at Mullodi base village.',
    highlights: ['Lush Shola forest cover', 'Ontimara (Lone Tree) viewpoint', 'Horse-face summit ridge', 'Crystal clear stream crossings', 'Panoramic 360° cloud blanket'],
    imageUrl: '/images/kudremukh.jpg',
    startPoint: {
      name: 'Mullodi Base Camp',
      lat: 13.2185,
      lng: 75.2530,
      elevationM: 850
    },
    summitPoint: {
      name: 'Kudremukh Peak',
      lat: 13.1360,
      lng: 75.2678,
      elevationM: 1894
    },
    routeCoordinates: [
      [13.2185, 75.2530],
      [13.2050, 75.2570],
      [13.1910, 75.2600],
      [13.1750, 75.2625],
      [13.1600, 75.2650],
      [13.1480, 75.2665],
      [13.1360, 75.2678]
    ],
    waypoints: [
      { id: 'km-1', name: 'Mullodi Base', type: 'start', lat: 13.2185, lng: 75.2530, elevationM: 850, description: 'Forest permit checkpost & jeep drop point' },
      { id: 'km-2', name: 'Somavati River Crossing', type: 'water', lat: 13.2050, lng: 75.2570, elevationM: 980, description: 'Fresh drinking water source' },
      { id: 'km-3', name: 'Ontimara (Lone Tree)', type: 'viewpoint', lat: 13.1750, lng: 75.2625, elevationM: 1450, description: 'Historic solitary tree landmark' },
      { id: 'km-4', name: 'Zig-Zag Ridge Trail', type: 'hazard', lat: 13.1500, lng: 75.2660, elevationM: 1720, description: 'Steep incline exposed to high winds' },
      { id: 'km-5', name: 'Kudremukh Summit', type: 'summit', lat: 13.1360, lng: 75.2678, elevationM: 1894, description: 'Horse-faced summit with stone cairn' }
    ],
    elevationProfile: [
      { distanceKm: 0, elevationM: 850, label: 'Mullodi Base' },
      { distanceKm: 2.5, elevationM: 980, label: 'Stream Crossing' },
      { distanceKm: 5.0, elevationM: 1250, label: 'Forest Exit' },
      { distanceKm: 6.8, elevationM: 1450, label: 'Ontimara Tree' },
      { distanceKm: 8.2, elevationM: 1720, label: 'Zig-Zag Ridge' },
      { distanceKm: 9.0, elevationM: 1894, label: 'Summit Peak' }
    ],
    emergencyInfo: {
      nearestHospital: 'Government Hospital Kalasa',
      hospitalDistanceKm: 18,
      hospitalPhone: '+91 8263 274222',
      policeStation: 'Kalasa Police Station',
      policePhone: '+91 8263 274333',
      forestRangeOffice: 'Kudremukh Wildlife Division, Karkala',
      forestPhone: '+91 8258 230057',
      nationalEmergency: '112',
      nearestTown: 'Kalasa / Balagal'
    }
  },
  {
    id: 'tadiandamol',
    name: 'Tadiandamol Trek',
    tagline: 'Highest peak of Coorg offering misty spice-valley views',
    city: 'Madikeri / Coorg',
    state: 'Karnataka',
    region: 'Kodagu, South India',
    difficulty: 'Easy',
    distanceKm: 7.5,
    durationDays: 1,
    estimatedDurationHours: 5,
    maxAltitudeM: 1748,
    minAltitudeM: 1100,
    elevationGainM: 648,
    bestSeason: 'September to March',
    rating: 4.7,
    reviewsCount: 1890,
    estimatedCostINR: 1500,
    fitnessLevelRequired: 'Beginner',
    shortDescription: 'Ideal beginner trek traversing coffee estates and fragrant shola vegetation to Coorg’s highest mountain crest.',
    detailedOverview: 'Tadiandamol is the highest mountain peak in Coorg (Kodagu) district. Starting near Nalknad Palace, the trail gently climbs past aromatic pepper and coffee plantations before ascending through the Big Rock landmark. The final stretch across the false summit opens up into sweeping vistas of the Arabian Sea clouds on clear winter mornings.',
    terrainType: 'Gravel estate road, packed dirt woodland path, grassy ridge crest.',
    wildlifeInfo: 'Hornbills, barking deer, flying squirrels, and tree frogs.',
    waterAvailability: 'Water available near Big Rock; carry 2L from the base.',
    campingAllowed: false,
    campingInfo: 'Overnight summit camping restricted. Government forest lodge and cottages available in Kakkabe.',
    highlights: ['Historic Nalknad Palace', 'Big Rock campsite area', 'Coffee and cardamom plantations', 'Rolling mist panoramas'],
    imageUrl: '/images/tadiandamol.jpg',
    startPoint: {
      name: 'Kakkabe Base / Palace Road',
      lat: 12.2468,
      lng: 75.6420,
      elevationM: 1100
    },
    summitPoint: {
      name: 'Tadiandamol Peak',
      lat: 12.2173,
      lng: 75.6105,
      elevationM: 1748
    },
    routeCoordinates: [
      [12.2468, 75.6420],
      [12.2390, 75.6320],
      [12.2310, 75.6240],
      [12.2240, 75.6180],
      [12.2173, 75.6105]
    ],
    waypoints: [
      { id: 'td-1', name: 'Palace Road Start', type: 'start', lat: 12.2468, lng: 75.6420, elevationM: 1100, description: 'Trailhead near Kakkabe village' },
      { id: 'td-2', name: 'Big Rock (Aramane)', type: 'camp', lat: 12.2310, lng: 75.6240, elevationM: 1420, description: 'Traditional resting boulder' },
      { id: 'td-3', name: 'False Summit Ridge', type: 'viewpoint', lat: 12.2240, lng: 75.6180, elevationM: 1610, description: 'Panoramic valley viewing shoulder' },
      { id: 'td-4', name: 'Tadiandamol Crest', type: 'summit', lat: 12.2173, lng: 75.6105, elevationM: 1748, description: 'Highest summit marker in Coorg' }
    ],
    elevationProfile: [
      { distanceKm: 0, elevationM: 1100, label: 'Kakkabe Base' },
      { distanceKm: 2.0, elevationM: 1240, label: 'Estate Boundary' },
      { distanceKm: 4.2, elevationM: 1420, label: 'Big Rock' },
      { distanceKm: 6.0, elevationM: 1610, label: 'False Summit' },
      { distanceKm: 7.5, elevationM: 1748, label: 'Tadiandamol Peak' }
    ],
    emergencyInfo: {
      nearestHospital: 'Community Health Centre Napoklu',
      hospitalDistanceKm: 14,
      hospitalPhone: '+91 8272 239244',
      policeStation: 'Napoklu Police Station',
      policePhone: '+91 8272 239222',
      forestRangeOffice: 'Virajpet Forest Range Office',
      forestPhone: '+91 8274 257444',
      nationalEmergency: '112',
      nearestTown: 'Kakkabe / Madikeri'
    }
  },
  {
    id: 'skandagiri',
    name: 'Skandagiri Sunrise Trek',
    tagline: 'Famous night hike to watch an ocean of clouds at dawn',
    city: 'Bengaluru / Chikkaballapur',
    state: 'Karnataka',
    region: 'South Deccan Plateau',
    difficulty: 'Moderate',
    distanceKm: 8,
    durationDays: 1,
    estimatedDurationHours: 5,
    maxAltitudeM: 1450,
    minAltitudeM: 950,
    elevationGainM: 500,
    bestSeason: 'Year-round (Best Nov–Feb for cloud blanket)',
    rating: 4.6,
    reviewsCount: 3100,
    estimatedCostINR: 1100,
    fitnessLevelRequired: 'Beginner',
    shortDescription: 'Night trek starting at 3 AM near Bengaluru, ascending through ancient ruined fortress walls to a surreal sunrise above the clouds.',
    detailedOverview: 'Skandagiri (also known as Kalavara Durga) is an ancient 18th-century hill fortress built by local palegars and later seized by Tipu Sultan. Located just 60 km from Bengaluru, it is one of India’s most popular sunrise hikes. Trekkers climb under moonlight and headlamps through rocky pathways and scrub jungle to reach the crumbling temple ruins right in time for the golden sunrise.',
    terrainType: 'Loose scree, rocky granite steps, thorns and boulders.',
    wildlifeInfo: 'Nocturnal owls, bats, civet cats, and monkeys.',
    waterAvailability: 'No water sources on the hill; carry minimum 2 liters from the base.',
    campingAllowed: false,
    campingInfo: 'Night camping is forbidden. Hiking is permitted between 3:30 AM and 9:00 AM under Karnataka Eco Tourism guidelines.',
    highlights: ['Cloud bed sunrise phenomenon', 'Historic Tipu Sultan fortress ruins', 'Panoramic sight of Nandi Hills', 'Starry night sky ascent'],
    imageUrl: '/images/skandagiri.jpg',
    startPoint: {
      name: 'Kalavara Village Base',
      lat: 13.4180,
      lng: 77.6840,
      elevationM: 950
    },
    summitPoint: {
      name: 'Kalavara Durga Fort Top',
      lat: 13.4300,
      lng: 77.6830,
      elevationM: 1450
    },
    routeCoordinates: [
      [13.4180, 77.6840],
      [13.4215, 77.6835],
      [13.4250, 77.6830],
      [13.4280, 77.6828],
      [13.4300, 77.6830]
    ],
    waypoints: [
      { id: 'sk-1', name: 'Kalavara Forest Gate', type: 'start', lat: 13.4180, lng: 77.6840, elevationM: 950, description: 'Karnataka Eco-Tourism QR check-in' },
      { id: 'sk-2', name: 'Old Fort Wall Rest Point', type: 'viewpoint', lat: 13.4250, lng: 77.6830, elevationM: 1210, description: 'Lower fortress gateway' },
      { id: 'sk-3', name: 'Temple Ruins Summit', type: 'summit', lat: 13.4300, lng: 77.6830, elevationM: 1450, description: 'Crest with Shiva temple ruins & cloud view' }
    ],
    elevationProfile: [
      { distanceKm: 0, elevationM: 950, label: 'Base Gate' },
      { distanceKm: 1.5, elevationM: 1080, label: 'Granite Slopes' },
      { distanceKm: 2.8, elevationM: 1250, label: 'Middle Bastion' },
      { distanceKm: 4.0, elevationM: 1450, label: 'Summit Ruins' }
    ],
    emergencyInfo: {
      nearestHospital: 'District Hospital Chikkaballapur',
      hospitalDistanceKm: 8,
      hospitalPhone: '+91 8156 272222',
      policeStation: 'Chikkaballapur Rural Police',
      policePhone: '+91 8156 272100',
      forestRangeOffice: 'Chikkaballapur Territorial Range',
      forestPhone: '+91 8156 273180',
      nationalEmergency: '112',
      nearestTown: 'Chikkaballapur / Bengaluru'
    }
  },
  {
    id: 'harishchandragad',
    name: 'Harishchandragad via Khireshwar',
    tagline: 'The jewel of the Sahyadris with the awe-inspiring Konkan Kada cliff',
    city: 'Ahmednagar / Pune / Mumbai',
    state: 'Maharashtra',
    region: 'Western Ghats, Sahyadri Range',
    difficulty: 'Difficult',
    distanceKm: 16,
    durationDays: 2,
    estimatedDurationHours: 10,
    maxAltitudeM: 1424,
    minAltitudeM: 650,
    elevationGainM: 774,
    bestSeason: 'October to February',
    rating: 4.9,
    reviewsCount: 2280,
    estimatedCostINR: 2800,
    fitnessLevelRequired: 'Advanced',
    shortDescription: 'Epic cliffside trek featuring the concave 1800-foot vertical Konkan Kada, ancient Kedareshwar cave temple, and Taramati peak.',
    detailedOverview: 'Harishchandragad is an ancient hill fort originating from the 6th-century Kalachuri dynasty. It is universally renowned for the Konkan Kada, a sheer semicircular overhang dropping over 1,800 feet into the Konkan plains that produces vertical wind gusts and circular rainbows (Brocken spectre). The trail from Khireshwar takes you past Tolar Khind rock-scramble with fixed iron railings, opening onto a vast plateau crowned by the exquisite Hemadpanthi temple of Harishchandreshwar.',
    terrainType: 'Exposed rock cliffs, iron-railing scrambles, streams, plateau paths, loose scree.',
    wildlifeInfo: 'Leopards in lower valleys, langurs, night scorpions, and raptors circling the cliffs.',
    waterAvailability: 'Potable water springs exist inside the ancient caves on top all year round.',
    campingAllowed: true,
    campingInfo: 'Tent camping allowed on the vast plateau or inside spacious historic caves.',
    highlights: ['The mighty Konkan Kada cliff', 'Kedareshwar Cave with 4-pillar water lingam', 'Taramati Peak viewpoint', 'Tolar Khind rock climb'],
    imageUrl: '/images/harishchandragad.jpg',
    startPoint: {
      name: 'Khireshwar Village',
      lat: 19.3900,
      lng: 73.8180,
      elevationM: 650
    },
    summitPoint: {
      name: 'Konkan Kada / Taramati Peak',
      lat: 19.3870,
      lng: 73.7780,
      elevationM: 1424
    },
    routeCoordinates: [
      [19.3900, 73.8180],
      [19.3870, 73.8050],
      [19.3840, 73.7920],
      [19.3855, 73.7840],
      [19.3870, 73.7780]
    ],
    waypoints: [
      { id: 'hc-1', name: 'Khireshwar Village Base', type: 'start', lat: 19.3900, lng: 73.8180, elevationM: 650, description: 'Village parking & local guide hub' },
      { id: 'hc-2', name: 'Tolar Khind Col', type: 'hazard', lat: 19.3870, lng: 73.8050, elevationM: 980, description: 'Steep rock climb with safety railings' },
      { id: 'hc-3', name: 'Harishchandreshwar Temple', type: 'water', lat: 19.3855, lng: 73.7840, elevationM: 1350, description: 'Ancient 6th century Hemadpanthi shrine' },
      { id: 'hc-4', name: 'Konkan Kada Cliff Edge', type: 'viewpoint', lat: 19.3870, lng: 73.7780, elevationM: 1424, description: 'Vertical crescent cliff looking west' }
    ],
    elevationProfile: [
      { distanceKm: 0, elevationM: 650, label: 'Khireshwar' },
      { distanceKm: 3.5, elevationM: 980, label: 'Tolar Khind' },
      { distanceKm: 5.5, elevationM: 1220, label: 'Plateau Entry' },
      { distanceKm: 7.0, elevationM: 1350, label: 'Temple & Caves' },
      { distanceKm: 8.0, elevationM: 1424, label: 'Konkan Kada' }
    ],
    emergencyInfo: {
      nearestHospital: 'Rural Hospital Otur / Junnar',
      hospitalDistanceKm: 26,
      hospitalPhone: '+91 2132 264244',
      policeStation: 'Otur Police Station',
      policePhone: '+91 2132 264233',
      forestRangeOffice: 'Junnar Forest Division',
      forestPhone: '+91 2132 222045',
      nationalEmergency: '112',
      nearestTown: 'Otur / Junnar / Alephata'
    }
  },
  {
    id: 'hampta-pass',
    name: 'Hampta Pass Trek',
    tagline: 'Crossover journey from Kullu’s lush green valleys into Spiti’s barren desert',
    city: 'Manali',
    state: 'Himachal Pradesh',
    region: 'Pir Panjal & Zanskar Ranges, Himalayas',
    difficulty: 'Difficult',
    distanceKm: 28,
    durationDays: 5,
    estimatedDurationHours: 24,
    maxAltitudeM: 4270,
    minAltitudeM: 2050,
    elevationGainM: 2220,
    bestSeason: 'June to September',
    rating: 4.9,
    reviewsCount: 1650,
    estimatedCostINR: 11500,
    fitnessLevelRequired: 'Advanced',
    shortDescription: 'Spectacular crossover trek shifting from pine forests of Manali to dramatic snow corridors and the moonscape deserts of Spiti.',
    detailedOverview: 'Hampta Pass is one of the most dramatically contrasting treks in the Himalayas. Starting from Jobra in the Kullu Valley, you hike past birch trees and cascading glacial streams to the campsite of Balu Ka Ghera. The pass climb crosses snow bridges and glacial moraines at 4,270m before suddenly opening up to the cold desert mountains of Lahaul. Most itineraries conclude with a visit to the high alpine Chandratal lake.',
    terrainType: 'Glacial moraine, snowfields, icy river crossings, boulder scree, high altitude passes.',
    wildlifeInfo: 'Himalayan marmots, monal pheasants, golden eagles, mountain goats (ibex).',
    waterAvailability: 'Glacial melt streams at regular intervals; water filter or tablets mandatory.',
    campingAllowed: true,
    campingInfo: 'Designated riverside meadows at Chikka, Balu Ka Ghera, and Shea Goru.',
    highlights: ['Dramatic crossover scenery change', 'Shea Goru river crossing', 'Balu Ka Ghera flower meadows', 'Chandratal Moon Lake visit', 'Snow chutes on the pass'],
    imageUrl: '/images/hampta_pass.jpg',
    startPoint: {
      name: 'Jobra Hydro Project',
      lat: 32.2530,
      lng: 77.2600,
      elevationM: 2800
    },
    summitPoint: {
      name: 'Hampta Pass Summit',
      lat: 32.2850,
      lng: 77.3780,
      elevationM: 4270
    },
    routeCoordinates: [
      [32.2530, 77.2600],
      [32.2610, 77.2900],
      [32.2700, 77.3250],
      [32.2800, 77.3550],
      [32.2850, 77.3780],
      [32.2950, 77.4100]
    ],
    waypoints: [
      { id: 'hp-1', name: 'Jobra Trailhead', type: 'start', lat: 32.2530, lng: 77.2600, elevationM: 2800, description: 'Drive end point & forest entry' },
      { id: 'hp-2', name: 'Chikka Campsite', type: 'camp', lat: 32.2610, lng: 77.2900, elevationM: 3100, description: 'Lush meadow by the river' },
      { id: 'hp-3', name: 'Balu Ka Ghera', type: 'camp', lat: 32.2700, lng: 77.3250, elevationM: 3600, description: 'Sandy river bed base camp' },
      { id: 'hp-4', name: 'Hampta Pass Crest', type: 'summit', lat: 32.2850, lng: 77.3780, elevationM: 4270, description: 'High pass dividing Kullu and Lahaul' },
      { id: 'hp-5', name: 'Shea Goru', type: 'water', lat: 32.2950, lng: 77.4100, elevationM: 3900, description: 'Glacial stream crossing camp' }
    ],
    elevationProfile: [
      { distanceKm: 0, elevationM: 2800, label: 'Jobra' },
      { distanceKm: 4.5, elevationM: 3100, label: 'Chikka Camp' },
      { distanceKm: 11.0, elevationM: 3600, label: 'Balu Ka Ghera' },
      { distanceKm: 17.5, elevationM: 4270, label: 'Hampta Pass' },
      { distanceKm: 23.0, elevationM: 3900, label: 'Shea Goru' },
      { distanceKm: 28.0, elevationM: 3350, label: 'Chattru' }
    ],
    emergencyInfo: {
      nearestHospital: 'Civil Hospital Manali',
      hospitalDistanceKm: 32,
      hospitalPhone: '+91 1902 252327',
      policeStation: 'Manali Police Station',
      policePhone: '+91 1902 252326',
      forestRangeOffice: 'Himachal Wildlife / Forest Department Manali',
      forestPhone: '+91 1902 252277',
      nationalEmergency: '112',
      nearestTown: 'Manali / Kaza'
    }
  },
  {
    id: 'kedarkantha',
    name: 'Kedarkantha Winter Summit',
    tagline: 'The undisputed classic winter summit trek in Uttarakhand',
    city: 'Dehradun / Sankri',
    state: 'Uttarakhand',
    region: 'Garhwal Himalayas',
    difficulty: 'Moderate',
    distanceKm: 20,
    durationDays: 4,
    estimatedDurationHours: 18,
    maxAltitudeM: 3810,
    minAltitudeM: 1950,
    elevationGainM: 1860,
    bestSeason: 'December to April (Winter) & May–June',
    rating: 4.8,
    reviewsCount: 2950,
    estimatedCostINR: 9200,
    fitnessLevelRequired: 'Intermediate',
    shortDescription: 'Pristine snow trails through dense pine and oak forests to a triangular pyramid summit with a 360° Himalayan view.',
    detailedOverview: 'Located inside Govind Wildlife Sanctuary, Kedarkantha is one of India’s most beloved summit treks. Starting from the charming wooden hamlet of Sankri, the trail winds through fragrant oak and pine forests, opening out to the frozen Juda Ka Tal lake. The final sunrise push over snow-covered slopes leads to the pyramid peak marked by a Trishul shrine, revealing Swargarohini, Bandarpoonch, and Black Peak.',
    terrainType: 'Pine forest mulch, deep winter snow, compact ice ridges, moraine stones.',
    wildlifeInfo: 'Himalayan brown bear signs, musk deer, snowcocks, and barking deer.',
    waterAvailability: 'Frozen streams in winter; melting snow or carrying thermal flasks required.',
    campingAllowed: true,
    campingInfo: 'Superb camping grounds at Juda Ka Tal and Kedarkantha Base Camp.',
    highlights: ['Frozen Juda Ka Tal lake', '360° view of 13 Himalayan peaks', 'Sunrise climb from base camp', 'Sankri cultural mountain village'],
    imageUrl: '/images/kedarkantha.jpg',
    startPoint: {
      name: 'Sankri Village',
      lat: 31.0770,
      lng: 78.1820,
      elevationM: 1950
    },
    summitPoint: {
      name: 'Kedarkantha Peak',
      lat: 31.0230,
      lng: 78.1720,
      elevationM: 3810
    },
    routeCoordinates: [
      [31.0770, 78.1820],
      [31.0600, 78.1780],
      [31.0450, 78.1750],
      [31.0320, 78.1730],
      [31.0230, 78.1720]
    ],
    waypoints: [
      { id: 'kk-1', name: 'Sankri Trailhead', type: 'start', lat: 31.0770, lng: 78.1820, elevationM: 1950, description: 'Village base & gear rental shops' },
      { id: 'kk-2', name: 'Juda Ka Tal', type: 'camp', lat: 31.0450, lng: 78.1750, elevationM: 2775, description: 'Frozen alpine lake campsite' },
      { id: 'kk-3', name: 'Kedarkantha Base Camp', type: 'camp', lat: 31.0320, lng: 78.1730, elevationM: 3400, description: 'High campsite facing the summit pyramid' },
      { id: 'kk-4', name: 'Kedarkantha Peak', type: 'summit', lat: 31.0230, lng: 78.1720, elevationM: 3810, description: 'Sacred Trishul summit marker' }
    ],
    elevationProfile: [
      { distanceKm: 0, elevationM: 1950, label: 'Sankri' },
      { distanceKm: 4.5, elevationM: 2775, label: 'Juda Ka Tal' },
      { distanceKm: 7.8, elevationM: 3400, label: 'Base Camp' },
      { distanceKm: 10.0, elevationM: 3810, label: 'Kedarkantha Summit' }
    ],
    emergencyInfo: {
      nearestHospital: 'Primary Health Centre Mori',
      hospitalDistanceKm: 22,
      hospitalPhone: '+91 1375 222108',
      policeStation: 'Mori Police Station',
      policePhone: '+91 1375 222100',
      forestRangeOffice: 'Govind Pashu Vihar National Park, Purola',
      forestPhone: '+91 1375 224212',
      nationalEmergency: '112',
      nearestTown: 'Mori / Purola / Dehradun'
    }
  },
  {
    id: 'kalsubai',
    name: 'Kalsubai Peak Trek',
    tagline: 'Conquer the highest mountain peak of Maharashtra (1,646 m)',
    city: 'Nashik / Igatpuri / Mumbai',
    state: 'Maharashtra',
    region: 'Kalsubai Harishchandragad Sanctuary',
    difficulty: 'Moderate',
    distanceKm: 6.6,
    durationDays: 1,
    estimatedDurationHours: 6,
    maxAltitudeM: 1646,
    minAltitudeM: 800,
    elevationGainM: 846,
    bestSeason: 'September to March',
    rating: 4.7,
    reviewsCount: 2600,
    estimatedCostINR: 1200,
    fitnessLevelRequired: 'Intermediate',
    shortDescription: 'The Everest of Maharashtra! Steel ladder climbs on vertical rock faces lead to the historic Kalsubai Devi shrine with sweeping views of Bhandardara lake.',
    detailedOverview: 'Kalsubai is the undisputed highest peak in Maharashtra. Located inside the Kalsubai Harishchandragad Wildlife Sanctuary, the route begins at Bari village. Four iron ladders bolted into vertical rock chimneys make the ascent thrilling yet accessible. At the summit, a small temple dedicated to Kalsubai Devi stands overlooking the Arthur Lake and surrounding Sahyadri fortresses like Alang, Madan, and Kulang.',
    terrainType: 'Rock ladders, steep gravel slopes, farmland pathways, exposed rock faces.',
    wildlifeInfo: 'Palm civets, green pit vipers in monsoon, butterflies, and eagles.',
    waterAvailability: 'Small refreshments shacks on the trail serve drinking water and lemon juice.',
    campingAllowed: false,
    campingInfo: 'No camping on the windswept summit; homestays at Bari village.',
    highlights: ['Steel ladder rock climbing', 'Summit temple of Kalsubai Devi', 'Panoramic views of Alang-Madan-Kulang forts', 'Arthur Lake reservoir vistas'],
    imageUrl: '/images/kalsubai.jpg',
    startPoint: {
      name: 'Bari Village',
      lat: 19.6015,
      lng: 73.7120,
      elevationM: 800
    },
    summitPoint: {
      name: 'Kalsubai Temple Peak',
      lat: 19.6010,
      lng: 73.6870,
      elevationM: 1646
    },
    routeCoordinates: [
      [19.6015, 73.7120],
      [19.6013, 73.7050],
      [19.6011, 73.6970],
      [19.6010, 73.6910],
      [19.6010, 73.6870]
    ],
    waypoints: [
      { id: 'kb-1', name: 'Bari Village Base', type: 'start', lat: 19.6015, lng: 73.7120, elevationM: 800, description: 'Village trailhead with parking' },
      { id: 'kb-2', name: 'First Iron Ladder', type: 'hazard', lat: 19.6013, lng: 73.7050, elevationM: 1100, description: 'Bolted vertical ladder section' },
      { id: 'kb-3', name: 'Final Ridge Ladder', type: 'hazard', lat: 19.6010, lng: 73.6910, elevationM: 1520, description: 'Exposed metal ladder to the ridge' },
      { id: 'kb-4', name: 'Kalsubai Summit', type: 'summit', lat: 19.6010, lng: 73.6870, elevationM: 1646, description: 'Highest temple point of Maharashtra' }
    ],
    elevationProfile: [
      { distanceKm: 0, elevationM: 800, label: 'Bari Village' },
      { distanceKm: 1.2, elevationM: 1050, label: 'Plateau Rest' },
      { distanceKm: 2.1, elevationM: 1320, label: 'Second Ladder' },
      { distanceKm: 3.3, elevationM: 1646, label: 'Kalsubai Peak' }
    ],
    emergencyInfo: {
      nearestHospital: 'Rural Hospital Ghoti / Igatpuri',
      hospitalDistanceKm: 28,
      hospitalPhone: '+91 2553 244222',
      policeStation: 'Ghoti Police Station',
      policePhone: '+91 2553 244233',
      forestRangeOffice: 'Igatpuri Forest Division',
      forestPhone: '+91 2553 244015',
      nationalEmergency: '112',
      nearestTown: 'Ghoti / Igatpuri / Nashik'
    }
  },
  {
    id: 'chembra-peak',
    name: 'Chembra Peak & Heart Lake',
    tagline: 'Wayanad’s crown peak featuring a naturally heart-shaped alpine lake',
    city: 'Wayanad / Meppadi',
    state: 'Kerala',
    region: 'Nilgiri Biosphere, Western Ghats',
    difficulty: 'Moderate',
    distanceKm: 7,
    durationDays: 1,
    estimatedDurationHours: 4.5,
    maxAltitudeM: 2100,
    minAltitudeM: 1200,
    elevationGainM: 900,
    bestSeason: 'September to March',
    rating: 4.7,
    reviewsCount: 1750,
    estimatedCostINR: 1600,
    fitnessLevelRequired: 'Beginner',
    shortDescription: 'Trek through rolling tea estates and high-altitude grasslands to the legendary Hridaya Saras heart-shaped mountain lake.',
    detailedOverview: 'Chembra Peak is the highest summit in Wayanad, towering over 2,100 meters above sea level. The trek commences from tea garden foothills near Meppadi and requires a permit from the VSS Forest Office. The primary destination is Hridaya Saras (Heart Lake), situated midway up the mountain at 1,500m, which has never been known to dry up even in the peak of summer.',
    terrainType: 'Tea garden slopes, red clay trail, steep grassy inclines, mist-covered rocks.',
    wildlifeInfo: 'Elephants in lower buffer zones, Malabar whistling thrushes, and deer.',
    waterAvailability: 'Carry drinking water from the base; drinking from the sacred lake is forbidden.',
    campingAllowed: false,
    campingInfo: 'No camping allowed on the mountain. Numerous resorts & homestays in Meppadi.',
    highlights: ['Natural heart-shaped lake (Hridaya Saras)', 'Rolling Meppadi tea estates', 'Nilgiri biosphere mountain vistas', 'Forest watchtower'],
    imageUrl: '/images/chembra.jpg',
    startPoint: {
      name: 'VSS Forest Office Chembra',
      lat: 11.5200,
      lng: 76.0880,
      elevationM: 1200
    },
    summitPoint: {
      name: 'Heart Lake (Hridaya Saras)',
      lat: 11.5120,
      lng: 76.0950,
      elevationM: 1530
    },
    routeCoordinates: [
      [11.5200, 76.0880],
      [11.5170, 76.0910],
      [11.5140, 76.0930],
      [11.5120, 76.0950]
    ],
    waypoints: [
      { id: 'cp-1', name: 'Forest Checkpost', type: 'start', lat: 11.5200, lng: 76.0880, elevationM: 1200, description: 'Permit desk & parking' },
      { id: 'cp-2', name: 'Watchtower', type: 'viewpoint', lat: 11.5170, lng: 76.0910, elevationM: 1350, description: 'Valley viewing deck' },
      { id: 'cp-3', name: 'Heart Lake', type: 'summit', lat: 11.5120, lng: 76.0950, elevationM: 1530, description: 'Perennial heart-shaped waterbody' }
    ],
    elevationProfile: [
      { distanceKm: 0, elevationM: 1200, label: 'Base Gate' },
      { distanceKm: 1.5, elevationM: 1350, label: 'Watchtower' },
      { distanceKm: 3.5, elevationM: 1530, label: 'Heart Lake' }
    ],
    emergencyInfo: {
      nearestHospital: 'Government Taluk Hospital Vythiri',
      hospitalDistanceKm: 16,
      hospitalPhone: '+91 4936 255224',
      policeStation: 'Meppadi Police Station',
      policePhone: '+91 4936 282240',
      forestRangeOffice: 'South Wayanad Forest Division Kalpetta',
      forestPhone: '+91 4936 202214',
      nationalEmergency: '112',
      nearestTown: 'Meppadi / Kalpetta'
    }
  },
  {
    id: 'dudhsagar',
    name: 'Dudhsagar Waterfalls Trail',
    tagline: 'Four-tiered sea of milk through the dense Bhagwan Mahaveer Sanctuary',
    city: 'Panaji / Kulem',
    state: 'Goa',
    region: 'Bhagwan Mahaveer National Park',
    difficulty: 'Easy',
    distanceKm: 12,
    durationDays: 1,
    estimatedDurationHours: 5,
    maxAltitudeM: 310,
    minAltitudeM: 50,
    elevationGainM: 260,
    bestSeason: 'October to May',
    rating: 4.6,
    reviewsCount: 1980,
    estimatedCostINR: 1800,
    fitnessLevelRequired: 'Beginner',
    shortDescription: 'Trek along railway tracks and river crossings through Goa’s pristine rainforest to witness India’s 5th tallest waterfall thunder down 310 meters.',
    detailedOverview: 'Dudhsagar ("Sea of Milk") is one of India’s most awe-inspiring waterfalls situated on the Mandovi River. Starting from Kulem railway station, hikers venture through the Bhagwan Mahaveer Wildlife Sanctuary. The trail skirts railway tunnels and jungle river crossings until the colossal waterfall comes into view, cascading over the famous arched railway bridge.',
    terrainType: 'Railway ballast, gravel jeep track, river crossings, jungle mud path.',
    wildlifeInfo: 'King cobras, leopards, gaurs (Indian bison), hornbills, and butterflies.',
    waterAvailability: 'Carry clean bottled or filtered water; stream water has seasonal mineral runoff.',
    campingAllowed: false,
    campingInfo: 'No camping near the waterfall. Hotels and eco-resorts available in Kulem and Mollem.',
    highlights: ['310m high four-tiered waterfall', 'Iconic train crossing the waterfall bridge', 'River crossings in Mollem forest', 'Natural plunge pool'],
    imageUrl: '/images/dudhsagar.jpg',
    startPoint: {
      name: 'Kulem Railway Station',
      lat: 15.3280,
      lng: 74.2480,
      elevationM: 60
    },
    summitPoint: {
      name: 'Dudhsagar Falls Base',
      lat: 15.3140,
      lng: 74.3140,
      elevationM: 310
    },
    routeCoordinates: [
      [15.3280, 74.2480],
      [15.3250, 74.2650],
      [15.3200, 74.2850],
      [15.3160, 74.3000],
      [15.3140, 74.3140]
    ],
    waypoints: [
      { id: 'ds-1', name: 'Kulem Base Station', type: 'start', lat: 15.3280, lng: 74.2480, elevationM: 60, description: 'Permit & life-jacket issuance point' },
      { id: 'ds-2', name: 'Mollem River Crossing', type: 'water', lat: 15.3200, lng: 74.2850, elevationM: 140, description: 'River ford with guide ropes' },
      { id: 'ds-3', name: 'Dudhsagar Base Pool', type: 'summit', lat: 15.3140, lng: 74.3140, elevationM: 310, description: 'Waterfall plunge pool' }
    ],
    elevationProfile: [
      { distanceKm: 0, elevationM: 60, label: 'Kulem' },
      { distanceKm: 4.0, elevationM: 120, label: 'Forest Gate' },
      { distanceKm: 8.5, elevationM: 210, label: 'River Crossing' },
      { distanceKm: 12.0, elevationM: 310, label: 'Dudhsagar Pool' }
    ],
    emergencyInfo: {
      nearestHospital: 'Primary Health Centre Dharbandora / Sanvordem',
      hospitalDistanceKm: 19,
      hospitalPhone: '+91 832 2612225',
      policeStation: 'Collem (Kulem) Police Station',
      policePhone: '+91 832 2612233',
      forestRangeOffice: 'Deputy Conservator of Forests, Mollem Range',
      forestPhone: '+91 832 2612211',
      nationalEmergency: '112',
      nearestTown: 'Kulem / Mollem / Ponda'
    }
  },
  {
    id: 'kumara-parvatha',
    name: 'Kumara Parvatha (Pushpagiri)',
    tagline: 'The toughest and most revered trek of the Western Ghats',
    city: 'Kukke Subramanya / Mangaluru',
    state: 'Karnataka',
    region: 'Pushpagiri Wildlife Sanctuary',
    difficulty: 'Challenging',
    distanceKm: 22,
    durationDays: 2,
    estimatedDurationHours: 14,
    maxAltitudeM: 1712,
    minAltitudeM: 150,
    elevationGainM: 1562,
    bestSeason: 'October to February',
    rating: 4.9,
    reviewsCount: 1840,
    estimatedCostINR: 2500,
    fitnessLevelRequired: 'Expert',
    shortDescription: 'A grueling 1,560m elevation gain from Kukke Subramanya temple through dense jungle, Bhattara Mane, and Shesha Parvatha to Pushpagiri peak.',
    detailedOverview: 'Kumara Parvatha is legendary among Indian trekkers as one of the most physically demanding endurance tests in South India. Rising sheerly from the coastal belt at 150m to over 1,712m, it requires ascending nearly 1.5 vertical kilometers. Hikers stop at the iconic "Bhattara Mane" homestead for traditional meal fuel and water replenishment before tackling the steep Shesha Parvatha ridge and the final boulder field to the summit.',
    terrainType: 'Dense rainforest, slippery roots, steep granite slabs, exposed windblown ridges.',
    wildlifeInfo: 'King cobras, Asian elephants in lower jungles, leeches in monsoon, sambar deer.',
    waterAvailability: 'Water exclusively at Bhattara Mane (approx halfway). None on the upper ridge; carry minimum 3.5 liters past Bhattara Mane.',
    campingAllowed: false,
    campingInfo: 'Camping permitted only at the Forest Department camp area near Bhattara Mane. No camping on the peak.',
    highlights: ['Shesha Parvatha serpent-hood cliff', 'Historic Bhattara Mane lunch experience', 'Pushpagiri temple summit stone', 'Overwhelming 1.5 km vertical climb'],
    imageUrl: '/images/meesapulimala.jpg',
    startPoint: {
      name: 'Kukke Subramanya Temple Base',
      lat: 12.6780,
      lng: 75.6150,
      elevationM: 150
    },
    summitPoint: {
      name: 'Kumara Parvatha Peak',
      lat: 12.6710,
      lng: 75.6880,
      elevationM: 1712
    },
    routeCoordinates: [
      [12.6780, 75.6150],
      [12.6750, 75.6400],
      [12.6730, 75.6550],
      [12.6720, 75.6700],
      [12.6710, 75.6880]
    ],
    waypoints: [
      { id: 'kp-1', name: 'Kukke Temple Trailhead', type: 'start', lat: 12.6780, lng: 75.6150, elevationM: 150, description: 'Trail start behind temple' },
      { id: 'kp-2', name: 'Bhattara Mane', type: 'camp', lat: 12.6730, lng: 75.6550, elevationM: 950, description: 'Famous hospitality house & food' },
      { id: 'kp-3', name: 'Forest Department Checkpost', type: 'hazard', lat: 12.6725, lng: 75.6580, elevationM: 1020, description: 'Permit inspection & bag plastic check' },
      { id: 'kp-4', name: 'Shesha Parvatha Ridge', type: 'viewpoint', lat: 12.6720, lng: 75.6700, elevationM: 1550, description: 'Cobra hood cliff looking into the abyss' },
      { id: 'kp-5', name: 'Kumara Parvatha Summit', type: 'summit', lat: 12.6710, lng: 75.6880, elevationM: 1712, description: 'Final high point in Pushpagiri' }
    ],
    elevationProfile: [
      { distanceKm: 0, elevationM: 150, label: 'Kukke Base' },
      { distanceKm: 6.0, elevationM: 950, label: 'Bhattara Mane' },
      { distanceKm: 8.5, elevationM: 1550, label: 'Shesha Parvatha' },
      { distanceKm: 11.0, elevationM: 1712, label: 'KP Summit' }
    ],
    emergencyInfo: {
      nearestHospital: 'Community Health Centre Sullia',
      hospitalDistanceKm: 24,
      hospitalPhone: '+91 8257 230222',
      policeStation: 'Subramanya Police Station',
      policePhone: '+91 8257 281233',
      forestRangeOffice: 'Pushpagiri Wildlife Range Office, Subramanya',
      forestPhone: '+91 8257 281440',
      nationalEmergency: '112',
      nearestTown: 'Subramanya / Sullia / Mangaluru'
    }
  },
  {
    id: 'triund',
    name: 'Triund Ridge Trek',
    tagline: 'The magnificent ridge below the snowbound Dhauladhar range',
    city: 'Dharamshala / McLeod Ganj',
    state: 'Himachal Pradesh',
    region: 'Kangra Valley, Himalayas',
    difficulty: 'Easy',
    distanceKm: 9,
    durationDays: 1,
    estimatedDurationHours: 5.5,
    maxAltitudeM: 2828,
    minAltitudeM: 1750,
    elevationGainM: 1078,
    bestSeason: 'March to June & September to December',
    rating: 4.8,
    reviewsCount: 3800,
    estimatedCostINR: 1900,
    fitnessLevelRequired: 'Beginner',
    shortDescription: 'One of the most rewarding beginner day treks in the Himalayas, climbing through rhododendron forests right to the foot of massive snowy Dhauladhar walls.',
    detailedOverview: 'Triund is the tranquil crown of Dharamshala, perched on a tranquil ridge overlooking the Kangra Valley on one side and the towering Dhauladhar mountains on the other. Starting from Galu Devi temple above McLeod Ganj, the trail winds past Magic View Cafe through pine and oak woods. The final climb through 22 steep switchbacks (dubbed "22 Curves") delivers trekkers onto a grassy ridge with front-row views of Mun Peak.',
    terrainType: 'Cobbled stone paths, pine root switchbacks, alpine ridge grass.',
    wildlifeInfo: 'Lammergeier vultures, monal pheasants, mountain goats.',
    waterAvailability: 'Tea stalls along the route offer bottled and boiled water.',
    campingAllowed: true,
    campingInfo: 'Private camp operators rent tents on the ridge; forest rest house also available.',
    highlights: ['Jaw-dropping proximity to Dhauladhar peaks', 'Panoramic sunset over Kangra Valley', 'Historic Magic View Cafe', 'Starlit night camping'],
    imageUrl: '/images/triund.jpg',
    startPoint: {
      name: 'Galu Devi Temple Trailhead',
      lat: 32.2570,
      lng: 76.3320,
      elevationM: 2130
    },
    summitPoint: {
      name: 'Triund Ridge Meadow',
      lat: 32.2740,
      lng: 76.3550,
      elevationM: 2828
    },
    routeCoordinates: [
      [32.2570, 76.3320],
      [32.2620, 76.3380],
      [32.2680, 76.3450],
      [32.2710, 76.3510],
      [32.2740, 76.3550]
    ],
    waypoints: [
      { id: 'tr-1', name: 'Galu Devi Temple', type: 'start', lat: 32.2570, lng: 76.3320, elevationM: 2130, description: 'Trailhead checkpost' },
      { id: 'tr-2', name: 'Magic View Cafe', type: 'water', lat: 32.2650, lng: 76.3420, elevationM: 2500, description: 'Historic mountain teahouse' },
      { id: 'tr-3', name: '22 Curves (Switchbacks)', type: 'hazard', lat: 12.2710, lng: 76.3510, elevationM: 2710, description: 'Steep final climb' },
      { id: 'tr-4', name: 'Triund Ridge', type: 'summit', lat: 32.2740, lng: 76.3550, elevationM: 2828, description: 'Panoramic meadow beneath Dhauladhar' }
    ],
    elevationProfile: [
      { distanceKm: 0, elevationM: 2130, label: 'Galu Temple' },
      { distanceKm: 2.2, elevationM: 2500, label: 'Magic View' },
      { distanceKm: 3.8, elevationM: 2710, label: '22 Curves' },
      { distanceKm: 4.5, elevationM: 2828, label: 'Triund Ridge' }
    ],
    emergencyInfo: {
      nearestHospital: 'Zonal Hospital Dharamshala',
      hospitalDistanceKm: 12,
      hospitalPhone: '+91 1892 222141',
      policeStation: 'McLeod Ganj Police Station',
      policePhone: '+91 1892 221483',
      forestRangeOffice: 'Dharamshala Forest Division',
      forestPhone: '+91 1892 223126',
      nationalEmergency: '112',
      nearestTown: 'McLeod Ganj / Dharamshala'
    }
  }
];

export const POPULAR_LOCATIONS = [
  'Karnataka',
  'Bengaluru',
  'Maharashtra',
  'Himachal Pradesh',
  'Uttarakhand',
  'Kerala',
  'Goa',
  'Tamil Nadu'
];
