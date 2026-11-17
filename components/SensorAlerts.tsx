"use client";

import { useEffect, useState } from "react";

interface SensorAlert {
  message: string;
  sensorName: string;
  timestamp: string;
  severity: "critical" | "warning";
}

export default function SensorAlerts({ path }: { path: string }) {
  const [alerts, setAlerts] = useState<SensorAlert[]>([]);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!apiUrl) return;

    const eventSource = new EventSource(`${apiUrl}/${path}/alerts`);

    eventSource.onmessage = (event) => {
      const alert: SensorAlert = JSON.parse(event.data);
      setAlerts((prev) => [alert, ...prev].slice(0, 5));
    };

    eventSource.onerror = (error) => {
      console.error("SSE Error:", error);
    };

    return () => {
      eventSource.close();
    };
  }, [apiUrl, path]);

  if (alerts.length === 0) return null;

  return (
    <div className="space-y-2 mb-6">
      {alerts.map((alert, index) => (
        <div
          key={`${alert.timestamp}-${index}`}
          className="bg-red-950/60 border-l-4 border-red-500 text-red-200 p-4 rounded shadow-md"
          role="alert"
        >
          <p className="font-bold">⚠️ {alert.message}</p>
          <p className="text-sm">
            Давач: {alert.sensorName} | Час:{" "}
            {new Date(alert.timestamp).toLocaleTimeString("uk-UA")}
          </p>
        </div>
      ))}
    </div>
  );
}
