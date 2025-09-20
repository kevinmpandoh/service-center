import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";

export const jasaSchema = yup.object({
  customServiceName: yup.string().required("Nama jasa wajib diisi"),
  customPrice: yup
    .number()
    .typeError("Harga wajib berupa angka")
    .required("Harga wajib diisi")
    .min(0, "Harga tidak boleh negatif"),
});

export default function JasaFormModal({
  open,
  onClose,
  onSubmit,
  defaultValues,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(jasaSchema),
    defaultValues: defaultValues || {
      customServiceName: "",
      customPrice: "",
    },
  });

  const submitHandler = (data) => {
    const payload = {
      type: "jasa",
      customServiceName: data.customServiceName,
      customPrice: Number(data.customPrice),
      id: defaultValues?.id,
    };
    onSubmit(payload);
    reset();
  };

  useEffect(() => {
    if (defaultValues) {
      reset({
        customServiceName: defaultValues.customServiceName || "",
        customPrice: defaultValues.customPrice || "",
      });
    }
  }, [defaultValues, reset]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {defaultValues?.id ? "Edit Jasa" : "Tambah Jasa"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
          <div className="space-y-4">
            <Input {...register("customServiceName")} placeholder="Nama jasa" />
            {errors.customServiceName && (
              <p className="text-red-500 text-sm">
                {errors.customServiceName.message}
              </p>
            )}

            <Input
              {...register("customPrice")}
              type="number"
              placeholder="Harga jasa"
            />
            {errors.customPrice && (
              <p className="text-red-500 text-sm">
                {errors.customPrice.message}
              </p>
            )}
          </div>

          <Button type="submit">
            {defaultValues?.id ? "Update" : "Simpan"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
