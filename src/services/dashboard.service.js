import api from "@/lib/axios";

export const dashboardService = {
  getTeknisiDashboard: async () => {
    const res = await api.get("/dashboard/teknisi");
    return res.data;
  },
  getSparepartDashboard: async () => {
    const res = await api.get("/dashboard/sparepart");
    return res.data;
  },
  getAdminDashboard: async () => {
    const res = await api.get("/dashboard/admin");
    return res.data;
  },
};
