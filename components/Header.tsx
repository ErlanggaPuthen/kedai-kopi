interface HeaderProps {
  totalItem: number;
  temaGelap: boolean;
  onToggleTema: () => void;
}

export default function Header({ totalItem, temaGelap, onToggleTema }: HeaderProps) {
  return (
    <header className={`sticky top-0 z-30 backdrop-blur-md border-b transition-colors ${
      temaGelap ? 'bg-stone-900/90 border-stone-800' : 'bg-white/90 border-stone-200'
    }`}>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div>
          <h1 className={`text-xl font-bold tracking-tight transition-colors ${
            temaGelap ? 'text-amber-500' : 'text-amber-900'
          }`}>
            Ruang Seduh
          </h1>
          <p className={`text-xs ${temaGelap ? 'text-stone-400' : 'text-stone-500'}`}>
            Pesan Menu Kopi & Kudapan Favorit
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleTema}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
              temaGelap
                ? 'bg-stone-800 border-stone-700 text-yellow-400 hover:bg-stone-700'
                : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100 shadow-sm'
            }`}
          >
            <span>{temaGelap ? '🌙 Gelap' : '☀️ Terang'}</span>
          </button>

          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm transition-colors ${
            temaGelap ? 'bg-amber-950/80 text-amber-300 border border-amber-800' : 'bg-amber-100 text-amber-800'
          }`}>
            {totalItem} item dipilih
          </span>
        </div>
      </div>
    </header>
  );
}