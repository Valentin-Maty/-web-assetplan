'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Spinner } from "@nextui-org/react";
import PropertyCard from '@/components/PropertyCard';
import { getProperties, Property } from '@/lib/googleSheets';

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    try {
      setLoading(true);
      const data = await getProperties();
      setProperties(data);
      setError(null);
    } catch (err) {
      setError('Error al cargar las propiedades');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-tumatch-primary/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-tumatch-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-tumatch-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <header className="relative z-10 py-8 px-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-tumatch rounded-lg flex items-center justify-center">
                  <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                  </svg>
                </div>
                <div className="absolute inset-0 bg-gradient-tumatch rounded-lg blur-xl opacity-60" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white">TUMATCH</h1>
                <p className="text-white/60 text-sm tracking-[0.3em]">INMOBILIARIO</p>
              </div>
            </div>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-8"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-2">
              Encuentra tu Propiedad Ideal
            </h2>
            <p className="text-white/60">
              Descubre las mejores oportunidades inmobiliarias
            </p>
          </motion.div>
        </motion.div>
      </header>

      <main className="container mx-auto px-4 pb-12 relative z-10">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center min-h-[400px]"
            >
              <div className="text-center">
                <Spinner 
                  size="lg" 
                  color="secondary"
                  classNames={{
                    circle1: "border-b-tumatch-primary",
                    circle2: "border-b-tumatch-secondary",
                  }}
                />
                <p className="text-white/60 mt-4">Cargando propiedades...</p>
              </div>
            </motion.div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-red-400">{error}</p>
              <button
                onClick={loadProperties}
                className="mt-4 px-6 py-2 bg-gradient-tumatch text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Reintentar
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6 bg-white/5 backdrop-blur-xl rounded-xl px-6 py-4 border border-white/10">
                <div className="flex items-center justify-between">
                  <p className="text-white/80">
                    <span className="font-semibold text-white">{properties.length}</span> propiedades encontradas
                  </p>
                  <p className="text-white/60 text-sm">
                    Ordenadas por valor de bono
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {properties.map((property, index) => (
                  <PropertyCard 
                    key={property.id} 
                    property={property} 
                    index={index}
                  />
                ))}
              </div>

              {properties.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="inline-block p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
                    <svg className="w-16 h-16 text-white/40 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <p className="text-white/60 text-lg">No se encontraron propiedades</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}