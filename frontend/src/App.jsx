
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import LandingPage from '@/pages/LandingPage';
import DocsPage from '@/pages/DocsPage';
import GalleryPage from '@/pages/GalleryPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/docs" element={<DocsPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
