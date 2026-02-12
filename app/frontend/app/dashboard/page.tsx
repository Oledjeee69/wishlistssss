"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

interface Wishlist {
  id: number;
  title: string;
  description?: string | null;
  public_slug: string;
}

export default function DashboardPage() {
  const [wishlists, setWishlists] = useState<Wishlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      setError("Необходимо войти");
      setLoading(false);
      return;
    }
    async function load() {
      try {
        const res = await fetch(`${API_URL}/wishlists/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          throw new Error("Не удалось загрузить вишлисты");
        }
        const data = (await res.json()) as Wishlist[];
        setWishlists(data);
      } catch (err: any) {
        setError(err.message || "Ошибка");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-4 py-8">
      <header className="flex items-center justify-between gap-2">
        <h1 className="text-2xl font-semibold">Мои вишлисты</h1>
        <Link
          href="/wishlist/new"
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Новый вишлист
        </Link>
      </header>
      {loading && <p className="text-sm text-slate-500">Загружаем...</p>}
      {error && !loading && <p className="text-sm text-red-600">{error}</p>}
      {!loading && !error && wishlists.length === 0 && (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-600">
          <p className="font-medium">Здесь пока нет вишлистов</p>
          <p className="mt-1">
            Создайте первый список желаний — добавьте подарки и поделитесь ссылкой
            с друзьями.
          </p>
        </div>
      )}
      <section className="grid gap-3 md:grid-cols-2">
        {wishlists.map((wl) => (
          <article
            key={wl.id}
            className="flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-4 text-sm shadow-sm"
          >
            <div>
              <h2 className="text-base font-semibold">{wl.title}</h2>
              {wl.description && (
                <p className="mt-1 text-xs text-slate-600">{wl.description}</p>
              )}
            </div>
            <div className="mt-3 flex flex-col gap-1 text-xs text-slate-500">
              <span>
                Публичная ссылка:{" "}
                <code className="rounded bg-slate-100 px-1">
                  /w/{wl.public_slug}
                </code>
              </span>
              <div className="mt-1 flex gap-2">
                <Link
                  href={`/wishlist/${wl.id}`}
                  className="rounded-md border border-slate-300 px-3 py-1 text-xs font-medium text-slate-800 hover:bg-white"
                >
                  Открыть
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

