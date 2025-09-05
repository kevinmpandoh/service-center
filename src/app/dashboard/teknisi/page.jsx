"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboard.service";
import SummaryCard from "@/components/dashboard/SummaryCard";
import TaskList from "@/components/dashboard/TaskList";
import HistoryTable from "@/components/dashboard/HistoryTable";
import BarChartDashboard from "@/components/common/BarChart";
import ProtectedRoute from "@/components/HOC/ProtectedRoute";
import {
  CalendarCheck,
  CalendarClock,
  CalendarDays,
  Wrench,
} from "lucide-react";

export default function DashboardTeknisiPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-teknisi"],
    queryFn: dashboardService.getTeknisiDashboard,
  });

  if (isLoading) return <p>Loading...</p>;

  const { devices, history, summary, tasks } = data || {};

  return (
    <ProtectedRoute allowedRoles={["teknisi"]}>
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold">Dashboard Teknisi</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <SummaryCard
            title="Total Perbaikan Bulan ini"
            value={summary.totalMonth}
            icon={CalendarDays}
          />
          <SummaryCard
            title="Total Perbaikan Hari ini"
            value={summary.totalToday}
            icon={Wrench}
          />
          <SummaryCard
            title="Perangkat Diproses Hari ini"
            value={summary.inProgress}
            icon={CalendarClock}
          />
          <SummaryCard
            title="Perangkat Selesai Hari ini"
            value={summary.finishedToday}
            icon={CalendarCheck}
          />
        </div>

        {/* Chart + Task List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BarChartDashboard
            data={devices}
            title={" Tipe Perangkat yang Sering Diperbaiki"}
          />
          <TaskList tasks={tasks} />
        </div>

        {/* History Table */}
        <HistoryTable data={history} />
      </div>
    </ProtectedRoute>
  );
}
