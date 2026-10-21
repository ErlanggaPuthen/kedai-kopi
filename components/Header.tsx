interface HeaderProps {
  totalItem: number;
  temaGelap: boolean;
  onToggleTema: () => void;
}

export default function Header({ totalItem, temaGelap, onToggleTema }: HeaderProps) {
  return (
    <header className={`sticky top-0 z-30 backdrop-blur-xl transition-colors duration-300 ${
      temaGelap ? 'bg-stone-950/70 border-b border-white/10' : 'bg-white/70 border-b border-stone-200/50'
    }`}>
      <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-2xl font-black tracking-tighter bg-linear-to-r from-amber-600 via-orange-500 to-rose-500 bg-clip-text text-transparent">
            Ruang Seduh.
          </h1>
          <p className={`text-[10px] font-medium uppercase tracking-widest mt-0.5 ${temaGelap ? 'text-stone-400' : 'text-stone-500'}`}>
            Artisan Coffee & Pastry
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleTema}
            className={`w-10 h-10 flex items-center justify-center rounded-full text-lg transition-all duration-300 hover:scale-110 active:scale-90 ${
              temaGelap
                ? 'bg-stone-800 text-yellow-400 hover:shadow-[0_0_15px_rgba(250,204,21,0.2)]'
                : 'bg-stone-100 text-amber-500 hover:shadow-md'
            }`}
          >
            {temaGelap ? '🌙' : '☀️'}
          </button>

          <div className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs shadow-sm transition-all ${
            temaGelap ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-amber-100 text-amber-800'
          }`}>
            <span>🛒</span>
            <span>{totalItem} item</span>
          </div>
        </div>
      </div>
    </header>
  );
}