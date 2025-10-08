"use client";

import { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useBrands, useDeviceModels } from "@/hooks/useDevice";
import { useDamageTypes } from "@/hooks/useDamage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { serviceOrderSchema } from "@/schemas/serviceOrder.schema";
import { serviceOrderService } from "@/services/serviceOrder.service";
import { toast } from "sonner";
import { paymentSerive } from "@/services/payment.service";
import axios from "axios";

const tabs = ["HP", "Laptop", "Tablet", "Jam"];

export function AddRepairModal({ open, onOpenChange }) {
  // refs untuk auto-scroll
  const paymentRef = useRef(null);
  const uploadRef = useRef(null);

  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [estimate, setEstimate] = useState(null);
  const [loadingEstimate, setLoadingEstimate] = useState(false);

  const queryClient = useQueryClient();

  // fetch brands
  const { data: brands, isLoading: loadingBrands } = useBrands();
  const { data: damages, isLoading: loadingDamages } = useDamageTypes();
  // fetch models hanya ketika brand dipilih

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(serviceOrderSchema),
    defaultValues: {
      deviceType: "HP",
      brand: "",
      model: "",
      customBrand: "",
      customModel: "",
      damage: "",
      accessories: "",
      customerName: "",
      customerWa: "",
    },
  });
  const deviceType = watch("deviceType");

  const damage = watch("damage");
  const brand = watch("brand");
  const model = watch("model");

  const { data: models, isLoading: loadingModels } = useDeviceModels(
    watch("brand")
  );

  const mutation = useMutation({
    mutationFn: serviceOrderService.createService,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["service-orders"],
      });
      reset(); // reset semua field ke defaultValues
      setUploadedUrl(""); // kosongkan preview upload
      toast.success("Service Perbaikan berhasil ditambahkan");
      onOpenChange(false); // tutup modal setelah berhasil
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Logout gagal");
    },
  });

  // Submit
  const onSubmit = (values) => {
    const payload = {
      device: {
        category: deviceType,
        brand: values.brand,
        model: values.model,
        accessories: values.accessories,
      },
      damage: values.damage,
      customer: {
        name: values.customerName,
        phone: values.customerPhone,
      },
      estimatedCost: 120000,
      estimatedTime: "1 Jam 23 Menit",
    };

    mutation.mutate(payload);
  };

  // fungsi upload ke backend
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("proofImage", file);

    try {
      setUploading(true);
      const data = await paymentSerive.uploadProof(formData);
      setUploadedUrl(data.url);
      setValue("proof", data.url); // simpan ke form juga
    } catch (err) {
      console.error("Upload gagal", err);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    const fetchEstimate = async () => {
      // pastikan semua field sudah dipilih
      if (!brand || !model || !damage) {
        setEstimate(null);
        return;
      }

      const brandName = brands?.find((b) => b._id === brand)?.name;
      const modelName = models?.find((m) => m._id === model)?.name;
      const damageName = damages?.find((d) => d._id === damage)?.name;

      try {
        setLoadingEstimate(true);
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL_ESTIMATE}/estimate`,
          {
            brand: brandName,
            type: modelName,
            damage: damageName,
          }
        );

        if (data.success) {
          setEstimate(data.estimated_cost);
        } else {
          setEstimate(null);
        }

        console.log(data);
        // setEstimate(data); // misal { price: 52000, time: "1 Jam" }
      } catch (err) {
        console.log("Gagal ambil estimasi:", err);
        console.error("Gagal ambil estimasi:", err);
        setEstimate(null);
      } finally {
        setLoadingEstimate(false);
      }
    };

    fetchEstimate();
  }, [brand, model, damage, brands, models, damages]);

  // scroll saat pilih transfer

  // reset type kalau brand berubah
  useEffect(() => {
    setValue("brand", "");
    setValue("model", "");
    setValue("damage", ""); // ini sesuai field kamu (bukan damageType)
  }, [deviceType, setValue]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Tambah Perbaikan</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* PERANGKAT */}
          <div className="space-y-6 max-h-[80vh] overflow-y-auto p-4">
            <div>
              <h3 className="text-base mb-2 underline font-bold text-slate-900">
                Perangkat
              </h3>
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
                ${idx !== tabs.length - 1 ? "border-r border-gray-300" : ""}
            `}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  )}
                />
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                {" "}
                <div>
                  <Label>Merek Perangkat</Label>
                  <Select
                    onValueChange={(val) => setValue("brand", val)}
                    value={watch("brand")}
                  >
                    <SelectTrigger className={"w-full"}>
                      <SelectValue placeholder="Pilih Merek" />
                    </SelectTrigger>
                    <SelectContent>
                      {loadingBrands ? (
                        <SelectItem disabled value="loading">
                          Loading...
                        </SelectItem>
                      ) : (
                        brands
                          ?.filter((b) => b.type === deviceType) // filter sesuai tab aktif (HP/Laptop)
                          .map((b) => (
                            <SelectItem key={b._id} value={b._id}>
                              {b.name}
                            </SelectItem>
                          ))
                      )}
                    </SelectContent>
                  </Select>
                  <p className="text-red-500 text-xs">
                    {errors.brand?.message}
                  </p>
                </div>
                <div>
                  <Label>Tipe Perangkat</Label>
                  <Select
                    onValueChange={(val) => setValue("model", val)}
                    value={watch("model")}
                    disabled={!watch("brand")}
                  >
                    <SelectTrigger className={"w-full"}>
                      <SelectValue placeholder="Pilih Tipe" />
                    </SelectTrigger>
                    <SelectContent>
                      {loadingModels ? (
                        <SelectItem disabled value="loading">
                          Loading...
                        </SelectItem>
                      ) : (
                        models?.map((m) => (
                          <SelectItem key={m._id} value={m._id}>
                            {m.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <p className="text-red-500 text-xs">
                    {errors.model?.message}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div>
                  <Label>Jenis Kerusakan</Label>
                  <Select
                    onValueChange={(val) => setValue("damage", val)}
                    value={damage}
                    disabled={loadingDamages}
                  >
                    <SelectTrigger className={"w-full"}>
                      <SelectValue placeholder="Pilih Kerusakan" />
                    </SelectTrigger>
                    <SelectContent>
                      {loadingDamages ? (
                        <SelectItem disabled value="loading">
                          Loading...
                        </SelectItem>
                      ) : (
                        damages
                          ?.filter((d) => d.applicableTo.includes(deviceType)) // filter sesuai jenis perangkat
                          .map((d) => (
                            <SelectItem key={d._id} value={d._id}>
                              {d.name}
                            </SelectItem>
                          ))
                      )}
                    </SelectContent>
                  </Select>
                  <p className="text-red-500 text-xs">
                    {errors.damage?.message}
                  </p>
                </div>
                <div className="">
                  <Label>Kelengkapan Perangkat (Optional)</Label>
                  <Input
                    placeholder="Case HP, Charger, SIM Card"
                    {...register("accessories")}
                  />
                  <p className="text-red-500 text-xs">
                    {errors.accessories?.message}
                  </p>
                </div>
              </div>
              {loadingEstimate && (
                <p className="text-sm text-gray-500 mt-2">
                  Menghitung estimasi...
                </p>
              )}

              {estimate && (
                <div
                  className="p-4 mb-4 mt-2.5 text-sm text-warning-700 rounded-lg bg-warning-50 dark:bg-gray-800 dark:text-yellow-300"
                  role="alert"
                >
                  Biaya perbaikan diperkirakan sekitar{" "}
                  <span className="font-bold">
                    Rp {estimate?.toLocaleString("id-ID")}
                  </span>{" "}
                  dan estimasi waktu pengerjaan adalah{" "}
                  <span className="font-bold">{estimate.time}</span>. Estimasi
                  dapat berubah sesuai hasil pemeriksaan teknisi.
                </div>
              )}
            </div>

            {/* DATA PELANGGAN */}
            <div>
              <h3 className="text-base mb-2 underline font-bold text-slate-900">
                Data Pelanggan
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Nama Pelanggan</Label>
                  <Input {...register("customerName")} />
                  <p className="text-red-500 text-xs">
                    {errors.customerName?.message}
                  </p>
                </div>
                <div>
                  <Label>No.WA (Opsional)</Label>
                  <Input {...register("customerPhone")} />
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Batal
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? (
                "Menyimpan..."
              ) : (
                <>
                  <Plus /> Tambah
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
