import * as yup from "yup";

export const paymentSchema = yup.object().shape({
  paymentMethod: yup.string().required("Metode pembayaran wajib dipilih"),
  proof: yup.mixed().when("paymentMethod", {
    is: "transfer",
    then: (schema) => schema.required("Bukti pembayaran wajib diupload"),
    otherwise: (schema) => schema.nullable().transform(() => null),
  }),
});
