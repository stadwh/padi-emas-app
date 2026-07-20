'use client';

import React, { useState } from 'react';

export default function Home() {
  const [currentPage, setCurrentPage] = useState('home');
  const [cart, setCart] = useState([]);
  const [buyerName, setBuyerName] = useState('');
  const [buyerAddress, setBuyerAddress] = useState('');

  const switchPage = (pageId) => {
    setCurrentPage(pageId);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const addToCart = (name, price) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.name === name);
      if (existing) {
        return prevCart.map(item => 
          item.name === name ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { name, price, qty: 1 }];
    });
    alert(`${name} berhasil masuk daftar belanjaan!`);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.qty), 0);
  };

  const checkoutToWhatsApp = () => {
    if (cart.length === 0 || !buyerName.trim() || !buyerAddress.trim()) {
      alert('Mohon lengkapi daftar belanjaan beserta detail alamat!');
      return;
    }
    let text = `Halo Padi Emas Nusantara, saya mau beli:\n`;
    cart.forEach(item => {
      text += `- ${item.name} x${item.qty} = Rp ${(item.price * item.qty).toLocaleString('id-ID')}\n`;
    });
    text += `\nTotal: Rp ${calculateTotal().toLocaleString('id-ID')}\nAlamat Penerima: ${buyerName} (${buyerAddress})`;
    
    // Nomor WhatsApp asli kamu
    const url = `https://api.whatsapp.com/send?phone=6281281997276&text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="bg-[#FFFBF5] text-stone-800 flex flex-col min-h-screen selection:bg-amber-100 selection:text-amber-900 font-sans">
      
      {/* NAVBAR */}
      <nav className="bg-[#FFFBF5]/90 backdrop-blur-md sticky top-0 z-50 border-b border-stone-200/40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          
          <button onClick={() => switchPage('home')} className="flex items-center space-x-2.5 cursor-pointer text-left group">
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-amber-500/80 shadow-xs transition group-hover:scale-105 bg-stone-100">
              <img src="/logo padi emas.jpeg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-extrabold text-xl text-stone-900 tracking-tight group-hover:text-emerald-700 transition font-serif">Padi Emas Nusantara</span>
          </button>

          <div className="hidden md:flex space-x-6 font-medium text-sm text-stone-600">
            <button onClick={() => switchPage('home')} className={`py-1 transition-all cursor-pointer relative ${currentPage === 'home' ? 'text-emerald-700 font-bold' : 'hover:text-stone-900'}`}>Home</button>
            <button onClick={() => switchPage('tentang')} className={`py-1 transition-all cursor-pointer relative ${currentPage === 'tentang' ? 'text-emerald-700 font-bold' : 'hover:text-stone-900'}`}>Tentang Kami</button>
            <button onClick={() => switchPage('produk')} className={`py-1 transition-all cursor-pointer relative ${currentPage === 'produk' ? 'text-emerald-700 font-bold' : 'hover:text-stone-900'}`}>Menu Produk</button>
            <button onClick={() => switchPage('keranjang')} className={`py-1 transition-all cursor-pointer relative ${currentPage === 'keranjang' ? 'text-emerald-700 font-bold' : 'hover:text-stone-900'}`}>Keranjang</button>
            <button onClick={() => switchPage('kontak')} className={`py-1 transition-all cursor-pointer relative ${currentPage === 'kontak' ? 'text-emerald-700 font-bold' : 'hover:text-stone-900'}`}>Kontak & FAQ</button>
          </div>

          <button onClick={() => switchPage('produk')} className="bg-[#047857] hover:bg-[#065f46] text-white font-bold px-5 py-2.5 rounded-full text-xs transition shadow-md tracking-wide cursor-pointer">
            Pesan Sekarang
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-grow">
        
        {/* HALAMAN HOME */}
        {currentPage === 'home' && (
          <section className="py-16 md:py-24 px-6 max-w-6xl mx-auto transition-all">
            <div className="grid md:grid-cols-12 gap-12 items-center">
              <div className="md:col-span-7 space-y-6 text-left order-2 md:order-1">
                <div className="inline-flex items-center space-x-2 bg-amber-500/10 text-[#92400e] text-xs font-bold px-3.5 py-1.5 rounded-full border border-amber-500/20">
                  <span>🌾</span>
                  <span className="tracking-wide">Beras Premium Pilihan</span>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-black text-stone-900 leading-tight font-serif">
                  Beras Premium<br />
                  <span className="text-[#047857] underline decoration-amber-400 decoration-wavy decoration-1">Pilihan Keluarga</span>
                </h1>
                
                <p className="text-stone-600 text-sm md:text-base max-w-lg leading-relaxed">
                  Menyediakan beras premium berkualitas, pulen, bersih, dan sehat untuk keluarga indonesia.
                </p>
                
                <div className="pt-2 flex items-center gap-4">
                  <button onClick={() => switchPage('produk')} className="bg-[#047857] text-white font-bold px-6 py-3.5 rounded-full shadow-lg hover:bg-[#065f46] transition text-sm cursor-pointer">
                    Lihat Menu
                  </button>
                  <button onClick={() => switchPage('tentang')} className="bg-white text-stone-800 border border-stone-200 font-bold px-6 py-3.5 rounded-full hover:bg-stone-50 transition text-sm shadow-xs cursor-pointer">
                    Kisah Kami
                  </button>
                </div>
              </div>

              <div className="md:col-span-5 flex justify-center order-1 md:order-2 relative py-6">
                <div className="absolute w-72 h-72 bg-amber-500/10 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-[60px]"></div>
                <div className="relative">
                  <div className="w-[280px] h-[280px] md:w-[340px] md:h-[340px] rounded-full overflow-hidden border-4 border-white shadow-xl bg-stone-100 group">
                    <img src="/logo padi emas.jpeg" alt="Beras Premium" className="w-full h-full object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* HALAMAN TENTANG KAMI */}
        {currentPage === 'tentang' && (
          <section className="py-20 px-6 max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-extrabold text-stone-900 font-serif">Cerita Padi Emas</h2>
            <p className="text-stone-600 leading-relaxed text-sm md:text-base whitespace-pre-line text-left">
              Berawal dari Kepedulian Kecil
              Padi Emas Nusantara lahir dari sebuah mimpi sederhana: membawa bulir beras terbaik, sejujur, dan sesehat mungkin langsung dari tangan para petani lokal pilihan di penjuru nusantara ke meja makan keluarga Anda.

              Kami menyaksikan bagaimana rantai distribusi yang panjang seringkali merugikan petani sepihak dan menurunkan kualitas beras akibat zat kimia pengkilap buatan. Oleh karena itu, kami hadir memotong jalur tersebut untuk memberikan kebaikan murni yang sesungguhnya.
            </p>
          </section>
        )}

        {/* HALAMAN PRODUK */}
        {currentPage === 'produk' && (
          <section className="py-16 px-6 max-w-6xl mx-auto">
            <div className="text-center max-w-xl mx-auto mb-16 space-y-2">
              <h2 className="text-3xl md:text-4xl font-extrabold text-stone-900 tracking-tight font-serif">Pilihan Produk</h2>
              <p className="text-stone-500 text-sm">Dikemas rapi ukuran 10kg.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Produk 1 */}
              <div className="bg-white border border-stone-200/60 rounded-2xl overflow-hidden shadow-xs flex flex-col">
                <div className="aspect-video bg-stone-100 overflow-hidden">
                  <img src="/beras-pandanwangi.png" alt="Beras Pandan" className="w-full h-full object-cover" />
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-bold text-lg text-stone-900">Beras Pandan Wangi</h3>
                    <p className="text-xs text-stone-500 mt-1 leading-relaxed">Khas aroma pandan murni saat mulai matang di penanak. Tekstur jaminan pulen.</p>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-stone-100">
                    <span className="font-extrabold text-base text-[#065f46]">Rp 135.000</span>
                    <button onClick={() => addToCart('Beras Pandan Wangi', 135000)} className="bg-[#047857] text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-[#065f46] transition cursor-pointer">+ Tambah</button>
                  </div>
                </div>
              </div>

              {/* Produk 2 */}
              <div className="bg-white border border-stone-200/60 rounded-2xl overflow-hidden shadow-xs flex flex-col">
                <div className="aspect-video bg-stone-100 overflow-hidden">
                  <img src="/beras-premium.png" alt="Beras Premium" className="w-full h-full object-cover" />
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-bold text-lg text-stone-900">Beras Premium</h3>
                    <p className="text-xs text-stone-500 mt-1 leading-relaxed">Beras pilihan dengan kualitas terbaik, pulen, bersih, dan cocok untuk kebutuhan keluarga sehari-hari.</p>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-stone-100">
                    <span className="font-extrabold text-base text-[#065f46]">Rp 145.000</span>
                    <button onClick={() => addToCart('Beras Premium', 145000)} className="bg-[#047857] text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-[#065f46] transition cursor-pointer">+ Tambah</button>
                  </div>
                </div>
              </div>

              {/* Produk 3 */}
              <div className="bg-white border border-stone-200/60 rounded-2xl overflow-hidden shadow-xs flex flex-col">
                <div className="aspect-video bg-stone-100 overflow-hidden">
                  <img src="/beras-ketanputih.png" alt="Beras Ketan Putih" className="w-full h-full object-cover" />
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-bold text-lg text-stone-900">Beras Ketan Putih</h3>
                    <p className="text-xs text-stone-500 mt-1 leading-relaxed">Beras ketan berkualitas dengan tekstur lembut dan rasa yang pas untuk berbagai olahan tradisional.</p>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-stone-100">
                    <span className="font-extrabold text-base text-[#065f46]">Rp 155.000</span>
                    <button onClick={() => addToCart('Beras Ketan Putih', 155000)} className="bg-[#047857] text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-[#065f46] transition cursor-pointer">+ Tambah</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* HALAMAN KERANJANG */}
        {currentPage === 'keranjang' && (
          <section className="py-16 px-6 max-w-xl mx-auto">
            <h2 className="text-3xl font-extrabold text-stone-900 text-center mb-8 font-serif">Keranjang Belanja</h2>
            <div className="bg-white border border-stone-200/60 rounded-2xl p-6 shadow-xs space-y-6">
              <div className="divide-y divide-stone-100">
                {cart.length === 0 ? (
                  <p className="text-stone-400 text-center py-8 text-xs">Keranjang Anda kosong.</p>
                ) : (
                  cart.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-3 text-xs">
                      <div>
                        <span className="font-bold text-stone-900">{item.name}</span>
                        <p className="text-stone-400 text-[10px]">Rp {item.price.toLocaleString('id-ID')} x {item.qty}</p>
                      </div>
                      <span className="font-bold text-stone-900">Rp {(item.price * item.qty).toLocaleString('id-ID')}</span>
                    </div>
                  ))
                )}
              </div>
              <div className="flex justify-between items-center font-bold text-base border-t pt-4 border-stone-100">
                <span className="text-stone-500">Total Harga:</span>
                <span className="text-[#065f46] text-xl">Rp {calculateTotal().toLocaleString('id-ID')}</span>
              </div>
              <div className="space-y-3 pt-4 border-t border-stone-100">
                <input 
                  type="text" 
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  placeholder="Nama Lengkap Anda" 
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-stone-800 focus:outline-none focus:border-[#047857]"
                />
                <textarea 
                  value={buyerAddress}
                  onChange={(e) => setBuyerAddress(e.target.value)}
                  rows="3" 
                  placeholder="Alamat Pengiriman Lengkap" 
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-stone-800 focus:outline-none focus:border-[#047857]"
                ></textarea>
                <button onClick={checkoutToWhatsApp} className="w-full bg-[#047857] hover:bg-[#065f46] text-white font-bold py-3 rounded-xl transition flex items-center justify-center space-x-2 cursor-pointer text-xs">
                  <span>Kirim Pesanan ke WhatsApp</span>
                </button>
              </div>
            </div>
          </section>
        )}

        {/* HALAMAN KONTAK & FAQ */}
        {currentPage === 'kontak' && (
          <section className="py-16 px-6 max-w-4xl mx-auto text-center space-y-4">
            <h2 className="text-3xl font-extrabold text-stone-900 font-serif">Hubungi kami</h2>
            <p className="text-stone-500 text-xs">Operasional Toko: 09.00 - 20.00 WIB</p>
            <div className="max-w-sm mx-auto bg-white border border-stone-200/60 p-6 rounded-2xl text-xs text-stone-600 space-y-2 text-left shadow-xs">
              <p>Kp. Gangsa, Ds. Pasir Ampo, Kec Kresek, Tangerang</p>
              <p>+62 812-8199-7276</p>
            </div>
          </section>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-stone-900 text-stone-400 text-center py-6 text-[11px] tracking-wide border-t border-stone-800">
        &copy; 2026 Padi Emas Nusantara. Dibuat sepenuh hati oleh Siti Adawiah 24110310078
      </footer>
    </div>
  );
}