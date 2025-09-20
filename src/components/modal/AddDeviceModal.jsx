"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { createDevice, editDevice, getBrands } from "@/services/device.serivce";
import { sparepartSchema } from "@/schemas/sparepart.schema";
import { deviceModelSchema } from "@/schemas/deviceModel.schema";
import { toast } from "sonner";

const tabs = ["HP", "Laptop", "Tablet", "Jam"];

export function AddDeviceModal({ open, onOpenChange, initialData }) {
  const isEdit = Boolean(initialData?._id);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(deviceModelSchema),
    defaultValues: {
      deviceType: "HP",
      brand: "",
      deviceModel: "",
      brandMode: "select", // "select" atau "manual"
    },
  });

  console.log(errors, "ERRORNYA");

  const deviceType = watch("deviceType");
  const brandMode = watch("brandMode");

  // Prefill saat edit
  useEffect(() => {
    if (initialData) {
      reset({
        deviceType: initialData.brand?.type || "HP",
        brand:
          initialData.brand?._id && initialData.brand?.name
            ? initialData.brand._id // kalau dari DB
            : initialData.brand?.name || "", // kalau manual
        deviceModel: initialData.name || "",
        brandMode: initialData.brand?._id ? "select" : "manual",
      });
    }
  }, [initialData, reset]);

  // Ambil daftar brand dari DB
  const { data: brands } = useQuery({
    queryKey: ["brands", deviceType],
    queryFn: () => getBrands({ type: deviceType }),
    enabled: open, // hanya fetch kalau modal terbuka
  });

  const mutation = useMutation({
    mutationFn: (data) =>
      isEdit ? editDevice(initialData._id, data) : createDevice(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["device-models"]);
      onOpenChange(false);
      reset();
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Perangkat gagal ditambahkan"
      );
    },
  });

  const onSubmit = (data) => {
    mutation.mutate({
      name: data.deviceModel, // di backend: name
      type: data.deviceType, // di backend: type
      ...(brandMode === "select"
        ? { brandId: data.brand } // id brand dari select
        : { brandName: data.brand }), // string manual
    });
  };

  useEffect(() => {
    setValue("brand", ""); // kosongin brand kalau user ganti mode
  }, [brandMode, setValue]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Perangkat" : "Tambah Perangkat"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Jenis Perangkat */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Jenis Perangkat</Label>
            <Controller
              name="deviceType"
              control={control}
              render={({ field }) => (
                <div className="flex justify-center items-center overflow-hidden rounded-full border border-gray-300">
                  {tabs.map((tab, idx) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => field.onChange(tab)}
                      className={`flex-1 items-center justify-center gap-2 px-6 py-2 text-sm font-medium transition-colors
                        ${
                          deviceType === tab
                            ? "bg-[#0F172A] text-white"
                            : "bg-white text-gray-700 hover:bg-gray-100"
                        }
                        ${
                          idx !== tabs.length - 1
                            ? "border-r border-gray-300"
                            : ""
                        }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              )}
            />
          </div>

          {/* Mode Merek */}
          <h3 className="font-medium mb-2">Merek Perangkat</h3>
          <div className="flex border rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setValue("brandMode", "select")}
              className={cn(
                "flex-1 py-2 text-sm",
                brandMode === "select"
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground"
              )}
            >
              Pilih Merek
            </button>
            <button
              type="button"
              onClick={() => setValue("brandMode", "manual")}
              className={cn(
                "flex-1 py-2 text-sm",
                brandMode === "manual"
                  ? "bg-primary text-white"
                  : "bg-muted text-muted-foreground"
              )}
            >
              Isi Manual
            </button>
          </div>

          {brandMode === "select" ? (
            <select
              {...register("brand")}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Pilih merek...</option>
              {brands?.map((b) => (
                <option key={b?._id} value={b?._id}>
                  {b?.name}
                </option>
              ))}
            </select>
          ) : (
            <Input {...register("brand")} placeholder="Masukkan merek baru" />
          )}
          {errors.brand && (
            <p className="text-red-500 text-sm">{errors.brand.message}</p>
          )}

          {/* Model Perangkat */}
          <div>
            <Label className="text-sm">Tipe/Model Perangkat</Label>
            <Input type="text" {...register("deviceModel")} />
            {errors.deviceModel && (
              <p className="text-red-500 text-sm">
                {errors.deviceModel.message}
              </p>
            )}
          </div>

          {/* Tombol */}
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
