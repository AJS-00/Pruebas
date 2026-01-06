
import React, { useState } from 'react';
import { X, Send, Loader2, AlertCircle, Phone, Mail, User } from 'lucide-react';
import { CustomerInfo, CartItem } from '../types';
import { validateEmailAdvanced } from '../services/emailValidationService';
import { WHATSAPP_NUMBER, COUNTRY_CODES } from '../constants';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  total: number;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  total 
}) => {
  const [formData, setFormData] = useState<CustomerInfo>({
    firstName: '',
    lastName: '',
    phonePrefix: '+54',
    phone: '',
    email: '',
    comments: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (!formData.firstName || !formData.lastName || !formData.phone || !formData.email) {
        throw new Error("Por favor completa todos los campos obligatorios.");
      }

      const emailResult = await validateEmailAdvanced(formData.email);
      if (!emailResult.isValid) {
        throw new Error(emailResult.message);
      }

      const productList = cartItems.map(item => 
        `- ${item.name} (${item.category}) x${item.quantity} – $${(item.price * item.quantity).toLocaleString('es-AR')}`
      ).join('\n');

      const fullPhone = `${formData.phonePrefix}${formData.phone.replace(/\s+/g, '')}`;
      const fullName = `${formData.firstName} ${formData.lastName}`;

      const message = `🛒 *Pedido desde la web – Bazar*\n\n` +
                      `👤 *Cliente:*\n` +
                      `Nombre: ${fullName}\n` +
                      `Email: ${formData.email}\n` +
                      `Teléfono: ${fullPhone}\n\n` +
                      `📦 *Productos:*\n` +
                      `${productList}\n\n` +
                      `💰 *Total: $${total.toLocaleString('es-AR')}*\n\n` +
                      `📝 *Comentarios:*\n` +
                      `${formData.comments || 'Sin comentarios.'}`;

      const encodedMessage = encodeURIComponent(message);
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const waUrl = isMobile 
        ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
        : `https://web.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodedMessage}`;

      window.open(waUrl, '_blank');
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-0 md:p-4">
      <div className="absolute inset-0 bg-indigo-950/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white w-full h-full md:h-auto md:max-w-2xl md:rounded-[2.5rem] shadow-2xl overflow-y-auto animate-zoom-in">
        <div className="sticky top-0 bg-white/80 backdrop-blur-xl z-10 p-6 md:p-8 flex justify-between items-center border-b border-gray-50">
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">Datos del Pedido</h2>
            <p className="text-gray-500 text-sm mt-1">Completa los campos para procesar tu compra</p>
          </div>
          <button onClick={onClose} className="p-3 hover:bg-gray-100 rounded-2xl transition-all">
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
          {/* Nombres */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                <User size={14} className="text-indigo-500" /> Nombre *
              </label>
              <input 
                type="text"
                required
                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:bg-white focus:border-indigo-300 outline-none transition-all font-semibold text-gray-800"
                placeholder="Ej: Juan"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                <User size={14} className="text-indigo-500" /> Apellido *
              </label>
              <input 
                type="text"
                required
                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:bg-white focus:border-indigo-300 outline-none transition-all font-semibold text-gray-800"
                placeholder="Ej: Pérez"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
            </div>
          </div>

          {/* Contacto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                <Phone size={14} className="text-indigo-500" /> Celular *
              </label>
              <div className="flex gap-2">
                <select 
                  className="w-24 px-2 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:bg-white focus:border-indigo-300 outline-none transition-all font-bold text-gray-700 text-sm"
                  value={formData.phonePrefix}
                  onChange={(e) => setFormData({...formData, phonePrefix: e.target.value})}
                >
                  {COUNTRY_CODES.map(country => (
                    <option key={country.code} value={country.code}>
                      {country.code}
                    </option>
                  ))}
                </select>
                <input 
                  type="tel"
                  required
                  className="flex-1 px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:bg-white focus:border-indigo-300 outline-none transition-all font-semibold text-gray-800"
                  placeholder="11 1234 5678"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                <Mail size={14} className="text-indigo-500" /> Email *
              </label>
              <input 
                type="email"
                required
                className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:bg-white focus:border-indigo-300 outline-none transition-all font-semibold text-gray-800"
                placeholder="juan@email.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          {/* Comentarios */}
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Instrucciones Adicionales</label>
            <textarea 
              className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-4 focus:ring-indigo-500/10 focus:bg-white focus:border-indigo-300 outline-none transition-all min-h-[120px] resize-none font-medium text-gray-800"
              placeholder="¿Retiras en local? ¿Algún color en especial?"
              value={formData.comments}
              onChange={(e) => setFormData({...formData, comments: e.target.value})}
            />
          </div>

          {error && (
            <div className="p-4 bg-rose-50 border border-rose-100 text-rose-600 rounded-2xl flex items-start gap-3 text-sm animate-shake">
              <AlertCircle size={20} className="flex-shrink-0" />
              <p className="font-bold">{error}</p>
            </div>
          )}

          <div className="pt-4 pb-8">
            <button 
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 text-white font-black rounded-3xl shadow-2xl shadow-indigo-200 hover:shadow-indigo-300 transition-all flex items-center justify-center gap-4 group active:scale-[0.98]"
            >
              {loading ? (
                <>
                  <Loader2 size={24} className="animate-spin" />
                  <span>Validando Seguridad...</span>
                </>
              ) : (
                <>
                  <span className="text-lg">Confirmar Pedido</span>
                  <Send size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              )}
            </button>
            <div className="mt-6 flex flex-col items-center gap-2">
                <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">Cierre Seguro vía WhatsApp</span>
                <div className="w-8 h-1 bg-gray-100 rounded-full" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};