"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { serviceOrderService } from "@/services/serviceOrder.service";
import { Badge } from "../ui/badge";
import Image from "next/image";
import { useState } from "react";

export default function RepairDetailModal({ open, onClose, id }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["service-orders", id],
    queryFn: () => serviceOrderService.getById(id),
    enabled: !!id, // hanya jalan kalau ada id
  });

  const [previewImg, setPreviewImg] = useState(null);

  if (isLoading) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Loading</DialogTitle>
          </DialogHeader>
          <p>Loading...</p>
        </DialogContent>
      </Dialog>
    );
  }

  if (isError) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Error</DialogTitle>
          </DialogHeader>
          <p>Terjadi error saat mengambil data</p>
        </DialogContent>
      </Dialog>
    );
  }

  console.log(data, "DATA");

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex gap-4">
              Detail Perbaikan
              <span
                className={`text-base font-semibold px-3 py-1 rounded-full capitalize ${
                  data.status === "diterima"
                    ? "bg-blue-100 text-blue-700"
                    : data.status === "diperbaiki"
                    ? "bg-yellow-100 text-yellow-700"
                    : data.status === "menunggu pembayaran"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {data.status}
              </span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 max-h-[80vh] overflow-y-auto p-4">
            {/* Perangkat */}
            <section>
              <h3 className="text-base mb-2 underline font-bold text-slate-900">
                Perangkat
              </h3>
              <div className="grid grid-cols-2 gap-y-1">
                <span>Jenis Perangkat</span>
                <span>: {data.device.category}</span>
                <span>Merek/Tipe Perangkat</span>
                <span>
                  : {data.device.brand} {data.device.model}
                </span>
                <span>Kelengkapan Perangkat</span>
                <span>: {data.device?.accessories || "-"}</span>
                <span>Jenis Kerusakan</span>
                <span>: {data.damage}</span>
                {/* <span>Tingkat Kerusakan</span>
              <span>: {data.damage.level}</span> */}
                {/* <span>Estimasi Harga Perbaikan</span>
                <span>: Rp {data.estimatedCost?.toLocaleString("id-ID")}</span>
                <span>Estimasi Waktu Perbaikan</span>
                <span>: {data.estimatedTime}</span> */}
              </div>
            </section>

            {/* Data Pelanggan */}
            <section>
              <h3 className="text-base mb-2 underline font-bold text-slate-900">
                Data Pelanggan
              </h3>
              <div className="grid grid-cols-2 gap-y-1">
                <span>Nama</span>
                <span>: {data.customer.name}</span>
                <span>No. WA</span>
                <span>: {data.customer.phone || "-"}</span>
              </div>
            </section>

            {/* Jasa Perbaikan */}
            {data.services.length > 0 && (
              <section>
                <h3 className="text-base mb-2 underline font-bold text-slate-900">
                  Jasa Perbaikan
                </h3>

                <table className="w-full border text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="text-left p-2 border">Kerusakan</th>
                      <th className="text-left p-2 border">Biaya</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.services.map((service, idx) => (
                      <tr key={idx}>
                        <td className="p-2 border">
                          {service.name || service.customServiceName}
                        </td>
                        <td className="p-2 border">
                          Rp{" "}
                          {(
                            service.price || service.customPrice
                          )?.toLocaleString("id-ID") || 0}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            )}

            {/* Sparepart */}
            {data.spareparts.length > 0 && (
              <section>
                <h3 className="text-base mb-2 underline font-bold text-slate-900">
                  Sparepart
                </h3>
                <table className="w-full border text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="text-left p-2 border">Merek</th>
                      <th className="text-left p-2 border">Jumlah</th>
                      <th className="text-left p-2 border">Biaya</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.spareparts.map((item, idx) => (
                      <tr key={idx}>
                        <td className="p-2 border">{item.name}</td>
                        <td className="p-2 border">{item.quantity}</td>
                        <td className="p-2 border">
                          Rp {item.price?.toLocaleString("id-ID")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            )}

            {/* Pembayaran */}
            {data.payment && (
              <section>
                <h3 className="text-lg mb-2 underline font-bold text-slate-900">
                  Pembayaran
                </h3>
                <div className="grid grid-cols-2 gap-y-1">
                  <span>Biaya Jasa</span>
                  <span>
                    : Rp {data.payment.serviceFee?.toLocaleString("id-ID")}
                  </span>
                  <span>Biaya Sparepart</span>
                  <span>
                    : Rp {data.payment.sparepartFee?.toLocaleString("id-ID")}
                  </span>
                  <span>Total Biaya</span>
                  <span>
                    : Rp {data.payment.totalCost?.toLocaleString("id-ID")}
                  </span>

                  <span>Total dibayarkan</span>
                  <span>
                    : Rp {data.payment.totalPaid?.toLocaleString("id-ID")}
                  </span>
                  {/* <span>Sisa Pembayaran</span>
                  <span>
                    : Rp{" "}
                    {data.payment.remaining?.toLocaleString("id-ID") || "-"}
                  </span> */}

                  {data.payment.proofs.length > 0 && (
                    <div className="mt-2">
                      <p className="font-semibold">Proofs:</p>
                      <div className="flex gap-2 mt-1 flex-wrap">
                        {data.payment.proofs.map((proof, idx) => (
                          <button
                            key={idx}
                            className="relative w-28 h-28"
                            onClick={() => setPreviewImg(proof)}
                          >
                            <Image
                              src={proof}
                              alt={`proof-${idx}`}
                              fill
                              className="object-cover rounded-md border"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end pt-4">
              <Button variant="outline" onClick={onClose}>
                Tutup
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={!!previewImg} onOpenChange={() => setPreviewImg(null)}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Preview</DialogTitle>
          </DialogHeader>
          {previewImg && (
            <div className="relative w-full h-[500px]">
              <Image
                src={previewImg}
                alt="proof-preview"
                fill
                className="object-contain rounded-md"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
