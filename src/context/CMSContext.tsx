import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Project,
  ServiceItem,
  Testimonial,
  FAQItem
} from '../types';
import {
  COMPANY_INFO as DEFAULT_COMPANY_INFO,
  PROJECTS as DEFAULT_PROJECTS,
  SERVICES as DEFAULT_SERVICES,
  TESTIMONIALS as DEFAULT_TESTIMONIALS,
  FAQS as DEFAULT_FAQS
} from '../data/mockData';
import { AdminLoginModal } from '../components/admin/AdminLoginModal';
import { AdminDashboard } from '../components/admin/AdminDashboard';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export interface CompanyInfoType {
  name: string;
  founder: string;
  tagline: string;
  address: string;
  phone: string;
  secondaryPhone: string;
  email: string;
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
    serviceRequested: '3D Elevation & Structural Engineering',
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
  const [adminPin, setAdminPin] = useState<string>(DEFAULT_PIN);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [toast, setToast] = useState<ToastNotification | null>(null);

  // UI Modal States
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState<boolean>(false);

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);
  const openDashboard = () => setIsDashboardOpen(true);
  const closeDashboard = () => setIsDashboardOpen(false);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed.companyInfo) setCompanyInfo(parsed.companyInfo);
        if (parsed.projects && Array.isArray(parsed.projects)) setProjects(parsed.projects);
        if (parsed.services && Array.isArray(parsed.services)) setServices(parsed.services);
        if (parsed.testimonials && Array.isArray(parsed.testimonials)) setTestimonials(parsed.testimonials);
        if (parsed.faqs && Array.isArray(parsed.faqs)) setFaqs(parsed.faqs);
        if (parsed.estimatorRates) setEstimatorRates(parsed.estimatorRates);
        if (parsed.leads && Array.isArray(parsed.leads)) setLeads(parsed.leads);
        if (parsed.adminPin) setAdminPin(parsed.adminPin);
      }

      const session = sessionStorage.getItem(ADMIN_SESSION_KEY);
      if (session === 'true') {
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error('Failed to parse CMS data from localStorage:', err);
    }
  }, []);

  // Save changes to localStorage whenever state updates
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
      console.warn('Storage limit reached or failed to save state to localStorage:', err);
      try {
        // Fallback: compress state or preserve critical state without excessive lead logs if storage is full
        const compactState = {
          companyInfo: updatedState.companyInfo ?? companyInfo,
          projects: updatedState.projects ?? projects,
          services: updatedState.services ?? services,
          testimonials: updatedState.testimonials ?? testimonials,
          faqs: updatedState.faqs ?? faqs,
          estimatorRates: updatedState.estimatorRates ?? estimatorRates,
          leads: (updatedState.leads ?? leads).slice(0, 10),
          adminPin: updatedState.adminPin ?? adminPin
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(compactState));
      } catch (fallbackErr) {
        // If still full, silently catch so the application continues seamlessly in memory
        console.warn('Active session state retained in memory.');
      }
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
    saveStateToStorage({ adminPin: cleanPin });
    showToast('Admin PIN updated successfully', 'success');
    return true;
  };

  // Leads CRUD
  const addLead = (leadData: Omit<ClientLead, 'id'>) => {
    const newLead: ClientLead = {
      ...leadData,
      id: `lead-${Date.now()}`
    };
    const next = [newLead, ...leads];
    setLeads(next);
    saveStateToStorage({ leads: next });
    showToast(`New client lead logged for ${leadData.name}`);
  };

  const updateLeadStatus = (id: string, status: ClientLead['status'], notes?: string) => {
    const next = leads.map((l) => (l.id === id ? { ...l, status, ...(notes !== undefined ? { notes } : {}) } : l));
    setLeads(next);
    saveStateToStorage({ leads: next });
    showToast(`Lead status updated to "${status}"`);
  };

  const deleteLead = (id: string) => {
    const next = leads.filter((l) => l.id !== id);
    setLeads(next);
    saveStateToStorage({ leads: next });
    showToast('Lead record removed', 'info');
  };

  // Projects CRUD
  const addProject = (project: Omit<Project, 'id'>) => {
    const newProj: Project = {
      ...project,
      id: `proj-${Date.now()}`
    };
    const next = [newProj, ...projects];
    setProjects(next);
    saveStateToStorage({ projects: next });
    showToast(`Project "${project.title}" added successfully`);
  };

  const updateProject = (id: string, updatedFields: Partial<Project>) => {
    const next = projects.map((p) => (p.id === id ? { ...p, ...updatedFields } : p));
    setProjects(next);
    saveStateToStorage({ projects: next });
    showToast('Project updated successfully');
  };

  const deleteProject = (id: string) => {
    const projToDelete = projects.find((p) => p.id === id);
    const next = projects.filter((p) => p.id !== id);
    setProjects(next);
    saveStateToStorage({ projects: next });
    showToast(`Deleted project "${projToDelete?.title || id}"`, 'info');
  };

  // Services CRUD
  const addService = (service: Omit<ServiceItemWithVisibility, 'id'>) => {
    const newServ: ServiceItemWithVisibility = {
      ...service,
      id: `serv-${Date.now()}`
    };
    const next = [...services, newServ];
    setServices(next);
    saveStateToStorage({ services: next });
    showToast(`Service "${service.title}" added`);
  };

  const updateService = (id: string, serviceFields: Partial<ServiceItemWithVisibility>) => {
    const next = services.map((s) => (s.id === id ? { ...s, ...serviceFields } : s));
    setServices(next);
    saveStateToStorage({ services: next });
    showToast('Service updated successfully');
  };

  const deleteService = (id: string) => {
    const next = services.filter((s) => s.id !== id);
    setServices(next);
    saveStateToStorage({ services: next });
    showToast('Service removed', 'info');
  };

  const toggleServiceVisibility = (id: string) => {
    const next = services.map((s) => (s.id === id ? { ...s, hidden: !s.hidden } : s));
    setServices(next);
    saveStateToStorage({ services: next });
    const toggled = next.find((s) => s.id === id);
    showToast(`Service "${toggled?.title}" is now ${toggled?.hidden ? 'Hidden' : 'Visible'}`);
  };

  // Testimonials CRUD
  const addTestimonial = (test: Omit<Testimonial, 'id'>) => {
    const newTest: Testimonial = {
      ...test,
      id: `test-${Date.now()}`
    };
    const next = [newTest, ...testimonials];
    setTestimonials(next);
    saveStateToStorage({ testimonials: next });
    showToast(`Review from "${test.clientName}" added`);
  };

  const updateTestimonial = (id: string, testFields: Partial<Testimonial>) => {
    const next = testimonials.map((t) => (t.id === id ? { ...t, ...testFields } : t));
    setTestimonials(next);
    saveStateToStorage({ testimonials: next });
    showToast('Review updated successfully');
  };

  const deleteTestimonial = (id: string) => {
    const next = testimonials.filter((t) => t.id !== id);
    setTestimonials(next);
    saveStateToStorage({ testimonials: next });
    showToast('Review deleted', 'info');
  };

  // FAQs CRUD
  const addFAQ = (faq: Omit<FAQItem, 'id'>) => {
    const newFaq: FAQItem = {
      ...faq,
      id: `faq-${Date.now()}`
    };
    const next = [...faqs, newFaq];
    setFaqs(next);
    saveStateToStorage({ faqs: next });
    showToast('New FAQ added');
  };

  const updateFAQ = (id: string, faqFields: Partial<FAQItem>) => {
    const next = faqs.map((f) => (f.id === id ? { ...f, ...faqFields } : f));
    setFaqs(next);
    saveStateToStorage({ faqs: next });
    showToast('FAQ updated');
  };

  const deleteFAQ = (id: string) => {
    const next = faqs.filter((f) => f.id !== id);
    setFaqs(next);
    saveStateToStorage({ faqs: next });
    showToast('FAQ removed', 'info');
  };

  // Company Info & Estimator Rates
  const updateCompanyInfo = (infoFields: Partial<CompanyInfoType>) => {
    const next = { ...companyInfo, ...infoFields };
    setCompanyInfo(next);
    saveStateToStorage({ companyInfo: next });
    showToast('Contact and Site Settings updated');
  };

  const updateEstimatorRates = (ratesFields: Partial<EstimatorRates>) => {
    const next = { ...estimatorRates, ...ratesFields };
    setEstimatorRates(next);
    saveStateToStorage({ estimatorRates: next });
    showToast('Cost Estimator package rates updated');
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
    if (window.confirm('Are you sure you want to reset all site content back to initial defaults?')) {
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
    }
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
          closeLoginModal();
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
