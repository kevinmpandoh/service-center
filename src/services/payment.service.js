import api from "@/lib/axios";

export const paymentSerive = {
  uploadProof: async (formData) => {
    const { data } = await api.post("/payments/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  },
};
