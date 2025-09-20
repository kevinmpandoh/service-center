// src/validations/sparepartSchema.js
import * as yup from "yup";

export const deviceModelSchema = yup.object().shape({
  deviceType: yup
    .string()
    // .isValid(["HP", "Laptop", "Tablet", "Jam"])
    .required("Tipe perangkat wajib diisi"),
  brand: yup.string().required("Merek wajib diisi"),
  deviceModel: yup.string().required("Nama Tipe wajib diisi"),
});
