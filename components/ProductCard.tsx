import { Produk } from '../types';
import { formatRupiah } from '../utils/formatter';

interface ProductCardProps {
  item: Produk;
  temaGelap: boolean;
  onAdd: (produk: Produk) => void;
}

export default function ProductCard({ item, temaGelap, onAdd }: ProductCardProps) {
  return (
    <div className={`group relative rounded-3xl p-5 border flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${
      temaGelap
        ? 'bg-stone-900 border-white/5 hover:border-amber-500/30 hover:shadow-amber-900/20'
        : 'bg-white border-stone-200 hover:border-amber-300 hover:shadow-amber-100'
    }`}>
      
      {/* Dekorasi Ikon Produk */}
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${
        temaGelap ? 'bg-linear-to-br from-stone-800 to-stone-950' : 'bg-linear-to-br from-amber-50 to-orange-100'
      }`}>
        {item.icon}
      </div>

      <div>
        <div className="flex items-start justify-between gap-2">
          <h3 className={`font-bold text-lg transition-colors ${temaGelap ? 'text-stone-100' : 'text-stone-800'}`}>
            {item.nama}
          </h3>
          {item.badge && (
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap shadow-sm ${
              item.badge === 'Terlaris'
                ? temaGelap ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-rose-100 text-rose-700'
                : temaGelap ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-amber-100 text-amber-700'
            }`}>
              ✨ {item.badge}
            </span>
          )}
        </div>
        <p className={`text-xs mt-2 leading-relaxed ${temaGelap ? 'text-stone-400' : 'text-stone-500'}`}>
          {item.deskripsi}
        </p>
      </div>

      <div className={`mt-6 pt-4 border-t flex items-center justify-between transition-colors ${
        temaGelap ? 'border-white/10' : 'border-stone-100'
      }`}>
        <span className={`font-black text-base ${temaGelap ? 'text-stone-200' : 'text-stone-900'}`}>
          {formatRupiah(item.harga)}
        </span>
        <button
          onClick={() => onAdd(item)}
          className={`flex items-center gap-1 text-white text-xs px-4 py-2 rounded-xl font-bold transition-all duration-300 cursor-pointer active:scale-90 shadow-md hover:shadow-lg ${
            temaGelap ? 'bg-amber-600 hover:bg-amber-500' : 'bg-stone-900 hover:bg-stone-800'
          }`}
        >
          <span>+</span> Tambah
        </button>
      </div>
    </div>
  );
}