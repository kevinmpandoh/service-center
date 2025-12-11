"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { paymentSchema } from "@/schemas/payment.schema";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Banknote } from "lucide-react";
import { Input } from "../ui/input";
import { paymentSerive } from "@/services/payment.service";

export default function PaymentModal({ open, onClose, summary, onSubmit }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(paymentSchema),
    defaultValues: { paymentMethod: "cash", proof: null },
  });
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const paymentMethod = watch("paymentMethod");

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

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Tambah Pembayaran</DialogTitle>
        </DialogHeader>
        {/* Ringkasan */}
        <div className="space-y-1 text-base">
          <div className="flex justify-between">
            <span>Biaya Jasa</span>
            <span>Rp. {summary.service}</span>
          </div>
          <div className="flex justify-between">
            <span>Biaya Sparepart</span>
            <span>Rp. {summary.sparepart}</span>
          </div>
          {/* <div className="flex justify-between">
            <span>DP</span>
            <span>Rp. {summary.dp}</span>
          </div> */}
          <div className="flex justify-between font-semibold border-t text-lg text-slate-900">
            <span>Total</span>
            <span>Rp. {summary.total}</span>
          </div>
        </div>
        {/* Pilih Metode */}
        <div className="flex border rounded-lg overflow-hidden mt-4">
          <button
            type="button"
            onClick={() => setValue("paymentMethod", "cash")}
            className={cn(
              "flex-1 py-2 text-sm",
              paymentMethod === "cash"
                ? "bg-primary text-white"
                : "bg-muted text-muted-foreground"
            )}
          >
            Cash
          </button>
          <button
            type="button"
            onClick={() => setValue("paymentMethod", "transfer")}
            className={cn(
              "flex-1 py-2 text-sm flex items-center justify-center gap-2",
              paymentMethod === "transfer"
                ? "bg-primary text-white"
                : "bg-muted text-muted-foreground"
            )}
          >
            Transfer
          </button>
        </div>
        {errors.paymentMethod && (
          <p className="text-red-500 text-xs">{errors.paymentMethod.message}</p>
        )}
        {/* Upload */}
        {paymentMethod === "transfer" && (
          <div className="mt-4">
            <label className="block text-sm mb-1">
              Upload Bukti Pembayaran
            </label>
            <Input type="file" accept="image/*" onChange={handleUpload} />
            {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
            {uploadedUrl && (
              <div className="mt-2">
                <img
                  src={uploadedUrl}
                  alt="Bukti pembayaran"
                  className="h-32 rounded-md border"
                />
              </div>
            )}
            {errors.proof && (
              <p className="text-red-500 text-xs">{errors.proof.message}</p>
            )}
          </div>
        )}
        {/* Action */}
        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button onClick={handleSubmit(onSubmit)}>
            <Banknote /> Bayar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
