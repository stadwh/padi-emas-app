'use client';

import React from 'react';

export default function Home() {
  // Masukkan nomor WA kamu di sini (Gunakan format 62, contoh: 6281234567890)
  const nomorWA = "6281281997276"; 

  const produkList = [
    {
      id: 1,
      nama: "Beras Pandan Wangi",
      deskripsi: "khas aroma pandan murni saat mulai matang di penanak. Tekstur jaminan pulen.",
      ukuran: "10kg",
      hargaDisplay: "135.000",
      gambar: "/pandan-wangi.jpg"
    },
    {
      id: 2,
      nama: "Beras Premium",
      deskripsi: "beras pilihan dengan kualitas terbaik, pulen, bersih, dan cocok untuk kebutuhan keluarga sehari-hari.",
      ukuran: "10kg",
      hargaDisplay: "145.000",
      gambar: "/premium.jpg"
    },
    {
      id: 3,
      nama: "Beras Ketan Putih",
      deskripsi: "beras ketan berkualitas dengan tekstur lembut dan rasa yang pas untuk berbagai olahan tradisional.",
      ukuran: "10kg",
      hargaDisplay: "155.000",
      gambar: "/ketan-putih.jpg"
    }
  ];

  const pesanViaWA = (namaProduk, harga) => {
    if (typeof window !== 'undefined') {
      const pesan = `Halo, saya ingin memesan ${namaProduk} (${harga}) dari Padi Emas Nusantara.`;
      const url = `https://wa.me/${nomorWA}?text=${encodeURIComponent(pesan)}`;
      window.open(url, '_blank');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-50">
      {/* Header & Navigasi */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-amber-600">Padi Emas Nusantara</div>
          <nav className="flex space-x-6">
            <a href="#produk" className="text-gray-700 hover:text-amber-600 transition">Produk</a>
            <a href="#tentang-kami" className="text-gray-700 hover:text-amber-600 transition font-medium">
              Tentang Kami
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 flex-grow">
        
        {/* Bagian Produk */}
        <section id="produk" className="mb-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Produk Beras Pilihan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {produkList.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 flex flex-col justify-between">
                <div>
                  <div className="relative h-48 w-full bg-amber-100">
                    <img 
                      src={item.gambar} 
                      alt={item.nama}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.nama}</h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {item.deskripsi}
                    </p>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-gray-50">
                  <div>
                    <span className="text-xs text-gray-400 block">Harga / {item.ukuran}</span>
                    <span className="text-lg font-bold text-gray-900">Rp {item.hargaDisplay}</span>
                  </div>
                  <button 
                    onClick={() => pesanViaWA(item.nama, `Rp ${item.hargaDisplay}`)}
                    className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl font-medium flex items-center gap-1 transition shadow-sm"
                  >
                    + Tambah
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bagian Tentang Kami */}
        <section id="tentang-kami" className="bg-amber-50 rounded-2xl p-8 mb-12 border border-amber-100">
          <h2 className="text-2xl font-bold text-amber-900 mb-3">Tentang Padi Emas Nusantara</h2>
          <p className="text-amber-800 leading-relaxed max-w-3xl">
            Padi Emas Nusantara berkomitmen menyediakan beras murni dan berkualitas tinggi langsung dari hasil panen terbaik. 
            Kami memastikan setiap bulir beras diproses dengan higienis, bebas bahan kimia berbahaya, demi menghadirkan hidangan lezat dan sehat untuk seluruh keluarga Indonesia.
          </p>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-[#3a1b05] text-amber-100 text-center py-4 text-sm">
        <p>&copy; 2026 Padi Emas Nusantara. Dibuat sepenuh hati oleh Siti Adawiah 24110310078</p>
      </footer>
    </div>
  );
}