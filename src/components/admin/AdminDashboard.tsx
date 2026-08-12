import React, { useState, useMemo } from 'react';
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
  UserCheck,
  MessageSquare,
  Users,
  CheckCircle2,
  Clock,
  Send,
  AlertCircle,
  Tag,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Camera,
  Images
} from 'lucide-react';
import { useCMS, ServiceItemWithVisibility, ClientLead } from '../../context/CMSContext';
import { Project, Testimonial, FAQItem, BeforeAfterProject, MaterialBrand } from '../../types';
import prasadhLogoEmblem from '../../assets/images/Prasadh_Logo1.png';

interface AdminDashboardProps {
  onClose: () => void;
}

type TabType = 'overview' | 'leads' | 'projects' | 'before_after' | 'materials' | 'services' | 'pricing' | 'testimonials' | 'faqs' | 'settings' | 'backup';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
  const cms = useCMS();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [globalSearch, setGlobalSearch] = useState('');

  // Modal states for CRUD operations
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);

  const [editingBeforeAfter, setEditingBeforeAfter] = useState<any | null>(null);
  const [isAddingBeforeAfter, setIsAddingBeforeAfter] = useState(false);

  const [editingMaterial, setEditingMaterial] = useState<any | null>(null);
  const [isAddingMaterial, setIsAddingMaterial] = useState(false);

  const [editingService, setEditingService] = useState<ServiceItemWithVisibility | null>(null);
  const [isAddingService, setIsAddingService] = useState(false);

  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);

  const [editingFAQ, setEditingFAQ] = useState<FAQItem | null>(null);
  const [isAddingFAQ, setIsAddingFAQ] = useState(false);

  const [isAddingLead, setIsAddingLead] = useState(false);

  const [pinChangeInput, setPinChangeInput] = useState('');
  const [jsonImportText, setJsonImportText] = useState('');

  const [confirmModal, setConfirmModal] = useState<{
    title: string;
    message: string;
    onConfirm: () => void;
  } | null>(null);

  const requestConfirm = (title: string, message: string, onConfirm: () => void) => {
    setConfirmModal({ title, message, onConfirm });
  };

  // Handle Image Upload with Canvas compression to lightweight Base64
  const handleImageUpload = (file: File, callback: (base64Str: string) => void) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (!reader.result) return;
      const rawDataUrl = reader.result.toString();
      
      const img = new Image();
      img.src = rawDataUrl;
      img.onload = () => {
        const maxWidth = 1200;
        const maxHeight = 1200;
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', 0.75);
          callback(compressed);
        } else {
          callback(rawDataUrl);
        }
      };
      img.onerror = () => {
        callback(rawDataUrl);
      };
    };
    reader.readAsDataURL(file);
  };

  // Logout handler returning directly to the website
  const handleLogout = () => {
    cms.logoutAdmin();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] bg-slate-100 text-slate-900 flex flex-col font-sans overflow-hidden">
      {/* TOP ADMIN HEADER BAR - LIGHT THEMED */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between shrink-0 shadow-2xs z-10">
        <div className="flex items-center gap-3">
          {/* Real Company Emblem Logo */}
          <div className="relative group">
            <img
              src={prasadhLogoEmblem}
              alt="Prasadh Construction Logo"
              className="w-10 h-10 object-contain scale-125 drop-shadow-xs"
            />
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full" title="CMS Connected Live" />
          </div>

          <div>
            <h1 className="text-sm sm:text-base font-extrabold font-display text-slate-900 flex items-center gap-2">
              Vishnu Prasadh Construction Admin CMS
              <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-mono font-bold uppercase tracking-wider hidden sm:inline-flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                Live Dynamic
              </span>
            </h1>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              Manage website content, portfolio, client leads, and pricing instantly
            </p>
          </div>
        </div>

        {/* Header Actions & Global Search */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Global Search input */}
          <div className="relative hidden md:block w-52 lg:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search CMS..."
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-amber-500 focus:bg-white transition-all"
            />
            {globalSearch && (
              <button
                onClick={() => setGlobalSearch('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 text-xs font-semibold transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
            title="Preview live website"
          >
            <ExternalLink className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden sm:inline">Preview Website</span>
          </button>

          {/* Logout Button -> Returns directly to website */}
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs"
            title="Log out and return to website"
          >
            <LogOut className="w-3.5 h-3.5 text-rose-600" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* MAIN LAYOUT WITH SIDEBAR + CONTENT AREA */}
      <div className="flex-1 flex overflow-hidden">
        {/* EXECUTIVE SIDEBAR NAVIGATION - Crisp Dark Slate */}
        <aside className="w-16 sm:w-64 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0 overflow-y-auto text-slate-300">
          <div className="p-3 border-b border-slate-800/80 hidden sm:flex items-center gap-2.5">
            <img src={prasadhLogoEmblem} alt="Logo" className="w-7 h-7 object-contain scale-125" />
            <div>
              <p className="text-xs font-bold text-white leading-tight">Admin Console</p>
              <p className="text-[10px] text-amber-400 font-medium">Er. S. Vishnu Prasadh</p>
            </div>
          </div>

          <nav className="p-2 sm:p-3 space-y-1">
            <SidebarButton
              icon={<LayoutDashboard className="w-4 h-4" />}
              label="Overview"
              active={activeTab === 'overview'}
              onClick={() => setActiveTab('overview')}
            />
            <SidebarButton
              icon={<Users className="w-4 h-4" />}
              label={`Client Leads (${cms.leads?.length || 0})`}
              badge={cms.leads?.filter((l) => l.status === 'New').length ? `${cms.leads.filter((l) => l.status === 'New').length} New` : undefined}
              active={activeTab === 'leads'}
              onClick={() => setActiveTab('leads')}
            />
            <SidebarButton
              icon={<Building className="w-4 h-4" />}
              label={`Projects (${cms.projects.length})`}
              active={activeTab === 'projects'}
              onClick={() => setActiveTab('projects')}
            />
            <SidebarButton
              icon={<Camera className="w-4 h-4" />}
              label={`Before & After (${cms.beforeAfterProjects?.length || 0})`}
              active={activeTab === 'before_after'}
              onClick={() => setActiveTab('before_after')}
            />
            <SidebarButton
              icon={<Layers className="w-4 h-4" />}
              label={`Material Brands (${cms.materials?.length || 0})`}
              active={activeTab === 'materials'}
              onClick={() => setActiveTab('materials')}
            />
            <SidebarButton
              icon={<Briefcase className="w-4 h-4" />}
              label={`Services (${cms.services.length})`}
              active={activeTab === 'services'}
              onClick={() => setActiveTab('services')}
            />
            <SidebarButton
              icon={<DollarSign className="w-4 h-4" />}
              label="Pricing & Estimator"
              active={activeTab === 'pricing'}
              onClick={() => setActiveTab('pricing')}
            />
            <SidebarButton
              icon={<Star className="w-4 h-4" />}
              label={`Reviews (${cms.testimonials.length})`}
              active={activeTab === 'testimonials'}
              onClick={() => setActiveTab('testimonials')}
            />
            <SidebarButton
              icon={<HelpCircle className="w-4 h-4" />}
              label={`FAQs (${cms.faqs.length})`}
              active={activeTab === 'faqs'}
              onClick={() => setActiveTab('faqs')}
            />
            <SidebarButton
              icon={<Settings className="w-4 h-4" />}
              label="Site Settings"
              active={activeTab === 'settings'}
              onClick={() => setActiveTab('settings')}
            />
            <SidebarButton
              icon={<Database className="w-4 h-4" />}
              label="Backup & Restore"
              active={activeTab === 'backup'}
              onClick={() => setActiveTab('backup')}
            />
          </nav>

          <div className="mt-auto p-4 border-t border-slate-800 hidden sm:block text-[11px] text-slate-400">
            <p className="font-semibold text-slate-200">{cms.companyInfo.name}</p>
            <p className="text-slate-400 truncate">Virudhachalam, Tamil Nadu</p>
            <div className="mt-2 flex items-center gap-1.5 text-[10px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-1 rounded-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Auto Sync: Saved locally</span>
            </div>
          </div>
        </aside>

        {/* MAIN DYNAMIC CONTENT DISPLAY - LIGHT CANVAS */}
        <main className="flex-1 bg-slate-50 overflow-y-auto p-4 sm:p-8 text-slate-800">
          {activeTab === 'overview' && (
            <OverviewTab
              cms={cms}
              onNavigate={(tab) => setActiveTab(tab)}
              onAddLead={() => setIsAddingLead(true)}
              onAddProject={() => setIsAddingProject(true)}
            />
          )}

          {activeTab === 'leads' && (
            <LeadsTab
              cms={cms}
              globalSearch={globalSearch}
              onAddLead={() => setIsAddingLead(true)}
              onRequestConfirm={requestConfirm}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectsTab
              cms={cms}
              globalSearch={globalSearch}
              onAddProject={() => setIsAddingProject(true)}
              onEditProject={(p) => setEditingProject(p)}
              handleImageUpload={handleImageUpload}
              onRequestConfirm={requestConfirm}
            />
          )}

          {activeTab === 'before_after' && (
            <BeforeAfterTab
              cms={cms}
              globalSearch={globalSearch}
              onAddBeforeAfter={() => setIsAddingBeforeAfter(true)}
              onEditBeforeAfter={(item) => setEditingBeforeAfter(item)}
              onRequestConfirm={requestConfirm}
            />
          )}

          {activeTab === 'materials' && (
            <MaterialsTab
              cms={cms}
              globalSearch={globalSearch}
              onAddMaterial={() => setIsAddingMaterial(true)}
              onEditMaterial={(mat) => setEditingMaterial(mat)}
              onRequestConfirm={requestConfirm}
            />
          )}

          {activeTab === 'services' && (
            <ServicesTab
              cms={cms}
              globalSearch={globalSearch}
              onAddService={() => setIsAddingService(true)}
              onEditService={(s) => setEditingService(s)}
              onRequestConfirm={requestConfirm}
            />
          )}

          {activeTab === 'pricing' && <PricingTab cms={cms} />}

          {activeTab === 'testimonials' && (
            <TestimonialsTab
              cms={cms}
              globalSearch={globalSearch}
              onAddTestimonial={() => setIsAddingTestimonial(true)}
              onEditTestimonial={(t) => setEditingTestimonial(t)}
              handleImageUpload={handleImageUpload}
              onRequestConfirm={requestConfirm}
            />
          )}

          {activeTab === 'faqs' && (
            <FAQsTab
              cms={cms}
              globalSearch={globalSearch}
              onAddFAQ={() => setIsAddingFAQ(true)}
              onEditFAQ={(f) => setEditingFAQ(f)}
              onRequestConfirm={requestConfirm}
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
              onRequestConfirm={requestConfirm}
            />
          )}
        </main>
      </div>

      {/* MODALS FOR ADD / EDIT */}

      {/* 1. LEAD ADD MODAL */}
      {isAddingLead && (
        <LeadFormModal
          onClose={() => setIsAddingLead(false)}
          onSave={(data) => {
            cms.addLead(data);
            setIsAddingLead(false);
          }}
        />
      )}

      {/* 2. PROJECT FORM MODAL */}
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

      {/* 3. SERVICE FORM MODAL */}
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

      {/* 4. TESTIMONIAL FORM MODAL */}
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

      {/* 5. FAQ FORM MODAL */}
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

      {/* 6. BEFORE & AFTER FORM MODAL */}
      {(isAddingBeforeAfter || editingBeforeAfter) && (
        <BeforeAfterFormModal
          item={editingBeforeAfter}
          onClose={() => {
            setIsAddingBeforeAfter(false);
            setEditingBeforeAfter(null);
          }}
          onSave={(data) => {
            if (editingBeforeAfter) {
              cms.updateBeforeAfterProject(editingBeforeAfter.id, data);
            } else {
              cms.addBeforeAfterProject(data);
            }
            setIsAddingBeforeAfter(false);
            setEditingBeforeAfter(null);
          }}
          handleImageUpload={handleImageUpload}
        />
      )}

      {/* 7. MATERIAL FORM MODAL */}
      {(isAddingMaterial || editingMaterial) && (
        <MaterialFormModal
          material={editingMaterial}
          onClose={() => {
            setIsAddingMaterial(false);
            setEditingMaterial(null);
          }}
          onSave={(data) => {
            if (editingMaterial) {
              cms.updateMaterial(editingMaterial.id, data);
            } else {
              cms.addMaterial(data);
            }
            setIsAddingMaterial(false);
            setEditingMaterial(null);
          }}
        />
      )}

      {/* 8. CUSTOM CONFIRMATION MODAL */}
      {confirmModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-slate-100 text-slate-900 space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5 text-rose-600" />
              </div>
              <h3 className="text-base font-bold text-slate-900">{confirmModal.title}</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">{confirmModal.message}</p>
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setConfirmModal(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  confirmModal.onConfirm();
                  setConfirmModal(null);
                }}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-md transition-colors cursor-pointer"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// SIDEBAR BUTTON COMPONENT
// ==========================================
const SidebarButton: React.FC<{
  icon: React.ReactNode;
  label: string;
  active: boolean;
  badge?: string;
  onClick: () => void;
}> = ({ icon, label, active, badge, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all font-semibold text-xs cursor-pointer ${
      active
        ? 'bg-amber-400/15 text-amber-300 border border-amber-400/30 shadow-2xs font-bold'
        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
    }`}
  >
    <div className="flex items-center gap-2.5 truncate">
      <span className={active ? 'text-amber-400' : 'text-slate-400'}>{icon}</span>
      <span className="hidden sm:inline truncate">{label}</span>
    </div>
    {badge && (
      <span className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] font-bold rounded-full bg-amber-500 text-slate-950">
        {badge}
      </span>
    )}
  </button>
);

// ==========================================
// 1. OVERVIEW TAB
// ==========================================
const OverviewTab: React.FC<{
  cms: ReturnType<typeof useCMS>;
  onNavigate: (tab: TabType) => void;
  onAddLead: () => void;
  onAddProject: () => void;
}> = ({ cms, onNavigate, onAddLead, onAddProject }) => {
  const newLeadsCount = cms.leads?.filter((l) => l.status === 'New').length || 0;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-blue-950 rounded-2xl p-6 text-white shadow-sm border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={prasadhLogoEmblem}
            alt="Emblem"
            className="w-14 h-14 object-contain scale-125 drop-shadow-md shrink-0"
          />
          <div>
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest">
              Virudhachalam Civil & Construction Portal
            </span>
            <h2 className="text-xl sm:text-2xl font-black font-display text-white">
              Welcome back, Er. S. Vishnu Prasadh
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Control your live portfolio, rates, client consultation leads, and site information in real-time.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onAddLead}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Log Client Lead</span>
          </button>
          <button
            onClick={() => onNavigate('settings')}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Site Info</span>
          </button>
        </div>
      </div>

      {/* METRIC CARDS GRID - LIGHT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Leads */}
        <div
          onClick={() => onNavigate('leads')}
          className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Client Inquiries</span>
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{cms.leads?.length || 0}</span>
            {newLeadsCount > 0 && (
              <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-800 rounded-full border border-amber-300">
                {newLeadsCount} New
              </span>
            )}
          </div>
          <p className="text-xs text-blue-600 font-semibold mt-2 flex items-center gap-1">
            Manage Leads <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </p>
        </div>

        {/* Metric 2: Projects */}
        <div
          onClick={() => onNavigate('projects')}
          className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Portfolio Projects</span>
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all">
              <Building className="w-5 h-5" />
            </div>
          </div>
          <span className="text-2xl font-black text-slate-900">{cms.projects.length}</span>
          <p className="text-xs text-amber-700 font-semibold mt-2 flex items-center gap-1">
            View Projects <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </p>
        </div>

        {/* Metric 3: Services */}
        <div
          onClick={() => onNavigate('services')}
          className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Services Offered</span>
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900">{cms.services.length}</span>
            <span className="text-xs text-slate-500">({cms.services.filter((s) => s.hidden).length} hidden)</span>
          </div>
          <p className="text-xs text-emerald-700 font-semibold mt-2 flex items-center gap-1">
            Manage Services <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </p>
        </div>

        {/* Metric 4: Pricing */}
        <div
          onClick={() => onNavigate('pricing')}
          className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sq.Ft Package Rates</span>
            <div className="p-2.5 rounded-xl bg-violet-50 text-violet-600 group-hover:bg-violet-600 group-hover:text-white transition-all">
              <Calculator className="w-5 h-5" />
            </div>
          </div>
          <span className="text-2xl font-black text-slate-900">
            ₹{cms.estimatorRates.standardRate} - ₹{cms.estimatorRates.sovereignRate}
          </span>
          <p className="text-xs text-violet-700 font-semibold mt-2 flex items-center gap-1">
            Configure Estimator <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </p>
        </div>
      </div>

      {/* TWO COLUMN CONTENT: RECENT LEADS + QUICK ACTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* RECENT CLIENT LEADS TABLE */}
        <div className="lg:col-span-2 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-500" />
                Recent Client Consultations & Leads
              </h3>
              <p className="text-xs text-slate-500">Inquiries submitted for Virudhachalam & surrounding sites</p>
            </div>
            <button
              onClick={() => onNavigate('leads')}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
            >
              View All ({cms.leads?.length || 0}) →
            </button>
          </div>

          {cms.leads && cms.leads.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-2 px-3">Client</th>
                    <th className="py-2 px-3">Requested Service</th>
                    <th className="py-2 px-3">Location</th>
                    <th className="py-2 px-3">Status</th>
                    <th className="py-2 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {cms.leads.slice(0, 4).map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-3 font-bold text-slate-900">
                        {lead.name}
                        <p className="text-[10px] text-slate-400 font-mono font-normal">{lead.phone}</p>
                      </td>
                      <td className="py-3 px-3 text-slate-700 max-w-[180px] truncate">{lead.serviceRequested}</td>
                      <td className="py-3 px-3 text-slate-500">{lead.location}</td>
                      <td className="py-3 px-3">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            lead.status === 'New'
                              ? 'bg-amber-100 text-amber-800 border border-amber-300'
                              : lead.status === 'Contacted'
                              ? 'bg-blue-100 text-blue-800 border border-blue-300'
                              : lead.status === 'Converted'
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <a
                          href={`https://wa.me/${cms.companyInfo.whatsapp}?text=${encodeURIComponent(
                            `Hello ${lead.name}, regarding your construction inquiry for ${lead.serviceRequested} in ${lead.location}...`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-lg text-[11px] font-bold inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Send className="w-3 h-3" />
                          <span>WhatsApp</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-xs text-slate-400 text-center py-6">No client leads recorded yet.</p>
          )}
        </div>

        {/* QUICK ADMIN ACTIONS PANEL */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Quick Content Tools
            </h3>
            <p className="text-xs text-slate-500">Shortcut actions for site updates</p>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            <button
              onClick={onAddProject}
              className="w-full p-3 bg-slate-50 hover:bg-blue-50/80 border border-slate-200 hover:border-blue-200 rounded-xl text-left transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100 text-blue-700">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 group-hover:text-blue-700">Add New Project</p>
                  <p className="text-[10px] text-slate-500">Upload photos & 3D specs</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('pricing')}
              className="w-full p-3 bg-slate-50 hover:bg-amber-50/80 border border-slate-200 hover:border-amber-200 rounded-xl text-left transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-100 text-amber-800">
                  <DollarSign className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 group-hover:text-amber-800">Edit Estimator Rates</p>
                  <p className="text-[10px] text-slate-500">Standard, Premium & Sovereign</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => cms.exportDataJSON()}
              className="w-full p-3 bg-slate-50 hover:bg-emerald-50/80 border border-slate-200 hover:border-emerald-200 rounded-xl text-left transition-all flex items-center justify-between group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 group-hover:text-emerald-800">Download Site Backup</p>
                  <p className="text-[10px] text-slate-500">Export full site JSON state</p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Quick Business Contact View */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
            <p className="font-bold text-slate-900 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-amber-600" />
              {cms.companyInfo.phone}
            </p>
            <p className="text-slate-600 text-[11px] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {cms.companyInfo.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. CLIENT LEADS TAB
// ==========================================
const LeadsTab: React.FC<{
  cms: ReturnType<typeof useCMS>;
  globalSearch: string;
  onAddLead: () => void;
  onRequestConfirm: (title: string, message: string, onConfirm: () => void) => void;
}> = ({ cms, globalSearch, onAddLead, onRequestConfirm }) => {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<ClientLead | null>(null);
  const [editingNotes, setEditingNotes] = useState<string>('');

  const leadsList = cms.leads || [];

  // Summary Metrics
  const totalCount = leadsList.length;
  const newCount = leadsList.filter((l) => l.status === 'New').length;
  const siteVisitCount = leadsList.filter((l) => l.status === 'Site Visited').length;
  const convertedCount = leadsList.filter((l) => l.status === 'Converted').length;

  const filteredLeads = useMemo(() => {
    let list = leadsList;
    if (filterStatus !== 'all') {
      list = list.filter((l) => l.status === filterStatus);
    }
    if (globalSearch.trim()) {
      const q = globalSearch.toLowerCase();
      list = list.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.phone.includes(q) ||
          (l.email && l.email.toLowerCase().includes(q)) ||
          l.location.toLowerCase().includes(q) ||
          l.serviceRequested.toLowerCase().includes(q)
      );
    }
    return list;
  }, [leadsList, filterStatus, globalSearch]);

  const cleanPhoneForWhatsApp = (phoneStr: string) => {
    let cleaned = phoneStr.replace(/[^0-9]/g, '');
    if (cleaned.length === 10) {
      cleaned = '91' + cleaned;
    }
    return cleaned;
  };

  const handleOpenLeadDetail = (lead: ClientLead) => {
    setSelectedLead(lead);
    setEditingNotes(lead.notes || '');
  };

  const handleSaveNotes = () => {
    if (!selectedLead) return;
    cms.updateLeadStatus(selectedLead.id, selectedLead.status, editingNotes);
    setSelectedLead({ ...selectedLead, notes: editingNotes });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* HEADER BAR */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
        <div>
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-500" />
            Client Consultations & Leads Management
          </h2>
          <p className="text-xs text-slate-500">Track inquiries submitted from website forms, site visits, and project consultations</p>
        </div>

        <button
          onClick={onAddLead}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Log New Lead</span>
        </button>
      </div>

      {/* METRICS CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Enquiries</p>
          <p className="text-2xl font-black text-slate-900 font-display mt-1">{totalCount}</p>
        </div>

        <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200/80 shadow-2xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold text-amber-800 uppercase tracking-wider">New Inquiries</p>
            {newCount > 0 && (
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
              </span>
            )}
          </div>
          <p className="text-2xl font-black text-amber-950 font-display mt-1">{newCount}</p>
        </div>

        <div className="bg-blue-50/60 p-4 rounded-2xl border border-blue-200/80 shadow-2xs">
          <p className="text-[11px] font-bold text-blue-800 uppercase tracking-wider">Site Visits</p>
          <p className="text-2xl font-black text-blue-950 font-display mt-1">{siteVisitCount}</p>
        </div>

        <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200/80 shadow-2xs">
          <p className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">Converted</p>
          <p className="text-2xl font-black text-emerald-950 font-display mt-1">{convertedCount}</p>
        </div>
      </div>

      {/* FILTER TABS */}
      <div className="flex flex-wrap items-center gap-2">
        {['all', 'New', 'Contacted', 'Site Visited', 'Estimate Sent', 'Converted', 'Closed'].map((st) => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterStatus === st
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {st === 'all' ? `All (${totalCount})` : `${st} (${leadsList.filter((l) => l.status === st).length})`}
          </button>
        ))}
      </div>

      {/* LEADS TABLE */}
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-2xs overflow-hidden">
        {filteredLeads.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-wider">
                  <th className="py-3 px-4">Client Contact</th>
                  <th className="py-3 px-4">Requested Service</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Est. Budget</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-800">
                {filteredLeads.map((lead) => {
                  const cleanPhone = cleanPhoneForWhatsApp(lead.phone);
                  const isNew = lead.status === 'New';

                  return (
                    <tr
                      key={lead.id}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        isNew ? 'bg-amber-50/30 font-medium' : ''
                      }`}
                    >
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          {isNew && (
                            <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" title="New Lead" />
                          )}
                          <div>
                            <button
                              onClick={() => handleOpenLeadDetail(lead)}
                              className="font-bold text-slate-900 hover:text-[#1E3A8A] text-left cursor-pointer"
                            >
                              {lead.name}
                            </button>
                            <p className="text-[11px] text-blue-600 font-mono">
                              <a href={`tel:${lead.phone}`} className="hover:underline">
                                {lead.phone}
                              </a>
                            </p>
                            {lead.email && (
                              <p className="text-[10px] text-slate-400 truncate max-w-[160px]">{lead.email}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-medium max-w-xs">{lead.serviceRequested}</td>
                      <td className="py-3.5 px-4 text-slate-600 max-w-[150px] truncate">{lead.location}</td>
                      <td className="py-3.5 px-4 font-semibold text-slate-900">{lead.estimatedBudget || 'N/A'}</td>
                      <td className="py-3.5 px-4 text-slate-500 text-[11px]">{lead.date}</td>
                      <td className="py-3.5 px-4">
                        <select
                          value={lead.status}
                          onChange={(e) => cms.updateLeadStatus(lead.id, e.target.value as any)}
                          className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border focus:outline-hidden cursor-pointer ${
                            lead.status === 'New'
                              ? 'bg-amber-100 text-amber-900 border-amber-300'
                              : lead.status === 'Converted'
                              ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                              : lead.status === 'Closed'
                              ? 'bg-slate-100 text-slate-600 border-slate-300'
                              : 'bg-blue-50 text-blue-900 border-blue-200'
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Site Visited">Site Visited</option>
                          <option value="Estimate Sent">Estimate Sent</option>
                          <option value="Converted">Converted</option>
                          <option value="Closed">Closed</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                        <button
                          onClick={() => handleOpenLeadDetail(lead)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 inline-flex items-center text-xs font-bold gap-1 cursor-pointer"
                          title="View Lead Details & Notes"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span className="hidden md:inline">Details</span>
                        </button>

                        <a
                          href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                            `Hello ${lead.name}, Er. S. Vishnu Prasadh here from Prasadh Construction Virudhachalam. Thank you for your inquiry regarding "${lead.serviceRequested}". We would love to discuss your site specifications and arrange a free visit!`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 inline-flex items-center text-xs font-bold gap-1 cursor-pointer"
                          title={`Chat with ${lead.name} on WhatsApp`}
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span className="hidden md:inline">WhatsApp</span>
                        </a>

                        <a
                          href={`tel:${lead.phone}`}
                          className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 inline-flex items-center text-xs font-bold cursor-pointer"
                          title={`Call ${lead.name}`}
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>

                        <button
                          onClick={() => {
                            onRequestConfirm(
                              'Delete Client Lead',
                              `Are you sure you want to delete lead entry for "${lead.name}"?`,
                              () => cms.deleteLead(lead.id)
                            );
                          }}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 inline-flex items-center text-xs cursor-pointer"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-slate-400">
            <Users className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-600">No client leads matching criteria.</p>
            <p className="text-xs text-slate-400 mt-1">When users submit contact forms on the website, they will appear here instantly.</p>
          </div>
        )}
      </div>

      {/* LEAD DETAIL & NOTES MODAL */}
      {selectedLead && (
        <div className="fixed inset-0 z-[180] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-5 text-slate-900 border border-slate-200 shadow-2xl my-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  Client Enquiry Details
                </span>
                <h3 className="text-lg font-black text-slate-900 font-display mt-1">
                  {selectedLead.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              <div>
                <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Phone Number</p>
                <p className="font-bold text-slate-900 mt-0.5 font-mono">
                  <a href={`tel:${selectedLead.phone}`} className="hover:underline text-blue-600">
                    {selectedLead.phone}
                  </a>
                </p>
              </div>

              {selectedLead.email && (
                <div>
                  <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Email Address</p>
                  <p className="font-bold text-slate-900 mt-0.5 truncate">
                    <a href={`mailto:${selectedLead.email}`} className="hover:underline text-blue-600">
                      {selectedLead.email}
                    </a>
                  </p>
                </div>
              )}

              <div>
                <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Requested Service</p>
                <p className="font-bold text-slate-900 mt-0.5">{selectedLead.serviceRequested}</p>
              </div>

              <div>
                <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Estimated Budget</p>
                <p className="font-bold text-slate-900 mt-0.5">{selectedLead.estimatedBudget || 'Not Specified'}</p>
              </div>

              <div className="col-span-2">
                <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Site Address / GPS Location</p>
                <p className="font-semibold text-slate-800 mt-0.5">
                  {selectedLead.location.startsWith('http') ? (
                    <a
                      href={selectedLead.location}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline inline-flex items-center gap-1 font-bold"
                    >
                      <MapPin className="w-3.5 h-3.5" /> View Live GPS Location Link
                    </a>
                  ) : (
                    selectedLead.location
                  )}
                </p>
              </div>

              <div>
                <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Inquiry Date</p>
                <p className="font-bold text-slate-900 mt-0.5">{selectedLead.date}</p>
              </div>

              <div>
                <p className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">Current Status</p>
                <select
                  value={selectedLead.status}
                  onChange={(e) => {
                    const newStatus = e.target.value as any;
                    cms.updateLeadStatus(selectedLead.id, newStatus, editingNotes);
                    setSelectedLead({ ...selectedLead, status: newStatus });
                  }}
                  className="mt-1 px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-300 bg-white text-slate-900 cursor-pointer"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Site Visited">Site Visited</option>
                  <option value="Estimate Sent">Estimate Sent</option>
                  <option value="Converted">Converted</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>

            {/* EDITABLE NOTES / COMMENTS */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 flex items-center justify-between">
                <span>Inquiry Notes & Internal Admin Comments</span>
                <span className="text-[10px] text-slate-400 font-normal">Stored in Firestore</span>
              </label>
              <textarea
                value={editingNotes}
                onChange={(e) => setEditingNotes(e.target.value)}
                rows={4}
                placeholder="Type follow-up notes, site visit feedback, or BOQ discussion status..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-hidden"
              />
              <button
                onClick={handleSaveNotes}
                className="px-4 py-2 bg-[#0F172A] hover:bg-[#1E3A8A] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Notes</span>
              </button>
            </div>

            {/* ACTION FOOTER */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/${cleanPhoneForWhatsApp(selectedLead.phone)}?text=${encodeURIComponent(
                    `Hello ${selectedLead.name}, Er. S. Vishnu Prasadh here from Prasadh Construction Virudhachalam. Regarding your request for "${selectedLead.serviceRequested}"...`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Reply on WhatsApp</span>
                </a>

                <a
                  href={`tel:${selectedLead.phone}`}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {selectedLead.phone}</span>
                </a>
              </div>

              <button
                onClick={() => {
                  onRequestConfirm(
                    'Delete Client Lead',
                    `Are you sure you want to delete lead entry for "${selectedLead.name}"?`,
                    () => {
                      cms.deleteLead(selectedLead.id);
                      setSelectedLead(null);
                    }
                  );
                }}
                className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-xl cursor-pointer"
                title="Delete Lead"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 3. PROJECTS TAB
// ==========================================
const ProjectsTab: React.FC<{
  cms: ReturnType<typeof useCMS>;
  globalSearch: string;
  onAddProject: () => void;
  onEditProject: (p: Project) => void;
  handleImageUpload: (file: File, callback: (base64Str: string) => void) => void;
  onRequestConfirm: (title: string, message: string, onConfirm: () => void) => void;
}> = ({ cms, globalSearch, onAddProject, onEditProject, onRequestConfirm }) => {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredProjects = useMemo(() => {
    let list = cms.projects;
    if (categoryFilter !== 'all') {
      list = list.filter((p) => p.category === categoryFilter);
    }
    if (globalSearch.trim()) {
      const q = globalSearch.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [cms.projects, categoryFilter, globalSearch]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
        <div>
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Building className="w-5 h-5 text-amber-500" />
            Portfolio Projects Showcase ({cms.projects.length})
          </h2>
          <p className="text-xs text-slate-500">Manage completed residential homes, villas, commercial & structural designs</p>
        </div>

        <button
          onClick={onAddProject}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* CATEGORY FILTERS */}
      <div className="flex flex-wrap items-center gap-2">
        {['all', 'villas', 'commercial', 'structural', 'interiors', 'renovation'].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              categoryFilter === cat
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PROJECTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map((p) => {
          const photoCount = p.images && p.images.length > 0 ? p.images.length : 1;
          return (
            <div
              key={p.id}
              className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col group"
            >
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-900/80 text-amber-400 text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md">
                  {p.category}
                </span>
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-white/90 text-slate-900 text-[10px] font-bold">
                  {p.completionYear}
                </span>
                <span className="absolute bottom-3 left-3 px-2 py-1 rounded-md bg-black/80 text-white text-[10px] font-bold flex items-center gap-1 backdrop-blur-xs">
                  <Camera className="w-3 h-3 text-amber-400" />
                  <span>{photoCount} Photos</span>
                </span>
              </div>

            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm line-clamp-1">{p.title}</h3>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                  <MapPin className="w-3 h-3 text-amber-500 shrink-0" />
                  {p.location} • {p.area}
                </p>
                <p className="text-xs text-slate-600 mt-2 line-clamp-2">{p.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500">Type: {p.constructionType}</span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onEditProject(p)}
                    className="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-semibold cursor-pointer flex items-center gap-1"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => {
                      onRequestConfirm(
                        'Delete Project',
                        `Are you sure you want to delete project "${p.title}"?`,
                        () => cms.deleteProject(p.id)
                      );
                    }}
                    className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 text-xs cursor-pointer"
                    title="Delete Project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      </div>
    </div>
  );
};

// ==========================================
// 3.5 BEFORE & AFTER TAB
// ==========================================
const BeforeAfterTab: React.FC<{
  cms: ReturnType<typeof useCMS>;
  globalSearch: string;
  onAddBeforeAfter: () => void;
  onEditBeforeAfter: (item: BeforeAfterProject) => void;
  onRequestConfirm: (title: string, message: string, onConfirm: () => void) => void;
}> = ({ cms, globalSearch, onAddBeforeAfter, onEditBeforeAfter, onRequestConfirm }) => {
  const filtered = useMemo(() => {
    let list = cms.beforeAfterProjects || [];
    if (globalSearch.trim()) {
      const q = globalSearch.toLowerCase();
      list = list.filter(
        (ba) =>
          ba.title.toLowerCase().includes(q) ||
          ba.location.toLowerCase().includes(q) ||
          ba.category.toLowerCase().includes(q)
      );
    }
    return list;
  }, [cms.beforeAfterProjects, globalSearch]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Camera className="w-5 h-5 text-amber-500" />
            Before & After Transformation Projects ({cms.beforeAfterProjects?.length || 0})
          </h2>
          <p className="text-xs text-slate-500">Manage interactive site comparison slider content</p>
        </div>

        <button
          onClick={onAddBeforeAfter}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Before & After Item</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((ba) => (
          <div key={ba.id} className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 uppercase">
                {ba.category}
              </span>
              <span className="text-xs text-slate-500 font-semibold">{ba.duration}</span>
            </div>

            <h3 className="font-bold text-slate-900 text-sm">{ba.title}</h3>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              {ba.location}
            </p>

            <div className="grid grid-cols-2 gap-2 my-2">
              <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 h-32">
                <img src={ba.beforeImage} alt="Before" className="w-full h-full object-cover" />
                <span className="absolute bottom-1 left-1 px-2 py-0.5 bg-black/80 text-white font-bold text-[9px] rounded">
                  BEFORE
                </span>
              </div>
              <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 h-32">
                <img src={ba.afterImage} alt="After" className="w-full h-full object-cover" />
                <span className="absolute bottom-1 right-1 px-2 py-0.5 bg-amber-500 text-slate-950 font-bold text-[9px] rounded">
                  AFTER
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 line-clamp-2">{ba.description}</p>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                onClick={() => onEditBeforeAfter(ba)}
                className="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-semibold cursor-pointer flex items-center gap-1"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>

              <button
                onClick={() => {
                  onRequestConfirm(
                    'Delete Before & After Project',
                    `Are you sure you want to delete "${ba.title}"?`,
                    () => cms.deleteBeforeAfterProject(ba.id)
                  );
                }}
                className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 text-xs cursor-pointer"
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

// ==========================================
// 3.6 MATERIAL BRANDS TAB
// ==========================================
const MaterialsTab: React.FC<{
  cms: ReturnType<typeof useCMS>;
  globalSearch: string;
  onAddMaterial: () => void;
  onEditMaterial: (mat: MaterialBrand) => void;
  onRequestConfirm: (title: string, message: string, onConfirm: () => void) => void;
}> = ({ cms, globalSearch, onAddMaterial, onEditMaterial, onRequestConfirm }) => {
  const filtered = useMemo(() => {
    let list = cms.materials || [];
    if (globalSearch.trim()) {
      const q = globalSearch.toLowerCase();
      list = list.filter(
        (m) =>
          m.brandName.toLowerCase().includes(q) ||
          m.category.toLowerCase().includes(q) ||
          m.benefit.toLowerCase().includes(q)
      );
    }
    return list;
  }, [cms.materials, globalSearch]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-500" />
            Approved Construction Material Brands ({cms.materials?.length || 0})
          </h2>
          <p className="text-xs text-slate-500">Manage high-grade material specifications shown on site</p>
        </div>

        <button
          onClick={onAddMaterial}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Material Brand</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((mat) => (
          <div key={mat.id} className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs space-y-3 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200 uppercase">
                {mat.category}
              </span>

              <h3 className="font-extrabold text-slate-900 text-sm mt-2">{mat.brandName}</h3>
              <p className="text-xs text-amber-700 font-semibold mt-0.5">{mat.grade}</p>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">{mat.benefit}</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-3">
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">{mat.logoText}</span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onEditMaterial(mat)}
                  className="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-semibold cursor-pointer flex items-center gap-1"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => {
                    onRequestConfirm(
                      'Delete Material Brand',
                      `Are you sure you want to delete material "${mat.brandName}"?`,
                      () => cms.deleteMaterial(mat.id)
                    );
                  }}
                  className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 text-xs cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 4. SERVICES TAB
// ==========================================
const ServicesTab: React.FC<{
  cms: ReturnType<typeof useCMS>;
  globalSearch: string;
  onAddService: () => void;
  onEditService: (s: ServiceItemWithVisibility) => void;
  onRequestConfirm: (title: string, message: string, onConfirm: () => void) => void;
}> = ({ cms, globalSearch, onAddService, onEditService, onRequestConfirm }) => {
  const filteredServices = useMemo(() => {
    let list = cms.services;
    if (globalSearch.trim()) {
      const q = globalSearch.toLowerCase();
      list = list.filter((s) => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
    }
    return list;
  }, [cms.services, globalSearch]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
        <div>
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-amber-500" />
            Engineering Services Offerings ({cms.services.length})
          </h2>
          <p className="text-xs text-slate-500">Configure core services, deliverables, and toggle visibility on website</p>
        </div>

        <button
          onClick={onAddService}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredServices.map((serv) => (
          <div
            key={serv.id}
            className={`bg-white border rounded-2xl p-5 shadow-2xs transition-all flex flex-col justify-between ${
              serv.hidden ? 'opacity-60 border-dashed border-slate-300' : 'border-slate-200/90'
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-sm shrink-0">
                    {serv.title.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{serv.title}</h3>
                    <span className="text-[10px] text-slate-400 font-mono">Icon: {serv.iconName}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => cms.toggleServiceVisibility(serv.id)}
                    className={`p-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1 cursor-pointer ${
                      serv.hidden
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    }`}
                    title={serv.hidden ? 'Click to Publish on Site' : 'Click to Hide from Site'}
                  >
                    {serv.hidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    <span>{serv.hidden ? 'Hidden' : 'Visible'}</span>
                  </button>

                  <button
                    onClick={() => onEditService(serv)}
                    className="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      onRequestConfirm(
                        'Delete Service',
                        `Are you sure you want to delete service "${serv.title}"?`,
                        () => cms.deleteService(serv.id)
                      );
                    }}
                    className="p-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-600 mt-3">{serv.description}</p>

              {serv.deliverables && serv.deliverables.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <p className="text-[11px] font-bold text-slate-500 mb-1">Key Deliverables:</p>
                  <ul className="text-xs text-slate-700 space-y-0.5 list-disc pl-4">
                    {serv.deliverables.slice(0, 3).map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
              Ideal for: <span className="text-slate-800 font-semibold">{serv.idealFor}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 5. PRICING & ESTIMATOR TAB
// ==========================================
const PricingTab: React.FC<{ cms: ReturnType<typeof useCMS> }> = ({ cms }) => {
  const [rates, setRates] = useState(cms.estimatorRates);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    cms.updateEstimatorRates(rates);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
        <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-amber-500" />
          Construction Cost Estimator Package Rates (Per Sq.Ft)
        </h2>
        <p className="text-xs text-slate-500">
          Updates reflect live on the website Cost Calculator tool immediately
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* PACKAGE BASE RATES */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
            Package Base Rates (₹ / Sq.Ft)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Standard Package Rate</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">₹</span>
                <input
                  type="number"
                  value={rates.standardRate}
                  onChange={(e) => setRates({ ...rates, standardRate: Number(e.target.value) })}
                  className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:border-amber-500"
                  required
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">G+1 Basic specification</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-amber-800 mb-1">Premium Package Rate (Popular)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 font-bold text-xs">₹</span>
                <input
                  type="number"
                  value={rates.premiumRate}
                  onChange={(e) => setRates({ ...rates, premiumRate: Number(e.target.value) })}
                  className="w-full pl-7 pr-3 py-2 bg-amber-50/50 border border-amber-300 rounded-xl text-xs font-bold text-amber-950 focus:bg-white focus:border-amber-500"
                  required
                />
              </div>
              <p className="text-[10px] text-amber-700 mt-1">Teak doors, 3D elevation, branded steel</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Sovereign Luxury Rate</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs">₹</span>
                <input
                  type="number"
                  value={rates.sovereignRate}
                  onChange={(e) => setRates({ ...rates, sovereignRate: Number(e.target.value) })}
                  className="w-full pl-7 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:border-amber-500"
                  required
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Italian marble finish & smart home</p>
            </div>
          </div>
        </div>

        {/* ADDON & CONSULTANCY FEES */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">
            Add-on Design & Approval Fees
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Structural Design Flat Fee (₹)</label>
              <input
                type="number"
                value={rates.structAddon}
                onChange={(e) => setRates({ ...rates, structAddon: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Interior Design (₹ / Sq.Ft)</label>
              <input
                type="number"
                value={rates.interiorAddonPerSqFt}
                onChange={(e) => setRates({ ...rates, interiorAddonPerSqFt: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:border-amber-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Municipal Plan Approval (₹)</label>
              <input
                type="number"
                value={rates.approvalAddon}
                onChange={(e) => setRates({ ...rates, approvalAddon: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save Estimator Rates</span>
        </button>
      </form>
    </div>
  );
};

// ==========================================
// 6. TESTIMONIALS & REVIEWS TAB
// ==========================================
const TestimonialsTab: React.FC<{
  cms: ReturnType<typeof useCMS>;
  globalSearch: string;
  onAddTestimonial: () => void;
  onEditTestimonial: (t: Testimonial) => void;
  handleImageUpload: (file: File, callback: (base64Str: string) => void) => void;
  onRequestConfirm: (title: string, message: string, onConfirm: () => void) => void;
}> = ({ cms, globalSearch, onAddTestimonial, onEditTestimonial, onRequestConfirm }) => {
  const filtered = useMemo(() => {
    let list = cms.testimonials;
    if (globalSearch.trim()) {
      const q = globalSearch.toLowerCase();
      list = list.filter((t) => t.clientName.toLowerCase().includes(q) || t.comment.toLowerCase().includes(q));
    }
    return list;
  }, [cms.testimonials, globalSearch]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
        <div>
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            Client Reviews & Google Rating ({cms.testimonials.length})
          </h2>
          <p className="text-xs text-slate-500">Manage client testimonials published on the landing page</p>
        </div>

        <button
          onClick={onAddTestimonial}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Review</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {filtered.map((test) => (
          <div key={test.id} className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-2xs space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src={test.avatar} alt={test.clientName} className="w-8 h-8 rounded-full object-cover border border-amber-300" />
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs">{test.clientName}</h3>
                    <p className="text-[10px] text-slate-400">{test.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-500" />
                  <span className="text-xs font-bold text-slate-900">{test.rating}.0</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 mt-3 italic">"{test.comment}"</p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">{test.projectType}</span>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => onEditTestimonial(test)}
                  className="p-1 rounded bg-blue-50 text-blue-700 hover:bg-blue-100 cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    onRequestConfirm(
                      'Delete Client Review',
                      `Are you sure you want to delete review from "${test.clientName}"?`,
                      () => cms.deleteTestimonial(test.id)
                    );
                  }}
                  className="p-1 rounded bg-rose-50 text-rose-600 hover:bg-rose-100 cursor-pointer"
                  title="Delete Review"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 7. FAQS TAB
// ==========================================
const FAQsTab: React.FC<{
  cms: ReturnType<typeof useCMS>;
  globalSearch: string;
  onAddFAQ: () => void;
  onEditFAQ: (f: FAQItem) => void;
  onRequestConfirm: (title: string, message: string, onConfirm: () => void) => void;
}> = ({ cms, globalSearch, onAddFAQ, onEditFAQ, onRequestConfirm }) => {
  const filtered = useMemo(() => {
    let list = cms.faqs;
    if (globalSearch.trim()) {
      const q = globalSearch.toLowerCase();
      list = list.filter((f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q));
    }
    return list;
  }, [cms.faqs, globalSearch]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
        <div>
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-500" />
            Frequently Asked Questions ({cms.faqs.length})
          </h2>
          <p className="text-xs text-slate-500">Manage client questions regarding building permissions, approval timeline & rates</p>
        </div>

        <button
          onClick={onAddFAQ}
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add FAQ</span>
        </button>
      </div>

      <div className="space-y-3">
        {filtered.map((faq) => (
          <div key={faq.id} className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-2xs space-y-2">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-extrabold text-[10px] uppercase">
                  {faq.category}
                </span>
                <h3 className="text-xs font-bold text-slate-900">{faq.question}</h3>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => onEditFAQ(faq)} className="p-1 rounded bg-blue-50 text-blue-700 hover:bg-blue-100 cursor-pointer">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    onRequestConfirm(
                      'Delete FAQ',
                      'Are you sure you want to delete this FAQ question?',
                      () => cms.deleteFAQ(faq.id)
                    );
                  }}
                  className="p-1 rounded bg-rose-50 text-rose-600 hover:bg-rose-100 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed pl-2 border-l-2 border-amber-400">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// 8. SITE SETTINGS TAB
// ==========================================
const SettingsTab: React.FC<{
  cms: ReturnType<typeof useCMS>;
  pinChangeInput: string;
  setPinChangeInput: (v: string) => void;
}> = ({ cms, pinChangeInput, setPinChangeInput }) => {
  const [info, setInfo] = useState(cms.companyInfo);

  const handleSubmitInfo = (e: React.FormEvent) => {
    e.preventDefault();
    cms.updateCompanyInfo(info);
  };

  const handleUpdatePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (cms.changeAdminPin(pinChangeInput)) {
      setPinChangeInput('');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
        <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <Settings className="w-5 h-5 text-amber-500" />
          Site Settings & Business Profile
        </h2>
        <p className="text-xs text-slate-500">Edit office details, phone numbers, founder credentials, and security PIN</p>
      </div>

      <form onSubmit={handleSubmitInfo} className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100">Company & Contact Information</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Company Name</label>
            <input
              type="text"
              value={info.name}
              onChange={(e) => setInfo({ ...info, name: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:bg-white focus:border-amber-500"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Founder / Engineer Name</label>
            <input
              type="text"
              value={info.founder}
              onChange={(e) => setInfo({ ...info, founder: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:bg-white focus:border-amber-500"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Primary Phone</label>
            <input
              type="text"
              value={info.phone}
              onChange={(e) => setInfo({ ...info, phone: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:bg-white focus:border-amber-500"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Secondary Phone</label>
            <input
              type="text"
              value={info.secondaryPhone || ''}
              onChange={(e) => setInfo({ ...info, secondaryPhone: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:bg-white focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              value={info.email || ''}
              onChange={(e) => setInfo({ ...info, email: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:bg-white focus:border-amber-500"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">WhatsApp Number</label>
            <input
              type="text"
              value={info.whatsapp}
              onChange={(e) => setInfo({ ...info, whatsapp: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:bg-white focus:border-amber-500"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">GSTIN</label>
            <input
              type="text"
              value={info.gstin || ''}
              onChange={(e) => setInfo({ ...info, gstin: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:bg-white focus:border-amber-500 font-mono"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Business Hours</label>
            <input
              type="text"
              value={info.hours || ''}
              onChange={(e) => setInfo({ ...info, hours: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:bg-white focus:border-amber-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-bold text-slate-700 mb-1">Main Office Address (Virudhachalam)</label>
            <input
              type="text"
              value={info.address}
              onChange={(e) => setInfo({ ...info, address: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:bg-white focus:border-amber-500"
              required
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-bold text-slate-700 mb-1">Branch Office Address (Villupuram)</label>
            <input
              type="text"
              value={info.branchAddress || ''}
              onChange={(e) => setInfo({ ...info, branchAddress: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:bg-white focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Experience Counter</label>
            <input
              type="text"
              value={info.experienceYears}
              onChange={(e) => setInfo({ ...info, experienceYears: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:bg-white focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Completed Projects Counter</label>
            <input
              type="text"
              value={info.completedProjects}
              onChange={(e) => setInfo({ ...info, completedProjects: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:bg-white focus:border-amber-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="py-2.5 px-5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
        >
          <Save className="w-4 h-4" />
          <span>Save Company Info</span>
        </button>
      </form>

      {/* SECURITY PIN UPDATE */}
      <form onSubmit={handleUpdatePin} className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-3">
        <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
          <Shield className="w-4 h-4 text-emerald-600" />
          Admin Portal Security PIN
        </h3>
        <p className="text-xs text-slate-500">Current PIN: <span className="font-mono font-bold text-slate-900">{cms.adminPin}</span></p>

        <div className="flex items-center gap-3 max-w-md">
          <input
            type="password"
            placeholder="Enter new 4-digit PIN"
            value={pinChangeInput}
            onChange={(e) => setPinChangeInput(e.target.value)}
            className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold text-slate-900 focus:bg-white focus:border-amber-500"
          />
          <button
            type="submit"
            className="py-2 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all cursor-pointer shrink-0"
          >
            Update PIN
          </button>
        </div>
      </form>
    </div>
  );
};

// ==========================================
// 9. BACKUP & RESTORE TAB
// ==========================================
const BackupTab: React.FC<{
  cms: ReturnType<typeof useCMS>;
  jsonImportText: string;
  setJsonImportText: (v: string) => void;
  onRequestConfirm: (title: string, message: string, onConfirm: () => void) => void;
}> = ({ cms, jsonImportText, setJsonImportText, onRequestConfirm }) => {
  const handleImport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jsonImportText.trim()) return;
    if (cms.importDataJSON(jsonImportText)) {
      setJsonImportText('');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setJsonImportText(event.target.result.toString());
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
        <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
          <Database className="w-5 h-5 text-amber-500" />
          Backup, Restore & Data Reset
        </h2>
        <p className="text-xs text-slate-500">Export or import entire site content, projects, reviews & price packages in JSON</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* EXPORT DATA */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-700 w-fit mb-3">
              <Download className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Download Site Backup JSON</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Downloads a complete snapshot file containing all projects, services, prices, client leads, and FAQs.
            </p>
          </div>

          <button
            onClick={() => cms.exportDataJSON()}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
          >
            <Download className="w-4 h-4" />
            <span>Export JSON File</span>
          </button>
        </div>

        {/* RESET DATA */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="p-3 rounded-2xl bg-rose-50 text-rose-700 w-fit mb-3">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Reset to Default Content</h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Restores initial mock data for Prasadh Construction. Use if you wish to clear test entries.
            </p>
          </div>

          <button
            onClick={() => {
              onRequestConfirm(
                'Reset Site Content to Defaults',
                'Are you sure you want to reset all site content back to initial default values? All live edits will be lost.',
                () => cms.resetToDefaults()
              );
            }}
            className="w-full py-3 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Site to Defaults</span>
          </button>
        </div>
      </div>

      {/* IMPORT DATA FROM JSON */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-2xs space-y-4">
        <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
          <Upload className="w-5 h-5 text-blue-600" />
          Restore CMS State from JSON Backup
        </h3>

        <form onSubmit={handleImport} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Select Backup JSON File</label>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-800 hover:file:bg-slate-200 cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Or Paste JSON Payload directly:</label>
            <textarea
              value={jsonImportText}
              onChange={(e) => setJsonImportText(e.target.value)}
              rows={5}
              placeholder="Paste backup JSON string here..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-800 focus:bg-white focus:border-amber-500"
            />
          </div>

          <button
            type="submit"
            className="py-2.5 px-5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Upload className="w-4 h-4" />
            <span>Restore JSON Backup</span>
          </button>
        </form>
      </div>
    </div>
  );
};

// ==========================================
// MODAL FORMS FOR ADD / EDIT OPERATIONS
// ==========================================

// 1. LEAD FORM MODAL
const LeadFormModal: React.FC<{
  onClose: () => void;
  onSave: (data: Omit<ClientLead, 'id'>) => void;
}> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState<Omit<ClientLead, 'id'>>({
    name: '',
    phone: '',
    location: 'Virudhachalam',
    serviceRequested: 'Turnkey Residential Construction',
    estimatedBudget: '₹45,00,000',
    status: 'New',
    date: new Date().toISOString().slice(0, 10),
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white border border-slate-200 max-w-lg w-full rounded-3xl p-6 space-y-4 text-slate-900 my-auto shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-base font-bold font-display flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-500" />
            Log Client Consultation Lead
          </h3>
          <button onClick={onClose} className="p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Client Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:bg-white focus:border-amber-500"
              placeholder="e.g. Mr. R. Karthik"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:bg-white focus:border-amber-500"
                placeholder="+91 98421 88321"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Site Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:bg-white focus:border-amber-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Requested Service</label>
            <input
              type="text"
              value={formData.serviceRequested}
              onChange={(e) => setFormData({ ...formData, serviceRequested: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:bg-white focus:border-amber-500"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Inquiry Notes / Specs</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              placeholder="Site dimensions, floor requirements, preferred package..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:bg-white focus:border-amber-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer mt-2"
          >
            Save Lead Record
          </button>
        </form>
      </div>
    </div>
  );
};

// 2. PROJECT FORM MODAL
const ProjectFormModal: React.FC<{
  project: Project | null;
  onClose: () => void;
  onSave: (data: Omit<Project, 'id'>) => void;
  handleImageUpload: (file: File, callback: (base64Str: string) => void) => void;
}> = ({ project, onClose, onSave, handleImageUpload }) => {
  const initialImages = project?.images && project.images.length > 0 
    ? [...project.images] 
    : (project?.image ? [project.image] : ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80']);

  const [images, setImages] = useState<string[]>(initialImages);
  const [coverIndex, setCoverIndex] = useState<number>(0);
  const [newUrlInput, setNewUrlInput] = useState<string>('');

  const [formData, setFormData] = useState<Omit<Project, 'id'>>({
    title: project?.title || '',
    category: project?.category || 'villas',
    location: project?.location || 'Virudhachalam',
    area: project?.area || '2,400 Sq.Ft',
    completionYear: project?.completionYear || '2025',
    constructionType: project?.constructionType || 'RCC Frame Structure',
    image: project?.image || initialImages[0],
    images: initialImages,
    description: project?.description || '',
    highlights: project?.highlights || ['Teakwood Doors', '3D Elevation', 'Structural Warranty'],
    clientName: project?.clientName || 'Private Residence Owner'
  });

  const [highlightInput, setHighlightInput] = useState('');

  // Handle adding image URL
  const handleAddUrl = () => {
    if (!newUrlInput.trim()) return;
    const updated = [...images, newUrlInput.trim()];
    setImages(updated);
    setNewUrlInput('');
  };

  // Handle uploading multiple files
  const handleMultipleFilesUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const filesArray = Array.from(e.target.files);
    
    let processedCount = 0;
    const newBase64s: string[] = [];

    filesArray.forEach((file) => {
      handleImageUpload(file, (base64Str) => {
        newBase64s.push(base64Str);
        processedCount++;
        if (processedCount === filesArray.length) {
          setImages((prev) => [...prev, ...newBase64s]);
        }
      });
    });
  };

  // Handle set as Cover Photo
  const handleSetCover = (idx: number) => {
    setCoverIndex(idx);
  };

  // Handle remove image
  const handleRemoveImage = (idx: number) => {
    if (images.length <= 1) {
      alert("A project must have at least one photo!");
      return;
    }
    const updated = images.filter((_, i) => i !== idx);
    setImages(updated);
    if (coverIndex >= updated.length) {
      setCoverIndex(0);
    } else if (coverIndex === idx) {
      setCoverIndex(0);
    }
  };

  // Handle move image
  const handleMoveImage = (idx: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= images.length) return;
    
    const updated = [...images];
    const temp = updated[idx];
    updated[idx] = updated[targetIdx];
    updated[targetIdx] = temp;

    setImages(updated);
    
    // adjust coverIndex if affected
    if (coverIndex === idx) setCoverIndex(targetIdx);
    else if (coverIndex === targetIdx) setCoverIndex(idx);
  };

  // Add highlight tag
  const handleAddHighlight = () => {
    if (!highlightInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      highlights: [...prev.highlights, highlightInput.trim()]
    }));
    setHighlightInput('');
  };

  // Remove highlight tag
  const handleRemoveHighlight = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (images.length === 0) {
      alert("Please add at least one image for the project.");
      return;
    }

    const primaryCoverImage = images[coverIndex] || images[0];
    
    // Reorder images so cover image is at index 0
    const reorderedImages = [primaryCoverImage, ...images.filter((_, i) => i !== coverIndex)];

    const finalData: Omit<Project, 'id'> = {
      ...formData,
      image: primaryCoverImage,
      images: reorderedImages
    };

    onSave(finalData);
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white border border-slate-200 max-w-2xl w-full rounded-3xl p-6 space-y-4 text-slate-900 my-auto shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold font-display flex items-center gap-2">
              <Building className="w-5 h-5 text-amber-500" />
              {project ? 'Edit Project Details & Gallery' : 'Add New Portfolio Project'}
            </h3>
            <p className="text-xs text-slate-500">Add 1, 3, or more photos and choose which image to set as Cover Photo</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Project Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:bg-white focus:border-amber-500"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:bg-white focus:border-amber-500"
              >
                <option value="villas">Villas / Residential</option>
                <option value="commercial">Commercial</option>
                <option value="structural">Structural Design</option>
                <option value="interiors">Interiors</option>
                <option value="renovation">Renovation</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:bg-white focus:border-amber-500"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Built-up Area</label>
              <input
                type="text"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:bg-white focus:border-amber-500"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Completion Year</label>
              <input
                type="text"
                value={formData.completionYear}
                onChange={(e) => setFormData({ ...formData, completionYear: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:bg-white focus:border-amber-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Construction Type / Spec</label>
              <input
                type="text"
                value={formData.constructionType}
                onChange={(e) => setFormData({ ...formData, constructionType: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:bg-white focus:border-amber-500"
                placeholder="e.g. RCC Frame & Glass Facade"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Client Name / Reference</label>
              <input
                type="text"
                value={formData.clientName}
                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:bg-white focus:border-amber-500"
                required
              />
            </div>
          </div>

          {/* MULTIPLE IMAGES & COVER PHOTO SELECTION SECTION */}
          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="block font-extrabold text-amber-950 text-xs flex items-center gap-1.5">
                  <Images className="w-4 h-4 text-amber-600" />
                  Project Photos & Gallery ({images.length} added)
                </label>
                <p className="text-[11px] text-amber-800">
                  Upload multiple photos (elevations, interior, blueprint). Set any photo as Cover Image.
                </p>
              </div>
              <span className="px-2 py-1 bg-amber-200 text-amber-900 rounded-lg text-[10px] font-bold uppercase">
                Image {coverIndex + 1} = Cover Photo
              </span>
            </div>

            {/* URL Input & Upload Buttons */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newUrlInput}
                onChange={(e) => setNewUrlInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddUrl();
                  }
                }}
                className="flex-1 px-3 py-2 bg-white border border-amber-300 rounded-xl font-medium text-slate-900 placeholder:text-slate-400 focus:border-amber-500"
                placeholder="Paste Image URL (https://...)"
              />
              <button
                type="button"
                onClick={handleAddUrl}
                className="px-3 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shrink-0 cursor-pointer flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add URL</span>
              </button>

              <label className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl cursor-pointer shrink-0 flex items-center gap-1">
                <Upload className="w-3.5 h-3.5 text-amber-400" />
                <span>Upload Files</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleMultipleFilesUpload}
                />
              </label>
            </div>

            {/* GALLERY THUMBNAILS GRID & ACTION CONTROLS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {images.map((imgUrl, idx) => {
                const isCover = coverIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-xl border flex items-center gap-3 transition-all ${
                      isCover
                        ? 'bg-white border-2 border-amber-500 shadow-md ring-2 ring-amber-400/30'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {/* Thumbnail Image */}
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
                      <img src={imgUrl} alt={`Photo ${idx + 1}`} className="w-full h-full object-cover" />
                      <span className="absolute top-0 left-0 bg-black/75 text-white font-mono text-[9px] px-1 font-bold">
                        #{idx + 1}
                      </span>
                    </div>

                    {/* Controls & Details */}
                    <div className="flex-1 space-y-1 overflow-hidden">
                      <div className="flex items-center justify-between">
                        {isCover ? (
                          <span className="px-2 py-0.5 bg-amber-500 text-slate-950 text-[10px] font-black uppercase rounded-md flex items-center gap-1">
                            <Star className="w-3 h-3 fill-slate-950" />
                            Cover Image
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleSetCover(idx)}
                            className="px-2 py-0.5 bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 border border-slate-200 text-[10px] font-bold rounded-md cursor-pointer"
                          >
                            Set as Cover
                          </button>
                        )}

                        {/* Reorder & Delete */}
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleMoveImage(idx, 'up')}
                            disabled={idx === 0}
                            className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-30 cursor-pointer"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveImage(idx, 'down')}
                            disabled={idx === images.length - 1}
                            className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-30 cursor-pointer"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(idx)}
                            className="p-1 rounded bg-rose-50 hover:bg-rose-100 text-rose-600 cursor-pointer ml-1"
                            title="Delete Photo"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-400 font-mono truncate">{imgUrl}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Project Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:bg-white focus:border-amber-500"
              required
            />
          </div>

          {/* HIGHLIGHTS EDITOR */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">Key Features / Engineering Highlights</label>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={highlightInput}
                onChange={(e) => setHighlightInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddHighlight();
                  }
                }}
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                placeholder="e.g. Tata Tiscon Fe550D, Rainwater Harvesting..."
              />
              <button
                type="button"
                onClick={handleAddHighlight}
                className="px-3 py-2 bg-slate-900 text-white font-bold rounded-xl text-xs cursor-pointer"
              >
                Add Feature
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {formData.highlights.map((hl, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-lg text-slate-800 text-[11px] font-semibold flex items-center gap-1.5"
                >
                  <span>{hl}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveHighlight(i)}
                    className="text-slate-400 hover:text-rose-600 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer"
          >
            Save Project & Publish Gallery
          </button>
        </form>
      </div>
    </div>
  );
};

// 3. SERVICE FORM MODAL
const ServiceFormModal: React.FC<{
  service: ServiceItemWithVisibility | null;
  onClose: () => void;
  onSave: (data: Omit<ServiceItemWithVisibility, 'id'>) => void;
}> = ({ service, onClose, onSave }) => {
  const [formData, setFormData] = useState<Omit<ServiceItemWithVisibility, 'id'>>({
    title: service?.title || '',
    iconName: service?.iconName || 'Building',
    description: service?.description || '',
    deliverables: service?.deliverables || ['Architectural Plan', '3D Elevation'],
    idealFor: service?.idealFor || 'Residential Plot Owners',
    hidden: service?.hidden || false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white border border-slate-200 max-w-lg w-full rounded-3xl p-6 space-y-4 text-slate-900 my-auto shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-base font-bold font-display">{service ? 'Edit Service' : 'Add New Service'}</h3>
          <button onClick={onClose} className="p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Service Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:bg-white focus:border-amber-500"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Icon Identifier</label>
            <input
              type="text"
              value={formData.iconName}
              onChange={(e) => setFormData({ ...formData, iconName: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 focus:bg-white focus:border-amber-500"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:bg-white focus:border-amber-500"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Target Clientele / Ideal For</label>
            <input
              type="text"
              value={formData.idealFor}
              onChange={(e) => setFormData({ ...formData, idealFor: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:bg-white focus:border-amber-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer mt-2"
          >
            Save Service
          </button>
        </form>
      </div>
    </div>
  );
};

// 4. TESTIMONIAL FORM MODAL
const TestimonialFormModal: React.FC<{
  testimonial: Testimonial | null;
  onClose: () => void;
  onSave: (data: Omit<Testimonial, 'id'>) => void;
  handleImageUpload: (file: File, callback: (base64Str: string) => void) => void;
}> = ({ testimonial, onClose, onSave }) => {
  const [formData, setFormData] = useState<Omit<Testimonial, 'id'>>({
    clientName: testimonial?.clientName || '',
    location: testimonial?.location || 'Virudhachalam',
    projectType: testimonial?.projectType || 'Residential House',
    rating: testimonial?.rating || 5,
    date: testimonial?.date || 'Recent',
    comment: testimonial?.comment || '',
    avatar: testimonial?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    projectPhoto: testimonial?.projectPhoto || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    verified: testimonial?.verified ?? true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white border border-slate-200 max-w-lg w-full rounded-3xl p-6 space-y-4 text-slate-900 my-auto shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-base font-bold font-display">{testimonial ? 'Edit Review' : 'Add Client Review'}</h3>
          <button onClick={onClose} className="p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Client Name</label>
            <input
              type="text"
              value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:bg-white focus:border-amber-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:bg-white focus:border-amber-500"
                required
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Rating (1 to 5)</label>
              <input
                type="number"
                min={1}
                max={5}
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:bg-white focus:border-amber-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Client Feedback Comment</label>
            <textarea
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:bg-white focus:border-amber-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer mt-2"
          >
            Save Review
          </button>
        </form>
      </div>
    </div>
  );
};

// 5. FAQ FORM MODAL
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
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white border border-slate-200 max-w-lg w-full rounded-3xl p-6 space-y-4 text-slate-900 my-auto shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-base font-bold font-display">{faq ? 'Edit FAQ' : 'Add FAQ'}</h3>
          <button onClick={onClose} className="p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:bg-white focus:border-amber-500"
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
            <label className="block font-bold text-slate-700 mb-1">Question</label>
            <input
              type="text"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:bg-white focus:border-amber-500"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Answer</label>
            <textarea
              value={formData.answer}
              onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:bg-white focus:border-amber-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer mt-2"
          >
            Save FAQ
          </button>
        </form>
      </div>
    </div>
  );
};

// 6. BEFORE & AFTER FORM MODAL
const BeforeAfterFormModal: React.FC<{
  item: BeforeAfterProject | null;
  onClose: () => void;
  onSave: (data: Omit<BeforeAfterProject, 'id'>) => void;
  handleImageUpload: (file: File, callback: (base64Str: string) => void) => void;
}> = ({ item, onClose, onSave, handleImageUpload }) => {
  const [formData, setFormData] = useState<Omit<BeforeAfterProject, 'id'>>({
    title: item?.title || '',
    location: item?.location || 'Virudhachalam',
    category: item?.category || 'New Construction',
    beforeImage: item?.beforeImage || 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=1200&q=80',
    afterImage: item?.afterImage || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    description: item?.description || '',
    duration: item?.duration || '6 Months Execution'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white border border-slate-200 max-w-xl w-full rounded-3xl p-6 space-y-4 text-slate-900 my-auto shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-base font-bold font-display">{item ? 'Edit Before & After Project' : 'Add Before & After Project'}</h3>
          <button onClick={onClose} className="p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Project Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:bg-white focus:border-amber-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:bg-white focus:border-amber-500"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Duration / Timeline</label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:bg-white focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Location</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:bg-white focus:border-amber-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Before Image URL</label>
              <input
                type="text"
                value={formData.beforeImage}
                onChange={(e) => setFormData({ ...formData, beforeImage: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[10px] text-slate-900 focus:bg-white focus:border-amber-500"
                required
              />
              <label className="mt-1 block px-2 py-1 bg-slate-100 hover:bg-slate-200 text-[#1E3A8A] font-bold text-[10px] rounded text-center cursor-pointer">
                Upload Before Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handleImageUpload(e.target.files[0], (url) => setFormData((prev) => ({ ...prev, beforeImage: url })));
                    }
                  }}
                />
              </label>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">After Image URL</label>
              <input
                type="text"
                value={formData.afterImage}
                onChange={(e) => setFormData({ ...formData, afterImage: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[10px] text-slate-900 focus:bg-white focus:border-amber-500"
                required
              />
              <label className="mt-1 block px-2 py-1 bg-slate-100 hover:bg-slate-200 text-[#1E3A8A] font-bold text-[10px] rounded text-center cursor-pointer">
                Upload After Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      handleImageUpload(e.target.files[0], (url) => setFormData((prev) => ({ ...prev, afterImage: url })));
                    }
                  }}
                />
              </label>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Transformation Details & Scope</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:bg-white focus:border-amber-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer mt-2"
          >
            Save Before & After Project
          </button>
        </form>
      </div>
    </div>
  );
};

// 7. MATERIAL FORM MODAL
const MaterialFormModal: React.FC<{
  material: MaterialBrand | null;
  onClose: () => void;
  onSave: (data: Omit<MaterialBrand, 'id'>) => void;
}> = ({ material, onClose, onSave }) => {
  const [formData, setFormData] = useState<Omit<MaterialBrand, 'id'>>({
    category: material?.category || 'Steel & Rebar',
    brandName: material?.brandName || '',
    grade: material?.grade || '',
    benefit: material?.benefit || '',
    logoText: material?.logoText || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white border border-slate-200 max-w-md w-full rounded-3xl p-6 space-y-4 text-slate-900 my-auto shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h3 className="text-base font-bold font-display">{material ? 'Edit Material Brand' : 'Add Material Brand'}</h3>
          <button onClick={onClose} className="p-2 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Category</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:bg-white focus:border-amber-500"
              placeholder="e.g. Structural Steel, Cement Matrix"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Brand Name</label>
            <input
              type="text"
              value={formData.brandName}
              onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:bg-white focus:border-amber-500"
              placeholder="e.g. Tata Tiscon Fe550D"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Grade / Technical Specification</label>
            <input
              type="text"
              value={formData.grade}
              onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:bg-white focus:border-amber-500"
              placeholder="e.g. Fe550D Super Ductile, 53 Grade Equivalent"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Benefit Description</label>
            <textarea
              value={formData.benefit}
              onChange={(e) => setFormData({ ...formData, benefit: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-medium text-slate-900 focus:bg-white focus:border-amber-500"
              placeholder="e.g. High ductility & earthquake resistance"
              required
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Badge / Logo Text Tag</label>
            <input
              type="text"
              value={formData.logoText}
              onChange={(e) => setFormData({ ...formData, logoText: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono text-slate-900 focus:bg-white focus:border-amber-500"
              placeholder="e.g. TATA TISCON"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer mt-2"
          >
            Save Material Brand
          </button>
        </form>
      </div>
    </div>
  );
};
