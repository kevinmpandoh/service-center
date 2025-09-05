"use client";

import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboard.service";
import SummaryCard from "@/components/dashboard/SummaryCard";
import TaskList from "@/components/dashboard/TaskList";
import HistoryTable from "@/components/dashboard/HistoryTable";
import BarChartDashboard from "@/components/common/BarChart";
import RevenueChartCard from "@/components/common/LineChart";
import ProtectedRoute from "@/components/HOC/ProtectedRoute";
import {
  CalendarCheck,
  CalendarClock,
  CircleDollarSign,
  Wrench,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-teknisi"],
    queryFn: dashboardService.getAdminDashboard,
  });

  if (isLoading) return <p>Loading...</p>;

  const { topDevices, history, summary, monthlyIncome } = data || {};

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold">Dashboard Teknisi</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <SummaryCard
            title="Total Pendapatan Hari ini"
            value={summary.totalIncomeToday}
            icon={CircleDollarSign}
          />
          <SummaryCard
            title="Total Perbaikan Hari ini"
            value={summary.totalRepairsToday}
            icon={Wrench}
          />
          <SummaryCard
            title="Perangkat Diproses Hari ini"
            value={summary.totalRepairInProgress}
            icon={CalendarClock}
          />
          <SummaryCard
            title="Total Sparepart digunakan"
            value={summary.totalSparepartUsed}
            icon={CalendarCheck}
          />
        </div>

        {/* Chart + Task List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RevenueChartCard data={monthlyIncome} />
          <BarChartDashboard
            data={topDevices}
            title={" Tipe Perangkat yang Sering Diperbaiki"}
          />
        </div>

        {/* History Table */}
        <HistoryTable data={history} />
      </div>
    </ProtectedRoute>
  );
}
