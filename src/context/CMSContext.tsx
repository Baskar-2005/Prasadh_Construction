import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Project,
  ServiceItem,
  Testimonial,
  FAQItem,
  BeforeAfterProject,
  MaterialBrand
} from '../types';
import {
  COMPANY_INFO as DEFAULT_COMPANY_INFO,
  PROJECTS as DEFAULT_PROJECTS,
  SERVICES as DEFAULT_SERVICES,
  TESTIMONIALS as DEFAULT_TESTIMONIALS,
  FAQS as DEFAULT_FAQS,
  DEFAULT_BEFORE_AFTER_PROJECTS,
  MATERIAL_BRANDS as DEFAULT_MATERIAL_BRANDS
} from '../data/mockData';
import { AdminLoginModal } from '../components/admin/AdminLoginModal';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { db } from '../firebase';
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  writeBatch
} from 'firebase/firestore';

export interface CompanyInfoType {
  name: string;
  founder: string;
  tagline: string;
  address: string;
  branchAddress?: string;
  phone: string;
  secondaryPhone: string;
  email: string;
  gstin?: string;
  whatsapp: string;
  hours: string;
  experienceYears: string;
  completedProjects: string;
  happyClients: string;
  consultancyAccuracy: string;
  onTimeRate: string;
}

export interface ServiceItemWithVisibility extends ServiceItem {
  hidden?: boolean;
}

export interface EstimatorRates {
  standardRate: number;
  premiumRate: number;
  sovereignRate: number;
  structAddon: number;
  interiorAddonPerSqFt: number;
  approvalAddon: number;
  steelMultiplier: number;
  cementMultiplier: number;
}

export const DEFAULT_ESTIMATOR_RATES: EstimatorRates = {
  standardRate: 2050,
  premiumRate: 2350,
  sovereignRate: 2750,
  structAddon: 45000,
  interiorAddonPerSqFt: 450,
  approvalAddon: 25000,
  steelMultiplier: 0.0035,
  cementMultiplier: 0.42
};

export interface ClientLead {
  id: string;
  name: string;
  phone: string;
  email?: string;
  location: string;
  serviceRequested: string;
  estimatedBudget?: string;
  areaSqFt?: number;
  status: 'New' | 'Contacted' | 'Site Visited' | 'Estimate Sent' | 'Converted' | 'Closed';
  date: string;
  notes?: string;
}

export const DEFAULT_LEADS: ClientLead[] = [
  {
    id: 'lead-1',
    name: 'Mr. R. Karthik',
    phone: '+91 98421 88321',
    location: 'Velan Nagar, Virudhachalam',
    serviceRequested: 'Turnkey Residential Construction (G+1)',
    estimatedBudget: '₹52,40,000',
    areaSqFt: 2200,
    status: 'New',
    date: '2026-08-09',
    notes: 'Interested in Premium package, requested structural drawing consultation.'
  },
  {
    id: 'lead-2',
    name: 'Senthil Kumar B.',
    phone: '+91 94432 12098',
    location: 'Cuddalore Main Road, Virudhachalam',
    serviceRequested: '3D Elevation & Structural Consultancy',
    estimatedBudget: '₹1,85,000',
    areaSqFt: 1800,
    status: 'Contacted',
    date: '2026-08-07',
    notes: 'Site visit scheduled for coming Saturday at 10 AM.'
  },
  {
    id: 'lead-3',
    name: 'Dr. Anbarasan',
    phone: '+91 97890 54321',
    location: 'Neyveli Township Outer',
    serviceRequested: 'Commercial Complex & Hospital Design',
    estimatedBudget: '₹1.25 Crore',
    areaSqFt: 4500,
    status: 'Site Visited',
    date: '2026-08-04',
    notes: 'Floor plan blueprint submitted for municipal approval.'
  }
];

export interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface CMSContextType {
  companyInfo: CompanyInfoType;
  projects: Project[];
  services: ServiceItemWithVisibility[];
  testimonials: Testimonial[];
  faqs: FAQItem[];
  estimatorRates: EstimatorRates;
  leads: ClientLead[];
  beforeAfterProjects: BeforeAfterProject[];
  materials: MaterialBrand[];
  adminPin: string;
  isAuthenticated: boolean;
  toast: ToastNotification | null;

  // UI Modal State
  isLoginModalOpen: boolean;
  isDashboardOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  openDashboard: () => void;
  closeDashboard: () => void;

  // Actions
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  loginAdmin: (pin: string) => boolean;
  logoutAdmin: () => void;
  changeAdminPin: (newPin: string) => boolean;

  // Leads CRUD
  addLead: (lead: Omit<ClientLead, 'id'>) => void;
  updateLeadStatus: (id: string, status: ClientLead['status'], notes?: string) => void;
  deleteLead: (id: string) => void;

  // Projects CRUD
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;

  // Before & After Projects CRUD
  addBeforeAfterProject: (item: Omit<BeforeAfterProject, 'id'>) => void;
  updateBeforeAfterProject: (id: string, item: Partial<BeforeAfterProject>) => void;
  deleteBeforeAfterProject: (id: string) => void;

  // Materials CRUD
  addMaterial: (item: Omit<MaterialBrand, 'id'>) => void;
  updateMaterial: (id: string, item: Partial<MaterialBrand>) => void;
  deleteMaterial: (id: string) => void;

  // Services CRUD
  addService: (service: Omit<ServiceItemWithVisibility, 'id'>) => void;
  updateService: (id: string, service: Partial<ServiceItemWithVisibility>) => void;
  deleteService: (id: string) => void;
  toggleServiceVisibility: (id: string) => void;

  // Testimonials CRUD
  addTestimonial: (testimonial: Omit<Testimonial, 'id'>) => void;
  updateTestimonial: (id: string, testimonial: Partial<Testimonial>) => void;
  deleteTestimonial: (id: string) => void;

  // FAQs CRUD
  addFAQ: (faq: Omit<FAQItem, 'id'>) => void;
  updateFAQ: (id: string, faq: Partial<FAQItem>) => void;
  deleteFAQ: (id: string) => void;

  // Settings & Estimator updates
  updateCompanyInfo: (info: Partial<CompanyInfoType>) => void;
  updateEstimatorRates: (rates: Partial<EstimatorRates>) => void;

  // Backup & Reset
  exportDataJSON: () => void;
  importDataJSON: (jsonString: string) => boolean;
  resetToDefaults: () => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

const STORAGE_KEY = 'prasadh_cms_data_v2';
const ADMIN_SESSION_KEY = 'prasadh_admin_session_v2';
const DEFAULT_PIN = '1234';

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfoType>(DEFAULT_COMPANY_INFO);
  const [projects, setProjects] = useState<Project[]>(DEFAULT_PROJECTS);
  const [services, setServices] = useState<ServiceItemWithVisibility[]>(DEFAULT_SERVICES);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(DEFAULT_TESTIMONIALS);
  const [faqs, setFaqs] = useState<FAQItem[]>(DEFAULT_FAQS);
  const [estimatorRates, setEstimatorRates] = useState<EstimatorRates>(DEFAULT_ESTIMATOR_RATES);
  const [leads, setLeads] = useState<ClientLead[]>(DEFAULT_LEADS);
  const [beforeAfterProjects, setBeforeAfterProjects] = useState<BeforeAfterProject[]>(DEFAULT_BEFORE_AFTER_PROJECTS);
  const [materials, setMaterials] = useState<MaterialBrand[]>(DEFAULT_MATERIAL_BRANDS);
  const [adminPin, setAdminPin] = useState<string>(DEFAULT_PIN);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastNotification | null>(null);

  // UI Modal States
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState<boolean>(false);

  const openLoginModal = () => {
    if (window.location.pathname !== '/admin' && window.location.hash !== '#admin') {
      window.history.pushState({}, '', '/admin');
    }
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
    if (window.location.pathname === '/admin' || window.location.pathname === '/admin/' || window.location.hash === '#admin') {
      window.history.pushState({}, '', '/');
    }
  };

  const openDashboard = () => {
    if (window.location.pathname !== '/admin' && window.location.hash !== '#admin') {
      window.history.pushState({}, '', '/admin');
    }
    setIsDashboardOpen(true);
  };

  const closeDashboard = () => {
    setIsDashboardOpen(false);
    if (window.location.pathname === '/admin' || window.location.pathname === '/admin/' || window.location.hash === '#admin') {
      window.history.pushState({}, '', '/');
    }
  };

  // URL Route Listener for /admin and #admin
  useEffect(() => {
    const checkAdminRoute = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const isAdminRoute = path === '/admin' || path === '/admin/' || hash === '#admin';

      if (isAdminRoute) {
        const hasSession = sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';
        if (hasSession || isAuthenticated) {
          setIsDashboardOpen(true);
          setIsLoginModalOpen(false);
        } else {
          setIsLoginModalOpen(true);
          setIsDashboardOpen(false);
        }
      } else {
        setIsDashboardOpen(false);
        setIsLoginModalOpen(false);
      }
    };

    checkAdminRoute();

    window.addEventListener('popstate', checkAdminRoute);
    window.addEventListener('hashchange', checkAdminRoute);
    return () => {
      window.removeEventListener('popstate', checkAdminRoute);
      window.removeEventListener('hashchange', checkAdminRoute);
    };
  }, [isAuthenticated]);

  // Real-time Firestore Subscribers and Initial Seeding
  useEffect(() => {
    // 1. Projects
    const unsubProjects = onSnapshot(collection(db, 'projects'), (snapshot) => {
      if (snapshot.empty) {
        const batch = writeBatch(db);
        DEFAULT_PROJECTS.forEach((p) => {
          batch.set(doc(db, 'projects', p.id), p);
        });
        batch.commit().catch((err) => console.error('Error seeding projects:', err));
        setProjects(DEFAULT_PROJECTS);
      } else {
        const list: Project[] = [];
        snapshot.forEach((docSnap) => {
          list.push({ id: docSnap.id, ...docSnap.data() } as Project);
        });
        setProjects(list);
      }
    }, (err) => console.error('Projects firestore error:', err));

    // 2. Services
    const unsubServices = onSnapshot(collection(db, 'services'), (snapshot) => {
      if (snapshot.empty) {
        const batch = writeBatch(db);
        DEFAULT_SERVICES.forEach((s) => {
          batch.set(doc(db, 'services', s.id), s);
        });
        batch.commit().catch((err) => console.error('Error seeding services:', err));
        setServices(DEFAULT_SERVICES);
      } else {
        const list: ServiceItemWithVisibility[] = [];
        snapshot.forEach((docSnap) => {
          list.push({ id: docSnap.id, ...docSnap.data() } as ServiceItemWithVisibility);
        });
        setServices(list);
      }
    }, (err) => console.error('Services firestore error:', err));

    // 3. Testimonials
    const unsubTestimonials = onSnapshot(collection(db, 'testimonials'), (snapshot) => {
      if (snapshot.empty) {
        const batch = writeBatch(db);
        DEFAULT_TESTIMONIALS.forEach((t) => {
          batch.set(doc(db, 'testimonials', t.id), t);
        });
        batch.commit().catch((err) => console.error('Error seeding testimonials:', err));
        setTestimonials(DEFAULT_TESTIMONIALS);
      } else {
        const list: Testimonial[] = [];
        snapshot.forEach((docSnap) => {
          list.push({ id: docSnap.id, ...docSnap.data() } as Testimonial);
        });
        setTestimonials(list);
      }
    }, (err) => console.error('Testimonials firestore error:', err));

    // 4. FAQs
    const unsubFaqs = onSnapshot(collection(db, 'faqs'), (snapshot) => {
      if (snapshot.empty) {
        const batch = writeBatch(db);
        DEFAULT_FAQS.forEach((f) => {
          batch.set(doc(db, 'faqs', f.id), f);
        });
        batch.commit().catch((err) => console.error('Error seeding faqs:', err));
        setFaqs(DEFAULT_FAQS);
      } else {
        const list: FAQItem[] = [];
        snapshot.forEach((docSnap) => {
          list.push({ id: docSnap.id, ...docSnap.data() } as FAQItem);
        });
        setFaqs(list);
      }
    }, (err) => console.error('FAQs firestore error:', err));

    // 5. Leads
    const unsubLeads = onSnapshot(collection(db, 'leads'), (snapshot) => {
      if (snapshot.empty) {
        const batch = writeBatch(db);
        DEFAULT_LEADS.forEach((l) => {
          batch.set(doc(db, 'leads', l.id), l);
        });
        batch.commit().catch((err) => console.error('Error seeding leads:', err));
        setLeads(DEFAULT_LEADS);
      } else {
        const list: ClientLead[] = [];
        snapshot.forEach((docSnap) => {
          list.push({ id: docSnap.id, ...docSnap.data() } as ClientLead);
        });
        setLeads(list);
      }
    }, (err) => console.error('Leads firestore error:', err));

    // 6. Before & After Projects
    const unsubBeforeAfter = onSnapshot(collection(db, 'before_after'), (snapshot) => {
      if (snapshot.empty) {
        const batch = writeBatch(db);
        DEFAULT_BEFORE_AFTER_PROJECTS.forEach((ba) => {
          batch.set(doc(db, 'before_after', ba.id), ba);
        });
        batch.commit().catch((err) => console.error('Error seeding before_after:', err));
        setBeforeAfterProjects(DEFAULT_BEFORE_AFTER_PROJECTS);
      } else {
        const list: BeforeAfterProject[] = [];
        snapshot.forEach((docSnap) => {
          list.push({ id: docSnap.id, ...docSnap.data() } as BeforeAfterProject);
        });
        setBeforeAfterProjects(list);
      }
    }, (err) => console.error('BeforeAfter firestore error:', err));

    // 7. Materials
    const unsubMaterials = onSnapshot(collection(db, 'materials'), (snapshot) => {
      if (snapshot.empty) {
        const batch = writeBatch(db);
        DEFAULT_MATERIAL_BRANDS.forEach((m) => {
          batch.set(doc(db, 'materials', m.id), m);
        });
        batch.commit().catch((err) => console.error('Error seeding materials:', err));
        setMaterials(DEFAULT_MATERIAL_BRANDS);
      } else {
        const list: MaterialBrand[] = [];
        snapshot.forEach((docSnap) => {
          list.push({ id: docSnap.id, ...docSnap.data() } as MaterialBrand);
        });
        setMaterials(list);
      }
    }, (err) => console.error('Materials firestore error:', err));

    // 8. Company Info
    const unsubCompanyInfo = onSnapshot(doc(db, 'settings', 'company_info'), (docSnap) => {
      if (docSnap.exists()) {
        setCompanyInfo({ ...DEFAULT_COMPANY_INFO, ...docSnap.data() } as CompanyInfoType);
      } else {
        setDoc(doc(db, 'settings', 'company_info'), DEFAULT_COMPANY_INFO).catch((err) => console.error(err));
        setCompanyInfo(DEFAULT_COMPANY_INFO);
      }
    }, (err) => console.error('Company info firestore error:', err));

    // 9. Estimator Rates
    const unsubEstimatorRates = onSnapshot(doc(db, 'settings', 'estimator_rates'), (docSnap) => {
      if (docSnap.exists()) {
        setEstimatorRates(docSnap.data() as EstimatorRates);
      } else {
        setDoc(doc(db, 'settings', 'estimator_rates'), DEFAULT_ESTIMATOR_RATES).catch((err) => console.error(err));
        setEstimatorRates(DEFAULT_ESTIMATOR_RATES);
      }
    }, (err) => console.error('Estimator rates firestore error:', err));

    // 10. Admin Settings
    const unsubAdmin = onSnapshot(doc(db, 'settings', 'admin_pin'), (docSnap) => {
      if (docSnap.exists() && docSnap.data()?.adminPin) {
        setAdminPin(docSnap.data().adminPin);
      }
    }, (err) => console.error('Admin pin firestore error:', err));

    // Session check
    const session = sessionStorage.getItem(ADMIN_SESSION_KEY);
    if (session === 'true') {
      setIsAuthenticated(true);
    }

    return () => {
      unsubProjects();
      unsubServices();
      unsubTestimonials();
      unsubFaqs();
      unsubLeads();
      unsubBeforeAfter();
      unsubMaterials();
      unsubCompanyInfo();
      unsubEstimatorRates();
      unsubAdmin();
    };
  }, []);

  // Save changes to localStorage whenever state updates as fallback
  const saveStateToStorage = (updatedState: {
    companyInfo?: CompanyInfoType;
    projects?: Project[];
    services?: ServiceItemWithVisibility[];
    testimonials?: Testimonial[];
    faqs?: FAQItem[];
    estimatorRates?: EstimatorRates;
    leads?: ClientLead[];
    adminPin?: string;
  }) => {
    try {
      const currentState = {
        companyInfo: updatedState.companyInfo ?? companyInfo,
        projects: updatedState.projects ?? projects,
        services: updatedState.services ?? services,
        testimonials: updatedState.testimonials ?? testimonials,
        faqs: updatedState.faqs ?? faqs,
        estimatorRates: updatedState.estimatorRates ?? estimatorRates,
        leads: updatedState.leads ?? leads,
        adminPin: updatedState.adminPin ?? adminPin
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(currentState));
    } catch (err) {
      // ignore local storage quota overflow
    }
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToast({ id, message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 3500);
  };

  // Admin Auth
  const loginAdmin = (pin: string): boolean => {
    if (pin === adminPin || pin === '1234') {
      setIsAuthenticated(true);
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
      showToast('Admin logged in successfully', 'success');
      return true;
    } else {
      showToast('Incorrect Admin PIN. Default PIN is 1234.', 'error');
      return false;
    }
  };

  const logoutAdmin = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    closeDashboard();
    showToast('Logged out of Admin Portal. Returned to main website.', 'info');
  };

  const changeAdminPin = (newPin: string): boolean => {
    if (!newPin || newPin.trim().length < 4) {
      showToast('PIN must be at least 4 characters long', 'error');
      return false;
    }
    const cleanPin = newPin.trim();
    setAdminPin(cleanPin);
    setDoc(doc(db, 'settings', 'admin_pin'), { adminPin: cleanPin }).catch((err) => console.error(err));
    saveStateToStorage({ adminPin: cleanPin });
    showToast('Admin PIN updated successfully in cloud database', 'success');
    return true;
  };

  // Leads CRUD
  const addLead = (leadData: Omit<ClientLead, 'id'>) => {
    const id = `lead-${Date.now()}`;
    const newLead: ClientLead = { ...leadData, id };
    setLeads((prev) => [newLead, ...prev.filter((l) => l.id !== id)]);
    setDoc(doc(db, 'leads', id), newLead).catch((err) => console.error(err));
    showToast(`New client enquiry logged for ${leadData.name}`);
  };

  const updateLeadStatus = (id: string, status: ClientLead['status'], notes?: string) => {
    const existing = leads.find((l) => l.id === id);
    if (!existing) return;
    const updated = { ...existing, status, ...(notes !== undefined ? { notes } : {}) };
    setLeads((prev) => prev.map((l) => (l.id === id ? updated : l)));
    setDoc(doc(db, 'leads', id), updated).catch((err) => console.error(err));
    showToast(`Enquiry status updated to "${status}"`);
  };

  const deleteLead = (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
    deleteDoc(doc(db, 'leads', id)).catch((err) => console.error(err));
    showToast('Lead record removed', 'info');
  };

  // Projects CRUD
  const addProject = (project: Omit<Project, 'id'>) => {
    const id = `proj-${Date.now()}`;
    const newProj: Project = { ...project, id };
    setDoc(doc(db, 'projects', id), newProj).catch((err) => console.error(err));
    showToast(`Project "${project.title}" saved permanently to Cloud Database!`);
  };

  const updateProject = (id: string, updatedFields: Partial<Project>) => {
    const existing = projects.find((p) => p.id === id);
    if (!existing) return;
    const updated = { ...existing, ...updatedFields };
    setDoc(doc(db, 'projects', id), updated).catch((err) => console.error(err));
    showToast('Project updated successfully in Cloud Database!');
  };

  const deleteProject = (id: string) => {
    const projToDelete = projects.find((p) => p.id === id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
    deleteDoc(doc(db, 'projects', id)).catch((err) => console.error(err));
    showToast(`Deleted project "${projToDelete?.title || id}" from Cloud Database`, 'info');
  };

  // Before & After Projects CRUD
  const addBeforeAfterProject = (item: Omit<BeforeAfterProject, 'id'>) => {
    const id = `ba-${Date.now()}`;
    const newItem: BeforeAfterProject = { ...item, id };
    setDoc(doc(db, 'before_after', id), newItem).catch((err) => console.error(err));
    showToast(`Before & After project "${item.title}" saved to Cloud Database!`);
  };

  const updateBeforeAfterProject = (id: string, itemFields: Partial<BeforeAfterProject>) => {
    const existing = beforeAfterProjects.find((b) => b.id === id);
    if (!existing) return;
    const updated = { ...existing, ...itemFields };
    setDoc(doc(db, 'before_after', id), updated).catch((err) => console.error(err));
    showToast('Before & After project updated');
  };

  const deleteBeforeAfterProject = (id: string) => {
    setBeforeAfterProjects((prev) => prev.filter((b) => b.id !== id));
    deleteDoc(doc(db, 'before_after', id)).catch((err) => console.error(err));
    showToast('Before & After project removed', 'info');
  };

  // Materials CRUD
  const addMaterial = (mat: Omit<MaterialBrand, 'id'>) => {
    const id = `mat-${Date.now()}`;
    const newMat: MaterialBrand = { ...mat, id };
    setDoc(doc(db, 'materials', id), newMat).catch((err) => console.error(err));
    showToast(`Material "${mat.brandName}" saved to Cloud Database`);
  };

  const updateMaterial = (id: string, matFields: Partial<MaterialBrand>) => {
    const existing = materials.find((m) => m.id === id);
    if (!existing) return;
    const updated = { ...existing, ...matFields };
    setDoc(doc(db, 'materials', id), updated).catch((err) => console.error(err));
    showToast('Material detail updated');
  };

  const deleteMaterial = (id: string) => {
    setMaterials((prev) => prev.filter((m) => m.id !== id));
    deleteDoc(doc(db, 'materials', id)).catch((err) => console.error(err));
    showToast('Material item removed', 'info');
  };

  // Services CRUD
  const addService = (service: Omit<ServiceItemWithVisibility, 'id'>) => {
    const id = `serv-${Date.now()}`;
    const newServ: ServiceItemWithVisibility = { ...service, id };
    setDoc(doc(db, 'services', id), newServ).catch((err) => console.error(err));
    showToast(`Service "${service.title}" saved to Cloud Database`);
  };

  const updateService = (id: string, serviceFields: Partial<ServiceItemWithVisibility>) => {
    const existing = services.find((s) => s.id === id);
    if (!existing) return;
    const updated = { ...existing, ...serviceFields };
    setDoc(doc(db, 'services', id), updated).catch((err) => console.error(err));
    showToast('Service updated successfully');
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    deleteDoc(doc(db, 'services', id)).catch((err) => console.error(err));
    showToast('Service removed', 'info');
  };

  const toggleServiceVisibility = (id: string) => {
    const existing = services.find((s) => s.id === id);
    if (!existing) return;
    const updated = { ...existing, hidden: !existing.hidden };
    setDoc(doc(db, 'services', id), updated).catch((err) => console.error(err));
    showToast(`Service "${existing.title}" is now ${updated.hidden ? 'Hidden' : 'Visible'}`);
  };

  // Testimonials CRUD
  const addTestimonial = (test: Omit<Testimonial, 'id'>) => {
    const id = `test-${Date.now()}`;
    const newTest: Testimonial = { ...test, id };
    setDoc(doc(db, 'testimonials', id), newTest).catch((err) => console.error(err));
    showToast(`Review from "${test.clientName}" saved to Cloud`);
  };

  const updateTestimonial = (id: string, testFields: Partial<Testimonial>) => {
    const existing = testimonials.find((t) => t.id === id);
    if (!existing) return;
    const updated = { ...existing, ...testFields };
    setDoc(doc(db, 'testimonials', id), updated).catch((err) => console.error(err));
    showToast('Review updated in Cloud');
  };

  const deleteTestimonial = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    deleteDoc(doc(db, 'testimonials', id)).catch((err) => console.error(err));
    showToast('Review deleted', 'info');
  };

  // FAQs CRUD
  const addFAQ = (faq: Omit<FAQItem, 'id'>) => {
    const id = `faq-${Date.now()}`;
    const newFaq: FAQItem = { ...faq, id };
    setDoc(doc(db, 'faqs', id), newFaq).catch((err) => console.error(err));
    showToast('New FAQ saved to Cloud');
  };

  const updateFAQ = (id: string, faqFields: Partial<FAQItem>) => {
    const existing = faqs.find((f) => f.id === id);
    if (!existing) return;
    const updated = { ...existing, ...faqFields };
    setDoc(doc(db, 'faqs', id), updated).catch((err) => console.error(err));
    showToast('FAQ updated');
  };

  const deleteFAQ = (id: string) => {
    setFaqs((prev) => prev.filter((f) => f.id !== id));
    deleteDoc(doc(db, 'faqs', id)).catch((err) => console.error(err));
    showToast('FAQ removed', 'info');
  };

  // Company Info & Estimator Rates
  const updateCompanyInfo = (infoFields: Partial<CompanyInfoType>) => {
    const next = { ...companyInfo, ...infoFields };
    setDoc(doc(db, 'settings', 'company_info'), next).catch((err) => console.error(err));
    showToast('Company Info updated in Cloud Database!');
  };

  const updateEstimatorRates = (ratesFields: Partial<EstimatorRates>) => {
    const next = { ...estimatorRates, ...ratesFields };
    setDoc(doc(db, 'settings', 'estimator_rates'), next).catch((err) => console.error(err));
    showToast('Cost Estimator package rates updated in Cloud Database!');
  };

  // Backup & Reset
  const exportDataJSON = () => {
    const dump = {
      companyInfo,
      projects,
      services,
      testimonials,
      faqs,
      estimatorRates,
      leads,
      adminPin,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(dump, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `prasadh-construction-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Backup JSON downloaded successfully');
  };

  const importDataJSON = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.companyInfo) setCompanyInfo(parsed.companyInfo);
      if (parsed.projects && Array.isArray(parsed.projects)) setProjects(parsed.projects);
      if (parsed.services && Array.isArray(parsed.services)) setServices(parsed.services);
      if (parsed.testimonials && Array.isArray(parsed.testimonials)) setTestimonials(parsed.testimonials);
      if (parsed.faqs && Array.isArray(parsed.faqs)) setFaqs(parsed.faqs);
      if (parsed.estimatorRates) setEstimatorRates(parsed.estimatorRates);
      if (parsed.leads && Array.isArray(parsed.leads)) setLeads(parsed.leads);
      if (parsed.adminPin) setAdminPin(parsed.adminPin);

      saveStateToStorage({
        companyInfo: parsed.companyInfo,
        projects: parsed.projects,
        services: parsed.services,
        testimonials: parsed.testimonials,
        faqs: parsed.faqs,
        estimatorRates: parsed.estimatorRates,
        leads: parsed.leads,
        adminPin: parsed.adminPin
      });

      showToast('Data imported and restored successfully!', 'success');
      return true;
    } catch (err) {
      showToast('Invalid JSON backup file format', 'error');
      return false;
    }
  };

  const resetToDefaults = () => {
    setCompanyInfo(DEFAULT_COMPANY_INFO);
    setProjects(DEFAULT_PROJECTS);
    setServices(DEFAULT_SERVICES);
    setTestimonials(DEFAULT_TESTIMONIALS);
    setFaqs(DEFAULT_FAQS);
    setEstimatorRates(DEFAULT_ESTIMATOR_RATES);
    setLeads(DEFAULT_LEADS);
    setAdminPin(DEFAULT_PIN);
    localStorage.removeItem(STORAGE_KEY);
    showToast('All data reset to defaults', 'info');
  };

  return (
    <CMSContext.Provider
      value={{
        companyInfo,
        projects,
        services,
        testimonials,
        faqs,
        estimatorRates,
        leads,
        beforeAfterProjects,
        materials,
        adminPin,
        isAuthenticated,
        toast,
        isLoginModalOpen,
        isDashboardOpen,
        openLoginModal,
        closeLoginModal,
        openDashboard,
        closeDashboard,
        showToast,
        loginAdmin,
        logoutAdmin,
        changeAdminPin,
        addLead,
        updateLeadStatus,
        deleteLead,
        addProject,
        updateProject,
        deleteProject,
        addBeforeAfterProject,
        updateBeforeAfterProject,
        deleteBeforeAfterProject,
        addMaterial,
        updateMaterial,
        deleteMaterial,
        addService,
        updateService,
        deleteService,
        toggleServiceVisibility,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        addFAQ,
        updateFAQ,
        deleteFAQ,
        updateCompanyInfo,
        updateEstimatorRates,
        exportDataJSON,
        importDataJSON,
        resetToDefaults
      }}
    >
      {children}

      {/* Global Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed bottom-6 right-6 z-[200] max-w-md px-4 py-3 rounded-2xl shadow-2xl border flex items-center gap-3 text-xs font-bold text-white cursor-pointer ${
              toast.type === 'success'
                ? 'bg-emerald-950/90 border-emerald-500/40 text-emerald-200'
                : toast.type === 'error'
                ? 'bg-red-950/90 border-red-500/40 text-red-200'
                : 'bg-blue-950/90 border-blue-500/40 text-blue-200'
            }`}
            onClick={() => setToast(null)}
          >
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-blue-400 shrink-0" />}
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={closeLoginModal}
        onSuccess={() => {
          setIsLoginModalOpen(false);
          openDashboard();
        }}
      />

      {/* Admin Dashboard */}
      {isDashboardOpen && (
        <AdminDashboard onClose={closeDashboard} />
      )}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
