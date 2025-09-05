import api from "@/lib/axios";

export const getBrands = async () => {
  const res = await api.get("/brands?limit=20");
  return res.data.data; // karena backend balikin { status, data }
};

export const getDeviceModels = async (brandId) => {
  const res = await api.get(`/device-models?brand=${brandId}&limit=20`);
  return res.data.data; // karena backend balikin { data }
};
