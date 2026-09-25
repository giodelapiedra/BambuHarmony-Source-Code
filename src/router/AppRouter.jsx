import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageLayout from '../components/layout/PageLayout';
import ScrollToTop from '../components/layout/ScrollToTop';
import Home from '../pages/Home';
import About from '../pages/About';
import CareOptionsPage from '../pages/CareOptionsPage';
import LocationPage from '../pages/LocationPage';
import Contact from '../pages/Contact';
import NotFound from '../pages/NotFound';

function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<PageLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/care-options" element={<CareOptionsPage />} />
          <Route path="/location" element={<LocationPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
