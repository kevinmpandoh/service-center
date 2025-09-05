// src/services/masterData.service.js

import api from "@/lib/axios";

export const masterDataService = {
  getSpareparts: async () => {
    const res = await api.get("/spareparts");
    return res.data.data;
  },
  getServiceItems: async () => {
    const res = await api.get("/service-items");
    return res.data.data;
  },
};
