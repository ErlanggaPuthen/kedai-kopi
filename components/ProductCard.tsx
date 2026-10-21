import { Produk } from '../types';
import { formatRupiah } from '../utils/formatter';

interface ProductCardProps {
  item: Produk;
  temaGelap: boolean;
  onAdd: (produk: Produk) => void;
}

export default function ProductCard({ item, temaGelap, onAdd }: ProductCardProps) {
  return (
    <div className={`rounded-2xl p-5 border shadow-sm flex flex-col justify-between transition-colors ${
      temaGelap
        ? 'bg-stone-900 border-stone-800 hover:border-amber-700/60'
        : 'bg-white border-stone-200 hover:border-amber-300'
    }`}>
      <div>
        <div className="flex items-start justify-between gap-2">
          <h3 className={`font-bold text-base transition-colors ${temaGelap ? 'text-stone-100' : 'text-stone-800'}`}>
            {item.nama}
          </h3>
          {item.badge && (
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
              item.badge === 'Terlaris'
                ? temaGelap ? 'bg-rose-950/80 text-rose-300 border border-rose-800' : 'bg-rose-100 text-rose-700'
                : temaGelap ? 'bg-amber-950/80 text-amber-300 border border-amber-800' : 'bg-amber-100 text-amber-700'
            }`}>
              {item.badge}
            </span>
          )}
        </div>
        <p className={`text-xs mt-1 leading-relaxed ${temaGelap ? 'text-stone-400' : 'text-stone-500'}`}>
          {item.deskripsi}
        </p>
      </div>

      <div className={`mt-5 pt-3 border-t flex items-center justify-between transition-colors ${
        temaGelap ? 'border-stone-800' : 'border-stone-100'
      }`}>
        <span className={`font-semibold text-sm ${temaGelap ? 'text-stone-200' : 'text-stone-900'}`}>
          {formatRupiah(item.harga)}
        </span>
        <button
          onClick={() => onAdd(item)}
          className={`text-white text-xs px-3.5 py-1.5 rounded-lg font-medium transition cursor-pointer active:scale-95 ${
            temaGelap ? 'bg-amber-700 hover:bg-amber-600' : 'bg-amber-900 hover:bg-amber-800'
          }`}
        >
          + Tambah
        </button>
      </div>
    </div>
  );
}