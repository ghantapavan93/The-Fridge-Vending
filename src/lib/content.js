// Central copy + data. Marketing copy provided by the client, used verbatim.

export const BRAND = {
  name: 'The Fridge',
  full: 'The Fridge Vending',
  domain: 'TheFridgeVending.com',
  tagline: 'Fresh Snacks, Cold Drinks, Happy Teams.',
  contactName: 'Joshua Bailey',
  contactTitle: 'President',
  phone: '512-923-9313',
  phoneHref: 'tel:+15129239313',
  // Placeholder until the official inbox is live.
  email: 'hello@thefridgevending.com',
}

// Kinetic hero tagline — "Get what you want." then the word cycles.
export const HERO_ROTATING = [
  'want',
  'crave',
  'need',
  'love',
  'forgot',
]

// The craving nouns that flip after "Get your…" — used in the rotating hero line.
export const CRAVINGS = [
  { word: 'energy', emoji: '⚡', color: 'var(--color-cherry-500)' },
  { word: 'ice-cold water', emoji: '💧', color: 'var(--color-sky-500)' },
  { word: 'a real lunch', emoji: '🍱', color: 'var(--color-mango-500)' },
  { word: 'something healthy', emoji: '🥗', color: 'var(--color-fresh-500)' },
  { word: 'a treat', emoji: '🍫', color: 'var(--color-sun-400)' },
  { word: 'a toy for the kids', emoji: '🧸', color: 'var(--color-berry-500)' },
]

// Punchy taglines used across sections / meta.
export const TAGLINES = {
  primary: 'Get What You Want.',
  hero: 'Fresh Snacks, Cold Drinks, Happy Teams.',
  refresh: 'Refresh. Recharge. Perform.',
  options: [
    'Cravings, met. Instantly.',
    'The break room, reinvented.',
    'Your space just got an upgrade. On us.',
    'Cold drinks. Fresh snacks. Zero effort.',
    'Vending, but make it smart.',
  ],
}

// Curated jaw-droppers — the lines meant to stick in someone's head.
export const ONE_LINERS = [
  'The craving hits. We’re already there.',
  'Tap. Grab. Gone in sixty seconds.',
  'All the upgrade. None of the cost.',
  'If they crave it, we can stock it.',
  'Cold, close, and already stocked.',
  'Waiting just got worth it.',
  'The amenity your people brag about.',
  'Refresh. Recharge. Perform.',
]

// Cinematic brand manifesto — revealed line by line.
export const MANIFESTO = {
  eyebrow: 'Why The Fridge',
  lines: [
    { text: 'Somewhere between the craving', accent: false },
    { text: 'and the counter,', accent: false },
    { text: 'there should be a better way.', accent: false },
    { text: 'There is.', accent: true },
  ],
  tail: 'Cold. Close. Already stocked with exactly what your people want, and it costs you nothing.',
}

// Animated proof band.
export const STATS = [
  { value: 0, suffix: '', prefix: '$', label: 'Cost to host', display: '0' },
  { value: 24, suffix: '/7', label: 'Always open' },
  { value: 60, suffix: 's', label: 'Tap-to-go checkout' },
  { value: 100, suffix: '%', label: 'Customized to you' },
]

// The smart-vending flow (matches the callouts printed on the machine).
export const FLOW = [
  { k: 'Swipe or Tap', d: 'Unlock the door with a card or phone. No app, no fuss.', icon: 'phone' },
  { k: 'Grab Your Items', d: 'Take exactly what you want. Smart sensors do the rest.', icon: 'check' },
  { k: 'Auto-Checkout in 60s', d: 'Close the door and you’re charged automatically. Done.', icon: 'bolt' },
]

export const NAV_LINKS = [
  { label: 'What It Is', href: '#what' },
  { label: 'Perfect For', href: '#perfect-for' },
  { label: 'Stock', href: '#stock' },
  { label: 'How It Works', href: '#how' },
  { label: 'Why Host', href: '#why' },
]

// Product Universe belt
export const PRODUCTS = [
  { label: 'Energy Drinks', color: 'var(--color-cherry-500)', emoji: '⚡' },
  { label: 'Bottled Water', color: 'var(--color-sky-500)', emoji: '💧' },
  { label: 'Sparkling Drinks', color: 'var(--color-sky-400)', emoji: '🫧' },
  { label: 'Sodas & Teas', color: 'var(--color-mango-500)', emoji: '🥤' },
  { label: 'Healthy Snacks', color: 'var(--color-fresh-500)', emoji: '🥗' },
  { label: 'Protein Bars', color: 'var(--color-navy-700)', emoji: '💪' },
  { label: 'Chips & Candy', color: 'var(--color-sun-400)', emoji: '🍫' },
  { label: 'Lunch Items', color: 'var(--color-mango-500)', emoji: '🍱' },
  { label: 'Sandwiches & Wraps', color: 'var(--color-fresh-400)', emoji: '🥪' },
  { label: 'Fresh Grab-and-Go', color: 'var(--color-fresh-500)', emoji: '🍎' },
  { label: 'Small Toys', color: 'var(--color-berry-500)', emoji: '🧸' },
  { label: "Children's Puzzles", color: 'var(--color-berry-500)', emoji: '🧩' },
  { label: 'Everyday Convenience', color: 'var(--color-navy-800)', emoji: '✨' },
]

