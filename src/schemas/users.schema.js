// src/validations/sparepartSchema.js
import * as yup from "yup";

export const userSchema = (isEdit = false) =>
  yup.object().shape({
    name: yup.string().required("Nama wajib diisi"),
    username: yup.string().required("Username wajib diisi"),
    email: yup
      .string()
      .email("Email tidak valid")
      .required("Email wajib diisi"),
    phone: yup
      .string()
      .matches(/^[0-9]+$/, "Nomor HP hanya boleh angka")
      .required("Nomor HP wajib diisi"),
    role: yup.string().required("Role wajib dipilih"),
    password: isEdit
      ? yup.string().optional() // kalau edit, password boleh kosong
      : yup
          .string()
          .required("Password wajib diisi")
          .min(6, "Minimal 6 karakter"),
  });
