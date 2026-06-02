/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MapPin, ShieldCheck, Heart, ArrowRight, Eye, ChevronRight } from 'lucide-react';
import { Photograph, PrintOption, CartItem } from './types';
import { PHOTOGRAPHS } from './data';
import Navbar from './components/Navbar';
import Gallery from './components/Gallery';
import AboutSection from './components/AboutSection';
import Cart from './components/Cart';
import ArtworkDetailModal from './components/ArtworkDetailModal';
import CheckoutModal from './components/CheckoutModal';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photograph | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);

  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const catalogSectionRef = useRef<HTMLDivElement>(null);

  // Smooth scroll anchors
  const scrollToAbout = () => {
    setActiveCategory('about_section');
    aboutSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCatalog = () => {
    setActiveCategory('all');
    catalogSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Cart operations
  const handleAddToCart = (photo: Photograph, option: PrintOption) => {
    const itemUniqueId = `${photo.id}-${option.id}`;
    
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === itemUniqueId);
      if (existingItem) {
        return prev.map(item =>
          item.id === itemUniqueId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { id: itemUniqueId, photo, selectedOption: option, quantity: 1 }];
    });
    
    // Close detail modal and open shopping cart for smooth user feedback
    setSelectedPhoto(null);
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item => item.id === id ? { ...item, quantity: newQty } : item)
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="bg-editorial-bg min-h-screen text-editorial-dark font-sans selection:bg-editorial-gold selection:text-white">
      
      {/* Upper Navigation Component */}
      <Navbar
        activeCategory={activeCategory}
        setActiveCategory={(cat) => {
          setActiveCategory(cat);
          if (cat === 'about_section') {
            scrollToAbout();
          }
        }}
        cartCount={cartCount}
        onCartOpen={() => setIsCartOpen(true)}
        scrollToAbout={scrollToAbout}
      />

      {/* Modern Hero Showcase with ambient backdrop shadows */}
      <section className="relative min-h-[550px] md:min-h-[660px] flex items-center justify-center overflow-hidden border-b border-editorial-border py-16">
        <div className="absolute inset-0 bg-[#F5F4EE] pointer-events-none">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:24px_24px]" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-editorial-gold/5 rounded-full filter blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left font-sans">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-editorial-dark text-white rounded-full text-[10px] font-mono uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-editorial-gold" />
              <span>Colección Exclusiva 2026</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight leading-none text-editorial-dark font-normal">
              Armonía Visual para <span className="italic block mt-2 text-editorial-gold font-light animate-pulse">Interiores de Lujo</span>
            </h2>
            
            <p className="text-sm sm:text-base text-editorial-muted max-w-lg mx-auto lg:mx-0 leading-relaxed font-sans font-light">
              Descubra piezas de fotografía artística firmadas, de edición limitada y acompañadas de un Certificado de Autenticidad legal. Curadas meticulosamente en Cuenca y Nueva York para vestir salones contemporáneos, oficinas corporativas y spas de lujo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4 font-mono">
              <button
                onClick={scrollToCatalog}
                className="bg-editorial-dark hover:bg-neutral-800 text-editorial-bg font-medium py-3 px-8 transition-transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 text-xs uppercase tracking-widest cursor-pointer"
              >
                <span>Explorar Catálogo Curado</span>
                <ArrowRight className="w-4 h-4 text-editorial-gold" />
              </button>
              
              <button
                onClick={scrollToAbout}
                className="border border-editorial-border bg-white/40 hover:bg-white hover:border-editorial-dark text-editorial-dark font-medium py-3 px-8 transition-all text-xs uppercase tracking-widest cursor-pointer"
              >
                Nuestra Certificación
              </button>
            </div>

            {/* Micro details row */}
            <div className="grid grid-cols-3 gap-4 pt-6 mt-8 border-t border-editorial-border font-mono text-[10px] text-editorial-muted max-w-md mx-auto lg:mx-0">
              <div>
                <span className="block text-editorial-dark font-bold text-xs uppercase tracking-wider mb-1">100% Genuino</span>
                Firma autógrafa de Xavier Caivinagua
              </div>
              <div>
                <span className="block text-editorial-dark font-bold text-xs uppercase tracking-wider mb-1">Edición Limitada</span>
                Máximo 50 copias mundiales
              </div>
              <div>
                <span className="block text-editorial-dark font-bold text-xs uppercase tracking-wider mb-1">Premium Fine Art</span>
                Envío respaldado DHL/FedEx
              </div>
            </div>
          </div>

          {/* Hero main preview frame */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="relative group max-w-md md:max-w-lg bg-white p-6 rounded-none border border-editorial-border shadow-md">
              {/* Highlight artwork frame representing the top banner display */}
              <div className="aspect-[4/3] overflow-hidden rounded-none bg-neutral-900 relative p-1 max-w-full">
                <img
                  src={PHOTOGRAPHS[0].imagePath}
                  alt="Fine Art Teaser"
                  className="w-full h-full object-cover rounded-none transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent flex items-end p-5">
                  <div className="font-mono text-left w-full">
                    <span className="px-2 py-0.5 bg-editorial-gold text-white font-bold text-[8px] rounded-none uppercase tracking-wider">Obra Destacada de Portada</span>
                    <h3 className="text-base font-serif text-white mt-2 font-medium">{PHOTOGRAPHS[0].title}</h3>
                    <p className="text-[10px] text-neutral-300 mt-0.5">{PHOTOGRAPHS[0].englishTitle} — Cuenca, {PHOTOGRAPHS[0].year}</p>
                  </div>
                </div>
              </div>

              {/* Mini tag floating */}
              <div className="absolute -bottom-4 -right-4 bg-[#1A1A1A] border border-editorial-border px-4 py-2.5 rounded-none shadow-lg font-mono text-[9px] text-[#aeaeae] select-none text-left">
                <span className="text-editorial-gold font-bold block uppercase tracking-wider text-[8px]">Soporte para Salones</span>
                Papel Fine Art Ph Neutro
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Photographic Gallery Catalog Section */}
      <div ref={catalogSectionRef} id="catálogo">
        <Gallery
          activeCategory={activeCategory === 'about_section' ? 'all' : activeCategory}
          onPhotoClick={(photo) => setSelectedPhoto(photo)}
        />
      </div>

      {/* Interactive About & Authentication Details Section */}
      <div ref={aboutSectionRef} id="sobre-el-autor">
        <AboutSection />
      </div>

      {/* Shopping Drawer Side over */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Detailed artwork customization simulator overlay */}
      <AnimatePresence>
        {selectedPhoto && (
          <ArtworkDetailModal
            photo={selectedPhoto}
            onClose={() => setSelectedPhoto(null)}
            onAddToCart={handleAddToCart}
          />
        )}
      </AnimatePresence>

      {/* Secure Payment and certificate checkout workflow overlay */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onClearCart={handleClearCart}
      />

      {/* Gorgeous Museum Catalog Footer aligned with specification technical details on Page 3 */}
      <footer className="bg-editorial-dark text-white/60 font-mono text-[11px] py-16 border-t border-editorial-border px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          <div className="space-y-4">
            <h4 className="text-xs uppercase text-white tracking-widest font-bold">XAVIER CAIVINAGUA</h4>
            <p className="leading-relaxed text-white/80 font-sans font-light">
              Galería curada exclusiva para proyectos de interiorismo, coleccionistas corporativos y amantes de la fotografía artística firmada de colección en Ecuador y Estados Unidos.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs uppercase text-white tracking-widest font-bold">LÍNEAS CURATORIALES</h4>
            <ul className="space-y-2 text-[10px] text-white/80">
              <li><button onClick={() => { setActiveCategory('landscape'); window.scrollTo({ top: 400, behavior: 'smooth' }); }} className="hover:text-editorial-gold transition cursor-pointer">Paisaje (Nature & Horizons)</button></li>
              <li><button onClick={() => { setActiveCategory('urban'); window.scrollTo({ top: 400, behavior: 'smooth' }); }} className="hover:text-editorial-gold transition cursor-pointer">Urbano (Cityscapes & Heritage)</button></li>
              <li><button onClick={() => { setActiveCategory('abstract'); window.scrollTo({ top: 400, behavior: 'smooth' }); }} className="hover:text-editorial-gold transition cursor-pointer">Abstracto (Motion & Light)</button></li>
              <li><button onClick={() => { setActiveCategory('minimalist'); window.scrollTo({ top: 400, behavior: 'smooth' }); }} className="hover:text-editorial-gold transition cursor-pointer">Minimalista (Textures & Form)</button></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs uppercase text-white tracking-widest font-bold">CERTIFICACIÓN & ENVIOS</h4>
            <ul className="space-y-2 text-[10px] text-white/80 leading-relaxed font-sans font-light">
              <li>• Sellos holográficos de seguridad con trazabilidad</li>
              <li>• Firmas digitales autógrafas encriptadas</li>
              <li>• Transporte blindado y asegurado vía DHL / FedEx</li>
              <li>• Laboratorios Fine Art autorizados en NY y Cuenca</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs uppercase text-white tracking-widest font-bold">CONTACTO & SOPORTE</h4>
            <p className="text-white/80 leading-relaxed font-sans font-light">
              ¿Tiene un proyecto de arquitectura u hotelería? Escríbanos para cotizaciones de catálogos a medida:<br />
              <span className="text-editorial-gold font-mono text-xs block mt-1">caivinagua.studio@fineart.com</span>
            </p>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-white/40 text-[10px]">
          <p>
            Documento de Especificación Técnica y Estructura de Contenido para Desarrollo Web Corporativo.
          </p>
          <p className="text-right">
            Xavier Caivinagua Photography © 2026. Todos los derechos reservados.
          </p>
        </div>
      </footer>

    </div>
  );
}
