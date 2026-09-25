import { Outlet } from 'react-router-dom';
import Seo from '../common/Seo';
import Navbar from './Navbar';
import Footer from './Footer';
import SupportWidget from '../support/SupportWidget';
import LeadCapturePopup from '../support/LeadCapturePopup';
import AccessibilityWidget from '../common/AccessibilityWidget';

function PageLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Seo />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <SupportWidget />
      <LeadCapturePopup />
      <AccessibilityWidget />
    </div>
  );
}

export default PageLayout;
