import {
  Banknote,
  Clock4,
  FileDown,
  MonitorCog,
  MonitorSmartphone,
  PackageOpen,
  Plus,
  Settings,
  User,
  Wrench,
} from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import RepairFinishModal from "./RepairFinishModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { serviceOrderService } from "@/services/serviceOrder.service";
import { toast } from "sonner";
import PaymentModal from "./PaymentModal";
import { PickupConfirmModal } from "./PickupConfirmModal";
import RepairDetailModal from "./RepairDetailModal";

// src/components/RepairCard.jsx
export default function RepairCard({ data, onKerjakan }) {
  const [finishModalOpen, setFinishModalOpen] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);
  const [confirmPickup, setConfirmPickup] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);

  const queryClient = useQueryClient();

  const finishRepair = useMutation({
    mutationFn: ({ warranty }) => {
      return serviceOrderService.finishRepair(data._id, warranty);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["service-orders"],
      });
      setFinishModalOpen(false);
    },
    onError: (err) => {
      console.log(err);
      toast.error(
        err.response?.data?.message || "Terjadi kesalahan silahkan coba lagi"
      );
    },
  });

  const paymentMutation = useMutation({
    mutationFn: (payload) => {
      return serviceOrderService.payment(data._id, payload);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["service-orders"],
      });
      setFinishModalOpen(false);
    },
    onError: (err) => {
      console.log(err);
      toast.error(
        err.response?.data?.message || "Terjadi kesalahan silahkan coba lagi"
      );
    },
  });

  const pickupMutation = useMutation({
    mutationFn: () => serviceOrderService.pickup(data._id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service-orders"] });
      setConfirmPickup(false);
      toast.success("Perangkat berhasil diambil!");
    },
    onError: (err) => {
      console.log(err);
      toast.error(
        err.response?.data?.message || "Terjadi kesalahan silahkan coba lagi"
      );
    },
  });

  const handleFinish = (warranty) => {
    finishRepair.mutate({ warranty });
  };

  const handleDownloadInvoice = async () => {
    try {
      const response = await serviceOrderService.downloadInvoice(data._id);

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice-${data._id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.log(err);
      toast.error("Gagal mengunduh nota");
    }
  };

  const router = useRouter();
  return (
    <div className="bg-slate-50 rounded-lg shadow p-6 mb-4 border border-slate-300">
      <div className="flex justify-between items-center mb-2">
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
      </div>

      {/* Detail perbaikan */}
      <div className="flex gap-4 text-sm">
        <div className="w-full space-y-2">
          <div className="flex justify-start items-center gap-2 text-slate-600">
            <User size={20} />
            <h6 className="text-xl">Pelanggan</h6>
          </div>
          <div className="text-base font-semibold text-neutral-800 space-y-1">
            <p>{data.customerName}</p>
            <p>{data.customerPhone}</p>
          </div>
        </div>
        <div className="w-full space-y-2">
          <div className="flex justify-start items-center gap-2 text-slate-600">
            <MonitorSmartphone size={20} />
            <h6 className="text-xl">Perangkat</h6>
          </div>
          <div className="text-base font-semibold text-neutral-800 space-y-1">
            <p>
              {data.deviceBrand} {data.deviceModel}
            </p>
          </div>
        </div>
        <div className="w-full space-y-2">
          <div className="flex justify-start items-center gap-2 text-slate-600">
            <Wrench size={20} />
            <h6 className="text-xl">Kerusakan</h6>
          </div>
          <div className="text-base font-semibold text-neutral-800 space-y-1">
            <p>Mati Total</p>
          </div>
        </div>
        {data.status === "diterima" && (
          <div className="w-full space-y-2">
            <div className="flex justify-start items-center gap-2 text-slate-600">
              <Clock4 size={20} />
              <h6 className="text-xl">Estimasi</h6>
            </div>
            <div className="text-base font-semibold text-neutral-800 space-y-1">
              <p>Rp {data.estimatedCost.toLocaleString("id-ID")}</p>
              <p>{data.estimatedTime}</p>
            </div>
          </div>
        )}
        {data.status === "diperbaiki" && (
          <>
            <div className="w-full space-y-2">
              <div className="flex justify-start items-center gap-2 text-slate-600">
                <MonitorCog size={20} />
                <h6 className="text-xl">Jasa</h6>
              </div>
              <div className="text-base font-semibold text-neutral-800 space-y-1">
                <ul>
                  {data.services.map((item, index) => (
                    <li key={index}>{item || "Belum Ada"}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="w-full space-y-2">
              <div className="flex justify-start items-center gap-2 text-slate-600">
                <Settings size={20} />
                <h6 className="text-xl">Sparepart</h6>
              </div>
              <div className="text-base font-semibold text-neutral-800 space-y-1">
                <ul>
                  {data.spareparts.map((item, index) => (
                    <li key={index}>{item || "Belum Ada"}</li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}

        {data.status === "menunggu pembayaran" && (
          <div className="w-full space-y-2">
            <div className="flex justify-start items-center text-slate-600">
              <Banknote size={20} />
              <h6 className="text-xl">Harga</h6>
            </div>
            <div className="text-base font-semibold text-neutral-800 space-y-1">
              <p>Rp {data.totalCost?.toLocaleString("id-ID") || 0}</p>
            </div>
          </div>
        )}
      </div>

      {/* Aksi */}
      <div className="mt-4 flex gap-2 items-end justify-end">
        <Button
          variant={"link"}
          className="cursor-pointer"
          onClick={() => setOpenDetail(true)}
        >
          Lihat Detail
        </Button>
        {data.status === "diterima" && (
          <Button onClick={onKerjakan}>Kerjakan</Button>
        )}
        {data.status === "diperbaiki" && (
          <>
            <Button
              variant={"outline"}
              onClick={() =>
                router.push(`/dashboard/teknisi/perbaikan-aktif/${data._id}`)
              }
            >
              <Plus /> Jasa & Sparepart
            </Button>
            <Button onClick={() => setFinishModalOpen(true)}>Selesai</Button>
          </>
        )}
        {data.status === "menunggu pembayaran" && (
          <Button onClick={() => setOpenPayment(true)}>Bayar</Button>
        )}
        {data.status === "siap diambil" && (
          <>
            <Button
              variant={"outline"}
              onClick={handleDownloadInvoice}
              disabled={pickupMutation.isPending}
            >
              <FileDown className="mr-2" size={16} /> Unduh Nota
            </Button>
            <Button
              onClick={() => setConfirmPickup(true)}
              disabled={pickupMutation.isPending}
            >
              <PackageOpen className="mr-2" size={16} /> Ambil
            </Button>
          </>
        )}
      </div>
      <RepairFinishModal
        open={finishModalOpen}
        onClose={() => setFinishModalOpen(false)}
        onSubmit={(data) => {
          handleFinish(data);
        }}
      />

      <PaymentModal
        open={openPayment}
        onClose={() => setOpenPayment(false)}
        summary={{
          service: data.serviceFee,
          sparepart: data.sparepartFee,
          dp: data.totalDownPayment,
          total: data.totalCost,
        }}
        onSubmit={(data) => {
          if (data.paymentMethod === "cash") {
            delete data.proof;
          }

          paymentMutation.mutate(data);
          setOpenPayment(false);
        }}
      />

      <PickupConfirmModal
        open={confirmPickup}
        onClose={() => setConfirmPickup(false)}
        onConfirm={() => pickupMutation.mutate()}
      />

      <RepairDetailModal
        open={openDetail}
        onClose={() => setOpenDetail(false)}
        id={data._id}
      />

      {/* Modal Konfirmasi Ambil */}
      {/* <ConfirmationModal
        open={confirmPickup}
        onClose={() => setConfirmPickup(false)}
        title="Konfirmasi Ambil"
        description="Apakah Anda yakin perangkat sudah diambil oleh pelanggan?"
        onConfirm={() => pickupMutation.mutate()}
      /> */}
    </div>
  );
}
