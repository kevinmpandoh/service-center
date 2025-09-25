import api from "@/lib/axios";

export const getBrands = async ({ type }) => {
  let url = "/brands?limit=20";

  if (type) {
    url += `&type=${encodeURIComponent(type)}`;
  }

  const res = await api.get(url);
  return res.data.data; // karena backend balikin { status, data }
};

export const getDeviceModels = async (brandId) => {
  const res = await api.get(`/device-models/brand?brand=${brandId}&limit=20`);
  return res.data.data; // karena backend balikin { data }
};

export const getAllDeviceModels = async ({ page = 1, search }) => {
  const params = { page, search };
  const res = await api.get(`/device-models`, { params });
  return res.data; // karena backend balikin { data }
};

export const createDevice = async (data) => {
  const res = await api.post(`/device-models`, data);
  return res.data;
};
export const editDevice = async (id, data) => {
  const res = await api.put(`/device-models/${id}`, data);
  return res.data;
};

export const deleteDevice = async (id) => {
  const res = await api.delete(`/device-models/${id}`);
  return res.data;
};
