"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function BarChartDashboard({ title, data }) {
  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <h2 className=" text-xl font-semibold mb-3">{title}</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          layout="vertical"
          data={data}
          margin={{ left: 40 }}
          barSize={20}
          width={500}
          height={300}
        >
          <XAxis type="number" hide />
          <YAxis dataKey="name" type="category" />
          <Tooltip />
          <Bar dataKey="total" fill="#334155" radius={[2, 2, 2, 2]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
