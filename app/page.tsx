'use client';

import { useState } from 'react';
import { DAFTAR_MENU } from '../data/menu';
import { useCart } from '../hooks/useCart';
import { DetailPesanan } from '../types';

// Impor Komponen Modular
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import CartSidebar from '../components/CartSidebar';
import OrderModal from '../components/OrderModal';

export default function CoffeeShopApp() {
  const [kategoriTerpilih, setKategoriTerpilih] = useState<string>('Semua');
  const [dataCheckout, setDataCheckout] = useState<DetailPesanan | null>(null);
  
  // Mengambil logika dari Custom Hook
  const { keranjang, totalItem, tambahKeKeranjang, ubahJumlah, hitungTotal, bersihkanKeranjang } = useCart();

  // Filter Data
  const menuDitampilkan = kategoriTerpilih === 'Semua'
    ? DAFTAR_MENU
    : DAFTAR_MENU.filter((m) => m.kategori === kategoriTerpilih);

  // Aksi Checkout
  const handleCheckout = (detail: DetailPesanan) => {
    setDataCheckout(detail);
  };

  const handleResetPesanan = () => {
    bersihkanKeranjang();
    setDataCheckout(null);
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 pb-20">
      <Header totalItem={totalItem} />

      <main className="max-w-6xl mx-auto px-4 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sisi Kiri: Katalog & Filter */}
          <section className="lg:col-span-2 space-y-6">
            <div className="flex flex-wrap gap-2 pb-2">
              {['Semua', 'Kopi', 'Non-Kopi', 'Pastry & Camilan'].map((kat) => (
                <button
                  key={kat}
                  onClick={() => setKategoriTerpilih(kat)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    kategoriTerpilih === kat
                      ? 'bg-amber-900 text-white shadow-sm'
                      : 'bg-white text-stone-600 hover:bg-stone-200 border border-stone-200'
                  }`}
                >
                  {kat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {menuDitampilkan.map((item) => (
                <ProductCard key={item.id} item={item} onAdd={tambahKeKeranjang} />
              ))}
            </div>
          </section>

          {/* Sisi Kanan: Keranjang */}
          <aside className="lg:col-span-1">
            <CartSidebar 
              keranjang={keranjang} 
              ubahJumlah={ubahJumlah} 
              totalHarga={hitungTotal()} 
              onCheckout={handleCheckout} 
            />
          </aside>

        </div>
      </main>

      {/* Modal Popup jika Checkout Sukses */}
      {dataCheckout && (
        <OrderModal 
          detail={dataCheckout} 
          totalHarga={hitungTotal()} 
          onReset={handleResetPesanan} 
        />
      )}
    </div>
  );
}