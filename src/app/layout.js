import "./globals.css";

export const metadata = {
  title: "Padi Emas Nusantara - Toko Beras Premium",
  description: "Beras Premium Pilihan Keluarga Indonesia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}