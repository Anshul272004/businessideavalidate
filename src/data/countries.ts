// Country and state data for geographic intelligence

export interface Country {
  code: string;
  name: string;
  flag: string;
  startupHub: boolean;
  states?: { code: string; name: string }[];
}

export const countries: Country[] = [
  {
    code: "US",
    name: "United States",
    flag: "🇺🇸",
    startupHub: true,
    states: [
      { code: "CA", name: "California" },
      { code: "NY", name: "New York" },
      { code: "TX", name: "Texas" },
      { code: "FL", name: "Florida" },
      { code: "MA", name: "Massachusetts" },
      { code: "WA", name: "Washington" },
      { code: "CO", name: "Colorado" },
      { code: "GA", name: "Georgia" },
      { code: "IL", name: "Illinois" },
      { code: "OTHER", name: "Other States" },
    ],
  },
  {
    code: "IN",
    name: "India",
    flag: "🇮🇳",
    startupHub: true,
    states: [
      { code: "MH", name: "Maharashtra" },
      { code: "KA", name: "Karnataka" },
      { code: "DL", name: "Delhi NCR" },
      { code: "TN", name: "Tamil Nadu" },
      { code: "TG", name: "Telangana" },
      { code: "GJ", name: "Gujarat" },
      { code: "WB", name: "West Bengal" },
      { code: "RJ", name: "Rajasthan" },
      { code: "UP", name: "Uttar Pradesh" },
      { code: "OTHER", name: "Other States" },
    ],
  },
  {
    code: "GB",
    name: "United Kingdom",
    flag: "🇬🇧",
    startupHub: true,
    states: [
      { code: "LON", name: "London" },
      { code: "MAN", name: "Manchester" },
      { code: "BRM", name: "Birmingham" },
      { code: "EDI", name: "Edinburgh" },
      { code: "OTHER", name: "Other Regions" },
    ],
  },
  {
    code: "DE",
    name: "Germany",
    flag: "🇩🇪",
    startupHub: true,
    states: [
      { code: "BE", name: "Berlin" },
      { code: "BY", name: "Bavaria (Munich)" },
      { code: "HE", name: "Hesse (Frankfurt)" },
      { code: "HH", name: "Hamburg" },
      { code: "OTHER", name: "Other States" },
    ],
  },
  {
    code: "SG",
    name: "Singapore",
    flag: "🇸🇬",
    startupHub: true,
    states: [],
  },
  {
    code: "AE",
    name: "United Arab Emirates",
    flag: "🇦🇪",
    startupHub: true,
    states: [
      { code: "DXB", name: "Dubai" },
      { code: "AUH", name: "Abu Dhabi" },
      { code: "OTHER", name: "Other Emirates" },
    ],
  },
  {
    code: "AU",
    name: "Australia",
    flag: "🇦🇺",
    startupHub: true,
    states: [
      { code: "NSW", name: "New South Wales (Sydney)" },
      { code: "VIC", name: "Victoria (Melbourne)" },
      { code: "QLD", name: "Queensland" },
      { code: "OTHER", name: "Other States" },
    ],
  },
  {
    code: "CA",
    name: "Canada",
    flag: "🇨🇦",
    startupHub: true,
    states: [
      { code: "ON", name: "Ontario (Toronto)" },
      { code: "BC", name: "British Columbia (Vancouver)" },
      { code: "QC", name: "Quebec (Montreal)" },
      { code: "OTHER", name: "Other Provinces" },
    ],
  },
  {
    code: "IL",
    name: "Israel",
    flag: "🇮🇱",
    startupHub: true,
    states: [
      { code: "TA", name: "Tel Aviv" },
      { code: "JM", name: "Jerusalem" },
      { code: "OTHER", name: "Other Regions" },
    ],
  },
  {
    code: "FR",
    name: "France",
    flag: "🇫🇷",
    startupHub: true,
    states: [
      { code: "IDF", name: "Paris (Île-de-France)" },
      { code: "ARA", name: "Lyon" },
      { code: "OTHER", name: "Other Regions" },
    ],
  },
  {
    code: "NL",
    name: "Netherlands",
    flag: "🇳🇱",
    startupHub: true,
    states: [
      { code: "NH", name: "Amsterdam" },
      { code: "ZH", name: "Rotterdam" },
      { code: "OTHER", name: "Other Regions" },
    ],
  },
  {
    code: "JP",
    name: "Japan",
    flag: "🇯🇵",
    startupHub: true,
    states: [
      { code: "TK", name: "Tokyo" },
      { code: "OS", name: "Osaka" },
      { code: "OTHER", name: "Other Regions" },
    ],
  },
  {
    code: "CN",
    name: "China",
    flag: "🇨🇳",
    startupHub: true,
    states: [
      { code: "SH", name: "Shanghai" },
      { code: "BJ", name: "Beijing" },
      { code: "SZ", name: "Shenzhen" },
      { code: "HZ", name: "Hangzhou" },
      { code: "OTHER", name: "Other Cities" },
    ],
  },
  {
    code: "BR",
    name: "Brazil",
    flag: "🇧🇷",
    startupHub: true,
    states: [
      { code: "SP", name: "São Paulo" },
      { code: "RJ", name: "Rio de Janeiro" },
      { code: "OTHER", name: "Other States" },
    ],
  },
  {
    code: "OTHER",
    name: "Other Country",
    flag: "🌍",
    startupHub: false,
    states: [],
  },
];

