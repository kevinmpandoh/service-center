import api from "@/lib/axios";

export const getDamageTypes = async () => {
  const res = await api.get("/damage-types");
  return res.data.data; // karena backend balikin { data: [...] }
};
