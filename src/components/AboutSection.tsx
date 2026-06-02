/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShieldCheck, Truck, Award, Palette, CheckCircle2, QrCode } from 'lucide-react';
import { motion } from 'motion/react';

export default function AboutSection() {
  return (
    <section className="bg-[#FBFBFA] py-24 px-4 sm:px-6 lg:px-8 border-t border-editorial-border text-editorial-dark">
      <div className="max-w-7xl mx-auto">
        
        {/* Author Portrait & Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-5 relative">
            <div className="absolute top-4 left-4 -inset-0 border border-editorial-gold/30 pointer-events-none -z-1" />
            <div className="relative bg-white p-4 rounded-none border border-editorial-border shadow-sm">
              <img
                src="https://picsum.photos/seed/galof/600/800?grayscale"
                alt="Xavier Caivinagua. Retrato de Autor"
                className="w-full aspect-[4/5] object-cover rounded-none"
                referrerPolicy="no-referrer"
                id="artist-avatar-img"
              />
              <div className="absolute bottom-6 left-6 right-6 bg-editorial-dark text-[#F8F7F2] p-5 rounded-none border border-editorial-border shadow-xl">
                <p className="font-serif italic text-sm text-editorial-gold">"La luz andina posee una melancolía mística, mientras que Nueva York emana una geometría eléctrica. Mi obra es el puente entre estas dos realidades."</p>
                <p className="font-mono text-[10px] tracking-widest text-neutral-400 mt-2 text-right">— XAVIER CAIVINAGUA</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-xs tracking-[0.2em] text-editorial-gold font-semibold block">SOBRE EL AUTOR</span>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-editorial-dark mb-4 font-normal">
              Fotografía Artística de Autor Diseñada para Espacios con Alma
            </h2>
            <p className="text-editorial-muted leading-relaxed text-base font-light font-sans">
              Xavier Caivinagua es un renombrado artista visual ecuatoriano con una trayectoria consolidada entre las cumbres coloniales de <strong className="text-editorial-dark font-medium">Cuenca, Ecuador</strong> y la verticalidad indomable de <strong className="text-editorial-dark font-medium">Nueva York</strong>. Su propuesta está diseñada exclusivamente para la venta de fotografía artística de autor orientada al diseño y decoración de interiores.
            </p>
            <p className="text-editorial-muted leading-relaxed text-base font-light font-sans">
              Cada imagen que compone el catálogo es el resultado de años de curaduría minuciosa, esperando el momento exacto donde la luz moldea la arquitectura y la naturaleza. Al adquirir una pieza, usted no solo adquiere un elemento decorativo de gran valor estético, sino un testimonio numerado y firmado de colección que aporta confort visual y profundidad a salones de hoteles, oficinas de lujo y residencias modernas de alta gama.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-editorial-border">
              <div className="flex items-start gap-4">
                <span className="p-1 px-3 bg-editorial-dark text-white rounded-none text-[10px] font-mono whitespace-nowrap">Cuenca</span>
                <p className="text-xs text-editorial-muted leading-relaxed font-light font-sans">Laboratorio Fine Art de nivel óptimo y entrega rápida local asegurada con empaque rígido.</p>
              </div>
              <div className="flex items-start gap-4">
                <span className="p-1 px-3 bg-editorial-dark text-white rounded-none text-[10px] font-mono whitespace-nowrap">New York</span>
                <p className="text-xs text-editorial-muted leading-relaxed font-light font-sans">Formatos Fine Art certificados para proyectos de interiorismo de alto nivel de conservación museística.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Trust Pillars Section (Certificate & Shipping) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 pt-12 border-t border-editorial-border">
          
          {/* Certificate */}
          <div className="bg-white p-8 rounded-none border border-editorial-border relative group hover:border-editorial-dark transition-all">
            <div className="w-12 h-12 rounded-none bg-editorial-dark/5 flex items-center justify-center text-editorial-gold mb-6">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-normal text-editorial-dark mb-2">Certificado de Autenticidad</h3>
            <p className="text-xs text-editorial-muted leading-relaxed mb-4 font-sans font-light">
              Cada compra va acompañada de un documento legal de autoría numerado que garantiza la exclusividad e incluye:
            </p>
            <ul className="space-y-2 text-xs text-editorial-dark font-sans font-light">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-editorial-gold" /> Firma del autor (digital u holograma físico)</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-editorial-gold" /> Título de la obra, fecha de captura y serie técnica</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-editorial-gold" /> Sello holográfico (físico) o hash de seguridad (digital)</li>
            </ul>
          </div>

          {/* Museum Quality */}
          <div className="bg-white p-8 rounded-none border border-editorial-border relative group hover:border-editorial-dark transition-all">
            <div className="w-12 h-12 rounded-none bg-editorial-dark/5 flex items-center justify-center text-editorial-gold mb-6">
              <Palette className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-normal text-editorial-dark mb-2">Impresión de Conservación (Fine Art)</h3>
            <p className="text-xs text-editorial-muted leading-relaxed mb-4 font-sans font-light">
              Trabajamos con laboratorios especializados de alta gama en Cuenca y Nueva York utilizando papeles alemanes de prestigiosa calidad internacional:
            </p>
            <ul className="space-y-2 text-xs text-editorial-dark font-sans font-light">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-editorial-gold" /> Papel Mate de alto gramaje para ambientes acogedores/cálidos</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-editorial-gold" /> Papel Fine Art Ph neutro para conservación permanente</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-editorial-gold" /> Bastidores de madera sólida para formatos en Canvas modernos</li>
            </ul>
          </div>

          {/* Logistics & Delivery */}
          <div className="bg-white p-8 rounded-none border border-editorial-border relative group hover:border-editorial-dark transition-all">
            <div className="w-12 h-12 rounded-none bg-editorial-dark/5 flex items-center justify-center text-editorial-gold mb-6">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-serif font-normal text-editorial-dark mb-2">Logística Segura & Descargas</h3>
            <p className="text-xs text-editorial-muted leading-relaxed mb-4 font-sans font-light">
              Opciones de despacho flexibles diseñadas para la máxima conveniencia tanto local como internacional:
            </p>
            <ul className="space-y-2 text-xs text-editorial-dark font-sans font-light">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-editorial-gold" /> Licencia digital: Archivos TIFF / JPEG al instante por correo</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-editorial-gold" /> Obras físicas: Envíos asegurados y protegidos con DHL o FedEx</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-editorial-gold" /> Marcos y soportes listos para instalarse en sus salones</li>
            </ul>
          </div>

        </div>

        {/* Certificate Preview Interactive Widget */}
        <div className="bg-editorial-bg p-6 sm:p-10 rounded-none border border-editorial-border relative overflow-hidden flex flex-col md:flex-row gap-8 items-center justify-between">
          <div className="absolute top-0 right-0 w-80 h-80 bg-editorial-gold/5 rounded-full filter blur-3xl pointer-events-none" />
          
          <div className="max-w-2xl font-sans">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-editorial-dark text-white rounded-none font-mono text-[10px] uppercase font-bold tracking-widest mb-3">
              <ShieldCheck className="w-3.5 h-3.5 text-editorial-gold" /> Certificación Oficial Firmada
            </span>
            <h4 className="text-xl font-serif text-editorial-dark mb-2 font-normal">Documento de Valor Legal para Coleccionistas</h4>
            <p className="text-editorial-muted text-xs sm:text-sm leading-relaxed font-light">
              Cada edición impresa cuenta con un sello holográfico exclusivo que contiene un código numérico y un QR vinculando la obra a los metadatos de toma almacenados de manera inalterable. Las ediciones digitales cuentan con una firma firmemente encriptada mediante hash SHA-256 en formato PDF.
            </p>
          </div>

          {/* Miniature abstract representation of the Certificate certificate */}
          <div className="bg-[#fcfcfa] text-[#1a1a1a] rounded-none p-5 w-full max-w-xs border border-editorial-border shadow-md font-mono text-[9px] relative">
            <div className="border border-[#e1e0db] p-3 h-full relative">
              <div className="text-center font-serif text-[11px] tracking-wide border-b border-[#e1e0db] pb-1.5 mb-2 font-bold uppercase text-[#1a1a1a]">
                Certificado de Autenticidad
              </div>
              <div className="space-y-1 text-[#444] font-sans font-light">
                <p><span className="font-mono text-[8px] font-semibold text-[#1a1a1a]">AUTOR:</span> XAVIER CAIVINAGUA</p>
                <p><span className="font-mono text-[8px] font-semibold text-[#1a1a1a]">TÍTULO:</span> El guardián del páramo</p>
                <p><span className="font-mono text-[8px] font-semibold text-[#1a1a1a]">FECHA DE CAPTURA:</span> 12.04.2025</p>
                <p><span className="font-mono text-[8px] font-semibold text-[#1a1a1a]">EDICIÓN LIMITADA:</span> N° 03 / 50</p>
                <p><span className="font-mono text-[8px] font-semibold text-[#1a1a1a]">SOPORTE:</span> Papel Fine Art de Conservación</p>
              </div>
              
              <div className="flex justify-between items-end mt-4 pt-2 border-t border-[#e1e0db]">
                <div>
                  <div className="font-serif italic text-neutral-600 text-[10px] transform rotate-[-2deg]">Xavier Caivinagua</div>
                  <div className="text-[7px] text-neutral-500 uppercase mt-1">Firma del Autor</div>
                </div>
                {/* Simulated cryptographic sticker */}
                <div className="border border-editorial-gold/35 p-1 rounded-none bg-editorial-bg text-editorial-dark font-sans text-center text-[7px] select-none scale-90">
                  <QrCode className="w-4 h-4 mx-auto text-editorial-gold animate-pulse mb-0.5" />
                  <span className="font-mono text-[6px] tracking-tight">HASH GR-0350</span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
