import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center gap-6 text-center">
      <h1 className="text-3xl font-bold">Социальный вишлист</h1>
      <p className="max-w-xl text-slate-600">
        Создавайте списки желаний, делитесь ими с друзьями, резервируйте подарки
        и скидывайтесь на дорогие — с realtime‑обновлениями и сюрпризом для
        именинника.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/auth/register"
          className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-indigo-700"
        >
          Создать аккаунт
        </Link>
        <Link
          href="/auth/login"
          className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-800 hover:bg-white"
        >
          Войти
        </Link>
      </div>
      <p className="text-xs text-slate-500">
        Или откройте ссылку на вишлист, если вам её прислали.
      </p>
    </main>
  );
}