export const cityTiers = [
  { value: "metro", label: "Metro", desc: "Top 5 city in country" },
  { value: "tier-1", label: "Tier 1", desc: "Major city" },
  { value: "tier-2", label: "Tier 2", desc: "Growing city" },
  { value: "tier-3", label: "Tier 3", desc: "Smaller city" },
  { value: "rural", label: "Rural", desc: "Non-urban area" },
];

export const marketMaturityOptions = [
  { value: "nascent", label: "Nascent", desc: "Market is just forming" },
  { value: "emerging", label: "Emerging", desc: "Growing fast, few players" },
  { value: "developed", label: "Developed", desc: "Mature with clear leaders" },
  { value: "saturated", label: "Saturated", desc: "Crowded, hard to enter" },
];

export const customerLocationOptions = [
  { value: "local", label: "Local", desc: "Same city/region" },
  { value: "national", label: "National", desc: "Same country" },
  { value: "global", label: "Global", desc: "International customers" },
];

export const languageNeedsOptions = [
  { value: "local-only", label: "Local Only", desc: "Regional language" },
  { value: "bilingual", label: "Bilingual", desc: "Local + English" },
  { value: "english-first", label: "English First", desc: "English primary" },
  { value: "multilingual", label: "Multilingual", desc: "3+ languages" },
];

export const paymentMaturityOptions = [
  { value: "cash-heavy", label: "Cash Heavy", desc: "Limited digital payments" },
  { value: "digital-emerging", label: "Digital Emerging", desc: "Growing digital adoption" },
  { value: "digital-first", label: "Digital First", desc: "Cards/UPI dominant" },
];

export const trustCultureOptions = [
  { value: "relationship", label: "Relationship", desc: "Trust through connections" },
  { value: "transaction", label: "Transaction", desc: "Trust through proof" },
  { value: "hybrid", label: "Hybrid", desc: "Mix of both" },
];

export const industryConnectionsOptions = [
  { value: "1", label: "1", desc: "No connections" },
  { value: "2", label: "2", desc: "Few contacts" },
  { value: "3", label: "3", desc: "Some network" },
  { value: "4", label: "4", desc: "Strong network" },
  { value: "5", label: "5", desc: "Industry insider" },
];

export const investorAccessOptions = [
  { value: "none", label: "None", desc: "No investor access" },
  { value: "angels", label: "Angels", desc: "Know angel investors" },
  { value: "vcs", label: "VCs", desc: "VC connections" },
  { value: "institutional", label: "Institutional", desc: "PE/Growth funds" },
];

export const mentorAccessOptions = [
  { value: "none", label: "None", desc: "No mentors" },
  { value: "informal", label: "Informal", desc: "Casual advice" },
  { value: "formal", label: "Formal", desc: "Structured mentorship" },
  { value: "board", label: "Board", desc: "Advisory board" },
];

export const customerAccessOptions = [
  { value: "cold", label: "Cold", desc: "Starting from zero" },
  { value: "warm", label: "Warm", desc: "Some contacts" },
  { value: "hot", label: "Hot", desc: "Ready to buy" },
  { value: "existing", label: "Existing", desc: "Current customers" },
];

export const regulatoryEnvironmentOptions = [
  { value: "light", label: "Light", desc: "Minimal regulation" },
  { value: "moderate", label: "Moderate", desc: "Standard compliance" },
  { value: "heavy", label: "Heavy", desc: "Heavily regulated" },
  { value: "uncertain", label: "Uncertain", desc: "Rules unclear" },
];

export const infrastructureOptions = [
  { value: "excellent", label: "Excellent", desc: "World-class infra" },
  { value: "good", label: "Good", desc: "Reliable services" },
  { value: "developing", label: "Developing", desc: "Some gaps" },
  { value: "challenging", label: "Challenging", desc: "Major gaps" },
];
