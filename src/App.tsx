import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Consultancy } from './components/Consultancy';
import { ProjectShowcase } from './components/ProjectShowcase';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { CostEstimator } from './components/CostEstimator';
import { MaterialQuality } from './components/MaterialQuality';
import { Process } from './components/Process';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';
import { CompanyProfileModal } from './components/CompanyProfileModal';
import { WhatsAppButton } from './components/WhatsAppButton';

export default function App() {
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem('hasSeenLoader');
    }
    return true;
  });

  const [consultationModalOpen, setConsultationModalOpen] = useState(false);
  const [consultationTopic, setConsultationTopic] = useState<string>('');
  const [companyProfileModalOpen, setCompanyProfileModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const handleLoadingComplete = () => {
    sessionStorage.setItem('hasSeenLoader', 'true');
    setIsLoading(false);
  };

  const handleOpenConsultationModal = (topic?: string) => {
    setConsultationTopic(topic || '');
    setConsultationModalOpen(true);
  };

  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#1C1D21] relative font-sans antialiased overflow-x-hidden">
      {/* 1. Architectural Blueprint Loading Screen */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      {/* 2. Floating Glass Navbar - Strictly rendered AFTER loading screen finishes */}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        >
          <Navbar
            onOpenConsultationModal={() => handleOpenConsultationModal('General Engineering Consultation')}
            onOpenCompanyProfileModal={() => setCompanyProfileModalOpen(true)}
          />
        </motion.div>
      )}

      {/* Main Page Layout */}
      <main className="relative z-10 overflow-x-hidden">
        {/* 3. Hero Section */}
        <Hero
          onOpenConsultationModal={() => handleOpenConsultationModal('Hero Quick Consultation')}
          onSelectProject={handleSelectProject}
        />

        {/* 4. About Company & Leadership */}
        <About />

        {/* 5. Comprehensive Services */}
        <Services onOpenConsultationModal={handleOpenConsultationModal} />

        {/* 6. Why Choose Us Comparison Matrix */}
        <WhyChooseUs />

        {/* 7. Structural Consultancy Spotlight */}
        <Consultancy onOpenConsultationModal={handleOpenConsultationModal} />

        {/* 8. Portfolio Showcase & Lightbox */}
        <ProjectShowcase
          selectedProjectId={selectedProjectId}
          onClearSelectedProject={() => setSelectedProjectId(null)}
          onOpenConsultationModal={handleOpenConsultationModal}
        />

        {/* 9. Before & After Transformation Slider */}
        <BeforeAfterSlider />

        {/* 10. Interactive Cost Estimator UI Tool */}
        <CostEstimator onOpenConsultationModal={handleOpenConsultationModal} />

        {/* 11. Material Quality & Transparency */}
        <MaterialQuality />

        {/* 12. 8-Stage Work Process */}
        <Process />

        {/* 13. Client Reviews (Google Style) */}
        <Testimonials />

        {/* 14. Frequently Asked Questions */}
        <FAQ />

        {/* 15. Working Contact Section & Maps */}
        <Contact initialServiceTitle={consultationTopic} />
      </main>

      {/* 16. Footer */}
      <Footer />

      {/* 17. Floating WhatsApp Quick Action Button */}
      <WhatsAppButton />

      {/* 18. Consultation Booking Modal */}
      <ConsultationModal
        isOpen={consultationModalOpen}
        onClose={() => setConsultationModalOpen(false)}
        initialTopic={consultationTopic}
      />

      {/* 19. Company Profile PDF Modal */}
      <CompanyProfileModal
        isOpen={companyProfileModalOpen}
        onClose={() => setCompanyProfileModalOpen(false)}
      />
    </div>
  );
}

