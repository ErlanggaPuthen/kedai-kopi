interface HeaderProps {
  totalItem: number;
}

export default function Header({ totalItem }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-amber-900">Ruang Seduh</h1>
          <p className="text-xs text-stone-500">Pesan Menu Kopi & Kudapan Favorit</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-amber-100 text-amber-800 font-semibold px-2.5 py-1 rounded-full shadow-sm">
            {totalItem} item dipilih
          </span>
        </div>
      </div>
    </header>
  );
}