import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ShowroomPage from './pages/ShowroomPage';
import ForgePage from './pages/ForgePage';
import CruciblePage from './pages/CruciblePage';
import Footer from './components/Footer';
import JoinPage from './pages/JoinPage';
import PrivacyPolicyPage from './pages/PrivacyPolicy';

import TermsAndConditionsPage from './pages/TermsAndConditions';
import CodeOfConduct from './pages/CodeOfConduct';

// Admin imports
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/admin/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Admin routes render without the main site layout
  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    );
  }

  // Main site routes
  return (
    <div className="relative min-h-screen w-full bg-base">
      <div className="blueprint-bg"></div>
      <Header />
      <main className="container mx-auto px-6 pt-32">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/showroom" element={<ShowroomPage />} />
          <Route path="/forge" element={<ForgePage />} />
          <Route path="/about" element={<CruciblePage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsAndConditionsPage />} />
          <Route path="/apply" element={<JoinPage />} />
          <Route path="/code-of-conduct" element={<CodeOfConduct />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}