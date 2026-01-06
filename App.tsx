
import React, { useState, useEffect, useMemo } from 'react';
import { ShoppingBag, Search, Filter, ShoppingCart, CheckCircle2, ArrowRight } from 'lucide-react';
import { PRODUCTS } from './constants';
import { Product, CartItem, Category } from './types';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { CheckoutModal } from './components/CheckoutModal';

const CATEGORIES: Category[] = [
  'Mochilas', 
  'Juguetes', 
  'Accesorios', 
  'Mini electrónicos', 
  'Regalos', 
  'Librería y Hogar'
];

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('bazar-cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category | 'Todos'>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<{show: boolean, name: string}>({ show: false, name: '' });

  useEffect(() => {
    localStorage.setItem('bazar-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    
    setToast({ show: true, name: product.name });
    setTimeout(() => setToast({ show: false, name: '' }), 2000);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesCategory = activeCategory === 'Todos' || p.category === activeCategory;
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Toast */}
      <div className={`fixed top-24 left-1/2 -translate-x-1/2 z-[100] transition-all duration-500 ${toast.show ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
        <div className="bg-gray-900/90 backdrop-blur-md text-white px-8 py-4 rounded-3xl shadow-2xl flex items-center gap-4 border border-white/10">
          <div className="bg-green-500 p-1 rounded-full"><CheckCircle2 size={16} /></div>
          <span className="text-sm font-bold">{toast.name} en el carrito</span>
        </div>
      </div>

      {/* Modern Glass Header */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/60 backdrop-blur-2xl border-b border-white/20">
        <div className="max-w-[1600px] mx-auto px-6 h-20 md:h-24 flex items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-[1.25rem] flex items-center justify-center text-white shadow-xl shadow-indigo-200 rotate-3 hover:rotate-0 transition-transform cursor-pointer">
              <ShoppingBag size={28} strokeWidth={2.5} />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-black text-slate-900 leading-none tracking-tight">Bazar Moderno</h1>
              <p className="text-[10px] text-indigo-500 uppercase tracking-[0.3em] font-black mt-1">Concept Store</p>
            </div>
          </div>

          <div className="flex-1 max-w-2xl relative group hidden md:block">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
            <input 
              type="text"
              placeholder="Encontrá mochilas, juegos, regalos..."
              className="w-full pl-14 pr-6 py-4 bg-slate-100/50 border-2 border-transparent focus:bg-white focus:border-indigo-100 focus:ring-8 focus:ring-indigo-50/50 rounded-3xl outline-none transition-all text-sm font-semibold"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-3">
             <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-4 bg-white shadow-sm hover:shadow-xl border border-slate-100 rounded-2xl transition-all active:scale-90 group"
            >
              <ShoppingCart className="text-slate-700 group-hover:text-indigo-600" size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 min-w-[28px] h-7 bg-indigo-600 text-white text-[12px] font-black flex items-center justify-center rounded-xl border-4 border-white shadow-lg animate-bounce-in">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-6 pt-32 pb-32">
        {/* Mobile Search Placeholder */}
        <div className="md:hidden mb-8">
          <div className="relative shadow-2xl shadow-slate-200/50">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text"
              placeholder="Buscar en el bazar..."
              className="w-full pl-14 pr-6 py-5 bg-white border-none rounded-3xl outline-none text-sm font-bold shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Dynamic Hero */}
        <section className="mb-16 relative group">
          <div className="bg-slate-900 rounded-[3rem] p-8 md:p-20 text-white overflow-hidden relative min-h-[400px] flex items-center shadow-2xl shadow-indigo-200">
            <div className="relative z-10 max-w-2xl">
              <span className="inline-flex items-center gap-2 px-5 py-2 bg-indigo-500/20 backdrop-blur-md rounded-full text-xs font-black uppercase tracking-[0.2em] mb-8 border border-white/10">
                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" /> Tendencia Bazar
              </span>
              <h2 className="text-5xl md:text-7xl font-black mb-8 leading-[1] tracking-tight">Tu Estilo,<br /><span className="text-indigo-400">Tu Catálogo.</span></h2>
              <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-md leading-relaxed font-medium">Armá tu carrito con los mejores productos y recibí atención personalizada vía WhatsApp.</p>
              <button 
                onClick={() => document.getElementById('grid')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-5 bg-white text-slate-900 font-black rounded-2xl hover:bg-indigo-50 transition-all flex items-center gap-4 group/btn"
              >
                Explorar Colección
                <ArrowRight size={20} className="group-hover/btn:translate-x-2 transition-transform" />
              </button>
            </div>
            {/* Visual backgrounds */}
            <div className="absolute top-0 right-0 w-full h-full opacity-20 group-hover:opacity-30 transition-opacity">
               <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-600 rounded-full blur-[150px]" />
               <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] bg-pink-500 rounded-full blur-[120px]" />
            </div>
          </div>
        </section>

        {/* Sticky Filters */}
        <div className="sticky top-28 z-30 mb-12 -mx-6 px-6">
           <div className="flex items-center gap-3 overflow-x-auto pb-4 no-scrollbar scroll-smooth snap-x">
            <button 
              onClick={() => setActiveCategory('Todos')}
              className={`snap-start px-8 py-4 rounded-2xl font-black whitespace-nowrap transition-all flex items-center gap-3 text-sm ${
                activeCategory === 'Todos' 
                  ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-200 scale-105' 
                  : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100 shadow-sm'
              }`}
            >
              <Filter size={18} />
              Todos
            </button>
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`snap-start px-8 py-4 rounded-2xl font-black whitespace-nowrap transition-all text-sm ${
                  activeCategory === cat 
                    ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-200 scale-105' 
                    : 'bg-white text-slate-500 hover:bg-slate-50 border border-slate-100 shadow-sm'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products */}
        <div id="grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={addToCart} 
            />
          ))}
          {filteredProducts.length === 0 && (
            <div className="col-span-full py-32 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
               <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                  <Search size={40} className="text-slate-200" />
               </div>
               <h3 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">Sin resultados</h3>
               <p className="text-slate-400 font-medium">Probá buscando con otro término o categoría.</p>
               <button onClick={() => {setSearchQuery(''); setActiveCategory('Todos')}} className="mt-8 text-indigo-600 font-black uppercase tracking-widest text-xs hover:underline">Reiniciar búsqueda</button>
            </div>
          )}
        </div>
      </main>

      {/* Overlays */}
      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}
      />
      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        total={totalPrice}
      />

      {/* Floating Mobile Bar */}
      {totalItems > 0 && !isCartOpen && (
        <div className="md:hidden fixed bottom-10 left-1/2 -translate-x-1/2 w-[90%] z-[60] animate-slide-up">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="w-full p-6 bg-slate-900 text-white font-black rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] flex items-center justify-between border-t border-white/10 ring-8 ring-slate-900/10"
          >
            <div className="flex items-center gap-4">
              <div className="bg-indigo-600 w-10 h-10 rounded-xl flex items-center justify-center text-sm shadow-lg">
                {totalItems}
              </div>
              <span className="text-sm tracking-tight uppercase">Tu Pedido</span>
            </div>
            <div className="text-xl font-black tracking-tight">${totalPrice.toLocaleString('es-AR')}</div>
          </button>
        </div>
      )}

      <footer className="bg-white border-t border-slate-100 pt-24 pb-16 px-6 overflow-hidden">
        <div className="max-w-[1600px] mx-auto text-center relative">
          <div className="flex flex-col items-center gap-8 mb-16">
            <div className="w-16 h-16 bg-slate-50 rounded-[2rem] flex items-center justify-center text-indigo-600 border border-slate-100 rotate-12">
               <ShoppingBag size={32} />
            </div>
            <div>
              <h4 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Bazar Moderno Concept</h4>
              <p className="text-slate-400 font-medium max-w-sm mx-auto leading-relaxed uppercase text-[10px] tracking-[0.4em]">Estilo • Calidad • Innovación</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-10 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
            <span className="hover:text-indigo-600 cursor-pointer transition-colors">Términos</span>
            <span className="hover:text-indigo-600 cursor-pointer transition-colors">Privacidad</span>
            <span className="hover:text-indigo-600 cursor-pointer transition-colors">WhatsApp Business</span>
            <span className="hover:text-indigo-600 cursor-pointer transition-colors">Instagram</span>
          </div>
          <p className="mt-16 text-[10px] text-slate-300 font-bold uppercase tracking-widest">© 2024 Bazar Moderno. Una experiencia de catálogo premium.</p>
        </div>
      </footer>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes slide-up {
          from { transform: translate(-50%, 40px); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
        .animate-slide-up { animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
        
        @keyframes zoom-in {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-zoom-in { animation: zoom-in 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        
        @keyframes bounce-in {
          0% { transform: scale(0); }
          70% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
        .animate-bounce-in { animation: bounce-in 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake { animation: shake 0.3s ease-in-out; }
      `}</style>
    </div>
  );
}
