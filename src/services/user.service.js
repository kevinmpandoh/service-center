import api from "@/lib/axios";

export const userService = {
  getAll: async ({ page = 1, limit = 10, q, filterRole }) => {
    const params = { page, limit };
    if (filterRole && filterRole !== "all") params.role = filterRole;
    if (q) params.q = q;
    const res = await api.get("/users", {
      params,
    });
    return res.data;
  },
  create: async (payload) => {
    const res = await api.post(`/users/`, payload);
    return res.data.data;
  },
  update: async (id, payload) => {
    const res = await api.put(`/users/${id}`, payload);
    return res.data.data;
  },
  delete: async (id) => {
    const res = await api.delete(`/users/${id}`);
    return res.data.data;
  },
  getCurrent: async () => {
    const res = await api.get("/auth/user-current");
    return res.data.data;
  },
  updateCurrent: async (payload) => {
    const res = await api.patch("/auth/user-current", payload);
    return res.data.data;
  },
  uploadPhoto: async (formData) => {
    const res = await api.post("/auth/upload-photo", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  deletePhoto: async () => {
    const res = await api.delete("/auth/delete-photo");
    return res.data;
  },
};
