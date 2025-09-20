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

// Validasi dengan Yup
const schema = yup.object().shape({
  deviceType: yup.string().required("Jenis perangkat wajib diisi"),
  brand: yup.string().required("Merek perangkat wajib diisi"),
  model: yup.string().required("Tipe perangkat wajib diisi"),
  damage: yup.string().required("Jenis kerusakan wajib diisi"),
});
const formatRupiah = (angka) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(angka);
};

export default function EstimateSection() {
  const [result, setResult] = useState(null);
  // fetch brands
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

  console.log(errors, "ERRORNYA");

  const deviceType = watch("deviceType");
  const brand = watch("brand");
  const model = watch("model");
  const damage = watch("damage");

  const { data: models, isLoading: loadingModels } = useDeviceModels(
    watch("brand")
  );

  // Mutasi untuk estimasi
  const estimateMutation = useMutation({
    mutationFn: serviceOrderService.estimatedService,
    onSuccess: (data) => {
      if (data?.success) {
        setResult(data); // langsung simpan respons ke state
      }
    },
  });

  // Simulasi hasil estimasi
  const onSubmit = (data) => {
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
    <section id="estimate" className="max-w-7xl mx-auto py-12">
      <div className="text-center mb-8">
        <div className="flex justify-center items-center gap-2 text-black mb-2">
          <Image src={"/estimate.svg"} width={24} height={24} alt="Logo" />
          <h3 className="text-2xl">Estimate</h3>
        </div>
        <h2 className="font-semibold text-lg sm:text-2xl md:text-3xl">
          Estimasi Perangkat Anda
        </h2>
      </div>

      <div className="relative">
        {/* Left form container */}
        <div className="bg-[#121B2E] rounded-md p-8 pr-20 mr-40 flex-1 max-w-3xl md:w-3/4">
          <h2 className="text-white font-semibold text-2xl flex items-center gap-2 mb-4">
            Estimasi Harga dan Waktu Perbaikan
          </h2>
          <p className="text-[#D1D5DB] text-lg mb-8 leading-relaxed">
            Isi form di bawah untuk mengetahui estimasi biaya dan waktu
            perbaikan perangkatmu secara cepat dan akurat
          </p>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              <div className="flex flex-col w-full">
                <label
                  htmlFor="jenisPerangkat"
                  className="text-[#D1D5DB] text-lg font-semibold mb-1"
                >
                  Jenis Perangkat
                </label>
                <Select
                  onValueChange={(val) => setValue("deviceType", val)}
                  value={deviceType}
                >
                  <SelectTrigger
                    className={"w-full bg-white text-slate-800 py-4 px-3"}
                  >
                    <SelectValue placeholder="Pilih Merek" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem key="handphone" value="HP">
                      Handphone
                    </SelectItem>
                    <SelectItem key="laptop" value="Laptop">
                      Laptop
                    </SelectItem>
                    <SelectItem key="tablet" value="Tablet">
                      Tablet
                    </SelectItem>
                    <SelectItem key="jam" value="Jam">
                      Jam
                    </SelectItem>
                  </SelectContent>
                </Select>

                {errors.deviceType && (
                  <p className="text-red-400 text-sm">
                    {errors.deviceType.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col w-full">
                <label
                  htmlFor="merekPerangkat"
                  className="text-[#D1D5DB] text-lg font-semibold mb-1"
                >
                  Merek Perangkat
                </label>
                <Select
                  onValueChange={(val) => setValue("brand", val)}
                  value={watch("brand")}
                >
                  <SelectTrigger
                    className={"w-full bg-white text-slate-800 py-4 px-3"}
                  >
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
                {errors.brand && (
                  <p className="text-red-400 text-sm">{errors.brand.message}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col w-full">
              <label
                htmlFor="tipePerangkat"
                className="text-[#D1D5DB] text-lg font-semibold mb-1"
              >
                Tipe Perangkat
              </label>
              {/* <input
                id="tipePerangkat"
                type="text"
                {...register("model")}
                className="rounded-md px-3 py-2 text-sm text-[#121B2E] bg-white focus:outline-none"
              /> */}
              <Select
                onValueChange={(val) => setValue("model", val)}
                value={watch("model")}
                disabled={!watch("brand")}
              >
                <SelectTrigger
                  className={"w-full bg-white text-slate-800 py-4 px-3"}
                >
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
              {errors.model && (
                <p className="text-red-400 text-sm">{errors.model.message}</p>
              )}
            </div>

            <div className="flex flex-col w-full">
              <label
                htmlFor="jenisKerusakan"
                className="text-[#D1D5DB] text-lg font-semibold mb-1"
              >
                Jenis Kerusakan Perangkat
              </label>
              {/* <input
                id="jenisKerusakan"
                type="text"
                {...register("damage")}
                className="rounded-md px-3 py-2 text-sm text-[#121B2E] bg-white focus:outline-none"
              /> */}
              <Select
                onValueChange={(val) => setValue("damage", val)}
                value={damage}
                disabled={loadingDamages}
              >
                <SelectTrigger
                  className={"w-full bg-white text-slate-800 py-4 px-3"}
                >
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
              {errors.damage && (
                <p className="text-red-400 text-sm">{errors.damage.message}</p>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-white text-[#121B2E] cursor-pointer font-semibold rounded px-5 py-2 flex items-center gap-2 hover:bg-gray-100 transition"
              >
                Estimate <ArrowRight />
              </button>
            </div>
          </form>
        </div>

        {/* Right result container */}
        <div className="absolute top-5 -right-5 transform translate-x-1/4  bg-[#E6EDF5] rounded-md p-6 flex-1 max-w-md flex flex-col">
          <h3 className="text-[#121B2E] font-semibold text-2xl mb-4">
            Estimasi Biaya & Waktu Perbaikan
          </h3>

          <div className="bg-white rounded-md p-4 mb-4">
            <p className="text-lg text-[#6B7280] mb-1">Perkiraan Biaya</p>
            <p className="text-[#121B2E] font-semibold text-xl">
              {result?.estimated_cost
                ? formatRupiah(result.estimated_cost)
                : "-"}
            </p>
          </div>

          <div className="bg-white rounded-md p-4 mb-6">
            <p className="text-lg text-[#6B7280] mb-1">Perkiraan Waktu</p>
            <p className="text-[#121B2E] font-semibold text-xl">
              {result?.time || "-"}
            </p>
          </div>

          <div className="text-[#121B2E] text-base leading-relaxed">
            <p className="font-semibold mb-1">Rincian</p>
            <p>
              Tipe:{" "}
              <span className="font-normal">
                {result?.details?.deviceType || "-"}
              </span>
              <br />
              Jenis:{" "}
              <span className="font-normal">
                {result?.details?.brand || "-"}
              </span>
              <br />
              Model:{" "}
              <span className="font-normal">
                {result?.details?.model || "-"}
              </span>
              <br />
              Kerusakan:{" "}
              <span className="font-normal">
                {result?.details?.damage || "-"}
              </span>
            </p>
          </div>

          <p className="text-[#6B7280] text-sm mt-auto pt-4">
            *Perkiraan biaya dan waktu dapat bervariasi.
          </p>
        </div>
      </div>
    </section>
  );
}
