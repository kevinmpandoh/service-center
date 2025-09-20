import {
  LayoutDashboard,
  Banknote,
  Settings,
  Wrench,
  Package,
  Users,
  UserCog,
  MonitorSmartphone,
} from "lucide-react";

export const sidebarMenu = {
  teknisi: [
    {
      icon: <LayoutDashboard />,
      name: "Dashboard",
      path: "/dashboard/teknisi",
    },
    {
      icon: <MonitorSmartphone />,
      name: "Perbaikan Aktif",
      path: "/dashboard/perbaikan-aktif",
    },
    {
      icon: <Wrench />,
      name: "Perbaikan Selesai",
      path: "/dashboard/perbaikan-selesai",
    },
    {
      icon: <MonitorSmartphone />,
      name: "Kelola Perangkat",
      path: "/dashboard/perangkat",
    },
  ],

  sparepart: [
    {
      icon: <LayoutDashboard />,
      name: "Dashboard",
      path: "/dashboard/sparepart",
    },
    {
      icon: <UserCog />,
      name: "Kelola Spareaprt",
      path: "/dashboard/kelola-sparepart",
    },
    {
      icon: <Package />,
      name: "Sparepart Terpakai",
      path: "/dashboard/sparepart-terpakai",
    },
  ],

  admin: [
    { icon: <LayoutDashboard />, name: "Dashboard", path: "/dashboard/admin" },
    {
      icon: <MonitorSmartphone />,
      name: "Perbaikan Aktif",
      path: "/dashboard/perbaikan-aktif",
    },
    {
      icon: <Wrench />,
      name: "Perbaikan Selesai",
      path: "/dashboard/perbaikan-selesai",
    },
    {
      icon: <UserCog />,
      name: "Kelola Spareaprt",
      path: "/dashboard/kelola-sparepart",
    },
    {
      icon: <Package />,
      name: "Sparepart Terpakai",
      path: "/dashboard/sparepart-terpakai",
    },
    {
      icon: <MonitorSmartphone />,
      name: "Kelola Perangkat",
      path: "/dashboard/perangkat",
    },
    { icon: <Users />, name: "Manajemen User", path: "/dashboard/users" },
  ],
};
