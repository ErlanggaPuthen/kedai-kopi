export interface Produk {
  id: string;
  nama: string;
  harga: number;
  kategori: 'Kopi' | 'Non-Kopi' | 'Pastry & Camilan';
  deskripsi: string;
  badge?: string;
  icon: string;
}

export interface ItemKeranjang {
  produk: Produk;
  jumlah: number;
}

export interface DetailPesanan {
  namaPemesan: string;
  tipePesanan: 'dine-in' | 'takeaway';
  nomorMeja: string;
}