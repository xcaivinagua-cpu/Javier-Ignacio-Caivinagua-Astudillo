/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { X, ShieldCheck, CreditCard, Landmark, Check, Download, AlertCircle, ShoppingBag, FileText, UploadCloud, ChevronRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, ChangeEvent } from 'react';
import { CartItem, PaymentMethod } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onClearCart: () => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  cartItems,
  onClearCart
}: CheckoutModalProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'payment' | 'completed'>('details');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('stripe');

  // Customer State Form
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('Ecuador');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');

  // Local wire transfer states
  const [bankSlipUploaded, setBankSlipUploaded] = useState(false);
  const [bankSlipName, setBankSlipName] = useState('');

  // Payment mock states
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Order Details
  const orderNumber = 'GF-E' + Math.floor(100000 + Math.random() * 900000);
  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.selectedOption.totalCost * item.quantity,
    0
  );

  // Address preset default toggle to make US customer flow easy
  const handleCountryChange = (val: string) => {
    setCountry(val);
    if (val === 'United States') {
      setPaymentMethod('stripe'); // default to international
    } else {
      setPaymentMethod('payphone'); // default to local Ecuador gateways
    }
  };

  const handleNextStep = () => {
    if (!fullName || !email || !phone || !city) {
      setValidationError('Por favor completa todos los campos requeridos (*).');
      return;
    }
    setValidationError('');
    setActiveTab('payment');
  };

  const handleMockSubmitPayment = () => {
    if (paymentMethod === 'stripe' || paymentMethod === 'payphone' || paymentMethod === 'kushki') {
      if (cardNumber.length < 15 || cardExpiry.length < 4 || cardCVC.length < 3) {
        setValidationError('Por favor ingresa datos de tarjeta válidos.');
        return;
      }
    }
    if (paymentMethod === 'transferencia' && !bankSlipUploaded) {
      setValidationError('Por favor sube tu comprobante de transferencia bancaria.');
      return;
    }

    setValidationError('');
    setIsProcessing(true);

    // Elegant payment spinner
    setTimeout(() => {
      setIsProcessing(false);
      setActiveTab('completed');
    }, 1800);
  };

  const simulateDragAndDropUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBankSlipUploaded(true);
      setBankSlipName(e.target.files[0].name);
    }
  };

  const triggerDownloadMockResource = (filename: string, contentStr: string) => {
    const element = document.createElement('a');
    const file = new Blob([contentStr], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1A1A]/95 backdrop-blur-sm overflow-y-auto">
          {/* Backdrop */}
          <div className="absolute inset-0" onClick={activeTab !== 'completed' ? onClose : undefined} />

          {/* Checkout Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            className="relative bg-[#FBFBFA] border border-editorial-border rounded-none w-full max-w-4xl shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row my-8 text-editorial-dark"
            id="checkout-wizard-container"
          >
            {/* Top Close icon (only before completion) */}
            {activeTab !== 'completed' && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 p-2 bg-white border border-editorial-border rounded-none text-editorial-dark hover:bg-neutral-100 transition duration-200 cursor-pointer"
                id="checkout-close-btn"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Left side: Order Review summary list */}
            <div className="w-full md:w-2/5 bg-white p-6 md:p-8 border-b md:border-b-0 md:border-r border-editorial-border flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-6 text-editorial-dark font-serif text-sm font-semibold tracking-wider">
                  <ShoppingBag className="w-4 h-4 text-editorial-gold" />
                  <span>RESUMEN DEL PEDIDO</span>
                </div>

                <div className="divide-y divide-editorial-border max-h-[250px] overflow-y-auto pr-2 space-y-3 pb-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3 pt-3 first:pt-0">
                      <img
                        src={item.photo.imagePath}
                        alt={item.photo.title}
                        className="w-12 h-12 rounded-none object-cover border border-editorial-border shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0 flex-grow font-sans text-left">
                        <p className="text-xs font-bold text-editorial-dark truncate font-serif">{item.photo.title}</p>
                        <p className="text-[10px] text-editorial-muted mt-0.5 truncate font-mono">{item.selectedOption.name}</p>
                        <p className="text-[9px] text-neutral-400 mt-0.5 font-mono">Cant: {item.quantity} &times; ${item.selectedOption.totalCost}.00</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price calculations breakdown */}
              <div className="border-t border-editorial-border pt-6 mt-6 space-y-2 font-mono text-xs text-editorial-muted">
                <div className="flex justify-between">
                  <span>Base de Autor:</span>
                  <span className="text-editorial-dark">${cartItems.reduce((acc, i) => acc + (25 * i.quantity), 0)}.00 USD</span>
                </div>
                <div className="flex justify-between">
                  <span>Soporte e Impresión:</span>
                  <span className="text-editorial-dark">${cartItems.reduce((acc, i) => acc + (i.selectedOption.costPrint * i.quantity), 0)}.00 USD</span>
                </div>
                <div className="flex justify-between">
                  <span>Certificación:</span>
                  <span className="text-editorial-gold font-bold">Incluida (Auto-Firmado)</span>
                </div>
                <div className="flex justify-between border-b border-editorial-border pb-3">
                  <span>Envío Seguro (DHL/FEDEX):</span>
                  <span className="text-editorial-dark">
                    {cartItems.every(i => i.selectedOption.isDigital) ? 'Por Correo ($0.00)' : 'Gratuito (Promoción)'}
                  </span>
                </div>
                <div className="flex justify-between items-end pt-3 font-sans">
                  <span className="text-sm text-editorial-dark font-serif font-semibold">Total Final USD:</span>
                  <div className="text-right">
                    <span className="text-xl font-bold text-editorial-dark font-mono">${totalAmount}.00</span>
                    <span className="block text-[8px] text-editorial-muted font-mono mt-0.5 leading-none">Monto Neto Libre de Impuestos</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right side: Multi-step checkout form flow */}
            <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col justify-between">
              
              {/* Step indicator breadcrumbs */}
              {activeTab !== 'completed' && (
                <div className="flex items-center gap-4 mb-8 font-mono text-[9px] uppercase tracking-widest text-editorial-muted border-b border-editorial-border pb-4">
                  <span className={`${activeTab === 'details' ? 'text-editorial-gold font-bold' : 'text-neutral-400'}`}>
                    1. Envío y Facturación
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-editorial-border" />
                  <span className={`${activeTab === 'payment' ? 'text-editorial-gold font-bold' : 'text-neutral-400'}`}>
                    2. Pago Seguro
                  </span>
                </div>
              )}

              {/* Step 1: Client Fields */}
              {activeTab === 'details' && (
                <div className="space-y-4">
                  <h3 className="text-base font-serif font-normal text-editorial-dark text-left">Detalles del Coleccionista</h3>
                  
                  {validationError && (
                    <div className="p-3 bg-red-500/5 border border-red-500/20 rounded-none text-red-600 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{validationError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1 text-left">
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-[#888]">Nombre Completo *</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Ej: Sofía Martínez"
                        className="w-full bg-white border border-editorial-border rounded-none p-2.5 text-xs text-editorial-dark focus:outline-none focus:border-editorial-dark transition font-mono"
                      />
                    </div>
                    
                    <div className="space-y-1 text-left">
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-[#888]">Correo Electrónico *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="sofia@ejemplo.com"
                        className="w-full bg-white border border-editorial-border rounded-none p-2.5 text-xs text-editorial-dark focus:outline-none focus:border-editorial-dark transition font-mono"
                      />
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-[#888]">Teléfono Móvil *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+593 999 999 99"
                        className="w-full bg-white border border-editorial-border rounded-none p-2.5 text-xs text-editorial-dark focus:outline-none focus:border-editorial-dark transition font-mono"
                      />
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-[#888]">Destino de Entrega *</label>
                      <select
                        value={country}
                        onChange={(e) => handleCountryChange(e.target.value)}
                        className="w-full bg-white border border-editorial-border rounded-none p-2.5 text-xs text-editorial-dark focus:outline-none focus:border-editorial-dark transition font-mono"
                      >
                        <option value="Ecuador">Ecuador (Cuenca / Local)</option>
                        <option value="United States">United States (New York / Intl)</option>
                        <option value="Internacional">Otro Destino Internacional</option>
                      </select>
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-[#888]">Ciudad de Destino *</label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Ej: Cuenca, New York, Quito"
                        className="w-full bg-white border border-editorial-border rounded-none p-2.5 text-xs text-editorial-dark focus:outline-none focus:border-editorial-dark transition font-mono"
                      />
                    </div>

                    <div className="space-y-1 text-left">
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-[#888]">Código Postal o ZIP</label>
                      <input
                        type="text"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        placeholder="Ej: 010150 o NY 10001"
                        className="w-full bg-white border border-editorial-border rounded-none p-2.5 text-xs text-editorial-dark focus:outline-none focus:border-editorial-dark transition font-mono"
                      />
                    </div>

                    <div className="space-y-1 col-span-1 sm:col-span-2 text-left">
                      <label className="block text-[10px] font-mono uppercase tracking-widest text-[#888]">Dirección Física de Envío (Para obras impresas)</label>
                      <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Ej: Av. Solano 5-12 y Remo, Edificio El Retiro Dpto 3B"
                        className="w-full bg-white border border-editorial-border rounded-none p-2.5 text-xs text-editorial-dark focus:outline-none focus:border-editorial-dark transition font-mono"
                      />
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={handleNextStep}
                      className="w-full bg-editorial-dark hover:bg-neutral-800 text-white font-medium py-3.5 px-6 rounded-none transition duration-250 flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-mono shadow-xs cursor-pointer"
                    >
                      <span>2. Seleccionar Método de Pago</span>
                      <ChevronRight className="w-4 h-4 text-editorial-gold" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Payment Selector and Gateway mock inputs */}
              {activeTab === 'payment' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-serif font-normal text-editorial-dark text-left">Método de Pago Seguro</h3>
                    <button
                      onClick={() => setActiveTab('details')}
                      className="text-[10px] font-mono text-editorial-gold hover:underline cursor-pointer"
                    >
                      &larr; Volver a datos
                    </button>
                  </div>

                  {validationError && (
                    <div className="p-3 bg-red-500/5 border border-red-500/20 rounded-none text-red-600 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{validationError}</span>
                    </div>
                  )}

                  {/* Payment Methods switcher based on geography from PDF */}
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    {country === 'Ecuador' ? (
                      <>
                        <button
                          onClick={() => { setPaymentMethod('payphone'); setValidationError(''); }}
                          className={`p-3.5 border rounded-none text-left transition flex flex-col justify-between h-20 cursor-pointer ${
                            paymentMethod === 'payphone' ? 'bg-editorial-gold/5 border-editorial-dark' : 'bg-white border-editorial-border text-editorial-muted hover:border-editorial-dark'
                          }`}
                        >
                          <span className="font-bold text-editorial-dark block">PayPhone / Kushki</span>
                          <span className="text-[9px] text-[#888] mt-1 font-sans">Tarjetas de crédito nacionales</span>
                        </button>

                        <button
                          onClick={() => { setPaymentMethod('transferencia'); setValidationError(''); }}
                          className={`p-3.5 border rounded-none text-left transition flex flex-col justify-between h-20 cursor-pointer ${
                            paymentMethod === 'transferencia' ? 'bg-editorial-gold/5 border-editorial-dark' : 'bg-white border-editorial-border text-editorial-muted hover:border-editorial-dark'
                          }`}
                        >
                          <span className="font-bold text-editorial-dark block">Direct Wire</span>
                          <span className="text-[9px] text-[#888] mt-1 font-sans">Transferencia Banco Pichincha</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => { setPaymentMethod('stripe'); setValidationError(''); }}
                          className={`p-3.5 border rounded-none text-left transition flex flex-col justify-between h-20 cursor-pointer ${
                            paymentMethod === 'stripe' ? 'bg-editorial-gold/5 border-editorial-dark' : 'bg-white border-editorial-border text-editorial-muted hover:border-editorial-dark'
                          }`}
                        >
                          <span className="font-bold text-editorial-dark block">Stripe / Card</span>
                          <span className="text-[9px] text-[#888] mt-1 font-sans">International Credit Cards</span>
                        </button>

                        <button
                          onClick={() => { setPaymentMethod('paypal'); setValidationError(''); }}
                          className={`p-3.5 border rounded-none text-left transition flex flex-col justify-between h-20 cursor-pointer ${
                            paymentMethod === 'paypal' ? 'bg-editorial-gold/5 border-editorial-dark' : 'bg-white border-editorial-border text-editorial-muted hover:border-editorial-dark'
                          }`}
                        >
                          <span className="font-bold text-editorial-dark block">PayPal</span>
                          <span className="text-[9px] text-[#888] mt-1 font-sans">Express fast checkout</span>
                        </button>
                      </>
                    )}
                  </div>

                  {/* Render Stripe or PayPhone Form Inputs */}
                  {(paymentMethod === 'stripe' || paymentMethod === 'payphone' || paymentMethod === 'kushki') && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-[#FBFBFA]/50 border border-editorial-border rounded-none space-y-4"
                    >
                      <div className="flex items-center justify-between text-[10px] text-editorial-dark font-mono">
                        <span className="flex items-center gap-1 font-semibold">
                          <CreditCard className="w-3.5 h-3.5 text-editorial-gold" /> Tarjeta de Crédito Segura
                        </span>
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" /> 256-Bit SSL Cifrado
                        </span>
                      </div>

                      <div className="space-y-3">
                        <div className="space-y-1 text-left">
                          <label className="block text-[9px] font-mono uppercase tracking-widest text-editorial-muted">Número de la Tarjeta</label>
                          <input
                            type="text"
                            maxLength={16}
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
                            placeholder="4000 1234 5678 9010"
                            className="w-full bg-white border border-editorial-border rounded-none p-2 text-xs text-editorial-dark focus:outline-none focus:border-editorial-dark font-mono"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1 text-left">
                            <label className="block text-[9px] font-mono uppercase tracking-widest text-editorial-muted">Vencimiento (MM/AA)</label>
                            <input
                              type="text"
                              maxLength={4}
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value.replace(/\D/g, ''))}
                              placeholder="1228"
                              className="w-full bg-white border border-editorial-border rounded-none p-2 text-xs text-editorial-dark focus:outline-none focus:border-editorial-dark font-mono text-center"
                            />
                          </div>

                          <div className="space-y-1 text-left">
                            <label className="block text-[9px] font-mono uppercase tracking-widest text-editorial-muted">CVC / Código</label>
                            <input
                              type="password"
                              maxLength={3}
                              value={cardCVC}
                              onChange={(e) => setCardCVC(e.target.value.replace(/\D/g, ''))}
                              placeholder="***"
                              className="w-full bg-white border border-editorial-border rounded-none p-2 text-xs text-editorial-dark focus:outline-none focus:border-editorial-dark font-mono text-center"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Render Local Ecuador Wire Transfer Details Form */}
                  {paymentMethod === 'transferencia' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-[#FBFBFA]/50 border border-editorial-border rounded-none space-y-4"
                    >
                      <div className="flex items-center gap-1.5 text-[10px] text-editorial-dark font-mono font-semibold">
                        <Landmark className="w-3.5 h-3.5 text-editorial-gold" />
                        <span>Datos para Transferencia Bancaria Directa (Ecuador)</span>
                      </div>

                      <div className="p-3 bg-white border border-editorial-border rounded-none font-mono text-[10.5px] space-y-1 text-editorial-dark text-left">
                        <p><strong className="text-neutral-500 font-normal">Banco:</strong> Banco Pichincha (Cuenta Corriente)</p>
                        <p><strong className="text-neutral-500 font-normal">N° Cuenta:</strong> 210084323</p>
                        <p><strong className="text-neutral-500 font-normal">Beneficiario:</strong> Xavier Caivinagua Photography S.A.S</p>
                        <p><strong className="text-neutral-500 font-normal">RUC:</strong> 0104693845001</p>
                        <p><strong className="text-neutral-500 font-normal">Correo:</strong> caivinagua.fineart@gmail.com</p>
                      </div>

                      {/* Photo upload block */}
                      <div className="space-y-1 text-left">
                        <label className="block text-[9px] font-mono uppercase tracking-widest text-editorial-muted">Respaldo / Comprobante de Pago *</label>
                        <div className="border border-dashed border-editorial-border bg-white hover:bg-neutral-50/50 rounded-none p-4 transition text-center relative pointer-events-auto cursor-pointer">
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={simulateDragAndDropUpload}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                          <UploadCloud className="w-6 h-6 mx-auto text-editorial-gold mb-2" />
                          <p className="font-mono text-[10px] text-editorial-dark font-semibold">
                            {bankSlipUploaded ? `✓ ${bankSlipName}` : 'Sube foto o PDF del comprobante Banco Pichincha'}
                          </p>
                          <p className="text-[8px] text-editorial-muted font-mono mt-0.5">Formatos: PNG, JPG, PDF hasta 10MB</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* PayPal representation */}
                  {paymentMethod === 'paypal' && (
                    <div className="p-6 bg-white border border-editorial-border rounded-none text-center font-mono space-y-3">
                      <div className="text-[#003087] font-bold italic text-lg tracking-wider font-serif">PayPal <span className="text-[#0079C1] font-sans">Checkout</span></div>
                      <p className="text-[10px] text-editorial-muted leading-relaxed max-w-sm mx-auto font-sans">
                        Al presionar "Procesar", se abrirá una pasarela segura de PayPal para autorizar los <strong className="text-editorial-dark">${totalAmount}.00 USD</strong> utilizando tu saldo o tarjetas internacionales asociadas.
                      </p>
                    </div>
                  )}

                  <div className="pt-4">
                    <button
                      onClick={handleMockSubmitPayment}
                      disabled={isProcessing}
                      className="w-full bg-editorial-dark hover:bg-neutral-800 text-white font-medium py-3.5 px-6 rounded-none transition duration-250 flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-mono shadow-xs disabled:opacity-50 cursor-pointer"
                      id="process-payment-btn"
                    >
                      <ShieldCheck className="w-4 h-4 text-editorial-gold shrink-0" />
                      <span>{isProcessing ? 'Procesando Transacción Segura...' : `Confirmar y Registrar Pedido por $${totalAmount}.00 USD`}</span>
                    </button>
                    <p className="text-editorial-muted text-[8px] text-center font-mono mt-2 uppercase tracking-wide">
                      La autorización del pago se procesa con servidores TLS bancarios homologados.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 3: Success Screen with Certificate & Download Links */}
              {activeTab === 'completed' && (
                <div className="space-y-6 text-center">
                  <div className="mx-auto w-14 h-14 bg-emerald-500/5 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-700 mb-4 animate-pulse">
                    <Check className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-editorial-dark px-2.5 py-1 bg-white rounded-none border border-editorial-border">
                      Pedido {orderNumber} Procesado con Éxito
                    </span>
                    <h3 className="text-2xl font-serif text-editorial-dark font-normal tracking-tight pt-2">
                      ¡Gracias por apoyar el Arte de Autor!
                    </h3>
                    <p className="text-xs text-editorial-muted max-w-sm mx-auto leading-relaxed font-sans font-light">
                      El pago ha sido validado correctamente. Hemos enviado un correo detallado a <strong className="text-editorial-dark">{email}</strong> con su factura fiscal y sus credenciales de certificación permanente.
                    </p>
                  </div>

                  {/* Render Instant Downloads generated resources */}
                  <div className="p-4 bg-[#FBFBFA]/80 border border-editorial-border rounded-none space-y-3.5 text-left">
                    <p className="font-mono text-[9px] text-[#888] uppercase tracking-widest font-semibold">Enlaces de Descarga Inmediata y Certificación</p>
                    
                    <div className="space-y-2.5">
                      {cartItems.map((item, idx) => {
                        const codeString = `--- CERTIFICADO RECURSIVO ORIGINAL ---\nNúmero de Registro: ${orderNumber}-${idx}\nAutor: Xavier Caivinagua\nTítulo de la Obra: ${item.photo.title}\nColección: ${item.photo.collectionId}\nResolución: 12000px X 9000px (400 DPI)\nHASH CRIPTOGRÁFICO: SHA-256-${Math.random().toString(36).substring(2, 10).toUpperCase()}\nSoporte Adquirido: ${item.selectedOption.name}\n\nEste documento certifica legalmente el origen genuino de la obra e invalida cualquier reproducción autónoma posterior sin sello de Xavier Caivinagua.\nCuenca, Ecuador & New York.`;
                        
                        return (
                          <div key={item.id} className="p-3 bg-white border border-editorial-border rounded-none flex items-center justify-between gap-4 font-mono">
                            <div className="min-w-0 text-left">
                              <p className="text-xs font-bold text-editorial-dark truncate font-serif">{item.photo.title}</p>
                              <p className="text-[9px] text-editorial-muted mt-0.5 italic font-sans">{item.selectedOption.name}</p>
                            </div>
                            
                            <div className="flex gap-2 shrink-0">
                              <button
                                onClick={() => triggerDownloadMockResource(`Certificado-${item.photo.id}.txt`, codeString)}
                                className="p-2 border border-editorial-border hover:border-editorial-dark bg-[#FBFBFA] text-editorial-dark rounded-none transition flex items-center gap-1.5 text-[9px] cursor-pointer"
                                title="Descargar Certificado de Autenticidad Legal en formato cifrado"
                                id={`download-cert-${item.photo.id}`}
                              >
                                <FileText className="w-3.5 h-3.5 text-editorial-gold" />
                                <span className="hidden sm:inline font-sans">Certificado Legal</span>
                              </button>
                              
                              <button
                                onClick={() => triggerDownloadMockResource(`FineArt-AltaResolucion-${item.photo.id}.txt`, `Contenedor original fine-art de Xavier Caivinagua\nTítulo: ${item.photo.title}\nFichero: TIFF / RAW a 400 DPI para impresión FineArt en laboratorios.`)}
                                className="p-2 bg-editorial-dark hover:bg-neutral-800 text-white rounded-none transition flex items-center gap-1.5 text-[9px] font-medium cursor-pointer"
                                title="Descargar archivo TIFF original en ultra-alta resolución de autor"
                                id={`download-raw-${item.photo.id}`}
                              >
                                <Download className="w-3.5 h-3.5 text-editorial-gold" />
                                <span className="hidden sm:inline font-sans font-medium text-white">Descargar TIFF</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Physical shipping logistics warning if there are physical prints */}
                  {cartItems.some(i => !i.selectedOption.isDigital) && (
                    <div className="p-3 bg-editorial-gold/5 border border-editorial-gold/20 rounded-none text-left text-[10px] text-editorial-muted leading-relaxed font-sans font-light flex items-start gap-2.5">
                      <AlertCircle className="w-4 h-4 text-editorial-gold shrink-0 mt-0.5" />
                      <div>
                        <p className="text-editorial-dark font-semibold uppercase text-[9px] tracking-wider font-serif mb-1">Envíos de Obras Físicas a {city}, {country}</p>
                        <p>Hemos notificado a nuestro taller especializado en {country === 'Ecuador' ? 'Cuenca' : 'Nueva York'}. Iniciaremos el ensamble artesanal y empaque Fine Art de conservación. Su código de seguimiento internacional de DHL/FedEx llegará por correo electrónico en un lapso de 24 a 48 horas.</p>
                      </div>
                    </div>
                  )}

                  <div className="pt-4">
                    <button
                      onClick={() => {
                        onClearCart();
                        onClose();
                        setActiveTab('details');
                      }}
                      className="px-6 py-2.5 border border-editorial-border bg-white text-editorial-dark hover:bg-editorial-bg text-xs font-mono rounded-none transition cursor-pointer"
                      id="finish-order-completion-btn"
                    >
                      Volver a la Galería de Obras
                    </button>
                  </div>
                </div>
              )}

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
