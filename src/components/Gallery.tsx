/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ZoomIn, MapPin, Layers, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { Photograph } from '../types';
import { PHOTOGRAPHS, COLLECTIONS } from '../data';

interface GalleryProps {
  activeCategory: string;
  onPhotoClick: (photo: Photograph) => void;
}

export default function Gallery({ activeCategory, onPhotoClick }: GalleryProps) {
  // Filter photographs based on active category
  const filteredPhotos = activeCategory === 'all'
    ? PHOTOGRAPHS
    : PHOTOGRAPHS.filter(p => p.collectionId === activeCategory);

  // Get current active collection info
  const activeCollectionInfo = COLLECTIONS.find(c => c.id === activeCategory);

  const getCollectionBadgeName = (collectionId: string) => {
    switch (collectionId) {
      case 'landscape': return 'Paisaje';
      case 'urban': return 'Urbano';
      case 'abstract': return 'Abstracto';
      case 'minimalist': return 'Minimalista';
      default: return 'Fotografía';
    }
  };

  return (
    <section className="bg-editorial-bg py-16 px-4 sm:px-6 lg:px-8 text-editorial-dark min-h-[600px]">
      <div className="max-w-7xl mx-auto">
        
        {/* Collection details header */}
        {activeCollectionInfo && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            key={activeCategory}
            className="mb-12 p-6 sm:p-8 bg-white border border-editorial-border shadow-sm max-w-4xl"
          >
            <div className="flex items-center gap-2 text-editorial-gold font-mono text-xs uppercase tracking-widest mb-2 font-semibold">
              <Layers className="w-4 h-4 text-editorial-gold" />
              <span>Colección Curada</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-serif tracking-tight text-editorial-dark mb-3">
              {activeCollectionInfo.name}
            </h2>
            
            <p className="text-editorial-muted text-sm leading-relaxed mb-4 font-sans font-light">
              {activeCollectionInfo.description}
            </p>

            <div className="flex flex-wrap items-center gap-2.5 mt-2 border-t border-editorial-border pt-4">
              <span className="text-editorial-muted text-[10px] font-mono uppercase tracking-wider">Ambientes Sugeridos:</span>
              <span className="inline-flex items-center gap-1 bg-editorial-dark/5 border border-editorial-border text-editorial-dark px-3 py-1 text-xs">
                <MapPin className="w-3.5 h-3.5 text-editorial-gold" />
                <span>{activeCollectionInfo.environments}</span>
              </span>
            </div>
          </motion.div>
        )}

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPhotos.map((photo, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              key={photo.id}
              className="bg-white overflow-hidden border border-editorial-border shadow-sm cursor-pointer group hover:border-editorial-dark transition-all duration-300 flex flex-col"
              onClick={() => onPhotoClick(photo)}
              id={`photo-card-${photo.id}`}
            >
              {/* Photo Image with passe-partout fine art mount frame effect */}
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-50/50 p-4 border-b border-editorial-border">
                <div className="w-full h-full overflow-hidden shadow-inner bg-neutral-950 relative">
                  <img
                    src={photo.imagePath}
                    alt={photo.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                {/* Visual hover overlay */}
                <div className="absolute inset-x-4 inset-y-4 bg-editorial-dark/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="p-3 bg-editorial-dark text-editorial-bg border border-editorial-border rounded-none shadow-2xl backdrop-blur-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <ZoomIn className="w-5 h-5 text-editorial-gold" />
                  </span>
                </div>

                {/* Left badge - collection type */}
                <span className="absolute top-6 left-6 bg-white/95 text-[9px] text-editorial-dark font-mono tracking-widest uppercase border border-editorial-border px-2 py-1 backdrop-blur shadow-xs">
                  {getCollectionBadgeName(photo.collectionId)}
                </span>

                {/* Right badge - limited stock */}
                <span className="absolute top-6 right-6 bg-editorial-dark text-white font-bold font-mono text-[8px] tracking-wider px-2 py-1 shadow flex items-center gap-1 rounded-none">
                  <Sparkles className="w-2.5 h-2.5 text-editorial-gold animate-bounce" />
                  <span>EDICIÓN LIMITADA</span>
                </span>
              </div>

              {/* Photo Description details */}
              <div className="p-5 flex-grow flex flex-col justify-between bg-white font-sans">
                <div>
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <h3 className="text-lg font-serif tracking-tight text-editorial-dark group-hover:text-editorial-gold transition-colors duration-200">
                      {photo.title}
                    </h3>
                    <span className="font-mono text-editorial-muted text-xs mt-1">
                      {photo.year}
                    </span>
                  </div>

                  <p className="font-mono text-[10px] italic text-editorial-muted tracking-wide mb-3">
                    {photo.englishTitle}
                  </p>

                  <p className="text-xs text-editorial-muted font-light line-clamp-2 leading-relaxed mb-4">
                    {photo.description}
                  </p>
                </div>

                <div className="border-t border-editorial-border pt-4 flex items-center justify-between">
                  <div className="font-mono text-[10px] text-editorial-muted">
                    Edición de <span className="text-editorial-dark font-medium">{photo.limitedEditionCount} unidades</span>
                  </div>
                  <span className="text-xs font-mono text-editorial-gold font-semibold group-hover:text-editorial-dark group-hover:underline flex items-center gap-1 transition-colors duration-200">
                    Configurar Compra &rarr;
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredPhotos.length === 0 && (
          <div className="text-center py-20 bg-white border border-dashed border-editorial-border">
            <p className="text-editorial-muted font-mono text-sm uppercase">Próximas obras por curar en esta categoría</p>
          </div>
        )}
      </div>
    </section>
  );
}
