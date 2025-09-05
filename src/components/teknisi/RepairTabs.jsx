// src/components/RepairTabs.jsx
"use client";
import { useState } from "react";

const tabs = [
  "Semua",
  "diterima",
  "diperbaiki",
  "menunggu pembayaran",
  "siap diambil",
];

export default function RepairTabs({ onChange }) {
  const [active, setActive] = useState("Semua");

  const handleClick = (tab) => {
    setActive(tab);
    onChange(tab);
  };

  return (
    <div className="flex gap-2 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => handleClick(tab)}
          className={`px-4 py-2 capitalize rounded-md text-sm font-medium ${
            active === tab
              ? "bg-slate-900 text-white"
              : "border-2 border-slate-900  hover:bg-gray-200"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
