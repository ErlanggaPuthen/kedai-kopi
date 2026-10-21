import { useState } from 'react';
import { ItemKeranjang, DetailPesanan } from '../types';
import { formatRupiah } from '../utils/formatter';

interface CartSidebarProps {
  keranjang: ItemKeranjang[];
  ubahJumlah: (id: string, selisih: number) => void;
  totalHarga: number;
  onCheckout: (detail: DetailPesanan) => void;
}

export default function CartSidebar({ keranjang, ubahJumlah, totalHarga, onCheckout }: CartSidebarProps) {
  const [namaPemesan, setNamaPemesan] = useState('');
  const [tipePesanan, setTipePesanan] = useState<'dine-in' | 'takeaway'>('dine-in');
  const [nomorMeja, setNomorMeja] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keranjang.length === 0 || !namaPemesan.trim()) return;
    onCheckout({ namaPemesan, tipePesanan, nomorMeja });
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm sticky top-24 space-y-6">
      <h2 className="text-lg font-bold text-stone-800 pb-2 border-b border-stone-100">Detail Pesanan</h2>

      <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
        {keranjang.length === 0 ? (
          <p className="text-xs text-stone-400 text-center py-6">Keranjang kosong. Pilih menu di sebelah kiri.</p>
        ) : (
          keranjang.map((item) => (
            <div key={item.produk.id} className="flex items-center justify-between text-xs py-1.5">
              <div className="max-w-35">
                <p className="font-semibold text-stone-800 truncate">{item.produk.nama}</p>
                <p className="text-stone-400">{formatRupiah(item.produk.harga)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => ubahJumlah(item.produk.id, -1)} className="w-6 h-6 rounded bg-stone-100 font-bold hover:bg-stone-200 cursor-pointer">-</button>
                <span className="font-semibold w-4 text-center">{item.jumlah}</span>
                <button onClick={() => ubahJumlah(item.produk.id, 1)} className="w-6 h-6 rounded bg-stone-100 font-bold hover:bg-stone-200 cursor-pointer">+</button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="pt-3 border-t border-stone-100 space-y-1.5 text-xs">
        <div className="flex justify-between font-bold text-sm text-stone-900 pt-1">
          <span>Total Tagihan</span>
          <span className="text-amber-900">{formatRupiah(totalHarga)}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        <div>
          <label className="text-[11px] font-semibold text-stone-600 block mb-1">Nama Pemesan</label>
          <input required type="text" placeholder="Contoh: Budi" value={namaPemesan} onChange={(e) => setNamaPemesan(e.target.value)} className="w-full border border-stone-300 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-amber-800 focus:outline-none" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[11px] font-semibold text-stone-600 block mb-1">Opsi Santap</label>
            <select value={tipePesanan} onChange={(e) => setTipePesanan(e.target.value as any)} className="w-full border border-stone-300 rounded-lg px-2 py-2 text-xs bg-white focus:ring-1 focus:ring-amber-800 focus:outline-none">
              <option value="dine-in">Dine In</option>
              <option value="takeaway">Bawa Pulang</option>
            </select>
          </div>
          <div>
            <label className="text-[11px] font-semibold text-stone-600 block mb-1">No. Meja</label>
            <input type="text" disabled={tipePesanan === 'takeaway'} placeholder={tipePesanan === 'takeaway' ? '-' : 'Cth: 04'} value={tipePesanan === 'takeaway' ? '' : nomorMeja} onChange={(e) => setNomorMeja(e.target.value)} className="w-full border border-stone-300 rounded-lg px-3 py-2 text-xs focus:ring-1 focus:ring-amber-800 focus:outline-none disabled:bg-stone-100" />
          </div>
        </div>
        <button type="submit" disabled={keranjang.length === 0} className="w-full bg-amber-900 hover:bg-amber-800 disabled:bg-stone-300 text-white text-xs font-semibold py-3 rounded-xl transition shadow-sm cursor-pointer disabled:cursor-not-allowed">
          Konfirmasi & Bayar
        </button>
      </form>
    </div>
  );
}