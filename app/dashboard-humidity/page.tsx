"use client";

import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Reading {
  time: string;
  value: number; // відносна вологість, %
}

interface HumiditySensor {
  id: string;
  timestamp: string;
  sensorName: string;
  value: number;
  unit: string;
  location?: string;
}

export default function DashboardHumidity() {
  const [readings, setReadings] = useState<Reading[]>([]);
  const [sensorLabel, setSensorLabel] = useState("Humidity sensor");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Базова адреса серверного застосунку (Render) з файлу .env / змінних середовища Vercel
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${apiUrl}/humidity-sensors`);
        if (!res.ok) throw new Error("Error fetching data");
        const data: HumiditySensor[] = await res.json();

        const formatted = data.map((item) => ({
          time: new Date(item.timestamp).toLocaleTimeString("uk-UA", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          value: item.value,
        }));

        const last = data.at(-1);
        if (last) {
          setSensorLabel(
            last.location ? `${last.sensorName} · ${last.location}` : last.sensorName,
          );
        }
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

  const current = readings.at(-1)?.value;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Графік давача вологості</h1>

      <div className="bg-gray-900 p-6 rounded-2xl shadow-md border border-gray-800">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">{sensorLabel}</h2>
          {current !== undefined && (
            <span className="px-3 py-1 rounded-full bg-teal-900/60 text-teal-300 font-semibold">
              {current} %
            </span>
          )}
        </div>
        {loading ? (
          <p className="text-gray-400">Завантаження даних...</p>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : readings.length === 0 ? (
          <p className="text-gray-400">
            Даних ще немає — надішліть POST-запит на /humidity-sensors
          </p>
        ) : (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={readings}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9ca3af" />
                <YAxis domain={[0, 100]} unit="%" stroke="#9ca3af" />
                <Tooltip
                  formatter={(v) => [`${v} %`, "Вологість"]}
                  contentStyle={{ backgroundColor: "#111827", border: "1px solid #374151" }}
                  labelStyle={{ color: "#f3f4f6" }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#2dd4bf"
                  fill="#2dd4bf"
                  fillOpacity={0.2}
                  strokeWidth={2}
                  dot={true}
                  activeDot={{ r: 6 }}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
