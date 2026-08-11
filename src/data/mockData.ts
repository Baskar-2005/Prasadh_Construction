import {
  Project,
  ServiceItem,
  ConsultancyFeature,
  Testimonial,
  ProcessStep,
  ComparisonMetric,
  MaterialBrand,
  FAQItem
} from '../types';

import heroVillaImage from '../assets/images/luxury_villa_hero_1786117380623.jpg';
import engineeringDeskImage from '../assets/images/engineering_desk_1786117394689.jpg';

export const COMPANY_INFO = {
  name: "Prasadh Construction Company & Consultant",
  founder: "Er. S.Vishnu Prasadh",
  tagline: "Building Strong Foundations For Better Living.",
  address: "HO. 160/A3, Ceramic Aladi Road, Virudhachalam - 606001",
  branchAddress: "3/298, Valliamman Kovil Street, Mundiyampakkam, Villupuram - 605601",
  phone: "+91 8056658861",
  secondaryPhone: "+91 8110818861",
  email: "vishnuprasath1996@gmail.com",
  gstin: "33BBQPV8951F1Z0",
  whatsapp: "918056658861",
  hours: "Monday - Saturday: 9:00 AM - 6:30 PM",
  experienceYears: "10+",
  completedProjects: "100+",
  happyClients: "50+",
  consultancyAccuracy: "100%",
  onTimeRate: "98%"
};

