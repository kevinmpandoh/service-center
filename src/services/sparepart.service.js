import api from "@/lib/axios";

export const sparepartService = {
  getAll: async ({ page = 1, limit = 10, q }) => {
    const params = { page, limit };
    if (q) params.q = q;

    const res = await api.get("/spareparts", { params });
    return res.data; // { data: [...], pagination: {...} }
  },
  getUsed: async ({ page = 1, limit = 10, q, startDate, endDate }) => {
    const params = { page, limit, startDate, endDate };
    if (q) params.q = q;

    const res = await api.get("/spareparts/used", { params });
    return res.data; // { data: [...], pagination: {...} }
  },
  create: async (payload) => {
    const res = await api.post(`/spareparts/`, payload);
    return res.data.data;
  },
  update: async (id, payload) => {
    const res = await api.put(`/spareparts/${id}`, payload);
    return res.data.data;
  },
  delete: async (id, payload) => {
    const res = await api.delete(`/spareparts/${id}`, payload);
    return res.data.data;
  },

  exportUsed: async ({ startDate, endDate, format = "excel" }) => {
    const res = await api.get(`/spareparts/used/export`, {
      params: { startDate, endDate, format },
      responseType: "blob", // penting untuk download file
    });

    const blob = new Blob([res.data], {
      type:
        format === "pdf"
          ? "application/pdf"
          : "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download =
      format === "pdf" ? "laporan_sparepart.pdf" : "laporan_sparepart.xlsx";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  },
};
