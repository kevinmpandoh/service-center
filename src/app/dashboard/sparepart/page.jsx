"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboard.service";
import SummaryCard from "@/components/dashboard/SummaryCard";
import DevicesChart from "@/components/dashboard/DevicesChart";
import TaskList from "@/components/dashboard/TaskList";
import HistoryTable from "@/components/dashboard/HistoryTable";
import LowStock from "@/components/dashboard/LowStock";
import HistoryTableSparepart from "@/components/dashboard/HistoryTableSparepart";
import BarChart from "@/components/common/BarChart";
import BarChartDashboard from "@/components/common/BarChart";
import {
  Calendar,
  CheckCircle,
  CircleAlert,
  Clock,
  FileWarning,
  Wrench,
} from "lucide-react";
import ProtectedRoute from "@/components/HOC/ProtectedRoute";

export default function DashboardSparepart() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-sparepart"],
    queryFn: dashboardService.getSparepartDashboard,
  });

  if (isLoading) return <p>Loading...</p>;

  const { mostUsed, history, summary, lowStock } = data || {};

  return (
    <ProtectedRoute allowedRoles={["sparepart"]}>
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold">
          Dashboard Pengelola Sparepart
        </h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <SummaryCard
            title="Sparepart Terpakai Bulan ini"
            value={summary.totalSoldMonth}
            icon={Calendar}
          />
          <SummaryCard
            title="Sparepart Terpakai Hari ini"
            value={summary.totalSoldToday}
            icon={Clock}
          />

          <SummaryCard
            title="Sparepart Hampir Habis"
            value={summary.lowStock}
            icon={CircleAlert}
          />
          <SummaryCard
            title="Perangkat Selesai Hari Ini"
            value={summary.finishedToday}
            icon={CheckCircle}
          />
        </div>
        {/* Chart + Task List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BarChartDashboard
            data={mostUsed}
            title={"Sparepart yang sering dipakai"}
          />
          <LowStock spareparts={lowStock} />
        </div>
        {/* History Table */}
        <HistoryTableSparepart data={history} isLoading={isLoading} />
      </div>
    </ProtectedRoute>
  );
}
