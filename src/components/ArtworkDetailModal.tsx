/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { X, ShieldCheck, Ruler, Camera, Sparkles, Sofa, ShoppingCart, Info, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Photograph, PrintOption } from '../types';
import { PRINT_OPTIONS, DESIGNER_ROOMS } from '../data';

interface ArtworkDetailModalProps {
  photo: Photograph;
  onClose: () => void;
  onAddToCart: (photo: Photograph, option: PrintOption) => void;
}

export default function ArtworkDetailModal({ photo, onClose, onAddToCart }: ArtworkDetailModalProps) {
  const [selectedOption, setSelectedOption] = useState<PrintOption>(PRINT_OPTIONS[0]);
  const [activeRoomId, setActiveRoomId] = useState<string>('living_grey');
  const [showRoomSimulator, setShowRoomSimulator] = useState<boolean>(true);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const activeRoom = DESIGNER_ROOMS.find(r => r.id === activeRoomId) || DESIGNER_ROOMS[0];

  const handleAddToCartClick = () => {
    setIsAdding(true);
    // Mimic elegant processing timing
    setTimeout(() => {
      onAddToCart(photo, selectedOption);
      setIsAdding(false);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1A1A]/95 backdrop-blur-sm overflow-y-auto">
      {/* Background click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative bg-[#FBFBFA] border border-editorial-border rounded-none w-full max-w-6xl shadow-2xl overflow-hidden z-10 flex flex-col lg:flex-row my-8 text-editorial-dark"
        id={`artwork-modal-${photo.id}`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-25 p-2 bg-white border border-editorial-border rounded-none text-editorial-dark hover:bg-neutral-100 transition duration-200 cursor-pointer"
          id="close-modal-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Media / Room Simulator */}
        <div className="w-full lg:w-3/5 p-6 bg-white border-r border-editorial-border flex flex-col justify-between">
          
          {/* Header switch buttons */}
          <div className="flex items-center justify-between gap-4 mb-4">
            <span className="font-mono text-editorial-muted text-[10px] uppercase tracking-widest">
              Vista de la Obra Curada
            </span>
            <div className="flex bg-[#F8F7F2] p-0.5 rounded-none border border-editorial-border">
              <button
                onClick={() => setShowRoomSimulator(false)}
                className={`px-3 py-1 rounded-none text-xs font-mono font-medium transition flex items-center gap-1.5 cursor-pointer ${
                  !showRoomSimulator ? 'bg-editorial-dark text-white shadow' : 'text-editorial-muted hover:text-editorial-dark'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Solo Imagen</span>
              </button>
              <button
                onClick={() => setShowRoomSimulator(true)}
                className={`px-3 py-1 rounded-none text-xs font-mono font-medium transition flex items-center gap-1.5 cursor-pointer ${
                  showRoomSimulator ? 'bg-editorial-dark text-white shadow' : 'text-editorial-muted hover:text-editorial-dark'
                }`}
              >
                <Sofa className="w-3.5 h-3.5" />
                <span>Simulador de Espacio</span>
              </button>
            </div>
          </div>

          <div className="flex-grow flex items-center justify-center min-h-[300px] md:min-h-[420px]">
            <AnimatePresence mode="wait">
              {!showRoomSimulator ? (
                /* Pure Photographic view */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key="pure-view"
                  className="p-4 border border-editorial-border bg-editorial-bg rounded-none max-w-full text-center shadow-xs"
                >
                  <img
                    src={photo.imagePath}
                    alt={photo.title}
                    className="max-h-[380px] md:max-h-[460px] object-contain rounded-none shadow-2xl mx-auto border-[12px] border-white ring-1 ring-black/5"
                    referrerPolicy="no-referrer"
                  />
                  <p className="font-mono text-[9px] text-editorial-muted tracking-wider mt-4 font-light">
                    Vista en resolución estándar. Cada obra física se procesa con laboratorio Fine Art de conservación.
                  </p>
                </motion.div>
              ) : (
                /* Simulated Living Room Environment View for Decoration Preview */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  key="sim-view"
                  className="w-full relative"
                >
                  <div className={`${activeRoom.bgClass} rounded-none border border-editorial-border overflow-hidden`}>
                    
                    {/* Artistic Shadows Representing The Hanging Photo */}
                    <div
                      style={{
                        backgroundImage: `url(${photo.imagePath})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                      className={`${activeRoom.canvasPlacementClass} shadow-[0_15px_30px_rgba(0,0,0,0.4)] border-4 border-white`}
                    >
                      {/* Signed autograph print watermarked detail for display only */}
                      <div className="absolute bottom-2.5 right-2.5 bg-neutral-950/80 px-1.5 py-0.5 rounded-none text-[6px] text-neutral-400 select-none uppercase scale-90">
                        {photo.artist} (Ejemplo)
                      </div>
                    </div>

                    {/* Floor Sofa mockup visual to give perspective scale */}
                    <div className="absolute bottom-4 left-4 right-4 bg-[#FBFBFA]/95 text-editorial-dark p-4 rounded-none flex items-center justify-between backdrop-blur-sm border border-editorial-border shadow-md">
                      <div>
                        <p className="font-serif italic text-xs text-editorial-gold font-normal">Escala de Decoración Sugerida</p>
                        <p className="text-[10px] text-editorial-muted font-mono mt-0.5 font-light">La altura y luz se ajustan según la proporción {selectedOption.dimensions}.</p>
                      </div>
                      <div className="flex gap-1.5">
                        {DESIGNER_ROOMS.map(room => (
                          <button
                            key={room.id}
                            onClick={() => setActiveRoomId(room.id)}
                            className={`px-2.5 py-1 text-[9px] font-mono border rounded-none transition cursor-pointer ${
                              activeRoomId === room.id
                                ? 'bg-editorial-dark text-white border-editorial-dark font-medium'
                                : 'bg-white border-editorial-border text-editorial-muted hover:text-editorial-dark hover:border-editorial-dark'
                            }`}
                          >
                            {room.name.split(' ')[0]}
                          </button>
                        ))}
                      </div>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Technical Spec metadata block */}
          <div className="mt-4 pt-4 border-t border-editorial-border grid grid-cols-2 md:grid-cols-5 gap-3 text-editorial-muted font-mono text-[10px]">
            <div className="p-2 bg-editorial-bg rounded-none border border-editorial-border">
              <span className="block text-editorial-muted uppercase text-[8px] font-semibold">Cámara</span>
              <span className="text-editorial-dark mt-0.5 block truncate font-medium">{photo.specs.camera}</span>
            </div>
            <div className="p-2 bg-editorial-bg rounded-none border border-editorial-border">
              <span className="block text-editorial-muted uppercase text-[8px] font-semibold">Lente</span>
              <span className="text-editorial-dark mt-0.5 block truncate font-medium">{photo.specs.lens}</span>
            </div>
            <div className="p-2 bg-editorial-bg rounded-none border border-editorial-border">
              <span className="block text-editorial-muted uppercase text-[8px] font-semibold">Exposición</span>
              <span className="text-editorial-dark mt-0.5 block truncate font-medium">{photo.specs.shutter}</span>
            </div>
            <div className="p-2 bg-editorial-bg rounded-none border border-editorial-border">
              <span className="block text-editorial-muted uppercase text-[8px] font-semibold">Diafragma</span>
              <span className="text-editorial-dark mt-0.5 block truncate font-medium">{photo.specs.aperture}</span>
            </div>
            <div className="p-2 bg-editorial-bg rounded-none border border-editorial-border col-span-2 md:col-span-1">
              <span className="block text-editorial-muted uppercase text-[8px] font-semibold">ISO</span>
              <span className="text-editorial-dark mt-0.5 block truncate font-medium">ISO {photo.specs.iso}</span>
            </div>
          </div>

        </div>

        {/* Right Column: Custom Configuration & Details */}
        <div className="w-full lg:w-2/5 p-6 md:p-8 flex flex-col justify-between bg-[#FBFBFA]">
          <div className="space-y-6">
            
            {/* Titles info */}
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#cfd3db] flex items-center gap-1.5 mb-1.5">
                <ShieldCheck className="w-4 h-4 text-editorial-gold" />
                <span className="text-editorial-gold">Ediciones Certificadas</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-normal tracking-tight text-editorial-dark">
                {photo.title}
              </h2>
              <p className="font-mono text-xs text-editorial-muted italic mt-0.5 border-b border-editorial-border pb-2">
                {photo.englishTitle}
              </p>
              <p className="text-xs text-editorial-muted leading-relaxed mt-3 font-sans font-light">
                {photo.description}
              </p>
            </div>

            {/* Architecture Options table/cards */}
            <div>
              <h3 className="text-[#1a1a1a] text-xs font-mono uppercase tracking-widest mb-3 flex items-center gap-1.5 font-semibold">
                <Ruler className="w-4 h-4 text-editorial-gold" />
                <span>1. Formato de Salida y Soporte</span>
              </h3>
              
              <div className="space-y-2">
                {PRINT_OPTIONS.map((option) => (
                  <label
                    key={option.id}
                    onClick={() => setSelectedOption(option)}
                    className={`flex items-start justify-between p-3 rounded-none border cursor-pointer select-none transition-all ${
                      selectedOption.id === option.id
                        ? 'bg-editorial-dark/5 border-editorial-dark text-editorial-dark'
                        : 'bg-white border-editorial-border text-editorial-muted hover:border-editorial-dark hover:text-editorial-dark'
                    }`}
                  >
                    <div className="flex gap-2 w-4/5 pt-0.5">
                      <input
                        type="radio"
                        name="print_format"
                        checked={selectedOption.id === option.id}
                        onChange={() => setSelectedOption(option)}
                        className="accent-editorial-gold mt-1 cursor-pointer"
                      />
                      <div className="text-xs font-sans ml-1 text-left">
                        <p className={`font-semibold font-serif text-[13px] ${selectedOption.id === option.id ? 'text-editorial-dark font-bold' : 'text-[#333]'}`}>
                          {option.name}
                        </p>
                        <p className="text-[10px] text-editorial-muted mt-0.5 line-clamp-1 font-light">
                          {option.material}
                        </p>
                        <p className="text-[9px] text-[#aeaeae] mt-0.5 font-mono">
                          Licencia: $25 USD + {option.id === 'digital' ? 'Sin impresión' : `Impresión: $${option.costPrint}.00 USD`}
                        </p>
                      </div>
                    </div>
                    <div className="text-right whitespace-nowrap pt-1">
                      <span className="font-mono text-sm font-bold text-editorial-dark">${option.totalCost}.00</span>
                      <span className="block text-[8px] text-editorial-muted font-mono">USD</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Dynamic Authenticity Guarantee preview badge */}
            <div className="p-4 bg-white rounded-none border border-editorial-border space-y-2 shadow-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-editorial-gold" />
                <span className="font-mono text-[10px] uppercase font-semibold text-editorial-dark">Garantía Exclusiva Xavier Caivinagua</span>
              </div>
              <p className="text-[10px] text-editorial-muted leading-relaxed font-sans font-light">
                {selectedOption.isDigital ? (
                  <span><strong>Formato Digital Fino:</strong> Enlace de descarga segura instantáneo en JPEG/TIFF alta definición. Incluye certificado de autenticidad digital firmado con hash criptográfico SHA-256.</span>
                ) : (
                  <span><strong>Formato Físico Certificado:</strong> Impresión museo Fine Art gestionada por laboratorios autorizados. Empaque premium seguro con envío internacional asegurado. Incluye certificado físico con sello holográfico numerado.</span>
                )}
              </p>
            </div>

          </div>

          {/* Checkout CTA actions footer */}
          <div className="border-t border-editorial-border pt-6 mt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="font-mono text-xs text-editorial-muted text-left">
                <span>Total a Pagar (Monto Neto):</span>
                <span className="block text-[9px] text-editorial-muted mt-0.5">Calculado automáticamente</span>
              </div>
              <div className="text-right">
                <span className="font-mono text-2xl font-bold text-editorial-dark">${selectedOption.totalCost}.00</span>
                <span className="font-mono text-xs text-editorial-muted ml-1">USD</span>
              </div>
            </div>

            <button
              onClick={handleAddToCartClick}
              disabled={isAdding}
              className="w-full bg-editorial-dark hover:bg-neutral-800 text-white font-medium py-3.5 px-6 rounded-none transition-all duration-300 flex items-center justify-center gap-2 text-sm shadow-xs disabled:opacity-50 select-none cursor-pointer"
              id="add-to-cart-cta-button"
            >
              <ShoppingCart className="w-4.5 h-4.5 text-editorial-gold" />
              <span>{isAdding ? 'Añadiendo pieza...' : 'Añadir a mi Colección'}</span>
            </button>
            
            <p className="text-center text-[10px] text-editorial-muted mt-2.5 flex items-center justify-center gap-1.5 font-light">
              <Info className="w-3.5 h-3.5 text-editorial-gold" />
              <span>Pasarela de cobro cifrada internacional certificada.</span>
            </p>
          </div>

        </div>

      </motion.div>
    </div>
  );
}
