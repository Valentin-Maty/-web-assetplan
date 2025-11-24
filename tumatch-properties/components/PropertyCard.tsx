'use client';

import React from 'react';
import { Card, CardBody, CardFooter, Chip, Button } from "@nextui-org/react";
import { motion } from 'framer-motion';
import { Property } from '@/lib/googleSheets';

interface PropertyCardProps {
  property: Property;
  index: number;
}

export default function PropertyCard({ property, index }: PropertyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.05,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3 }
      }}
      className="h-full"
    >
      <Card 
        className="h-full border-0 relative overflow-hidden group"
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        <div 
          className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.2) 0%, rgba(255, 20, 147, 0.15) 50%, rgba(138, 43, 226, 0.2) 100%)',
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-50" />
        
        <div 
          className="absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #FF6B6B 0%, transparent 70%)',
          }}
        />
        
        <div className="relative z-10">
          <div 
            className="h-48 relative overflow-hidden"
            style={{
              backgroundImage: `url(${property.imagen || '/placeholder.jpg'})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
            
            {property.bono > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.05 + 0.3 }}
                className="absolute top-3 right-3"
              >
                <Chip
                  className="px-3 font-bold text-white border-0"
                  style={{
                    background: 'linear-gradient(135deg, #FF6B6B 0%, #FF1493 100%)',
                    boxShadow: '0 4px 20px rgba(255, 107, 107, 0.4)',
                  }}
                  size="md"
                >
                  Bono: ${property.bono.toLocaleString()}
                </Chip>
              </motion.div>
            )}
            
            <div className="absolute bottom-3 left-3 right-3">
              <h3 className="text-white font-bold text-xl mb-1 drop-shadow-lg">
                {property.nombre}
              </h3>
              <p className="text-white/90 text-sm drop-shadow-md">
                {property.direccion}
              </p>
            </div>
          </div>

          <CardBody className="px-4 py-4">
            <div className="flex items-center justify-between mb-3">
              <span 
                className="text-2xl font-bold bg-gradient-to-r from-tumatch-primary to-tumatch-secondary bg-clip-text text-transparent"
              >
                ${property.precio.toLocaleString()}
              </span>
              <Chip 
                variant="flat" 
                className="bg-white/10 backdrop-blur-md text-white/90 border-white/20"
                size="sm"
              >
                {property.tipo}
              </Chip>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="bg-white/5 backdrop-blur-sm rounded-lg px-2 py-2 text-center border border-white/10">
                <p className="text-xs text-white/60">Habitaciones</p>
                <p className="text-lg font-semibold text-white">{property.habitaciones}</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg px-2 py-2 text-center border border-white/10">
                <p className="text-xs text-white/60">Baños</p>
                <p className="text-lg font-semibold text-white">{property.banos}</p>
              </div>
              <div className="bg-white/5 backdrop-blur-sm rounded-lg px-2 py-2 text-center border border-white/10">
                <p className="text-xs text-white/60">Área</p>
                <p className="text-lg font-semibold text-white">{property.area}m²</p>
              </div>
            </div>

            {property.descripcion && (
              <p className="text-white/70 text-sm line-clamp-2 mb-3">
                {property.descripcion}
              </p>
            )}

            <div className="flex gap-2 items-center">
              <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-white/60 text-sm">{property.ciudad}</span>
            </div>
          </CardBody>

          <CardFooter className="px-4 pb-4 pt-0">
            <Button 
              className="w-full font-semibold text-white border-0"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.8) 0%, rgba(255, 20, 147, 0.8) 50%, rgba(138, 43, 226, 0.8) 100%)',
                backdropFilter: 'blur(10px)',
              }}
              onPress={() => console.log('Ver detalles:', property.id)}
            >
              Ver Detalles
            </Button>
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  );
}