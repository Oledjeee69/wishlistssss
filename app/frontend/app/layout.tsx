import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Social Wishlist",
  description: "Социальный вишлист с резервами и скидыванием",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <div className="mx-auto max-w-5xl px-4 py-6">{children}</div>
      </body>
    </html>
  );
}

