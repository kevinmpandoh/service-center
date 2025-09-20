// src/app/teknisi/perbaikan-aktif/page.jsx
"use client";
import { PaginationControls } from "@/components/common/PaginationControls";
import ProtectedRoute from "@/components/HOC/ProtectedRoute";
import { AddDeviceModal } from "@/components/modal/AddDeviceModal";
import { DeleteConfirmModal } from "@/components/sparepart/DeleteConfirmModal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteDevice, getAllDeviceModels } from "@/services/device.serivce";
import { sparepartService } from "@/services/sparepart.service";
import { useAuthStore } from "@/stores/auth.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Eye, FileDown, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function KelolaSparepartPage() {
  const [searchInput, setSearchInput] = useState(""); // untuk input sementara
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modalData, setModalData] = useState(null); // bisa null atau objek sparepart
  const [deleteId, setDeleteId] = useState(null);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["device-models", page, search],
    queryFn: () => getAllDeviceModels({ page, search }),
    // keepPreviousData: true,
  });

  const devices = data?.data || [];
  const pagination = data?.pagination || { page: 1, totalPages: 1 };

  const mutation = useMutation({
    mutationFn: (id) => deleteDevice(id),
    onSuccess: () => {
      setDeleteId(null);
      toast.success("Perangkat berhasil di hapus");
      queryClient.invalidateQueries(["device-models"]);
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.message ||
          "Data perangkat gagal di hapus silahkan coba lagi"
      );
    },
  });

  const handleDelete = () => {
    if (deleteId) {
      mutation.mutate(deleteId);
    }
  };

  const handleSearch = () => {
    setPage(1);
    setSearch(searchInput); // update query
  };

  return (
    <ProtectedRoute allowedRoles={["admin", "teknisi"]}>
      <h1 className="text-3xl mb-4 font-semibold">Perangkat</h1>
      <div className="flex justify-between items-center mb-6">
        <div className="flex bg-white items-center border rounded-md overflow-hidden w-full max-w-xs">
          <span className="px-3 text-gray-400">
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder="Cari perangkat"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="flex-1 px-2 py-2.5 focus:outline-none"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()} // tekan Enter juga search
          />
          <Button size="sm" onClick={handleSearch} className={"mr-2"}>
            Cari
          </Button>
        </div>

        <Button size={"lg"} onClick={() => setModalData({})}>
          <Plus /> Tambah Perangkat
        </Button>
      </div>
      {/* Tabs */}

      <div className="bg-white p-6 rounded-md border">
        <h1 className="text-xl font-semibold mb-4">Perangkat Yang Sudah Ada</h1>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Merek Perangkat</TableHead>
              <TableHead>Tipe Perangkat</TableHead>
              <TableHead>Jenis Perangkat</TableHead>

              <TableHead className={"text-center"}>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6">
                  Loading...
                </TableCell>
              </TableRow>
            ) : devices?.length > 0 ? (
              devices.map((item, index) => (
                <TableRow key={item._id}>
                  <TableCell>{(page - 1) * 10 + index + 1}</TableCell>
                  <TableCell>{item.brand?.name}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.brand?.type}</TableCell>

                  <TableCell className={"text-center"}>
                    {/* <></> */}

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteId(item._id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={"ghost"}
                      size="icon"
                      onClick={() => setModalData(item)}
                    >
                      <Pencil size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-6">
                  Tidak ada data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <PaginationControls
        page={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={setPage}
      />

      <AddDeviceModal
        open={!!modalData}
        onOpenChange={() => setModalData(null)}
        initialData={modalData}
      />

      <DeleteConfirmModal
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
        onDelete={handleDelete}
        isLoading={mutation.isPending}
      />
    </ProtectedRoute>
  );
}
