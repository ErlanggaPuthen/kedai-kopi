'use client';

import { useState, useEffect } from 'react';
import { DAFTAR_MENU } from '../data/menu';
import { useCart } from '../hooks/useCart';
import { DetailPesanan, Produk } from '../types';

import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import CartSidebar from '../components/CartSidebar';
import OrderModal from '../components/OrderModal';

export default function CoffeeShopApp() {
  const [kategoriTerpilih, setKategoriTerpilih] = useState<string>('Semua');
  const [dataCheckout, setDataCheckout] = useState<DetailPesanan | null>(null);
  const [temaGelap, setTemaGelap] = useState(false);
  const [sudahDimuat, setSudahDimuat] = useState(false);
  
  // State untuk animasi notifikasi sukses tambah ke keranjang
  const [notif, setNotif] = useState<string | null>(null);
  
  const { keranjang, totalItem, tambahKeKeranjang, ubahJumlah, hitungTotal, bersihkanKeranjang } = useCart();

  useEffect(() => {
    const simpananTema = localStorage.getItem('tema_kedai_kopi');
    if (simpananTema) {
      setTemaGelap(simpananTema === 'dark');
    } else {
      setTemaGelap(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    setSudahDimuat(true);
  }, []);

  const toggleTema = () => {
    const baru = !temaGelap;
    setTemaGelap(baru);
    localStorage.setItem('tema_kedai_kopi', baru ? 'dark' : 'light');
  };

  const handleTambah = (produk: Produk) => {
    tambahKeKeranjang(produk);
    // Munculkan notifikasi kecil (toast) selama 2 detik
    setNotif(`${produk.nama} ditambahkan!`);
    setTimeout(() => setNotif(null), 2000);
  };

  const menuDitampilkan = kategoriTerpilih === 'Semua'
    ? DAFTAR_MENU
    : DAFTAR_MENU.filter((m) => m.kategori === kategoriTerpilih);

  if (!sudahDimuat) return null;

  return (
    <div className={`min-h-screen pb-20 transition-colors duration-500 ${
      temaGelap ? 'bg-stone-950 text-stone-100' : 'bg-stone-50 text-stone-900'
    }`}>
      <Header totalItem={totalItem} temaGelap={temaGelap} onToggleTema={toggleTema} />

      <main className="max-w-6xl mx-auto px-4 pt-6">
        
        {/* HERO BANNER - Tampilan Kekinian */}
        <div className={`relative overflow-hidden rounded-4xl p-8 mb-8 shadow-lg transition-colors ${
          temaGelap ? 'bg-linear-to-br from-stone-900 to-stone-800 border border-white/5' : 'bg-linear-to-br from-amber-900 to-amber-700'
        }`}>
          <div className="relative z-10 max-w-lg">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">
              ✨ Spesial Hari Ini
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">
              Awali harimu dengan secangkir semangat.
            </h2>
            <p className="text-amber-100/80 text-sm md:text-base leading-relaxed">
              Dapatkan diskon 20% untuk semua varian Artisan Tea. Pesan sekarang tanpa perlu antre di kasir.
            </p>
          </div>
          {/* Dekorasi Abstrak di dalam Banner */}
          <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl"></div>
          <div className="absolute top-0 right-10 w-32 h-32 bg-rose-500/20 rounded-full blur-2xl"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <section className="lg:col-span-2 space-y-6">
            
            {/* Filter dengan desain Pill/Kapsul */}
            <div className="flex flex-wrap gap-2 pb-2">
              {['Semua', 'Kopi', 'Non-Kopi', 'Pastry & Camilan'].map((kat) => (
                <button
                  key={kat}
                  onClick={() => setKategoriTerpilih(kat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer active:scale-95 ${
                    kategoriTerpilih === kat
                      ? temaGelap 
                        ? 'bg-amber-500 text-stone-950 shadow-[0_0_15px_rgba(245,158,11,0.3)]' 
                        : 'bg-stone-900 text-white shadow-lg'
                      : temaGelap 
                        ? 'bg-stone-900 text-stone-400 hover:bg-stone-800 hover:text-stone-200 border border-white/5' 
                        : 'bg-white text-stone-500 hover:bg-stone-100 border border-stone-200 shadow-sm'
                  }`}
                >
                  {kat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {menuDitampilkan.map((item) => (
                <ProductCard key={item.id} item={item} temaGelap={temaGelap} onAdd={handleTambah} />
              ))}
            </div>
          </section>

          <aside className="lg:col-span-1">
             {/* CartSidebar komponen tetap sama, tapi terlihat lebih keren karena background parent-nya */}
            <CartSidebar 
              keranjang={keranjang} 
              temaGelap={temaGelap}
              ubahJumlah={ubahJumlah} 
              totalHarga={hitungTotal()} 
              onCheckout={setDataCheckout} 
            />
          </aside>

        </div>
      </main>

      {/* Pop-up Toast Notification saat nambah item */}
      {notif && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-emerald-500 text-white px-6 py-3 rounded-full shadow-2xl font-bold text-xs flex items-center gap-2">
            <span>✅</span> {notif}
          </div>
        </div>
      )}

      {/* Modal Pesanan Selesai */}
      {dataCheckout && (
        <OrderModal 
          detail={dataCheckout} 
          temaGelap={temaGelap}
          totalHarga={hitungTotal()} 
          onReset={() => { bersihkanKeranjang(); setDataCheckout(null); }} 
        />
      )}
    </div>
  );
}