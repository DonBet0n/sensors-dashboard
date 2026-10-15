"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/dashboard-temp", label: "Temperature" },
    { href: "/dashboard-humidity", label: "Humidity" },
    { href: "/login", label: "Login" },
  ];

  return (
    <nav className="bg-gray-900 border-b border-gray-800 shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-400">Sensors Dashboard</h1>
      <ul className="flex gap-6">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`${
                pathname === link.href
                  ? "text-blue-400 font-semibold border-b-2 border-blue-400"
                  : "text-gray-400 hover:text-blue-300"
              } transition-all`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
