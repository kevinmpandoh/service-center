import api from "../lib/axios";

export const authService = {
  async login(data) {
    const res = await api.post("/auth/login", data);
    return res.data.data;
  },

  logout: async () => {
    const { data } = await api.post("/auth/logout");
    return data;
  },

  changePassword: async (payload) => {
    const { data } = await api.patch("/auth/change-password", payload);
    return data;
  },
};
