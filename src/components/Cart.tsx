/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { X, Trash2, ShoppingBag, Eye, ShieldCheck, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, newQty: number) => void;
  onCheckout: () => void;
}

export default function Cart({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onUpdateQuantity,
  onCheckout
}: CartProps) {
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.selectedOption.totalCost * item.quantity,
    0
  );

  return (
    <>
      {/* Backdrop overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-[#1A1A1A]/40 backdrop-blur-xs"
          />
        )}
      </AnimatePresence>

      {/* Slide-over Panel drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-[#FBFBFA] border-l border-editorial-border text-editorial-dark shadow-2xl flex flex-col justify-between"
            id="shopping-cart-drawer"
          >
            {/* Header */}
            <div className="p-5 border-b border-editorial-border flex items-center justify-between bg-white">
              <div className="flex items-center gap-2 text-editorial-dark font-serif text-sm font-semibold tracking-wider">
                <ShoppingBag className="w-5 h-5 text-editorial-gold" />
                <span>MI CURADURÍA ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})</span>
              </div>
              <button
                onClick={onClose}
                className="p-1 px-2 border border-editorial-border rounded-none bg-white text-editorial-dark hover:bg-neutral-100 transition cursor-pointer"
                id="cart-drawer-close-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List of elements */}
            <div className="flex-grow overflow-y-auto p-5 space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-20 text-editorial-muted space-y-4 font-mono text-xs">
                  <ShoppingBag className="w-12 h-12 text-neutral-300 mx-auto" />
                  <p className="tracking-widest font-sans font-light">AÚN NO HAY PIEZAS SELECCIONADAS</p>
                  <button
                    onClick={onClose}
                    className="text-editorial-gold border border-editorial-gold/30 rounded-none px-5 py-2.5 hover:bg-editorial-dark hover:text-white transition mt-2 font-medium font-sans cursor-pointer text-xs uppercase tracking-widest"
                  >
                    Explorar Obras Curadas
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 bg-white border border-editorial-border rounded-none flex gap-3 items-start relative group shadow-xs"
                    id={`cart-item-${item.id}`}
                  >
                    {/* Img thumbnail */}
                    <div className="w-20 aspect-square overflow-hidden rounded-none bg-neutral-100 border border-editorial-border p-1 shrink-0">
                      <img
                        src={item.photo.imagePath}
                        alt={item.photo.title}
                        className="w-full h-full object-cover rounded-none"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Meta */}
                    <div className="flex-grow space-y-1">
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="text-xs font-serif font-bold text-editorial-dark line-clamp-1">
                          {item.photo.title}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-editorial-muted hover:text-red-600 p-0.5 transition cursor-pointer"
                          title="Remover de la selección"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="font-mono text-[9px] text-[#aeaeae] mt-0.5">
                        {item.selectedOption.name}
                      </p>

                      <p className="text-[9px] text-editorial-muted leading-relaxed font-mono">
                        {item.selectedOption.dimensions}
                      </p>

                      <div className="flex items-center justify-between pt-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-editorial-border bg-editorial-bg rounded-none">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="px-2.5 py-1 text-sm text-editorial-dark hover:bg-neutral-100 border-r border-editorial-border select-none transition cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 font-mono text-xs text-editorial-dark bg-white font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="px-2.5 py-1 text-sm text-editorial-dark hover:bg-neutral-100 border-l border-editorial-border select-none transition cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        {/* Cost */}
                        <div className="text-right">
                          <span className="font-mono text-xs text-editorial-dark font-bold">
                            ${item.selectedOption.totalCost * item.quantity}.00
                          </span>
                          <span className="block text-[7px] text-editorial-muted font-mono leading-none">USD</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Summary & Checkout */}
            {cartItems.length > 0 && (
              <div className="p-5 border-t border-editorial-border bg-white space-y-4 shadow-md">
                <div className="space-y-2 text-xs font-mono text-editorial-muted">
                  <div className="flex justify-between">
                    <span>Subtotal de Licencias:</span>
                    <span className="text-editorial-dark">${cartItems.reduce((acc, i) => acc + (25 * i.quantity), 0)}.00 USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Laboratorio & Impresión:</span>
                    <span className="text-editorial-dark">${cartItems.reduce((acc, i) => acc + (i.selectedOption.costPrint * i.quantity), 0)}.00 USD</span>
                  </div>
                  {/* Delivery details from PDF */}
                  <div className="flex justify-between">
                    <span>Certificados de Autenticidad:</span>
                    <span className="text-editorial-gold font-bold">INCLUIDOS (Gratis)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Envío Garantizado (DHL/FedEx):</span>
                    <span className="text-neutral-400">Calculado en checkout</span>
                  </div>
                  
                  <div className="border-t border-editorial-border pt-3 flex justify-between items-end font-sans">
                    <span className="text-sm font-semibold text-editorial-dark font-serif">Total General:</span>
                    <div className="text-right">
                      <span className="font-mono text-xl font-bold text-editorial-dark">${subtotal}.00</span>
                      <span className="text-[9px] text-editorial-muted ml-1 font-mono">USD</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={onCheckout}
                    className="w-full bg-editorial-dark hover:bg-neutral-800 text-white font-medium py-3.5 px-4 rounded-none transition duration-250 flex items-center justify-center gap-2 text-xs uppercase tracking-widest shadow-xs cursor-pointer"
                    id="cart-checkout-cta"
                  >
                    <CreditCard className="w-4 h-4 text-editorial-gold" />
                    <span>Iniciar Compra Segura</span>
                  </button>
                  <p className="text-[9px] text-editorial-muted text-center flex items-center justify-center gap-1.5 leading-relaxed font-sans font-light">
                    <ShieldCheck className="w-3.5 h-3.5 text-editorial-gold" />
                    <span>Conexión cifrada de alta seguridad 256 bits</span>
                  </p>
                </div>
              </div>
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