export const PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "The Solitaire Luxury Residence",
    category: "villas",
    location: "Aladi Road, Virudhachalam",
    area: "4,500 Sq. Ft.",
    completionYear: "2024",
    constructionType: "RCC Frame & Glass Facade Villa",
    image: heroVillaImage,
    images: [
      heroVillaImage,
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "A contemporary multi-level luxury bungalow featuring a cantilevered infinity deck, double-height living room, smart home automation, and energy-efficient thermal insulation.",
    highlights: ["Double Height Atrium", "Solar & Rainwater Harvesting", "Custom Teak Joinery", "Tata Tiscon Fe550D Rebar"],
    clientName: "Er. K. Senthil Nathan"
  },
  {
    id: "proj-2",
    title: "Vrindavan Heights Commercial Complex",
    category: "commercial",
    location: "Main Bazaar Road, Virudhachalam",
    area: "12,500 Sq. Ft.",
    completionYear: "2023",
    constructionType: "G+4 Reinforced Steel & Concrete Complex",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Multi-tenant commercial hub with high-load basement parking, seismic-resistant engineering design, and modern glass curtain walling.",
    highlights: ["Basement Parking Driveway", "VRF Air Conditioning Ready", "Seismic Zone Safety Compliance", "Elevator Core"],
    clientName: "Vrindavan Retail Group"
  },
  {
    id: "proj-3",
    title: "Apex Engineering & Audit Center",
    category: "consultancy",
    location: "Neyveli Township Road",
    area: "8,200 Sq. Ft.",
    completionYear: "2024",
    constructionType: "Heavy Steel Frame & Concrete Matrix",
    image: engineeringDeskImage,
    images: [
      engineeringDeskImage,
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Engineering consultancy and execution for heavy machine foundations and vibration-free laboratory environment.",
    highlights: ["High-Strength M35 Grade Concrete", "Ultrasonic Non-Destructive Testing", "Vibration Isolation Slabs", "3D Finite Element Analysis"],
    clientName: "Neyveli Industrial Technologies"
  },
  {
    id: "proj-4",
    title: "Emerald Estate Contemporary Bungalow",
    category: "villas",
    location: "Velan Nagar, Virudhachalam",
    area: "3,200 Sq. Ft.",
    completionYear: "2023",
    constructionType: "Modern Minimalist Villa",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Elegant residential home designed around central Vaastu-compliant courtyard with floor-to-ceiling glass and perimeter water body.",
    highlights: ["Courtyard Vaastu Layout", "Italian Marble Flooring", "Lush Landscape Integration", "Perimeter Security System"],
    clientName: "Dr. R. Anbarasan"
  },
  {
    id: "proj-5",
    title: "Serene Palms Luxury Interiors",
    category: "interiors",
    location: "Cuddalore Road, Virudhachalam",
    area: "2,800 Sq. Ft.",
    completionYear: "2024",
    constructionType: "Premium Interior Architecture & Turnkey Decor",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Bespoke interior design project utilizing fluted teak paneling, concealed ambient acoustic lighting, and customized quartz island kitchen.",
    highlights: ["Modular German Hardware", "Concealed Magnetic Lighting", "Custom Wardrobes", "Acoustic Ceiling Panels"],
    clientName: "Mr. T. Saravanan"
  },
  {
    id: "proj-6",
    title: "Heritage Home Building Renovation",
    category: "renovation",
    location: "Old Town, Virudhachalam",
    area: "3,800 Sq. Ft.",
    completionYear: "2023",
    constructionType: "Retrofitting & Architectural Restoration",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
    ],
    description: "Complete foundation strengthening and modernization of a 40-year traditional home while preserving its core foundation and heritage appeal.",
    highlights: ["Micro-Concrete Jacketing", "Steel Beam Retrofitting", "Waterproofing Matrix", "Modernized Open Plan"],
    clientName: "Er. M. Rajasekaran"
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: "serv-1",
    title: "Residential Construction",
    iconName: "Home",
    description: "End-to-end luxury villa and residential home construction with engineering precision, premium material specifications, and strict site supervision.",
    deliverables: ["Soil Testing & Foundation Design", "Tata Tiscon & UltraTech Material Matrix", "Weekly Progress Photo Reports", "Keys Handover with Official Build Warranty"],
    idealFor: "Homeowners looking for custom luxury villas & duplex homes."
  },
  {
    id: "serv-2",
    title: "Commercial Buildings",
    iconName: "Building2",
    description: "Robust commercial complexes, shopping hubs, and office spaces engineered for high footfall, fire safety compliance, and maximum rentable floor area.",
    deliverables: ["Heavy Duty Load-Bearing Framing", "Fire Safety & Elevator Shaft Planning", "Basement Parking Engineering", "Commercial Elevation Design"],
    idealFor: "Business owners, investors, and commercial landlords."
  },
  {
    id: "serv-3",
    title: "Engineering Consultancy",
    iconName: "Compass",
    description: "Expert engineering analysis, building stability audits, load calculations, and rebar detailing by experienced engineering specialists.",
    deliverables: ["3D ETABS & STAAD.Pro Analysis", "Engineering Detailing Drawings", "Stability Certification for Banks/Govt", "Site Rebar Verification"],
    idealFor: "Architects, contractors, and builders needing professional engineering sign-offs."
  },
  {
    id: "serv-4",
    title: "Architectural Planning",
    iconName: "Ruler",
    description: "Vaastu-compliant floor plans, 3D architectural elevations, walkthrough visualizer, and spatial planning optimized for sunlight and airflow.",
    deliverables: ["2D Architectural Floor Plans", "3D Exterior Elevation Renders", "Vaastu Shastra Compliance", "Lighting & Plumbing Layouts"],
    idealFor: "Anyone planning to build a modern or traditional property."
  },
  {
    id: "serv-5",
    title: "Building Approval Assistance",
    iconName: "FileCheck",
    description: "Hassle-free documentation and plan submission assistance for DTCP, Panchayat, Municipality, and Local Planning Authority sanctions.",
    deliverables: ["Sanction Drawing Preparation", "Building Stability Certificate", "Revenue & Blue Map Documentation", "Direct Authority Follow-up"],
    idealFor: "Property owners requiring official building plan sanctions."
  },
  {
    id: "serv-6",
    title: "Interior Design",
    iconName: "Paintbrush",
    description: "Luxury interior architecture, false ceiling design, modular kitchens, custom carpentry, and lighting schemes for high-end living spaces.",
    deliverables: ["3D Interior Visualizations", "Custom Modular Furniture Execution", "Acoustic & Ambient Lighting", "Material Sample Selection"],
    idealFor: "Homeowners seeking high-end luxury interiors."
  },
  {
    id: "serv-7",
    title: "Renovation & Extension",
    iconName: "Hammer",
    description: "Building retrofitting, vertical floor additions, floor plan remodeling, and elevation upgrades to breathe new life into existing properties.",
    deliverables: ["Building Load Capacity Assessment", "Column Jacketing & Beams Extension", "Facade Modernization", "Damp-proof Thermal Coating"],
    idealFor: "Existing property owners wanting modern upgrades."
  },
  {
    id: "serv-8",
    title: "Turnkey Projects",
    iconName: "Key",
    description: "Complete single-window ownership from raw plot land to key handover including architecture, materials, construction, interiors, and approvals.",
    deliverables: ["Single Fixed Budget Commitment", "Zero Price-Escalation Guarantee", "Dedicated Project Manager", "100% Turnkey Delivery"],
    idealFor: "NRIs and busy professionals seeking zero-stress execution."
  },
  {
    id: "serv-9",
    title: "Project Supervision",
    iconName: "ShieldCheck",
    description: "On-site quality monitoring, concrete cube compression testing, rebar spacing checks, and material verification for independent projects.",
    deliverables: ["Daily Site Inspection Log", "Quality Control Checklists (30+ points)", "Material Batch Verification", "Third-party Quality Audit"],
    idealFor: "Plot owners managing their own labor but needing engineering oversight."
  },
  {
    id: "serv-10",
    title: "Estimate & Cost Planning",
    iconName: "Calculator",
    description: "Itemized quantity surveying, material bill of quantities (BOQ), bank loan estimation, and realistic budget optimization before ground-break.",
    deliverables: ["Detailed BOQ (Bill of Quantities)", "Bank Loan Estimation Certificate", "Phase-wise Cashflow Plan", "Cost-saving Engineering Advice"],
    idealFor: "Clients applying for home construction bank loans."
  }
];

