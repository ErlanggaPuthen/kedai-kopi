import { useState } from 'react';
import { Produk, ItemKeranjang } from '../types';

export const useCart = () => {
  const [keranjang, setKeranjang] = useState<ItemKeranjang[]>([]);

  const tambahKeKeranjang = (produk: Produk) => {
    setKeranjang((prev) => {
      const ada = prev.find((item) => item.produk.id === produk.id);
      if (ada) {
        return prev.map((item) =>
          item.produk.id === produk.id ? { ...item, jumlah: item.jumlah + 1 } : item
        );
      }
      return [...prev, { produk, jumlah: 1 }];
    });
  };

  const ubahJumlah = (id: string, selisih: number) => {
    setKeranjang((prev) =>
      prev
        .map((item) => {
          if (item.produk.id === id) {
            const jumlahBaru = item.jumlah + selisih;
            return jumlahBaru > 0 ? { ...item, jumlah: jumlahBaru } : null;
          }
          return item;
        })
        .filter((item): item is ItemKeranjang => item !== null)
    );
  };

  const hitungTotal = () => keranjang.reduce((acc, item) => acc + item.produk.harga * item.jumlah, 0);
  const totalItem = keranjang.reduce((acc, item) => acc + item.jumlah, 0);
  const bersihkanKeranjang = () => setKeranjang([]);

  return { keranjang, totalItem, tambahKeKeranjang, ubahJumlah, hitungTotal, bersihkanKeranjang };
};