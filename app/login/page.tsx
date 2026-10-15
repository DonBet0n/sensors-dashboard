import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-lg border border-gray-800 w-96">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-100">
          Вхід у систему
        </h1>

        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-left text-gray-300 font-medium mb-1"
            >
              Електронна пошта
            </label>
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              className="w-full px-4 py-2 bg-gray-800 text-gray-100 placeholder-gray-500 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-left text-gray-300 font-medium mb-1"
            >
              Пароль
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 bg-gray-800 text-gray-100 placeholder-gray-500 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled
            />
          </div>

          <button
            type="button"
            disabled
            className="w-full py-2 bg-blue-600 text-white rounded-lg opacity-60 cursor-not-allowed"
          >
            Авторизація тимчасово недоступна
          </button>
        </form>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-blue-400 hover:underline text-sm font-medium"
          >
            ← Повернутись на головну
          </Link>
        </div>
      </div>
    </div>
  );
}
