"use client";

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import './scripts/leaflet.css';

const Map: React.ComponentType = dynamic(() => import('./mapscript'), {
  loading: () => <p>Loading map...</p>,
  ssr: false
});

export default function Home() {
  const [mapInitialized, setMapInitialized] = useState(false);

  useEffect(() => {
    if (!mapInitialized) {
      setMapInitialized(true);
    }
  }, [mapInitialized]);

  return (
    <>
        {mapInitialized && <Map />} {/* Conditionally render Map */}
    </>
  );
};