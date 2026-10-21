import { useState } from 'react';
import { ItemKeranjang, DetailPesanan } from '../types';
import { formatRupiah } from '../utils/formatter';

interface CartSidebarProps {
  keranjang: ItemKeranjang[];
  temaGelap: boolean;
  ubahJumlah: (id: string, selisih: number) => void;
  totalHarga: number;
  onCheckout: (detail: DetailPesanan) => void;
}

export default function CartSidebar({ keranjang, temaGelap, ubahJumlah, totalHarga, onCheckout }: CartSidebarProps) {
  const [namaPemesan, setNamaPemesan] = useState('');
  const [tipePesanan, setTipePesanan] = useState<'dine-in' | 'takeaway'>('dine-in');
  const [nomorMeja, setNomorMeja] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keranjang.length === 0 || !namaPemesan.trim()) return;
    onCheckout({ namaPemesan, tipePesanan, nomorMeja });
  };

  return (
    <div className={`rounded-2xl p-6 border shadow-sm sticky top-24 space-y-6 transition-colors ${
      temaGelap ? 'bg-stone-900 border-stone-800' : 'bg-white border-stone-200'
    }`}>
      <h2 className={`text-lg font-bold pb-2 border-b transition-colors ${
        temaGelap ? 'text-stone-100 border-stone-800' : 'text-stone-800 border-stone-100'
      }`}>
        Detail Pesanan
      </h2>

      <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
        {keranjang.length === 0 ? (
          <p className="text-xs text-stone-400 text-center py-6">Keranjang kosong. Pilih menu di sebelah kiri.</p>
        ) : (
          keranjang.map((item) => (
            <div key={item.produk.id} className="flex items-center justify-between text-xs py-1.5">
              <div className="max-w-[140px]">
                <p className={`font-semibold truncate ${temaGelap ? 'text-stone-200' : 'text-stone-800'}`}>{item.produk.nama}</p>
                <p className="text-stone-400">{formatRupiah(item.produk.harga)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => ubahJumlah(item.produk.id, -1)}
                  className={`w-6 h-6 rounded font-bold cursor-pointer transition ${
                    temaGelap ? 'bg-stone-800 text-stone-300 hover:bg-stone-700' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  -
                </button>
                <span className={`font-semibold w-4 text-center ${temaGelap ? 'text-stone-200' : 'text-stone-800'}`}>{item.jumlah}</span>
                <button
                  onClick={() => ubahJumlah(item.produk.id, 1)}
                  className={`w-6 h-6 rounded font-bold cursor-pointer transition ${
                    temaGelap ? 'bg-stone-800 text-stone-300 hover:bg-stone-700' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  +
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className={`pt-3 border-t space-y-1.5 text-xs transition-colors ${
        temaGelap ? 'border-stone-800' : 'border-stone-100'
      }`}>
        <div className="flex justify-between font-bold text-sm pt-1">
          <span className={temaGelap ? 'text-stone-200' : 'text-stone-900'}>Total Tagihan</span>
          <span className={temaGelap ? 'text-amber-400' : 'text-amber-900'}>{formatRupiah(totalHarga)}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        <div>
          <label className={`text-[11px] font-semibold block mb-1 ${temaGelap ? 'text-stone-300' : 'text-stone-600'}`}>
            Nama Pemesan
          </label>
          <input
            required
            type="text"
            placeholder="Contoh: Budi"
            value={namaPemesan}
            onChange={(e) => setNamaPemesan(e.target.value)}
            className={`w-full border rounded-lg px-3 py-2 text-xs focus:ring-1 focus:outline-none transition-colors ${
              temaGelap
                ? 'bg-stone-800 border-stone-700 text-white placeholder-stone-500 focus:ring-amber-500'
                : 'bg-white border-stone-300 text-stone-900 focus:ring-amber-800'
            }`}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className={`text-[11px] font-semibold block mb-1 ${temaGelap ? 'text-stone-300' : 'text-stone-600'}`}>
              Opsi Santap
            </label>
            <select
              value={tipePesanan}
              onChange={(e) => setTipePesanan(e.target.value as any)}
              className={`w-full border rounded-lg px-2 py-2 text-xs focus:ring-1 focus:outline-none transition-colors ${
                temaGelap
                  ? 'bg-stone-800 border-stone-700 text-white focus:ring-amber-500'
                  : 'bg-white border-stone-300 text-stone-900 focus:ring-amber-800'
              }`}
            >
              <option value="dine-in">Dine In</option>
              <option value="takeaway">Bawa Pulang</option>
            </select>
          </div>
          <div>
            <label className={`text-[11px] font-semibold block mb-1 ${temaGelap ? 'text-stone-300' : 'text-stone-600'}`}>
              No. Meja
            </label>
            <input
              type="text"
              disabled={tipePesanan === 'takeaway'}
              placeholder={tipePesanan === 'takeaway' ? '-' : 'Cth: 04'}
              value={tipePesanan === 'takeaway' ? '' : nomorMeja}
              onChange={(e) => setNomorMeja(e.target.value)}
              className={`w-full border rounded-lg px-3 py-2 text-xs focus:ring-1 focus:outline-none transition-colors ${
                temaGelap
                  ? 'bg-stone-800 border-stone-700 text-white placeholder-stone-500 focus:ring-amber-500 disabled:bg-stone-950 disabled:text-stone-600'
                  : 'bg-white border-stone-300 text-stone-900 focus:ring-amber-800 disabled:bg-stone-100'
              }`}
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={keranjang.length === 0}
          className={`w-full text-white text-xs font-semibold py-3 rounded-xl transition shadow-sm cursor-pointer disabled:cursor-not-allowed ${
            temaGelap
              ? 'bg-amber-700 hover:bg-amber-600 disabled:bg-stone-800 disabled:text-stone-600'
              : 'bg-amber-900 hover:bg-amber-800 disabled:bg-stone-300'
          }`}
        >
          Konfirmasi & Bayar
        </button>
      </form>
    </div>
  );
}