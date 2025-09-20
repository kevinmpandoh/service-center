import api from "@/lib/axios";
import axios from "axios";

export const serviceOrderService = {
  getAllServiceOrders: async ({ page = 1, limit = 10, status, q }) => {
    const params = { page, limit };
    if (status && status !== "Semua") params.status = status;
    if (q) params.q = q;

    const res = await api.get("/service-orders", { params });
    return res.data; // { data: [...], pagination: {...} }
  },
  getAllFinishedServiceOrders: async ({
    page = 1,
    limit = 10,
    q,
    startDate,
    endDate,
  }) => {
    const params = { page, limit, startDate, endDate };
    if (q) params.q = q;

    const res = await api.get("/service-orders/finished", { params });
    return res.data; // { data: [...], pagination: {...} }
  },

  getById: async (id) => {
    const res = await api.get(`/service-orders/${id}`);
    return res.data.data; // karena backend balikin { data }
  },

  createService: async (payload) => {
    const res = await api.post("/service-orders", payload);

    return res.data;
  },

  createDetail: async (orderId, data) => {
    const res = await api.post(`/service-orders/${orderId}/details`, data);
    return res.data;
  },

  // UPDATE (butuh detailId + payload)
  updateDetail: async (detailId, data) => {
    const res = await api.put(`/service-details/${detailId}`, data);
    return res.data;
  },

  // DELETE (butuh detailId)
  deleteDetail: async (detailId) => {
    const res = await api.delete(`/service-details/${detailId}`);
    return res.data;
  },

  startRepair: async (id) => {
    const res = await api.patch(`/service-orders/${id}/start`);

    return res.data;
  },
  finishRepair: async (id, waranty) => {
    console.log(waranty, "WARANTI NYA");
    const res = await api.patch(`/service-orders/${id}/complete`, {
      duration: waranty,
    });

    return res.data;
  },
  payment: async (id, payload) => {
    const res = await api.post(`/service-orders/${id}/payments`, {
      paymentMethod: payload.paymentMethod,
      paymentProof: payload.proof,
    });

    return res.data;
  },

  pickup: async (id) => {
    const res = await api.patch(`/service-orders/${id}/pickup`);

    return res.data;
  },
  downloadInvoice: async (id) => {
    return await api.get(`/service-orders/${id}/invoice`, {
      responseType: "blob",
    });
  },
  exportReport: async ({ startDate, endDate, format = "excel" }) => {
    const res = await api.get(`/service-orders/finished/export`, {
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

  estimatedService: async (payload) => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL_ESTIMATE}/estimate`,
      payload
    );
    return res.data;
  },
};
