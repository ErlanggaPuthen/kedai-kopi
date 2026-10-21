import { DetailPesanan } from '../types';
import { formatRupiah } from '../utils/formatter';

interface OrderModalProps {
  detail: DetailPesanan;
  temaGelap: boolean;
  totalHarga: number;
  onReset: () => void;
}

export default function OrderModal({ detail, temaGelap, totalHarga, onReset }: OrderModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4 transition-all">
      <div className={`max-w-sm w-full rounded-2xl p-6 shadow-xl space-y-4 text-center border transition-colors ${
        temaGelap ? 'bg-stone-900 border-stone-800 text-stone-100' : 'bg-white border-stone-200 text-stone-900'
      }`}>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto text-xl font-bold ${
          temaGelap ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-emerald-100 text-emerald-700'
        }`}>
          ✓
        </div>
        <div>
          <h3 className={`font-bold text-lg ${temaGelap ? 'text-white' : 'text-stone-900'}`}>Pesanan Berhasil Masuk!</h3>
          <p className={`text-xs mt-1 ${temaGelap ? 'text-stone-400' : 'text-stone-500'}`}>Barista sedang menyiapkan pesanan Anda.</p>
        </div>
        <div className={`rounded-xl p-3 text-left text-xs space-y-1 border ${
          temaGelap ? 'bg-stone-950/60 border-stone-800' : 'bg-stone-50 border-stone-200'
        }`}>
          <p><span className="text-stone-400 w-20 inline-block">Pemesan</span>: <span className="font-semibold">{detail.namaPemesan}</span></p>
          <p><span className="text-stone-400 w-20 inline-block">Layanan</span>: <span className="font-semibold">{detail.tipePesanan === 'dine-in' ? `Dine In (Meja ${detail.nomorMeja || '-'})` : 'Takeaway'}</span></p>
          <p><span className="text-stone-400 w-20 inline-block">Total Biaya</span>: <span className={`font-bold ${temaGelap ? 'text-amber-400' : 'text-amber-900'}`}>{formatRupiah(totalHarga)}</span></p>
        </div>
        <button
          onClick={onReset}
          className={`w-full text-xs font-medium py-2.5 rounded-xl transition cursor-pointer ${
            temaGelap ? 'bg-stone-100 text-stone-900 hover:bg-white' : 'bg-stone-900 text-white hover:bg-stone-800'
          }`}
        >
          Pesan Menu Lainnya
        </button>
      </div>
    </div>
  );
}