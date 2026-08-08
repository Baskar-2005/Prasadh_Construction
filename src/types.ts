export interface Project {
  id: string;
  title: string;
  category: 'villas' | 'commercial' | 'structural' | 'interiors' | 'renovation';
  location: string;
  area: string;
  completionYear: string;
  constructionType: string;
  image: string;
  blueprintImage?: string;
  description: string;
  highlights: string[];
  clientName: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  iconName: string;
  description: string;
  deliverables: string[];
  idealFor: string;
}

export interface ConsultancyFeature {
  id: string;
  title: string;
  description: string;
  iconName: string;
  keyOutputs: string[];
}

export interface Testimonial {
  id: string;
  clientName: string;
  location: string;
  projectType: string;
  rating: number;
  date: string;
  comment: string;
  avatar: string;
  projectPhoto: string;
  verified: boolean;
}

export interface ProcessStep {
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  deliverable: string;
  iconName: string;
}

export interface ComparisonMetric {
  feature: string;
  others: string;
  prasadh: string;
  isHighlight?: boolean;
}

export interface MaterialBrand {
  category: string;
  brandName: string;
  grade: string;
  benefit: string;
  logoText: string;
}

export interface FAQItem {
  id: string;
  category: 'construction' | 'cost' | 'timeline' | 'approvals' | 'consultancy' | 'warranty';
  question: string;
  answer: string;
}
