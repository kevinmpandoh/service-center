"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ArrowRight } from "lucide-react";
import { useBrands, useDeviceModels } from "@/hooks/useDevice";
import { useDamageTypes } from "@/hooks/useDamage";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { serviceOrderService } from "@/services/serviceOrder.service";
import Image from "next/image";
import { toast } from "sonner";

const schema = yup.object().shape({
  deviceType: yup.string().required(),
  brand: yup.string().required(),
  model: yup.string().required(),
  damage: yup.string().required(),
});

export default function EstimateSection() {
  const [result, setResult] = useState(null);

  const { data: brands, isLoading: loadingBrands } = useBrands();
  const { data: damages, isLoading: loadingDamages } = useDamageTypes();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      deviceType: "HP",
      brand: "",
      model: "",
      damage: "",
    },
  });

  const deviceType = watch("deviceType");
  const brand = watch("brand");
  const model = watch("model");
  const damage = watch("damage");

  const { data: models, isLoading: loadingModels } = useDeviceModels(brand);

  const estimateMutation = useMutation({
    mutationFn: serviceOrderService.estimatedService,
    onSuccess: (data) => {
      if (data?.success) {
        setResult(data);
      }
    },
    onError: () => {
      toast.error("Estimasi tidak ditemukan");
      setResult(null);
    },
  });

  const onSubmit = () => {
    const brandName = brands?.find((b) => b._id === brand)?.name;
    const modelName = models?.find((m) => m._id === model)?.name;
    const damageName = damages?.find((d) => d._id === damage)?.name;

    estimateMutation.mutate({
      brand: brandName,
      type: modelName,
      damage: damageName,
    });
  };

  return (
    <section id="estimate" className="max-w-7xl mx-auto px-4 py-16">
      {/* Section Title */}
      <div className="text-center mb-10">
        <div className="flex justify-center items-center gap-2 text-black mb-2">
          <Image src={"/estimate.svg"} width={24} height={24} alt="Estimate" />
          <h3 className="text-xl sm:text-2xl font-medium">Estimate</h3>
        </div>
        <h2 className="font-semibold text-lg sm:text-2xl md:text-3xl">
          Estimasi Perangkat Anda
        </h2>
      </div>

      {/* Wadah responsif utama */}
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative ">
        {/* FORM */}
        <div className="bg-[#121B2E] rounded-xl p-6 sm:p-8 lg:max-w-[700px] text-white lg:pr-60">
          <h2 className="font-semibold text-xl sm:text-2xl mb-4">
            Estimasi Harga & Waktu Perbaikan
          </h2>
          <p className="text-[#D1D5DB] mb-6 sm:mb-8 text-base sm:text-lg leading-relaxed">
            Isi form berikut untuk mengetahui estimasi biaya dan waktu perbaikan
            perangkat Anda.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* 2 Kolom */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Device Type */}
              <div>
                <label className="text-[#D1D5DB] font-semibold mb-1 block">
                  Jenis Perangkat
                </label>
                <Select
                  onValueChange={(val) => setValue("deviceType", val)}
                  value={deviceType}
                >
                  <SelectTrigger className="w-full bg-white text-black py-3">
                    <SelectValue placeholder="Pilih Jenis" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HP">Handphone</SelectItem>
                    <SelectItem value="Laptop">Laptop</SelectItem>
                    <SelectItem value="Tablet">Tablet</SelectItem>
                    <SelectItem value="Jam">Jam</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Brand */}
              <div>
                <label className="text-[#D1D5DB] font-semibold mb-1 block">
                  Merek Perangkat
                </label>
                <Select
                  onValueChange={(val) => setValue("brand", val)}
                  value={brand}
                >
                  <SelectTrigger className="w-full bg-white text-black py-3">
                    <SelectValue placeholder="Pilih Merek" />
                  </SelectTrigger>
                  <SelectContent>
                    {loadingBrands ? (
                      <SelectItem disabled value="loading">
                        Loading...
                      </SelectItem>
                    ) : (
                      brands
                        ?.filter((b) => b.type === deviceType)
                        .map((b) => (
                          <SelectItem key={b._id} value={b._id}>
                            {b.name}
                          </SelectItem>
                        ))
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Model */}
            <div>
              <label className="text-[#D1D5DB] font-semibold mb-1 block">
                Tipe Perangkat
              </label>

              <Select
                onValueChange={(val) => setValue("model", val)}
                value={model}
                disabled={!brand}
              >
                <SelectTrigger className="w-full bg-white text-black py-3">
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
            </div>

            {/* Damage */}
            <div>
              <label className="text-[#D1D5DB] font-semibold mb-1 block">
                Jenis Kerusakan
              </label>
              <Select
                onValueChange={(val) => setValue("damage", val)}
                value={damage}
              >
                <SelectTrigger className="w-full bg-white text-black py-3">
                  <SelectValue placeholder="Pilih Kerusakan" />
                </SelectTrigger>
                <SelectContent>
                  {loadingDamages ? (
                    <SelectItem disabled value="loading">
                      Loading...
                    </SelectItem>
                  ) : (
                    damages
                      ?.filter((d) => d.applicableTo.includes(deviceType))
                      .map((d) => (
                        <SelectItem key={d._id} value={d._id}>
                          {d.name}
                        </SelectItem>
                      ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-white text-[#121B2E] px-5 py-2 font-semibold rounded hover:bg-gray-200 flex items-center gap-2"
              >
                Estimate <ArrowRight />
              </button>
            </div>
          </form>
        </div>

        {/* RESULT BOX */}
        <div
          className="
            bg-[#E6EDF5] p-6 rounded-xl flex-1 max-w-md 
            lg:absolute lg:right-0 lg:top-8 lg:translate-x-1/4
          "
        >
          <h3 className="text-[#121B2E] font-semibold text-xl sm:text-2xl mb-4">
            Estimasi Biaya & Waktu
          </h3>

          {/* Biaya */}
          <div className="bg-white rounded-md p-4 mb-4">
            <p className="text-[#6B7280] text-sm">Perkiraan Biaya</p>
            <p className="text-[#121B2E] font-semibold text-xl">
              {result?.estimated_cost_category || "-"}
            </p>
          </div>

          {/* Waktu */}
          <div className="bg-white rounded-md p-4 mb-4">
            <p className="text-[#6B7280] text-sm">Perkiraan Waktu</p>
            <p className="text-[#121B2E] font-semibold text-xl">
              {result?.estimated_time || "-"}
            </p>
          </div>

          {/* Rincian */}
          <div className="text-[#121B2E] text-base">
            <p className="font-semibold mb-1">Rincian:</p>
            <p>
              Merek: <span className="capitalize">{result?.brand || "-"}</span>
              <br />
              Tipe: <span className="capitalize">{result?.type || "-"}</span>
              <br />
              Kerusakan:{" "}
              <span className="capitalize">{result?.damage || "-"}</span>
            </p>
          </div>

          <p className="text-[#6B7280] text-xs mt-4">
            *Perkiraan dapat bervariasi.
          </p>
        </div>
      </div>
    </section>
  );
}
