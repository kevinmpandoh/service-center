"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { masterDataService } from "@/services/masterData.service";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";

// ✅ Schema Yup
const sparepartSchema = yup.object().shape({
  sparepart: yup.string().required("Sparepart wajib dipilih"),
  quantity: yup
    .number()
    .typeError("Jumlah harus berupa angka")
    .min(1, "Minimal 1")
    .required("Jumlah wajib diisi"),
});

export default function SparepartFormModal({
  open,
  onClose,
  onSubmit,
  defaultValues,
}) {
  const { data: spareparts = [], isLoading } = useQuery({
    queryKey: ["spareparts"],
    queryFn: masterDataService.getSpareparts,
  });

  const form = useForm({
    resolver: yupResolver(sparepartSchema),
    defaultValues: {
      sparepart: "",
      quantity: 1,
      ...defaultValues,
    },
  });

  const { register, handleSubmit, setValue, watch, reset, formState } = form;
  const { errors } = formState;

  // ✅ reset form kalau defaultValues berubah (edit mode)
  useEffect(() => {
    if (defaultValues) {
      reset({
        sparepart: defaultValues.sparepart || "",
        quantity: defaultValues.quantity || 1,
      });
    }
  }, [defaultValues, reset]);

  const sparepart = watch("sparepart");

  console.log(defaultValues, sparepart, "TES");

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {defaultValues?.id ? "Edit Sparepart" : "Tambah Sparepart"}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit((data) =>
            onSubmit({ ...data, type: "sparepart", id: defaultValues?.id })
          )}
          className="space-y-4"
        >
          {/* Pilih sparepart */}
          <div>
            <label className="block text-sm font-medium mb-1">Sparepart</label>
            <Select
              value={sparepart}
              onValueChange={(val) => setValue("sparepart", val)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih sparepart" />
              </SelectTrigger>
              <SelectContent>
                {isLoading ? (
                  <SelectItem disabled value="loading">
                    Loading...
                  </SelectItem>
                ) : (
                  spareparts.map((item) => (
                    <SelectItem key={item._id} value={item._id}>
                      {item.name} - Rp {item.sellPrice.toLocaleString("id-ID")}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            {errors.sparepart && (
              <p className="text-red-500 text-sm mt-1">
                {errors.sparepart.message}
              </p>
            )}
          </div>

          {/* Quantity */}
          <div>
            <Input
              type="number"
              placeholder="Jumlah"
              min={1}
              {...register("quantity")}
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm mt-1">
                {errors.quantity.message}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full">
            {defaultValues?.id ? "Update" : "Simpan"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
