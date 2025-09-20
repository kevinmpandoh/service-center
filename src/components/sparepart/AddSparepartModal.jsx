// src/components/sparepart/AddSparepartModal.jsx
"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { sparepartSchema } from "@/schemas/sparepart.schema";
import { sparepartService } from "@/services/sparepart.service";
import { toast } from "sonner";

export function AddSparepartModal({ open, onOpenChange, initialData }) {
  const isEdit = Boolean(initialData?._id);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(sparepartSchema),
    defaultValues: {
      name: "",
      brand: "",
      stock: 0,
      buyPrice: "",
      sellPrice: "",
    },
  });

  // Prefill saat edit
  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const mutation = useMutation({
    mutationFn: (data) =>
      isEdit
        ? sparepartService.update(initialData._id, data)
        : sparepartService.create(data),
    onSuccess: () => {
      toast.success("Data Sparepart berhasil ditambahkan");
      queryClient.invalidateQueries(["spareparts"]);
      onOpenChange(false);
      reset();
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Sparepart" : "Tambah Sparepart"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm">Nama Sparepart</label>
            <Input {...register("name")} />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="text-sm">Merek</label>
            <Input {...register("brand")} />
            {errors.brand && (
              <p className="text-red-500 text-sm">{errors.brand.message}</p>
            )}
          </div>
          <div>
            <label className="text-sm">Stok</label>
            <Input type="number" {...register("stock")} />
            {errors.stock && (
              <p className="text-red-500 text-sm">{errors.stock.message}</p>
            )}
          </div>
          <div>
            <label className="text-sm">Harga Beli</label>
            <Input type="number" {...register("buyPrice")} />
            {errors.buyPrice && (
              <p className="text-red-500 text-sm">{errors.buyPrice.message}</p>
            )}
          </div>
          <div>
            <label className="text-sm">Harga Jual</label>
            <Input type="number" {...register("sellPrice")} />
            {errors.sellPrice && (
              <p className="text-red-500 text-sm">{errors.sellPrice.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Batal
            </Button>
            <Button type="submit" disabled={mutation.isLoading}>
              {mutation.isLoading
                ? "Menyimpan..."
                : isEdit
                ? "Simpan Perubahan"
                : "Tambah"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
