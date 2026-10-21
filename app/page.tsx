'use client';

import { useState, useEffect } from 'react';
import { DAFTAR_MENU } from '../data/menu';
import { useCart } from '../hooks/useCart';
import { DetailPesanan } from '../types';

import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import CartSidebar from '../components/CartSidebar';
import OrderModal from '../components/OrderModal';

export default function CoffeeShopApp() {
  const [kategoriTerpilih, setKategoriTerpilih] = useState<string>('Semua');
  const [dataCheckout, setDataCheckout] = useState<DetailPesanan | null>(null);
  const [temaGelap, setTemaGelap] = useState(false);
  const [sudahDimuat, setSudahDimuat] = useState(false);
  
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

  const menuDitampilkan = kategoriTerpilih === 'Semua'
    ? DAFTAR_MENU
    : DAFTAR_MENU.filter((m) => m.kategori === kategoriTerpilih);

  const handleCheckout = (detail: DetailPesanan) => {
    setDataCheckout(detail);
  };

  const handleResetPesanan = () => {
    bersihkanKeranjang();
    setDataCheckout(null);
  };

  if (!sudahDimuat) return null;

  return (
    <div className={`min-h-screen pb-20 transition-colors duration-300 ${
      temaGelap ? 'bg-stone-950 text-stone-100' : 'bg-stone-100 text-stone-900'
    }`}>
      <Header totalItem={totalItem} temaGelap={temaGelap} onToggleTema={toggleTema} />

      <main className="max-w-6xl mx-auto px-4 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <section className="lg:col-span-2 space-y-6">
            <div className="flex flex-wrap gap-2 pb-2">
              {['Semua', 'Kopi', 'Non-Kopi', 'Pastry & Camilan'].map((kat) => (
                <button
                  key={kat}
                  onClick={() => setKategoriTerpilih(kat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    kategoriTerpilih === kat
                      ? temaGelap ? 'bg-amber-700 text-white shadow-sm' : 'bg-amber-900 text-white shadow-sm'
                      : temaGelap ? 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800' : 'bg-white text-stone-600 hover:bg-stone-200 border border-stone-200'
                  }`}
                >
                  {kat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {menuDitampilkan.map((item) => (
                <ProductCard key={item.id} item={item} temaGelap={temaGelap} onAdd={tambahKeKeranjang} />
              ))}
            </div>
          </section>

          <aside className="lg:col-span-1">
            <CartSidebar 
              keranjang={keranjang} 
              temaGelap={temaGelap}
              ubahJumlah={ubahJumlah} 
              totalHarga={hitungTotal()} 
              onCheckout={handleCheckout} 
            />
          </aside>

        </div>
      </main>

      {dataCheckout && (
        <OrderModal 
          detail={dataCheckout} 
          temaGelap={temaGelap}
          totalHarga={hitungTotal()} 
          onReset={handleResetPesanan} 
        />
      )}
    </div>
  );
}