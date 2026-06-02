/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShoppingBag, Menu, X, Landmark, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface NavbarProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  cartCount: number;
  onCartOpen: () => void;
  scrollToAbout: () => void;
}

export default function Navbar({
  activeCategory,
  setActiveCategory,
  cartCount,
  onCartOpen,
  scrollToAbout
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Exact menu alignment from PDF: INICIO | PAISAJE | URBANO | ABSTRACTO | MINIMALISTA | SOBRE EL AUTOR
  const navItems = [
    { label: 'INICIO', value: 'all' },
    { label: 'PAISAJE', value: 'landscape' },
    { label: 'URBANO', value: 'urban' },
    { label: 'ABSTRACTO', value: 'abstract' },
    { label: 'MINIMALISTA', value: 'minimalist' },
    { label: 'SOBRE EL AUTOR', value: 'about' }
  ];

  const handleNavItemClick = (value: string) => {
    setMobileMenuOpen(false);
    if (value === 'about') {
      scrollToAbout();
    } else {
      setActiveCategory(value);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-editorial-bg border-b border-editorial-border text-editorial-dark backdrop-blur-md bg-opacity-95">
      {/* Top golden accent bar with metadata context */}
      <div className="bg-editorial-gold h-[2px] w-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Main Title branding from PDF */}
          <div className="text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl font-serif tracking-[0.2em] font-light text-editorial-dark">
              XAVIER CAIVINAGUA <span className="text-editorial-gold font-extralight">|</span> FOTOGRAFÍA DE AUTOR
            </h1>
            <p className="text-[10px] sm:text-xs font-mono tracking-wider text-editorial-muted mt-1 uppercase flex items-center justify-center md:justify-start gap-2">
              <span className="font-light">Ediciones Limitadas con Certificado de Autenticidad</span>
              <span className="text-editorial-gold/40">•</span>
              <span className="text-editorial-dark">Cuenca, Ecuador & New York</span>
            </p>
          </div>

          {/* Quick Stats: Local & International Delivery */}
          <div className="hidden lg:flex items-center gap-6 text-[10px] sm:text-xs text-editorial-muted border-l border-editorial-border pl-6">
            <div className="flex items-center gap-2">
              <Landmark className="w-3.5 h-3.5 text-editorial-gold" />
              <div>
                <p className="font-semibold text-editorial-dark">Cuenca / Ecuador</p>
                <p className="text-editorial-muted">Payphone, Kushki, Banco</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-editorial-gold" />
              <div>
                <p className="font-semibold text-editorial-dark">New York / Intl</p>
                <p className="text-editorial-muted">Stripe, PayPal, DHL/FedEx</p>
              </div>
            </div>
          </div>

          {/* Bottom Controls / Cart and Mobile Toggle */}
          <div className="flex items-center justify-between md:justify-end gap-4 border-t border-editorial-border pt-3 md:pt-0 md:border-0">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-editorial-dark hover:text-editorial-gold focus:outline-none cursor-pointer"
              id="mobile-menu-toggle-btn"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onCartOpen}
              className="relative p-2.5 bg-editorial-dark border border-editorial-dark hover:bg-neutral-800 text-editorial-bg rounded-none transition-all duration-300 flex items-center justify-center cursor-pointer"
              title="Ver Carrito de Compras"
              id="navbar-cart-btn"
            >
              <ShoppingBag className="w-5 h-5 text-editorial-bg" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-editorial-gold text-white font-bold text-xs w-5 h-5 rounded-none flex items-center justify-center shadow-lg font-mono"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Desktop Navigation Row aligns perfectly with PDF menu options */}
        <nav className="hidden md:flex items-center justify-center gap-1 mt-6 border-t border-editorial-border pt-4 text-xs font-mono tracking-widest text-[#cfd3db]">
          {navItems.map((item, index) => (
            <div key={item.value} className="flex items-center">
              <button
                onClick={() => handleNavItemClick(item.value)}
                className={`px-4 py-1.5 transition-all text-editorial-muted hover:text-editorial-dark relative font-medium group cursor-pointer ${
                  (activeCategory === item.value || (item.value === 'about' && activeCategory === 'about_section'))
                    ? 'text-editorial-dark font-semibold'
                    : ''
                }`}
              >
                {item.label}
                {(activeCategory === item.value) && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-editorial-gold"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
              {index < navItems.length - 1 && (
                <span className="text-editorial-border select-none">|</span>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-editorial-border text-sm font-mono tracking-widest"
          >
            <div className="px-4 py-3 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => handleNavItemClick(item.value)}
                  className={`block w-full text-left py-2.5 px-3 rounded-none transition duration-250 cursor-pointer ${
                    activeCategory === item.value
                      ? 'bg-editorial-bg text-editorial-gold font-bold border-l-2 border-editorial-gold'
                      : 'text-editorial-muted hover:bg-editorial-bg hover:text-editorial-dark'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
