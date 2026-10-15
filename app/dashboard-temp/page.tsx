"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Reading {
  time: string;
  value: number;
}

interface TemperatureSensor {
  id: string;
  timestamp: string;
  sensorName: string;
  value: number;
  unit: string;
}

export default function DashboardTemp() {
  const [readings, setReadings] = useState<Reading[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Базова адреса серверного застосунку (Render) з файлу .env / змінних середовища Vercel
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${apiUrl}/temperature-sensors`);
        if (!res.ok) throw new Error("Error fetching data");
        const data: TemperatureSensor[] = await res.json();

        const formatted = data.map((item) => ({
          time: new Date(item.timestamp).toLocaleTimeString("uk-UA", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          value: item.value,
        }));

        setReadings(formatted);
        setError(null);
      } catch (err) {
        console.error("Fetching data:", err);
        setError("Не вдалося отримати дані від сервера");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    // Оновлення даних кожні 10 секунд
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [apiUrl]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Графік температурного сенсора
      </h1>

      <div className="bg-gray-900 p-6 rounded-2xl shadow-md border border-gray-800">
        <h2 className="text-lg font-medium mb-4">Sensor A</h2>
        {loading ? (
          <p className="text-gray-400">Завантаження даних...</p>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : readings.length === 0 ? (
          <p className="text-gray-400">
            Даних ще немає — надішліть POST-запит на /temperature-sensors
          </p>
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={readings}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9ca3af" />
                <YAxis domain={["auto", "auto"]} unit="°C" stroke="#9ca3af" />
                <Tooltip
                  formatter={(v) => [`${v} °C`, "Температура"]}
                  contentStyle={{ backgroundColor: "#111827", border: "1px solid #374151" }}
                  labelStyle={{ color: "#f3f4f6" }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#60a5fa"
                  strokeWidth={2}
                  dot={true}
                  activeDot={{ r: 6 }}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
