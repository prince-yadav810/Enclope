import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ShowroomPage from './pages/ShowroomPage';
import ForgePage from './pages/ForgePage';
import CruciblePage from './pages/CruciblePage';
import Footer from './components/Footer';
import JoinPage from './pages/JoinPage';

export default function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      <div className="blueprint-bg"></div>
      <Header />
      <main className={isHomePage ? '' : 'container mx-auto px-6 pt-32'}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/showroom" element={<ShowroomPage />} />
          <Route path="/forge" element={<ForgePage />} />
          <Route path="/crucible" element={<CruciblePage />} />
          <Route path="/join" element={<JoinPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}