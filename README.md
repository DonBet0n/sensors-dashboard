# sensors-dashboard

Клієнтський застосунок на Next.js + Tailwind CSS (ЛР2, ЛР3 з курсу ТПККСМ).
Сторінки `/dashboard-temp` і `/dashboard-humidity` отримують дані від API
([sensors-api](../sensors-api)) і будують графіки, оновлюючи їх кожні 10 секунд.

## Налаштування

Створіть файл `.env` (див. `.env.example`):

```
NEXT_PUBLIC_API_URL=https://<унікальне-імʼя>.onrender.com
```

## Запуск

```bash
npm install
npm run dev
```

## Розгортання на Vercel

Імпортуйте публічний репозиторій у Vercel і в розділі **Environment Variables**
додайте `NEXT_PUBLIC_API_URL` з адресою сервісу на Render.
