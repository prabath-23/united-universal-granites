// Illustrative export-footprint data for the Global Reach map — demo figures,
// not real shipment volumes. `id` matches the numeric ISO 3166-1 code used as
// the path id in public/images/world-map.svg (id="c<code>").
// tier: 4 = primary market, 3 = established, 2 = growing, 1 = emerging.

export const tierLabels = {
  4: 'Primary market',
  3: 'Established',
  2: 'Growing',
  1: 'Emerging',
}

export const exportCountries = [
  { id: 'c840', name: 'United States', tier: 4 },
  { id: 'c826', name: 'United Kingdom', tier: 4 },
  { id: 'c036', name: 'Australia', tier: 4 },

  { id: 'c124', name: 'Canada', tier: 3 },
  { id: 'c276', name: 'Germany', tier: 3 },
  { id: 'c380', name: 'Italy', tier: 3 },
  { id: 'c724', name: 'Spain', tier: 3 },
  { id: 'c250', name: 'France', tier: 3 },
  { id: 'c392', name: 'Japan', tier: 3 },
  { id: 'c410', name: 'South Korea', tier: 3 },

  { id: 'c372', name: 'Ireland', tier: 2 },
  { id: 'c528', name: 'Netherlands', tier: 2 },
  { id: 'c056', name: 'Belgium', tier: 2 },
  { id: 'c554', name: 'New Zealand', tier: 2 },
  { id: 'c156', name: 'China', tier: 2 },
  { id: 'c784', name: 'United Arab Emirates', tier: 2 },
  { id: 'c682', name: 'Saudi Arabia', tier: 2 },

  { id: 'c620', name: 'Portugal', tier: 1 },
  { id: 'c756', name: 'Switzerland', tier: 1 },
  { id: 'c040', name: 'Austria', tier: 1 },
  { id: 'c634', name: 'Qatar', tier: 1 },
  { id: 'c414', name: 'Kuwait', tier: 1 },
  { id: 'c458', name: 'Malaysia', tier: 1 },
]
