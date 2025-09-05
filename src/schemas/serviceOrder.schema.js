import * as yup from "yup";

export const serviceOrderSchema = yup.object().shape({
  deviceType: yup.string().required("Jenis perangkat wajib dipilih"),
  // brand & model validasi tergantung deviceType
  brand: yup.string().when("deviceType", {
    is: (val) => val !== "Lain-lain",
    then: (schema) => schema.required("Merek wajib dipilih"),
    otherwise: (schema) => schema.nullable().notRequired(),
  }),
  model: yup.string().when("deviceType", {
    is: (val) => val !== "Lain-lain",
    then: (schema) => schema.required("Tipe wajib dipilih"),
    otherwise: (schema) => schema.nullable().notRequired(),
  }),

  customBrand: yup.string().when("deviceType", {
    is: "Lain-lain",
    then: (schema) => schema.required("Merek wajib diisi"),
    otherwise: (schema) => schema.nullable().notRequired(),
  }),

  customModel: yup.string().when("deviceType", {
    is: "Lain-lain",
    then: (schema) => schema.required("Tipe wajib diisi"),
    otherwise: (schema) => schema.nullable().notRequired(),
  }),
  damage: yup.string().required("Jenis kerusakan wajib dipilih"),
  accessories: yup.string().optional(),
  customerName: yup.string().required("Nama pelanggan wajib diisi"),
  customerPhone: yup.string().nullable(),

  dp: yup.boolean().default(false),
  paymentMethod: yup.string().when("dp", {
    is: true,
    then: (schema) =>
      schema.oneOf(["cash", "transfer"], "Pilih metode pembayaran").required(),
    otherwise: (schema) => schema.nullable().notRequired(),
  }),

  dpAmount: yup.string().when("dp", {
    is: true,
    then: (schema) => schema.required("Jumlah DP wajib diisi"),
    otherwise: (schema) => schema.nullable().notRequired(),
  }),
  proof: yup.mixed().when(["dp", "paymentMethod"], {
    is: (dp, method) => dp && method === "transfer",
    then: (schema) =>
      schema.test(
        "fileRequired",
        "Bukti pembayaran wajib diupload",
        (value) => {
          if (!value) return false;
          const files = value;
          return files && files.length > 0;
        }
      ),
    otherwise: (schema) => schema.nullable().notRequired(),
  }),
});
