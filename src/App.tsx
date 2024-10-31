import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import VisualizationPage from './pages/VisualizationPage';
import HowToInvestPage from './pages/HowToInvestPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="/visualization" element={<VisualizationPage />} />
          <Route path="/how-to-invest" element={<HowToInvestPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;