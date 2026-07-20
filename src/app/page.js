"use client";

import React, { useState } from "react";

export default function Home() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const products = [
    {
      id: 1,
      name: "Beras Pandan Wangi",
      category: "Aromatik",
      price: 85000,
      unit: "5 Kg",
      image: "/beras-pandanwangi.png",
      desc: "Aroma wangi pandan alami dengan tekstur pulen khas Cianjur.",
    },
    {
      id: 2,
      name: "Beras Premium Super",
      category: "Biji Panjang",
      price: 78000,
      unit: "5 Kg",
      image: "/beras-premium.png",
      desc: "Beras putih bersih, bebas pemutih dan pengawet. Cocok untuk konsumsi harian.",
    },
    {
      id: 3,
      name: "Beras Ketan Putih",
      category: "Spesial",
      price: 90000,
      unit: "5 Kg",
      image: "/beras-ketanputih.png",
      desc: "Kualitas terbaik untuk olahan kue tradisional dan jajanan pasar.",
    },
  ];

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQty = (id, amount) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id) {
          const newQty = item.qty + amount;
          return newQty > 0 ? { ...item, qty: newQty } : item;
        }
        return item;
      })
    );
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const sendToWhatsApp = () => {
    if (cart.length === 0) return;
    let message = "Halo Padi Emas Nusantara, saya mau pesan:\n\n";
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (${item.unit}) x${item.qty} = Rp ${(
        item.price * item.qty
      ).toLocaleString("id-ID")}\n`;
    });
    message += `\n*Total Pembayaran: Rp ${totalPrice.toLocaleString("id-ID")}*`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/6281234567890?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-amber-50/40 text-slate-800 font-sans">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-amber-200/60 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo padi emas.jpeg"
              alt="Logo Padi Emas Nusantara"
              className="w-11 h-11 rounded-full object-cover border border-amber-300 shadow-sm"
            />
            <div>
              <h1 className="font-bold text-lg text-amber-900 leading-tight">
                Padi Emas
              </h1>
              <p className="text-xs text-amber-700 font-medium">
                Nusantara
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#beranda" className="hover:text-amber-700 transition">
              Beranda
            </a>
            <a href="#produk" className="hover:text-amber-700 transition">
              Produk
            </a>
            <a href="#tentang" className="hover:text-amber-700 transition">
              Tentang Kami
            </a>
          </nav>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-full font-medium text-sm flex items-center gap-2 transition shadow-sm"
          >
            <span>🛒 Keranjang</span>
            {totalItems > 0 && (
              <span className="bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="beranda" className="max-w-6xl mx-auto px-4 py-12 md:py-20">
        <div className="bg-gradient-to-r from-amber-800 to-amber-900 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-lg z-10">
            <span className="inline-block bg-amber-400/20 text-amber-200 text-xs font-semibold px-3 py-1 rounded-full border border-amber-300/30 mb-4">
              Kualitas Premium Terjamin
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
              Pilihan Utama Beras Keluarga Nusantara
            </h2>
            <p className="text-amber-100/90 text-sm md:text-base mb-6">
              Diproses higienis tanpa pemutih dan bahan kimia. Hadirkan kehangatan cita rasa nasi pulen di setiap hidangan keluarga.
            </p>
            <a
              href="#produk"
              className="inline-block bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold px-6 py-3 rounded-xl shadow-md transition"
            >
              Lihat Produk Beras
            </a>
          </div>
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border-4 border-amber-400/30 shadow-2xl flex-shrink-0">
            <img
              src="/logo padi emas.jpeg"
              alt="Padi Emas"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Katalog Produk */}
      <section id="produk" className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-amber-950">
            Katalog Produk Beras
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Pilih varian beras berkualitas sesuai kebutuhan dapur Anda
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md border border-amber-100 transition flex flex-col justify-between"
            >
              <div>
                <div className="w-full h-48 bg-amber-50 rounded-xl mb-4 overflow-hidden flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-xs font-semibold bg-amber-100 text-amber-800 px-2.5 py-1 rounded-md">
                  {item.category}
                </span>
                <h3 className="font-bold text-lg text-slate-800 mt-2">
                  {item.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400">Harga / {item.unit}</span>
                  <p className="font-extrabold text-amber-900 text-base">
                    Rp {item.price.toLocaleString("id-ID")}
                  </p>
                </div>
                <button
                  onClick={() => addToCart(item)}
                  className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-sm"
                >
                  + Tambah
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Slide / Drawer Keranjang Belanja */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between p-6 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b">
                <h3 className="font-bold text-lg text-slate-800">
                  Keranjang Belanja
                </h3>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-slate-400 hover:text-slate-600 font-bold text-xl"
                >
                  ✕
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-sm">
                  Keranjang masih kosong.
                </div>
              ) : (
                <div className="mt-4 space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between bg-amber-50/50 p-3 rounded-xl border border-amber-100"
                    >
                      <div>
                        <h4 className="font-semibold text-sm text-slate-800">
                          {item.name}
                        </h4>
                        <p className="text-xs text-amber-800 font-bold mt-0.5">
                          Rp {(item.price * item.qty).toLocaleString("id-ID")}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQty(item.id, -1)}
                          className="w-7 h-7 bg-white border border-slate-200 rounded-lg text-slate-600 font-bold text-sm"
                        >
                          -
                        </button>
                        <span className="text-xs font-bold px-1">{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, 1)}
                          className="w-7 h-7 bg-white border border-slate-200 rounded-lg text-slate-600 font-bold text-sm"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 ml-2 text-xs"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="pt-4 border-t mt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-slate-600">
                    Total
                  </span>
                  <span className="text-xl font-extrabold text-amber-900">
                    Rp {totalPrice.toLocaleString("id-ID")}
                  </span>
                </div>
                <button
                  onClick={sendToWhatsApp}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-md"
                >
                  💬 Pesan via WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-amber-950 text-amber-200/80 mt-16 py-8 text-center text-xs border-t border-amber-900">
        <p>© 2026 Padi Emas Nusantara. Seluruh Hak Cipta Dilindungi.</p>
      </footer>
    </div>
  );
}