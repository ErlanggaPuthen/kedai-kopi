import { Produk } from '../types';
import { formatRupiah } from '../utils/formatter';

interface ProductCardProps {
  item: Produk;
  onAdd: (produk: Produk) => void;
}

export default function ProductCard({ item, onAdd }: ProductCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm flex flex-col justify-between hover:border-amber-300 transition-colors">
      <div>
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-base text-stone-800">{item.nama}</h3>
          {item.badge && (
            <span className="text-[10px] bg-rose-100 text-rose-700 font-bold px-2 py-0.5 rounded-md">
              {item.badge}
            </span>
          )}
        </div>
        <p className="text-xs text-stone-500 mt-1 leading-relaxed">{item.deskripsi}</p>
      </div>

      <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between">
        <span className="font-semibold text-stone-900 text-sm">
          {formatRupiah(item.harga)}
        </span>
        <button
          onClick={() => onAdd(item)}
          className="bg-amber-900 hover:bg-amber-800 text-white text-xs px-3.5 py-1.5 rounded-lg font-medium transition cursor-pointer active:scale-95"
        >
          + Tambah
        </button>
      </div>
    </div>
  );
}