// src/validations/sparepartSchema.js
import * as yup from "yup";

export const sparepartSchema = yup.object().shape({
  name: yup.string().required("Nama sparepart wajib diisi"),
  brand: yup.string().required("Merek wajib diisi"),
  stock: yup
    .number()
    .typeError("Stok harus berupa angka")
    .min(0, "Stok tidak boleh negatif")
    .required("Stok wajib diisi"),
  buyPrice: yup
    .number()
    .typeError("Harga beli harus berupa angka")
    .required("Harga beli wajib diisi"),
  sellPrice: yup
    .number()
    .typeError("Harga jual harus berupa angka")
    .required("Harga jual wajib diisi"),
});