export const COMPARISON_METRICS: ComparisonMetric[] = [
  {
    feature: "Quality Standards",
    others: "Average site labor quality without technical testing.",
    prasadh: "Strict Engineering oversight & 30-point quality audit.",
    isHighlight: true
  },
  {
    feature: "Planning & Design",
    others: "Basic unverified hand sketches or generic template layouts.",
    prasadh: "Custom 3D Architectural Renders, Load Analysis & Vaastu Compliance.",
    isHighlight: false
  },
  {
    feature: "Timeline & Schedule",
    others: "Frequent delays due to poor labor management and cash flow.",
    prasadh: "Guaranteed On-Time Handover with penalty protection clause.",
    isHighlight: true
  },
  {
    feature: "Communication",
    others: "Infrequent phone updates with hidden costs along the way.",
    prasadh: "Weekly WhatsApp Site Reports, High-Res Photos & Milestone Tracker.",
    isHighlight: false
  },
  {
    feature: "Material Quality",
    others: "Unverified local rebar and standard low-grade cements.",
    prasadh: "100% Certified Brand Matrix (Tata Tiscon Fe550D, UltraTech, Finolex).",
    isHighlight: true
  },
  {
    feature: "Price Transparency",
    others: "Vague estimates leading to frequent price escalations.",
    prasadh: "100% Itemized BOQ with Zero Price Escalation Guarantee.",
    isHighlight: false
  },
  {
    feature: "Safety & Engineering",
    others: "Basic traditional practices without seismic or soil testing.",
    prasadh: "Soil test based foundation, seismic code compliance & engineering certification.",
    isHighlight: true
  },
  {
    feature: "After-Handover Support",
    others: "Zero support once final payment is collected.",
    prasadh: "6 Month Warranty.",
    isHighlight: false
  }
];

