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
      name: "Stok Sparepart",
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
      name: "Stok Sparepart",
      path: "/dashboard/sparepart-terpakai",
    },
    { icon: <Users />, name: "Manajemen User", path: "/dashboard/users" },
  ],
};
