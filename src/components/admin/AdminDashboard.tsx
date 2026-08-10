import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  Building,
  Briefcase,
  DollarSign,
  Star,
  HelpCircle,
  Settings,
  Database,
  LogOut,
  ExternalLink,
  Plus,
  Trash2,
  Edit2,
  Eye,
  EyeOff,
  Save,
  Download,
  Upload,
  RotateCcw,
  Check,
  X,
  Search,
  Sparkles,
  Phone,
  MapPin,
  Mail,
  Shield,
  Layers,
  FileText,
  Calculator,
  UserCheck
} from 'lucide-react';
import { useCMS, ServiceItemWithVisibility } from '../../context/CMSContext';
import { Project, Testimonial, FAQItem } from '../../types';

interface AdminDashboardProps {
  onClose: () => void;
}

type TabType = 'overview' | 'projects' | 'services' | 'pricing' | 'testimonials' | 'faqs' | 'settings' | 'backup';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const cms = useCMS();
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Modal states for CRUD operations
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);

  const [editingService, setEditingService] = useState<ServiceItemWithVisibility | null>(null);
  const [isAddingService, setIsAddingService] = useState(false);

  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);

  const [editingFAQ, setEditingFAQ] = useState<FAQItem | null>(null);
  const [isAddingFAQ, setIsAddingFAQ] = useState(false);

  const [pinChangeInput, setPinChangeInput] = useState('');
  const [jsonImportText, setJsonImportText] = useState('');

  // Handle Image Upload to Base64 helper
  const handleImageUpload = (file: File, callback: (base64Str: string) => void) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        callback(reader.result.toString());
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-[110] bg-slate-900 text-slate-100 flex flex-col font-sans overflow-hidden">
      {/* TOP ADMIN HEADER BAR */}
      <header className="bg-slate-950 border-b border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 to-amber-500 flex items-center justify-center font-bold text-white shadow-md">
            PC
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-extrabold font-display text-white flex items-center gap-2">
              Prasadh Construction Admin CMS
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono uppercase tracking-wider">
                Live Dynamic Mode
              </span>
            </h1>
            <p className="text-[11px] text-slate-400">
              Manage website content, portfolio, pricing, and services instantly
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Preview Website</span>
          </button>

          <button
            onClick={cms.logoutAdmin}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all text-xs font-semibold flex items-center gap-1 cursor-pointer"
            title="Log Out Admin"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* MAIN LAYOUT WITH SIDEBAR + CONTENT AREA */}
      <div className="flex-1 flex overflow-hidden">
        {/* SIDEBAR NAVIGATION */}
        <aside className="w-16 sm:w-64 bg-slate-950 border-r border-slate-800 flex flex-col shrink-0 overflow-y-auto">
          <nav className="p-2 sm:p-4 space-y-1">
            <SidebarButton
              icon={<LayoutDashboard className="w-5 h-5" />}
              label="Overview"
              active={activeTab === 'overview'}
              onClick={() => setActiveTab('overview')}
            />
            <SidebarButton
              icon={<Building className="w-5 h-5" />}
              label={`Projects (${cms.projects.length})`}
              active={activeTab === 'projects'}
              onClick={() => setActiveTab('projects')}
            />
            <SidebarButton
              icon={<Briefcase className="w-5 h-5" />}
              label={`Services (${cms.services.length})`}
              active={activeTab === 'services'}
              onClick={() => setActiveTab('services')}
            />
            <SidebarButton
              icon={<DollarSign className="w-5 h-5" />}
              label="Pricing & Estimator"
              active={activeTab === 'pricing'}
              onClick={() => setActiveTab('pricing')}
            />
            <SidebarButton
              icon={<Star className="w-5 h-5" />}
              label={`Reviews (${cms.testimonials.length})`}
              active={activeTab === 'testimonials'}
              onClick={() => setActiveTab('testimonials')}
            />
            <SidebarButton
              icon={<HelpCircle className="w-5 h-5" />}
              label={`FAQs (${cms.faqs.length})`}
              active={activeTab === 'faqs'}
              onClick={() => setActiveTab('faqs')}
            />
            <SidebarButton
              icon={<Settings className="w-5 h-5" />}
              label="Site Settings"
              active={activeTab === 'settings'}
              onClick={() => setActiveTab('settings')}
            />
            <SidebarButton
              icon={<Database className="w-5 h-5" />}
              label="Backup & Restore"
              active={activeTab === 'backup'}
              onClick={() => setActiveTab('backup')}
            />
          </nav>

          <div className="mt-auto p-4 border-t border-slate-800/80 hidden sm:block text-[11px] text-slate-500">
            <p className="font-semibold text-slate-400">Er. V. Prasadh M.E.</p>
            <p>Virudhachalam, Tamil Nadu</p>
            <p className="mt-1 text-[10px] text-slate-600">Storage: localStorage Sync</p>
          </div>
        </aside>

        {/* MAIN DYNAMIC CONTENT DISPLAY */}
        <main className="flex-1 bg-slate-900 overflow-y-auto p-4 sm:p-8 text-slate-200">
          {activeTab === 'overview' && <OverviewTab cms={cms} onNavigate={(tab) => setActiveTab(tab)} />}
          {activeTab === 'projects' && (
            <ProjectsTab
              cms={cms}
              onAddProject={() => setIsAddingProject(true)}
              onEditProject={(p) => setEditingProject(p)}
              handleImageUpload={handleImageUpload}
            />
          )}
          {activeTab === 'services' && (
            <ServicesTab
              cms={cms}
              onAddService={() => setIsAddingService(true)}
              onEditService={(s) => setEditingService(s)}
            />
          )}
          {activeTab === 'pricing' && <PricingTab cms={cms} />}
          {activeTab === 'testimonials' && (
            <TestimonialsTab
              cms={cms}
              onAddTestimonial={() => setIsAddingTestimonial(true)}
              onEditTestimonial={(t) => setEditingTestimonial(t)}
              handleImageUpload={handleImageUpload}
            />
          )}
          {activeTab === 'faqs' && (
            <FAQsTab
              cms={cms}
              onAddFAQ={() => setIsAddingFAQ(true)}
              onEditFAQ={(f) => setEditingFAQ(f)}
            />
          )}
          {activeTab === 'settings' && (
            <SettingsTab
              cms={cms}
              pinChangeInput={pinChangeInput}
              setPinChangeInput={setPinChangeInput}
            />
          )}
          {activeTab === 'backup' && (
            <BackupTab
              cms={cms}
              jsonImportText={jsonImportText}
              setJsonImportText={setJsonImportText}
            />
          )}
        </main>
      </div>

      {/* MODALS FOR ADD / EDIT */}

      {/* 1. PROJECT FORM MODAL */}
      {(isAddingProject || editingProject) && (
        <ProjectFormModal
          project={editingProject}
          onClose={() => {
            setIsAddingProject(false);
            setEditingProject(null);
          }}
          onSave={(data) => {
            if (editingProject) {
              cms.updateProject(editingProject.id, data);
            } else {
              cms.addProject(data);
            }
            setIsAddingProject(false);
            setEditingProject(null);
          }}
          handleImageUpload={handleImageUpload}
        />
      )}

      {/* 2. SERVICE FORM MODAL */}
      {(isAddingService || editingService) && (
        <ServiceFormModal
          service={editingService}
          onClose={() => {
            setIsAddingService(false);
            setEditingService(null);
          }}
          onSave={(data) => {
            if (editingService) {
              cms.updateService(editingService.id, data);
            } else {
              cms.addService(data);
            }
            setIsAddingService(false);
            setEditingService(null);
          }}
        />
      )}

      {/* 3. TESTIMONIAL FORM MODAL */}
      {(isAddingTestimonial || editingTestimonial) && (
        <TestimonialFormModal
          testimonial={editingTestimonial}
          onClose={() => {
            setIsAddingTestimonial(false);
            setEditingTestimonial(null);
          }}
          onSave={(data) => {
            if (editingTestimonial) {
              cms.updateTestimonial(editingTestimonial.id, data);
            } else {
              cms.addTestimonial(data);
            }
            setIsAddingTestimonial(false);
            setEditingTestimonial(null);
          }}
          handleImageUpload={handleImageUpload}
        />
      )}

      {/* 4. FAQ FORM MODAL */}
      {(isAddingFAQ || editingFAQ) && (
        <FAQFormModal
          faq={editingFAQ}
          onClose={() => {
            setIsAddingFAQ(false);
            setEditingFAQ(null);
          }}
          onSave={(data) => {
            if (editingFAQ) {
              cms.updateFAQ(editingFAQ.id, data);
            } else {
              cms.addFAQ(data);
            }
            setIsAddingFAQ(false);
            setEditingFAQ(null);
          }}
        />
      )}
    </div>
  );
};