export const CONSULTANCY_FEATURES: ConsultancyFeature[] = [
  {
    id: "c-1",
    title: "Engineering Design & Load Calculations",
    description: "Precision load analysis using STAAD.Pro and ETABS software to craft safe, cost-optimized RCC and heavy steel framing designs.",
    iconName: "Cpu",
    keyOutputs: ["Columns & Beams Schedule", "Foundation Depth Matrix", "Seismic Load Distribution"]
  },
  {
    id: "c-2",
    title: "Site Inspection & Quality Audit",
    description: "Physical engineering site audits verifying concrete compression strength, rebar spacing, shuttering alignment, and curing time.",
    iconName: "Eye",
    keyOutputs: ["Cube Strength Test Reports", "Rebar Quality Certificate", "Defect Rectification Sheet"]
  },
  {
    id: "c-3",
    title: "Construction Planning & Scheduling",
    description: "Detailed Gantt chart schedules allocating material deliveries, labor cycles, and weather contingencies for zero downtime.",
    iconName: "Calendar",
    keyOutputs: ["Milestone Timeline", "Material Procurement Log", "Labor Allocation Chart"]
  },
  {
    id: "c-4",
    title: "Cost Estimation & Quantity Surveying",
    description: "Rigorous material take-off calculations down to kilograms of rebar and bags of cement for accurate budgeting.",
    iconName: "Coins",
    keyOutputs: ["Itemized BOQ", "Bank Approval Estimates", "Material Variance Matrix"]
  },
  {
    id: "c-5",
    title: "Architectural & Vaastu Guidance",
    description: "Integrating traditional Tamil architectural principles with contemporary spatial luxury and daylight orientation.",
    iconName: "Compass",
    keyOutputs: ["Directional Alignment Map", "Daylight & Ventilation Flow", "Spatial Zoning Chart"]
  },
  {
    id: "c-6",
    title: "Building Stability Certification",
    description: "Official engineering stability reports required for commercial licenses, bank loan disbursements, and local approvals.",
    iconName: "CheckCircle2",
    keyOutputs: ["Registered Er. Stamp Certificate", "Load Capacity Endorsement", "Government Compliance File"]
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: "01",
    title: "Consultation",
    subtitle: "Understanding Your Vision",
    description: "Detailed initial discovery meeting to discuss budget, site dimensions, lifestyle requirements, and design expectations.",
    deliverable: "Project Scope Summary & Site Brief",
    iconName: "MessageSquare"
  },
  {
    stepNumber: "02",
    title: "Planning",
    subtitle: "Soil & Budget Strategy",
    description: "Soil bearing capacity testing, financial budgeting, milestone timeline drafting, and spatial zoning strategy.",
    deliverable: "Soil Test Report & Initial BOQ",
    iconName: "BarChart3"
  },
  {
    stepNumber: "03",
    title: "Design",
    subtitle: "2D Floorplans & 3D Renders",
    description: "Crafting custom architectural floor plans, 3D exterior elevations, engineering drawings, and Vaastu layout.",
    deliverable: "Full Architectural & Engineering Drawing Set",
    iconName: "DraftingCompass"
  },
  {
    stepNumber: "04",
    title: "Approval",
    subtitle: "Government Sanctions",
    description: "Drafting official blue-prints and securing fast approvals from Municipal & Local Planning Authorities.",
    deliverable: "Official Building Approval Permit",
    iconName: "ShieldCheck"
  },
  {
    stepNumber: "05",
    title: "Foundation",
    subtitle: "Engineering Groundwork",
    description: "Exaggerated soil excavation, anti-termite treatment, RCC footing, and column starter placement under engineer supervision.",
    deliverable: "Foundation Completion & Quality Audit",
    iconName: "Layers"
  },
  {
    stepNumber: "06",
    title: "Construction",
    subtitle: "Superstructure Execution",
    description: "Brick masonry, RCC slab casting, electrical & plumbing conduits, plastering, and weather-proof exterior finishing.",
    deliverable: "Weekly Progress Photo & Video Logs",
    iconName: "Building"
  },
  {
    stepNumber: "07",
    title: "Quality Inspection",
    subtitle: "30-Point Audit & Finishing",
    description: "Rigorous quality checks, tile leveling tests, plumbing pressure testing, paint texture inspection, and electrical load check.",
    deliverable: "Certified Quality Completion Audit",
    iconName: "ClipboardCheck"
  },
  {
    stepNumber: "08",
    title: "Handover",
    subtitle: "Keys & Warranty",
    description: "Formal key-handover ceremony with 6 month warranty certificate, as-built drawing binder, and maintenance guidelines.",
    deliverable: "Keys, 6 Month Warranty Certificate & As-Built Plans",
    iconName: "Sparkles"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    clientName: "Er. Karthik Ramachandran",
    location: "Virudhachalam",
    projectType: "4,200 Sq. Ft. Luxury Villa",
    rating: 5,
    date: "2 months ago",
    comment: "Prasadh Construction built our dream home in Velan Nagar exactly as imagined. Er. S.Vishnu Prasadh's engineering guidance meant we never had to worry about material quality or foundation safety. Delivered 2 weeks ahead of schedule!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    projectPhoto: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: "test-2",
    clientName: "Dr. Meena Sundaram",
    location: "Chennai / Virudhachalam",
    projectType: "Commercial Complex",
    rating: 5,
    date: "4 months ago",
    comment: "As NRIs living in Chennai, finding a trustworthy builder in Virudhachalam was our biggest concern. Their weekly WhatsApp photo logs and complete price transparency made the entire construction process stress-free.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80",
    projectPhoto: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: "test-3",
    clientName: "Mr. Suresh Balakrishnan",
    location: "Cuddalore Road",
    projectType: "Engineering Consultancy & Turnkey Villa",
    rating: 5,
    date: "6 months ago",
    comment: "Their engineering consultancy saved us nearly 1.5 Lakhs in unnecessary steel while actually increasing the load capacity. Highly recommended for anyone seeking construction excellence!",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    projectPhoto: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
    verified: true
  }
];

