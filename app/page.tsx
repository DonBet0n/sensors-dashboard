export default function HomePage() {
  return (
    <section className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        Лабораторна №3 — розгортання на Render та Vercel
      </h1>
      <p className="mb-6 text-gray-300">
        Цей проєкт демонструє роботу системи моніторингу давачів температури та
        вологості у реальному часі. Інтерфейс побудований на{" "}
        <strong className="text-white">Next.js</strong> з використанням{" "}
        <strong className="text-white">Tailwind CSS</strong> для швидкої
        розробки адаптивного дизайну. Дані з давачів візуалізуються у вигляді
        динамічних графіків для зручного відстеження змін показників.
      </p>
      <p className="text-gray-300">
        Дані для графіків надходять від серверного застосунку на{" "}
        <strong className="text-white">NestJS</strong>, розгорнутого на{" "}
        <strong className="text-white">Render</strong>, а клієнтський
        застосунок розгорнуто на <strong className="text-white">Vercel</strong>.
        Графіки оновлюються автоматично кожні 10 секунд.
      </p>
    </section>
  );
}