// HELPER SIDEBAR BUTTON
const SidebarButton: React.FC<{
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
      active
        ? 'bg-[#1E3A8A] text-white shadow-lg border border-blue-400/30 font-bold'
        : 'text-slate-400 hover:text-white hover:bg-slate-900'
    }`}
  >
    <div className={active ? 'text-amber-300' : 'text-slate-400'}>{icon}</div>
    <span className="hidden sm:inline truncate">{label}</span>
  </button>
);

/* =========================================================================
   TAB 1: OVERVIEW
   ========================================================================= */
const OverviewTab: React.FC<{ cms: ReturnType<typeof useCMS>; onNavigate: (tab: TabType) => void }> = ({ cms, onNavigate }) => {
  const hiddenServices = cms.services.filter((s) => s.hidden).length;
  const activeServices = cms.services.length - hiddenServices;

  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold font-display text-white">Dashboard Overview</h2>
        <p className="text-xs text-slate-400 mt-1">
          Welcome to the Prasadh Construction Content Management System.
        </p>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Projects</span>
            <Building className="w-5 h-5 text-blue-400" />
          </div>
          <p className="text-3xl font-extrabold font-display text-white mt-2">{cms.projects.length}</p>
          <button
            onClick={() => onNavigate('projects')}
            className="mt-3 text-[11px] text-blue-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
          >
            Manage Portfolio &rarr;
          </button>
        </div>

        <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Services</span>
            <Briefcase className="w-5 h-5 text-amber-400" />
          </div>
          <p className="text-3xl font-extrabold font-display text-white mt-2">
            {activeServices} <span className="text-xs font-normal text-slate-400">({hiddenServices} hidden)</span>
          </p>
          <button
            onClick={() => onNavigate('services')}
            className="mt-3 text-[11px] text-amber-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
          >
            Manage Services &rarr;
          </button>
        </div>

        <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Client Reviews</span>
            <Star className="w-5 h-5 text-amber-300" />
          </div>
          <p className="text-3xl font-extrabold font-display text-white mt-2">{cms.testimonials.length}</p>
          <button
            onClick={() => onNavigate('testimonials')}
            className="mt-3 text-[11px] text-amber-300 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
          >
            Manage Testimonials &rarr;
          </button>
        </div>

        <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pricing Package</span>
            <DollarSign className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-2xl font-extrabold font-display text-white mt-2">
            ₹{cms.estimatorRates.standardRate} - ₹{cms.estimatorRates.sovereignRate}
          </p>
          <button
            onClick={() => onNavigate('pricing')}
            className="mt-3 text-[11px] text-emerald-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
          >
            Configure Estimator Rates &rarr;
          </button>
        </div>
      </div>

      {/* QUICK SITE DETAILS SUMMARY */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/80 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Phone className="w-4 h-4 text-blue-400" />
            Live Contact & Business Details
          </h3>

          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex justify-between py-1 border-b border-slate-700/50">
              <span className="text-slate-400">Company Name:</span>
              <span className="font-semibold text-white">{cms.companyInfo.name}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-700/50">
              <span className="text-slate-400">Founder & Engineer:</span>
              <span className="font-semibold text-white">{cms.companyInfo.founder}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-700/50">
              <span className="text-slate-400">Primary Phone:</span>
              <span className="font-semibold text-emerald-400">{cms.companyInfo.phone}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-700/50">
              <span className="text-slate-400">WhatsApp:</span>
              <span className="font-semibold text-emerald-400">+{cms.companyInfo.whatsapp}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-700/50">
              <span className="text-slate-400">Office Address:</span>
              <span className="font-semibold text-white text-right max-w-xs">{cms.companyInfo.address}</span>
            </div>
          </div>

          <button
            onClick={() => onNavigate('settings')}
            className="w-full py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold transition-all text-center block cursor-pointer"
          >
            Edit Contact Details & Address
          </button>
        </div>

        <div className="p-6 rounded-3xl bg-slate-800/80 border border-slate-700/80 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            Quick Admin Actions
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => onNavigate('projects')}
              className="p-4 rounded-2xl bg-blue-900/40 hover:bg-blue-900/60 border border-blue-500/30 text-left transition-all cursor-pointer group"
            >
              <Plus className="w-5 h-5 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-xs font-bold text-white">Add New Project</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Upload specs & photos</p>
            </button>

            <button
              onClick={() => onNavigate('testimonials')}
              className="p-4 rounded-2xl bg-amber-900/40 hover:bg-amber-900/60 border border-amber-500/30 text-left transition-all cursor-pointer group"
            >
              <Star className="w-5 h-5 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-xs font-bold text-white">Add Client Review</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Publish Google review</p>
            </button>

            <button
              onClick={() => onNavigate('pricing')}
              className="p-4 rounded-2xl bg-emerald-900/40 hover:bg-emerald-900/60 border border-emerald-500/30 text-left transition-all cursor-pointer group"
            >
              <Calculator className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-xs font-bold text-white">Edit Sq.Ft Pricing</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Update rate packages</p>
            </button>

            <button
              onClick={() => onNavigate('backup')}
              className="p-4 rounded-2xl bg-purple-900/40 hover:bg-purple-900/60 border border-purple-500/30 text-left transition-all cursor-pointer group"
            >
              <Download className="w-5 h-5 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-xs font-bold text-white">Download Backup</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Export site JSON</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   TAB 2: PROJECTS PORTFOLIO MANAGER
   ========================================================================= */
const ProjectsTab: React.FC<{
  cms: ReturnType<typeof useCMS>;
  onAddProject: () => void;
  onEditProject: (p: Project) => void;
  handleImageUpload: (file: File, callback: (str: string) => void) => void;
}> = ({ cms, onAddProject, onEditProject }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProjects = cms.projects.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-white">Projects Portfolio Manager</h2>
          <p className="text-xs text-slate-400 mt-1">
            Add, edit, or remove completed construction projects from the showcase.
          </p>
        </div>

        <button
          onClick={onAddProject}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-lg cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* FILTER & SEARCH */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search projects by title or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Categories</option>
          <option value="villas">Luxury Villas</option>
          <option value="commercial">Commercial</option>
          <option value="structural">Structural Engg</option>
          <option value="interiors">Interiors</option>
          <option value="renovation">Renovation</option>
        </select>
      </div>

      {/* PROJECTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.map((p) => (
          <div
            key={p.id}
            className="bg-slate-800/90 rounded-2xl overflow-hidden border border-slate-700/80 flex flex-col justify-between shadow-md group hover:border-blue-500/50 transition-all"
          >
            <div>
              <div className="relative h-44 bg-slate-950 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 bg-slate-950/80 text-amber-300 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md">
                  {p.category}
                </span>
              </div>

              <div className="p-4 space-y-2">
                <p className="text-[11px] font-semibold text-blue-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{p.location}</span>
                </p>
                <h3 className="text-sm font-bold text-white leading-snug line-clamp-1">{p.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-2">{p.description}</p>
                <div className="text-[11px] text-slate-500 flex justify-between pt-2 border-t border-slate-700/50">
                  <span>Area: {p.area}</span>
                  <span>Year: {p.completionYear}</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-slate-900/60 border-t border-slate-700/80 flex items-center justify-between gap-2">
              <button
                onClick={() => onEditProject(p)}
                className="flex-1 py-1.5 px-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Edit</span>
              </button>

              <button
                onClick={() => cms.deleteProject(p.id)}
                className="py-1.5 px-3 bg-red-950/60 hover:bg-red-900/80 text-red-400 rounded-lg text-xs font-semibold border border-red-800/50 transition-colors flex items-center gap-1 cursor-pointer"
                title="Delete Project"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* =========================================================================
   TAB 3: SERVICES & SPECS MANAGER
   ========================================================================= */
const ServicesTab: React.FC<{
  cms: ReturnType<typeof useCMS>;
  onAddService: () => void;
  onEditService: (s: ServiceItemWithVisibility) => void;
}> = ({ cms, onAddService, onEditService }) => {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-white">Services & Specs Manager</h2>
          <p className="text-xs text-slate-400 mt-1">
            Edit service offerings, deliverables, or toggle visibility on the live site.
          </p>
        </div>

        <button
          onClick={onAddService}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-lg cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Custom Service</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cms.services.map((s) => (
          <div
            key={s.id}
            className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
              s.hidden
                ? 'bg-slate-900/80 border-slate-800 text-slate-500 opacity-60'
                : 'bg-slate-800/90 border-slate-700 text-slate-200'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-900/50 text-blue-300 border border-blue-700/50">
                  Icon: {s.iconName}
                </span>

                <button
                  onClick={() => cms.toggleServiceVisibility(s.id)}
                  className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    s.hidden
                      ? 'bg-red-950 text-red-400 border border-red-800/60'
                      : 'bg-emerald-950 text-emerald-400 border border-emerald-800/60'
                  }`}
                >
                  {s.hidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{s.hidden ? 'Hidden' : 'Visible'}</span>
                </button>
              </div>

              <h3 className="text-base font-bold text-white mb-1">{s.title}</h3>
              <p className="text-xs text-slate-400 line-clamp-2 mb-3">{s.description}</p>

              <div className="p-3 bg-slate-950/50 rounded-xl space-y-1 mb-4 border border-slate-800">
                <p className="text-[10px] uppercase font-bold text-slate-400">Key Deliverables:</p>
                <ul className="text-xs text-slate-300 list-disc list-inside space-y-0.5">
                  {s.deliverables.slice(0, 3).map((deliv, idx) => (
                    <li key={idx} className="truncate">{deliv}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-700/60">
              <button
                onClick={() => onEditService(s)}
                className="py-1.5 px-4 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Edit Specs</span>
              </button>

              <button
                onClick={() => cms.deleteService(s.id)}
                className="py-1.5 px-3 bg-red-950/60 hover:bg-red-900/80 text-red-400 rounded-lg text-xs font-semibold border border-red-800/50 cursor-pointer"
                title="Delete Service"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* =========================================================================
   TAB 4: PRICING & COST ESTIMATOR CONFIGURATOR
   ========================================================================= */
const PricingTab: React.FC<{ cms: ReturnType<typeof useCMS> }> = ({ cms }) => {
  const [rates, setRates] = useState(cms.estimatorRates);

  const handleSave = () => {
    cms.updateEstimatorRates(rates);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold font-display text-white">Live Cost Estimator Configurator</h2>
        <p className="text-xs text-slate-400 mt-1">
          Adjust package pricing per sq.ft and add-on rates for the website calculator.
        </p>
      </div>

      {/* RATES FORM */}
      <div className="bg-slate-800/90 p-6 rounded-3xl border border-slate-700 space-y-6">
        <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider flex items-center gap-2">
          <Calculator className="w-4 h-4" />
          Construction Package Rates (₹ / Sq. Ft.)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Standard Package Rate</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 text-xs">₹</span>
              <input
                type="number"
                value={rates.standardRate}
                onChange={(e) => setRates({ ...rates, standardRate: Number(e.target.value) })}
                className="w-full pl-7 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-bold text-white"
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Standard finishes & PPC cement</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Popular / Premium Package</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 text-xs">₹</span>
              <input
                type="number"
                value={rates.premiumRate}
                onChange={(e) => setRates({ ...rates, premiumRate: Number(e.target.value) })}
                className="w-full pl-7 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-bold text-white"
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Teak joinery & UltraTech matrix</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Sovereign / Ultra-Luxury</label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 text-xs">₹</span>
              <input
                type="number"
                value={rates.sovereignRate}
                onChange={(e) => setRates({ ...rates, sovereignRate: Number(e.target.value) })}
                className="w-full pl-7 pr-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-bold text-white"
              />
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Bespoke luxury & automation</p>
          </div>
        </div>

        <h3 className="text-sm font-bold text-blue-300 uppercase tracking-wider pt-4 border-t border-slate-700 flex items-center gap-2">
          <DollarSign className="w-4 h-4" />
          Add-On Engineering & Approval Fees
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">3D Structural Analysis Fee (Fixed ₹)</label>
            <input
              type="number"
              value={rates.structAddon}
              onChange={(e) => setRates({ ...rates, structAddon: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-bold text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">DTCP / Govt Approval Fee (Fixed ₹)</label>
            <input
              type="number"
              value={rates.approvalAddon}
              onChange={(e) => setRates({ ...rates, approvalAddon: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-bold text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Interior Woodwork Rate (₹ / Sq.Ft)</label>
            <input
              type="number"
              value={rates.interiorAddonPerSqFt}
              onChange={(e) => setRates({ ...rates, interiorAddonPerSqFt: Number(e.target.value) })}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-bold text-white"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save Live Estimator Pricing</span>
        </button>
      </div>
    </div>
  );
};

/* =========================================================================
   TAB 5: TESTIMONIALS & REVIEWS MANAGER
   ========================================================================= */
const TestimonialsTab: React.FC<{
  cms: ReturnType<typeof useCMS>;
  onAddTestimonial: () => void;
  onEditTestimonial: (t: Testimonial) => void;
  handleImageUpload: (file: File, callback: (str: string) => void) => void;
}> = ({ cms, onAddTestimonial, onEditTestimonial }) => {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-white">Testimonials & Reviews Manager</h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage verified client reviews and ratings shown in the Google-style testimonials section.
          </p>
        </div>

        <button
          onClick={onAddTestimonial}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-lg cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Client Review</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cms.testimonials.map((t) => (
          <div key={t.id} className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.clientName}
                    className="w-10 h-10 rounded-full object-cover border border-slate-600"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-white">{t.clientName}</h3>
                    <p className="text-[11px] text-slate-400">{t.location}</p>
                  </div>
                </div>

                <div className="flex text-amber-400">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
              </div>

              <p className="text-xs text-slate-300 italic line-clamp-3">"{t.comment}"</p>
              <p className="text-[10px] text-blue-400 font-medium">Project: {t.projectType}</p>
            </div>

            <div className="flex items-center justify-between pt-3 mt-4 border-t border-slate-700/60">
              <button
                onClick={() => onEditTestimonial(t)}
                className="py-1.5 px-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <Edit2 className="w-3.5 h-3.5 text-blue-400" />
                <span>Edit</span>
              </button>

              <button
                onClick={() => cms.deleteTestimonial(t.id)}
                className="py-1.5 px-3 bg-red-950/60 hover:bg-red-900/80 text-red-400 rounded-lg text-xs font-semibold border border-red-800/50 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* =========================================================================
   TAB 6: FAQS MANAGER
   ========================================================================= */
const FAQsTab: React.FC<{
  cms: ReturnType<typeof useCMS>;
  onAddFAQ: () => void;
  onEditFAQ: (f: FAQItem) => void;
}> = ({ cms, onAddFAQ, onEditFAQ }) => {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold font-display text-white">FAQs Manager</h2>
          <p className="text-xs text-slate-400 mt-1">
            Add or edit frequently asked questions and responses.
          </p>
        </div>

        <button
          onClick={onAddFAQ}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-lg cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add New FAQ</span>
        </button>
      </div>

      <div className="space-y-3">
        {cms.faqs.map((f) => (
          <div key={f.id} className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-2">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="px-2 py-0.5 rounded-full bg-blue-900/50 text-blue-300 text-[10px] font-bold uppercase tracking-wider">
                  Category: {f.category}
                </span>
                <h3 className="text-sm font-bold text-white mt-1.5">{f.question}</h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onEditFAQ(f)}
                  className="p-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => cms.deleteFAQ(f.id)}
                  className="p-1.5 bg-red-950/60 hover:bg-red-900/80 text-red-400 rounded-lg text-xs cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{f.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

/* =========================================================================
   TAB 7: SITE SETTINGS & CONTACT DETAILS
   ========================================================================= */
const SettingsTab: React.FC<{
  cms: ReturnType<typeof useCMS>;
  pinChangeInput: string;
  setPinChangeInput: (str: string) => void;
}> = ({ cms, pinChangeInput, setPinChangeInput }) => {
  const [info, setInfo] = useState(cms.companyInfo);

  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    cms.updateCompanyInfo(info);
  };

  const handleChangePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinChangeInput.trim()) {
      cms.changeAdminPin(pinChangeInput);
      setPinChangeInput('');
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold font-display text-white">Site Settings & Contact Info</h2>
        <p className="text-xs text-slate-400 mt-1">
          Update phone numbers, address, business hours, and admin security PIN.
        </p>
      </div>

      {/* CONTACT INFO FORM */}
      <form onSubmit={handleSaveInfo} className="bg-slate-800/90 p-6 rounded-3xl border border-slate-700 space-y-4">
        <h3 className="text-sm font-bold text-amber-300 uppercase tracking-wider mb-2">Company Profile</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Company Name</label>
            <input
              type="text"
              value={info.name}
              onChange={(e) => setInfo({ ...info, name: e.target.value })}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Founder / Structural Engineer</label>
            <input
              type="text"
              value={info.founder}
              onChange={(e) => setInfo({ ...info, founder: e.target.value })}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Phone Number</label>
            <input
              type="text"
              value={info.phone}
              onChange={(e) => setInfo({ ...info, phone: e.target.value })}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp Number (e.g. 918056658861)</label>
            <input
              type="text"
              value={info.whatsapp}
              onChange={(e) => setInfo({ ...info, whatsapp: e.target.value })}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
            <input
              type="email"
              value={info.email}
              onChange={(e) => setInfo({ ...info, email: e.target.value })}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Business Working Hours</label>
            <input
              type="text"
              value={info.hours}
              onChange={(e) => setInfo({ ...info, hours: e.target.value })}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Office Address (Virudhachalam)</label>
          <textarea
            value={info.address}
            onChange={(e) => setInfo({ ...info, address: e.target.value })}
            rows={2}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save Company Contact Settings</span>
        </button>
      </form>

      {/* ADMIN PIN CHANGE FORM */}
      <form onSubmit={handleChangePinSubmit} className="bg-slate-800/90 p-6 rounded-3xl border border-slate-700 space-y-4">
        <h3 className="text-sm font-bold text-red-400 uppercase tracking-wider flex items-center gap-2">
          <Shield className="w-4 h-4" />
          Change Admin Security PIN
        </h3>

        <div className="flex items-center gap-3">
          <input
            type="password"
            placeholder="Enter new 4-digit PIN"
            value={pinChangeInput}
            onChange={(e) => setPinChangeInput(e.target.value)}
            className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer"
          >
            Update PIN
          </button>
        </div>
      </form>
    </div>
  );
};

/* =========================================================================
   TAB 8: BACKUP & RESTORE
   ========================================================================= */
const BackupTab: React.FC<{
  cms: ReturnType<typeof useCMS>;
  jsonImportText: string;
  setJsonImportText: (str: string) => void;
}> = ({ cms, jsonImportText, setJsonImportText }) => {
  const handleImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (jsonImportText.trim()) {
      const ok = cms.importDataJSON(jsonImportText);
      if (ok) setJsonImportText('');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) {
          cms.importDataJSON(text);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold font-display text-white">Backup & Data Recovery</h2>
        <p className="text-xs text-slate-400 mt-1">
          Export your site configuration as a JSON file or restore from a backup.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* EXPORT BOX */}
        <div className="p-6 rounded-3xl bg-slate-800/90 border border-slate-700 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-900/40 text-blue-400 flex items-center justify-center">
            <Download className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Download JSON Backup</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Download a full backup of all projects, services, estimator rates, reviews, and contact settings.
          </p>

          <button
            onClick={cms.exportDataJSON}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download Backup JSON File</span>
          </button>
        </div>

        {/* RESTORE DEFAULT BOX */}
        <div className="p-6 rounded-3xl bg-slate-800/90 border border-slate-700 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-900/40 text-amber-400 flex items-center justify-center">
            <RotateCcw className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white">Reset Site Content to Defaults</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Revert all edits and reset the site back to original default mock data.
          </p>

          <button
            onClick={cms.resetToDefaults}
            className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset All Content To Default</span>
          </button>
        </div>
      </div>

      {/* IMPORT JSON FORM */}
      <div className="p-6 rounded-3xl bg-slate-800/90 border border-slate-700 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Upload className="w-4 h-4 text-emerald-400" />
          Restore From JSON Backup File
        </h3>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <label className="w-full sm:w-auto px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl cursor-pointer text-center flex items-center justify-center gap-2">
            <Upload className="w-4 h-4" />
            <span>Select JSON File</span>
            <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
          </label>
          <span className="text-xs text-slate-400">or paste JSON payload below:</span>
        </div>

        <form onSubmit={handleImportSubmit} className="space-y-3">
          <textarea
            value={jsonImportText}
            onChange={(e) => setJsonImportText(e.target.value)}
            placeholder="Paste raw JSON backup content here..."
            rows={4}
            className="w-full p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-slate-200 font-mono"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-colors cursor-pointer"
          >
            Restore JSON Data
          </button>
        </form>
      </div>
    </div>
  );
};

/* =========================================================================
   FORM MODALS (PROJECT, SERVICE, TESTIMONIAL, FAQ)
   ========================================================================= */

// 1. PROJECT FORM MODAL
const ProjectFormModal: React.FC<{
  project: Project | null;
  onClose: () => void;
  onSave: (data: Omit<Project, 'id'>) => void;
  handleImageUpload: (file: File, callback: (str: string) => void) => void;
}> = ({ project, onClose, onSave, handleImageUpload }) => {
  const [formData, setFormData] = useState<Omit<Project, 'id'>>({
    title: project?.title || '',
    category: project?.category || 'villas',
    location: project?.location || 'Virudhachalam',
    area: project?.area || '3,000 Sq. Ft.',
    completionYear: project?.completionYear || '2024',
    constructionType: project?.constructionType || 'RCC Frame Structure',
    image: project?.image || '',
    description: project?.description || '',
    highlights: project?.highlights || ['Quality Material Matrix', 'On-Time Handover'],
    clientName: project?.clientName || 'Er. Client Reference'
  });

  const [highlightInput, setHighlightInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 max-w-2xl w-full rounded-3xl p-6 sm:p-8 space-y-6 text-white my-auto max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <h3 className="text-lg font-bold font-display">
            {project ? 'Edit Construction Project' : 'Add New Completed Project'}
          </h3>
          <button onClick={onClose} className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Project Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
              >
                <option value="villas">Luxury Villas</option>
                <option value="commercial">Commercial Hub</option>
                <option value="structural">Structural Engineering</option>
                <option value="interiors">Interior Decor</option>
                <option value="renovation">Renovation</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Built-up Area (e.g. 3,500 Sq. Ft.)</label>
              <input
                type="text"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Completion Year</label>
              <input
                type="text"
                value={formData.completionYear}
                onChange={(e) => setFormData({ ...formData, completionYear: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Construction Type</label>
              <input
                type="text"
                value={formData.constructionType}
                onChange={(e) => setFormData({ ...formData, constructionType: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Project Photo URL or Local Upload</label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="https://images.unsplash.com/..."
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                required
              />
              <label className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-xs font-bold cursor-pointer shrink-0">
                Upload File
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleImageUpload(f, (base64) => setFormData({ ...formData, image: base64 }));
                  }}
                />
              </label>
            </div>
            {formData.image && (
              <div className="mt-2 h-24 rounded-xl overflow-hidden border border-slate-700">
                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Client Reference Name</label>
            <input
              type="text"
              value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg transition-colors cursor-pointer"
          >
            Save Project
          </button>
        </form>
      </div>
    </div>
  );
};

// 2. SERVICE FORM MODAL
const ServiceFormModal: React.FC<{
  service: ServiceItemWithVisibility | null;
  onClose: () => void;
  onSave: (data: Omit<ServiceItemWithVisibility, 'id'>) => void;
}> = ({ service, onClose, onSave }) => {
  const [formData, setFormData] = useState<Omit<ServiceItemWithVisibility, 'id'>>({
    title: service?.title || '',
    iconName: service?.iconName || 'Building2',
    description: service?.description || '',
    deliverables: service?.deliverables || ['Deliverable 1', 'Deliverable 2'],
    idealFor: service?.idealFor || 'Residential homeowners & builders',
    hidden: service?.hidden || false
  });

  const [delivInput, setDelivInput] = useState('');

  const addDeliverable = () => {
    if (delivInput.trim()) {
      setFormData({ ...formData, deliverables: [...formData.deliverables, delivInput.trim()] });
      setDelivInput('');
    }
  };

  const removeDeliverable = (index: number) => {
    setFormData({ ...formData, deliverables: formData.deliverables.filter((_, idx) => idx !== index) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 max-w-lg w-full rounded-3xl p-6 space-y-5 text-white my-auto max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-base font-bold font-display">{service ? 'Edit Service Specs' : 'Add Custom Service'}</h3>
          <button onClick={onClose} className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Service Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Icon Name (Lucide Icon)</label>
            <select
              value={formData.iconName}
              onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
            >
              <option value="Home">Home (Residential)</option>
              <option value="Building2">Building2 (Commercial)</option>
              <option value="Compass">Compass (Consultancy)</option>
              <option value="Ruler">Ruler (Planning)</option>
              <option value="FileCheck">FileCheck (Approvals)</option>
              <option value="Paintbrush">Paintbrush (Interiors)</option>
              <option value="Hammer">Hammer (Renovation)</option>
              <option value="Key">Key (Turnkey)</option>
              <option value="ShieldCheck">ShieldCheck (Supervision)</option>
              <option value="Calculator">Calculator (Estimator)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Short Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Deliverables List</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={delivInput}
                onChange={(e) => setDelivInput(e.target.value)}
                placeholder="Add deliverable feature..."
                className="flex-1 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white"
              />
              <button
                type="button"
                onClick={addDeliverable}
                className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs font-bold cursor-pointer"
              >
                Add
              </button>
            </div>

            <div className="space-y-1">
              {formData.deliverables.map((deliv, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-800 text-xs text-slate-200">
                  <span className="truncate">{deliv}</span>
                  <button type="button" onClick={() => removeDeliverable(idx)} className="text-red-400 hover:text-red-300">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg transition-colors cursor-pointer"
          >
            Save Service
          </button>
        </form>
      </div>
    </div>
  );
};

// 3. TESTIMONIAL FORM MODAL
const TestimonialFormModal: React.FC<{
  testimonial: Testimonial | null;
  onClose: () => void;
  onSave: (data: Omit<Testimonial, 'id'>) => void;
  handleImageUpload: (file: File, callback: (str: string) => void) => void;
}> = ({ testimonial, onClose, onSave, handleImageUpload }) => {
  const [formData, setFormData] = useState<Omit<Testimonial, 'id'>>({
    clientName: testimonial?.clientName || '',
    location: testimonial?.location || 'Virudhachalam',
    projectType: testimonial?.projectType || 'Luxury Villa Construction',
    rating: testimonial?.rating || 5,
    date: testimonial?.date || 'Recently',
    comment: testimonial?.comment || '',
    avatar: testimonial?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    projectPhoto: testimonial?.projectPhoto || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    verified: testimonial?.verified ?? true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 max-w-lg w-full rounded-3xl p-6 space-y-4 text-white my-auto max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-base font-bold font-display">{testimonial ? 'Edit Client Review' : 'Add Client Review'}</h3>
          <button onClick={onClose} className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Client Name</label>
            <input
              type="text"
              value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Star Rating (1 - 5)</label>
              <input
                type="number"
                min={1}
                max={5}
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Project Type</label>
            <input
              type="text"
              value={formData.projectType}
              onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Review Comment</label>
            <textarea
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg transition-colors cursor-pointer"
          >
            Save Review
          </button>
        </form>
      </div>
    </div>
  );
};

// 4. FAQ FORM MODAL
const FAQFormModal: React.FC<{
  faq: FAQItem | null;
  onClose: () => void;
  onSave: (data: Omit<FAQItem, 'id'>) => void;
}> = ({ faq, onClose, onSave }) => {
  const [formData, setFormData] = useState<Omit<FAQItem, 'id'>>({
    category: faq?.category || 'construction',
    question: faq?.question || '',
    answer: faq?.answer || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 max-w-lg w-full rounded-3xl p-6 space-y-4 text-white my-auto max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-base font-bold font-display">{faq ? 'Edit FAQ' : 'Add FAQ'}</h3>
          <button onClick={onClose} className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
            >
              <option value="construction">Construction</option>
              <option value="cost">Cost & Budget</option>
              <option value="timeline">Timeline</option>
              <option value="approvals">Approvals & Sanctions</option>
              <option value="consultancy">Consultancy</option>
              <option value="warranty">Warranty</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Question</label>
            <input
              type="text"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Answer</label>
            <textarea
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg transition-colors cursor-pointer"
          >
            Save FAQ
          </button>
        </form>
      </div>
    </div>
  );
};