// "What Can Go Inside?" category cards
export const STOCK_CATEGORIES = [
  {
    title: 'Energy & Bottled Drinks',
    icon: 'bolt',
    tint: 'var(--color-cherry-500)',
    body: 'Energy drinks, bottled water, sparkling water, sodas, teas, juices, and sports drinks, ice-cold and ready to grab.',
  },
  {
    title: 'Healthy Snacks',
    icon: 'leaf',
    tint: 'var(--color-fresh-500)',
    body: 'Trail mix, crackers, nuts, veggie chips, and better-for-you options for people who want a lighter pick.',
  },
  {
    title: 'Protein & Grab-and-Go',
    icon: 'bolt2',
    tint: 'var(--color-navy-700)',
    body: 'Protein bars, jerky, yogurt, and quick-energy snacks for busy customers and staff on the move.',
  },
  {
    title: 'Lunch Items',
    icon: 'box',
    tint: 'var(--color-mango-500)',
    body: 'Sandwiches, wraps, salads, fresh snacks, and ready-to-eat meal boxes for the midday crowd.',
  },
  {
    title: 'Candy & Chips',
    icon: 'candy',
    tint: 'var(--color-sun-400)',
    body: 'The classic favorites: chips, cookies, chocolate, and candy for when only a treat will do.',
  },
  {
    title: 'Toys & Puzzles for Kids',
    icon: 'puzzle',
    tint: 'var(--color-berry-500)',
    body: 'Small toys, puzzles, and activity items to keep children happy in waiting rooms and family spaces.',
  },
  {
    title: 'Everyday Convenience',
    icon: 'sparkle',
    tint: 'var(--color-sky-500)',
    body: 'The mix flexes to your location, adjusted around what your customers, employees, and residents actually reach for.',
  },
]

export const STEPS = [
  {
    n: '01',
    title: 'Tell us about your location',
    body: 'We learn about your business, your customers, your employees, and the type of traffic your space gets.',
  },
  {
    n: '02',
    title: 'We customize the product mix',
    body: 'The selection is built around your space: energy drinks, healthy snacks, lunch items, kid-friendly products, or a mix of everything.',
  },
  {
    n: '03',
    title: 'The machine is placed at no charge',
    body: 'The Fridge is delivered and installed in your location at no cost to your business.',
  },
  {
    n: '04',
    title: 'People grab what they want',
    body: 'Customers, employees, and residents get quick access to convenient items without leaving the building.',
  },
]

export const BENEFITS = [
  {
    icon: 'gift',
    title: 'No cost to host',
    body: 'Bring a modern convenience amenity into your space without buying or maintaining a machine.',
  },
  {
    icon: 'sliders',
    title: 'Customized product mix',
    body: 'Stock exactly the items your customers, employees, or residents are most likely to want.',
  },
  {
    icon: 'sofa',
    title: 'Better waiting-room experience',
    body: 'Give customers something genuinely useful while they wait on your service.',
  },
  {
    icon: 'users',
    title: 'Convenient for employees',
    body: 'Help staff stay on-site for snacks, cold drinks, and quick meals throughout the day.',
  },
  {
    icon: 'home',
    title: 'Great for residents & families',
    body: 'A simple, modern amenity that makes an apartment community feel more convenient.',
  },
  {
    icon: 'cpu',
    title: 'Smart, modern vending',
    body: 'A cleaner, faster, more flexible grab-and-go experience than traditional vending.',
  },
]

export const AUDIENCES = [
  {
    key: 'auto',
    label: 'Auto Repair Shops',
    tint: 'var(--color-sky-500)',
    headline: 'Make the wait the best part.',
    body: 'Ideal for repair shops, tire shops, service centers, and dealerships with waiting rooms. Customers can grab a drink, a snack, a lunch item, or something for their child while their vehicle is serviced.',
    points: [
      'Customer waiting rooms',
      'Service departments',
      'Employee break areas',
      'Family-friendly businesses',
    ],
  },
  {
    key: 'apartments',
    label: 'Apartment Communities',
    tint: 'var(--color-fresh-500)',
    headline: 'The amenity residents actually brag about.',
    body: 'Give residents easy access to snacks, drinks, quick meals, and everyday favorites without leaving the property. A simple amenity that makes the community feel more convenient and modern.',
    points: [
      'Clubhouses',
      'Leasing offices',
      'Fitness centers',
      'Mailroom & package areas',
      'Shared resident spaces',
    ],
  },
  {
    key: 'employees',
    label: 'Employee Spaces',
    tint: 'var(--color-mango-500)',
    headline: 'Keep your team fueled without leaving the building.',
    body: 'Break rooms and employee areas stay stocked with the cold drinks, quick meals, and snacks your people actually want, right where they work.',
    points: [
      'Break rooms',
      'Warehouses & shops',
      'Offices & studios',
      'High-traffic staff areas',
    ],
  },
]

export const LOCATION_TYPES = [
  'Auto repair shop',
  'Tire shop / service center',
  'Car dealership',
  'Apartment community',
  'Office / employee break room',
  'Gym / fitness center',
  'Other high-traffic location',
]