export const MATERIAL_BRANDS: MaterialBrand[] = [
  {
    id: "mat-1",
    category: "Steel & Rebar",
    brandName: "Tata Tiscon Fe550D SD",
    grade: "Fe550D Super Ductile",
    benefit: "High ductility & earthquake resistance with anti-corrosion rib pattern.",
    logoText: "TATA TISCON"
  },
  {
    id: "mat-2",
    category: "Cement Matrix",
    brandName: "UltraTech / Ramco Supergrade",
    grade: "PPC 53 Grade Equivalent",
    benefit: "Rapid strength development, high crack-resistance & moisture barrier.",
    logoText: "ULTRATECH CEMENT"
  },
  {
    id: "mat-3",
    category: "Electrical Systems",
    brandName: "Finolex / Schneider / Anchor",
    grade: "FR-LSH Fire Resistant",
    benefit: "Zero halogen smoke emissions, pure copper core & shock-proof breakers.",
    logoText: "FINOLEX & ANCHOR"
  },
  {
    id: "mat-4",
    category: "Plumbing Matrix",
    brandName: "Ashirvad CPVC / Supreme",
    grade: "SDR 11 Lead-Free",
    benefit: "Hot/cold water tolerance, zero bacterial growth & pressure tested.",
    logoText: "ASHIRVAD PIPES"
  },
  {
    id: "mat-5",
    category: "Paint & Exterior",
    brandName: "Asian Paints Apex Ultima",
    grade: "Nano Technology Exterior",
    benefit: "10-year weather protection, anti-algae & heat reflective shield.",
    logoText: "ASIAN PAINTS"
  },
  {
    id: "mat-6",
    category: "Wood & Joinery",
    brandName: "First-Quality Teak Wood",
    grade: "Grade A Seasoned Teak",
    benefit: "Natural termite resistance, rich wood grain & precision joinery finish.",
    logoText: "TEAK WOOD"
  }
];

export const DEFAULT_BEFORE_AFTER_PROJECTS = [
  {
    id: "ba-1",
    title: "The Solitaire Villa - Bare Plot to Luxury Residence",
    location: "Aladi Road, Virudhachalam",
    category: "New Villa Construction",
    beforeImage: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80",
    afterImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    description: "Transformation from raw site foundation to a 4,500 sq.ft luxury villa with glass facade and custom elevation.",
    duration: "7 Months Execution"
  },
  {
    id: "ba-2",
    title: "Heritage Home Facade & Elevation Upgrade",
    location: "Ceramic Road, Virudhachalam",
    category: "Renovation & Facade Modernization",
    beforeImage: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    afterImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    description: "Complete exterior elevation upgrade of a 20-year-old traditional home into a modern architectural villa.",
    duration: "2.5 Months Execution"
  },
  {
    id: "ba-3",
    title: "Commercial Complex Groundwork to Landmark Hub",
    location: "Mundiyampakkam, Villupuram",
    category: "Commercial Building",
    beforeImage: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=80",
    afterImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    description: "Conversion of bare plot into a 3-storey G+2 commercial complex with glass curtain wall and parking deck.",
    duration: "9 Months Execution"
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    category: "construction",
    question: "What sets Prasadh Construction apart from standard local contractors?",
    answer: "We operate as an engineering consultancy led by Er. S.Vishnu Prasadh. Every project undergoes 3D load modeling, soil bearing test alignment, 30-point quality audits, and guaranteed timeline delivery with 100% itemized pricing transparency."
  },
  {
    id: "faq-2",
    category: "cost",
    question: "How do you calculate construction costs per square foot in Virudhachalam?",
    answer: "Our construction packages range from ₹2,050 / sq. ft. (Standard) to ₹2,650+ / sq. ft. (Ultra-Luxury Turnkey). Exact pricing depends on selected floor finishes, teak joinery, sanitary fixtures, and engineering requirements. We provide a complete itemized Bill of Quantities (BOQ) with zero price-escalation guarantee."
  },
  {
    id: "faq-3",
    category: "timeline",
    question: "How long does it take to construct a 2,500 sq. ft. luxury villa?",
    answer: "A standard 2,500 sq. ft. residence takes approximately 6 to 8 months from ground-breaking to key handover, including foundation curing time, slab cycles, plastering, interior woodwork, and final paint."
  },
  {
    id: "faq-4",
    category: "approvals",
    question: "Do you help with Building Permits and Bank Loan Approvals?",
    answer: "Yes! We handle the complete documentation workflow including sanction drawings, stability certificates, blue-print preparation, and liaison with Local Municipal & Planning Authorities and nationalized banks."
  },
  {
    id: "faq-5",
    category: "consultancy",
    question: "Can I hire Prasadh Construction purely for Engineering Consultancy if I have my own contractor?",
    answer: "Absolutely! We offer standalone Civil & Architectural Design, load analysis, Rebar schedule detailing, and third-party site quality inspection services for independent builders and architects."
  },
  {
    id: "faq-6",
    category: "warranty",
    question: "What warranty do you offer post-construction?",
    answer: "We offer a 6 Month Warranty covering plumbing, electrical fittings, tile alignment, and sealant touch-ups."
  }
];
