import { DetailPesanan } from '../types';
import { formatRupiah } from '../utils/formatter';

interface OrderModalProps {
  detail: DetailPesanan;
  totalHarga: number;
  onReset: () => void;
}

export default function OrderModal({ detail, totalHarga, onReset }: OrderModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 transition-all">
      <div className="bg-white max-w-sm w-full rounded-2xl p-6 shadow-xl space-y-4 text-center animate-in fade-in zoom-in duration-300">
        <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto text-xl font-bold">✓</div>
        <div>
          <h3 className="font-bold text-lg text-stone-900">Pesanan Berhasil Masuk!</h3>
          <p className="text-xs text-stone-500 mt-1">Barista sedang menyiapkan pesanan Anda.</p>
        </div>
        <div className="bg-stone-50 rounded-xl p-3 text-left text-xs space-y-1 border border-stone-200">
          <p><span className="text-stone-400 w-20 inline-block">Pemesan</span>: <span className="font-semibold">{detail.namaPemesan}</span></p>
          <p><span className="text-stone-400 w-20 inline-block">Layanan</span>: <span className="font-semibold">{detail.tipePesanan === 'dine-in' ? `Dine In (Meja ${detail.nomorMeja || '-'})` : 'Takeaway'}</span></p>
          <p><span className="text-stone-400 w-20 inline-block">Total Biaya</span>: <span className="font-bold text-amber-900">{formatRupiah(totalHarga)}</span></p>
        </div>
        <button onClick={onReset} className="w-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium py-2.5 rounded-xl transition cursor-pointer">
          Pesan Menu Lainnya
        </button>
      </div>
    </div>
  );
}