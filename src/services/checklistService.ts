import { ChecklistItem, Trek, WeatherData } from '../types/trek';

export function generateSmartChecklist(trek: Trek, weather?: WeatherData): ChecklistItem[] {
  const items: ChecklistItem[] = [
    // Basic Items
    {
      id: 'base-shoes',
      name: 'Ankle-support Trekking Shoes',
      category: 'Gear',
      mandatory: true,
      packed: false,
      reason: 'Essential for traction on gravel, boulders, and inclines'
    },
    {
      id: 'base-backpack',
      name: `${trek.durationDays > 1 ? '50–65L' : '20–30L'} Ergonomic Backpack`,
      category: 'Gear',
      mandatory: true,
      packed: false,
      reason: 'Distributes weight and carries essential supplies'
    },
    {
      id: 'base-water',
      name: 'Hydration Bladder or 2-3L Water Bottles',
      category: 'Hydration & Food',
      mandatory: true,
      packed: false,
      reason: 'Critical to prevent high-altitude dehydration and fatigue'
    },
    {
      id: 'base-firstaid',
      name: 'Wilderness First-Aid Kit & Bandages',
      category: 'Medical & Safety',
      mandatory: true,
      packed: false,
      reason: 'Cuts, sprains, antiseptic wipes, and pain relief'
    },
    {
      id: 'base-torch',
      name: 'LED Headlamp / Torch + Spare Batteries',
      category: 'Gear',
      mandatory: true,
      packed: false,
      reason: 'Vital for pre-dawn starts or unexpected trail delays'
    },
    {
      id: 'base-powerbank',
      name: 'High-Capacity Power Bank (10,000–20,000 mAh)',
      category: 'Documents & Tech',
      mandatory: true,
      packed: false,
      reason: 'Keeps GPS tracking and emergency communication active'
    },
    {
      id: 'base-snacks',
      name: 'High-Energy Trail Mix, Nuts & ORS Salts',
      category: 'Hydration & Food',
      mandatory: true,
      packed: false,
      reason: 'Rapid glycogen replenishment and electrolyte balance'
    },
    {
      id: 'base-id',
      name: 'Government ID & Forest Permits Proof',
      category: 'Documents & Tech',
      mandatory: true,
      packed: false,
      reason: 'Mandatory for Forest Department checkpoint clearance'
    },
    {
      id: 'base-sun',
      name: 'UV400 Polarized Sunglasses & High-SPF Sunscreen',
      category: 'Clothing',
      mandatory: false,
      packed: false,
      reason: 'Protection against intense solar radiation and snow glare'
    },
    {
      id: 'base-clothes',
      name: 'Quick-Dry Synthetic T-shirts & Trek Pants',
      category: 'Clothing',
      mandatory: true,
      packed: false,
      reason: 'Cotton absorbs sweat; synthetics stay dry and warm'
    },
    {
      id: 'base-whistle',
      name: 'Emergency SOS Whistle',
      category: 'Medical & Safety',
      mandatory: true,
      packed: false,
      reason: 'Audible over river roar and high winds during rescue'
    }
  ];

  // Smart Conditional Additions:

  // 1. Rain Condition (Rain probability > 50% or precipitation > 5mm)
  if (weather && (weather.rainProbability > 50 || weather.precipitationMm > 4)) {
    items.push(
      {
        id: 'smart-raincoat',
        name: 'Seam-Sealed Rain Poncho / Waterproof Jacket',
        category: 'Clothing',
        mandatory: true,
        packed: false,
        reason: `Triggered by ${weather.rainProbability}% rain forecast`,
        isDynamicallyAdded: true
      },
      {
        id: 'smart-bagcover',
        name: 'Waterproof Backpack Rain Cover',
        category: 'Gear',
        mandatory: true,
        packed: false,
        reason: 'Prevents pack soaking and equipment damage',
        isDynamicallyAdded: true
      },
      {
        id: 'smart-pouch',
        name: 'Waterproof Dry Pouch for Phone & Electronics',
        category: 'Documents & Tech',
        mandatory: true,
        packed: false,
        reason: 'Shields sensitive electronics in downpours',
        isDynamicallyAdded: true
      },
      {
        id: 'smart-socks',
        name: 'Extra Quick-Dry Merino Wool Socks (2 Pairs)',
        category: 'Clothing',
        mandatory: false,
        packed: false,
        reason: 'Wet feet cause rapid blister formation',
        isDynamicallyAdded: true
      }
    );
  }

  // 2. Cold Condition (Temperature < 12°C or high altitude > 2500m)
  if ((weather && weather.tempC < 12) || trek.maxAltitudeM > 2500) {
    items.push(
      {
        id: 'smart-thermal',
        name: 'Thermal Base Layer (Top & Bottom)',
        category: 'Clothing',
        mandatory: true,
        packed: false,
        reason: `Triggered by chilly temperature (${weather ? weather.tempC : '~8'}°C) / high altitude`,
        isDynamicallyAdded: true
      },
      {
        id: 'smart-fleece',
        name: 'Fleece Mid-Layer & Down Puffer Jacket',
        category: 'Clothing',
        mandatory: true,
        packed: false,
        reason: 'Critical warmth retention at altitude',
        isDynamicallyAdded: true
      },
      {
        id: 'smart-gloves',
        name: 'Insulated Windproof Mountain Gloves',
        category: 'Clothing',
        mandatory: true,
        packed: false,
        reason: 'Prevents finger numbness and wind chill frostnip',
        isDynamicallyAdded: true
      },
      {
        id: 'smart-beanie',
        name: 'Warm Woolen Cap / Balaclava',
        category: 'Clothing',
        mandatory: true,
        packed: false,
        reason: 'Head is the highest heat loss surface in cold air',
        isDynamicallyAdded: true
      }
    );
  }

  // 3. Multi-day Duration (> 1 day)
  if (trek.durationDays > 1) {
    items.push(
      {
        id: 'smart-tent',
        name: 'Alpine 3-Season Waterproof Tent',
        category: 'Gear',
        mandatory: true,
        packed: false,
        reason: `Multi-day expedition (${trek.durationDays} days)`,
        isDynamicallyAdded: true
      },
      {
        id: 'smart-sleepingbag',
        name: 'Sub-Zero Rated Sleeping Bag & Insulated Mat',
        category: 'Gear',
        mandatory: true,
        packed: false,
        reason: 'Prevents ground conductive heat drain while camping',
        isDynamicallyAdded: true
      },
      {
        id: 'smart-purifier',
        name: 'Water Filtration Bottle / Chlorine Purification Tablets',
        category: 'Hydration & Food',
        mandatory: true,
        packed: false,
        reason: 'Disinfects natural river and stream water',
        isDynamicallyAdded: true
      },
      {
        id: 'smart-stove',
        name: 'Compact Camping Stove & Fuel Canister',
        category: 'Hydration & Food',
        mandatory: false,
        packed: false,
        reason: 'Cooking hot meals on multi-day trails',
        isDynamicallyAdded: true
      }
    );
  }

  // 4. Strenuous / Difficult Terrain
  if (trek.difficulty === 'Difficult' || trek.difficulty === 'Challenging') {
    items.push(
      {
        id: 'smart-poles',
        name: 'Pair of Adjustable Trekking Poles',
        category: 'Gear',
        mandatory: true,
        packed: false,
        reason: 'Reduces knee joint impact by up to 25% on descents',
        isDynamicallyAdded: true
      },
      {
        id: 'smart-blister',
        name: 'Blister Moleskin Tape & Zinc Oxide Strapping',
        category: 'Medical & Safety',
        mandatory: true,
        packed: false,
        reason: 'Strenuous distance and elevation terrain mitigation',
        isDynamicallyAdded: true
      }
    );
  }

  return items;
}
