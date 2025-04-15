const defaultKneewallData = [
  {
    title: "Your Home's Kneewall Flat Insulation",
    material: '3-4" Cellulose',
    condition: "Good",
    rValue: "R13",
    recommendation: "R60",
    currentValue: 13,
    maxValue: 60,
    image: "/placeholder.jpg",
  },
  {
    title: "Your Kneewall Insulation",
    material: '2-3" Fiberglass',
    condition: "Fair",
    rValue: "R6",
    recommendation: "R13",
    currentValue: 6,
    maxValue: 13,
    image: "https://i.postimg.cc/dQbxhDSy/Screenshot-2024-11-25-025748.png",
  },
];

const defaultWallData = {
  material: "None",
  condition: "N/A",
  rValue: 0,
  recommendedValue: 13,
  maxValue: 20,
  efficiency: 0,
  images: [
    "https://i.postimg.cc/tJYRBb1L/Screenshot-2024-11-25-033358.png",
    "https://i.postimg.cc/T2D35d6D/Screenshot-2024-11-25-033443.png",
  ],
};

const defaultCrawlspaceData = {
  material: "None",
  condition: "N/A",
  rValue: 0,
  recommendedValue: 10,
  maxValue: 15,
  efficiency: 0,
  image: "https://i.postimg.cc/SQ7Hv3LP/Screenshot-2024-11-25-033547.png",
};

const defaultRimJoistData = {
  material: "None",
  condition: "N/A",
  rValue: 0,
  recommendedValue: 13,
  maxValue: 20,
  efficiency: 0,
  image: "https://i.postimg.cc/jSVNngms/Screenshot-2024-11-25-033709.png",
};

const defaultOverhangData = {
  material: '9.5" Fiberglass',
  condition: "Good",
  rValue: 30,
  recommendedValue: 30,
  maxValue: 40,
  efficiency: 100,
  image: "https://i.postimg.cc/sgBfY3FS/Screenshot-2024-11-25-033139.png",
};

const defaultInsulationZoneAssesment = {
  material: "Unspecified",
  condition: "Unknown",
  rValue: 0,
  recommendedValue: 0,
  name: "N/A",
  image: "placeholder.jpg",
};

export const defaultAirLeakageData = {
  parameter: "ACH",
  title: "Air Leakage",
  value: 0,
};

export const DefaultReportData = {
  airLeakage: {
    parameter: "ACH",
    title: "Air Leakage",
    value: 0,
  },
  insulation: {
    data: [
      {
        condition: "N/A",
        material: "N/A",
        name: "Crawlspace",
        rValue: 0,
      },
      {
        condition: "N/A",
        material: "N/A",
        name: "Rim Joist Insulation",
        rValue: 0,
      },
      {
        condition: "N/A",
        material: "N/A",
        name: "Overhang Insulation",
        rValue: 0,
      },

      {
        condition: "N/A",
        material: "N/A",
        name: "Exterior Wall Insulation",
        rValue: 0,
      },
      {
        name: "Your Kneewall Insulation",
        material: "N/A",
        condition: "N/A",
        image: "/placeholder.jpg",
        rValue: 10,
      },
    ],
    missingDataZones: [],
    missingZones: [],
    title: "Insulation Data",
  },
  waterHeater: {
    data: [
      {
        condition: "N/A",
        name: "Water Heater",
        parameter: "(u)ef",
        type: "Tank - Standard",
        value: 0,
      },
    ],
    title: "Water Heating Systems",
  },
  heatingAndCooling: {
    data: [
      {
        condition: "N/A",
        image: "",
        name: "Boiler",
        parameter: "AFUE",
        type: "N/A",
        value: 0,
        year: "N/A",
      },
      {
        condition: "N/A",
        name: "Central Air Conditioning",
        parameter: "SEER",
        type: "N/A",
        value: 9,
        year: "N/A",
      },
    ],
    title: "Heating and Cooling Systems",
  },
  summaryOfConcerns: {
    data: [
      {
        data: [],
        name: "Basic Health and Safety",
      },
      {
        data: [],
        name: "Combustion Testing",
      },
    ],
    title: "Summary of Concerns",
  },
  solutionsAndRecommendations: {
    title: "Solutions And Recommendations",
  },
  financialSummary: null,
  federalTaxCredit: null,
  environmentalImpact: null,
};
