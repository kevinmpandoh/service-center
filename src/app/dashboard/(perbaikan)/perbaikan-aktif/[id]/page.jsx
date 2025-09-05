// src/app/teknisi/perbaikan/[id]/tambah/page.jsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Pencil, Plus, Trash2 } from "lucide-react";
import { useParams } from "next/navigation";
import JasaFormModal from "@/components/teknisi/ServiceFormModal";
import SparepartFormModal from "@/components/teknisi/SparepartFormModal";
import { useState } from "react";

import { serviceOrderService } from "@/services/serviceOrder.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ConfirmDeleteModal from "@/components/modal/ConfirmDeleteModal";
import Link from "next/link";
import { toast } from "sonner";
import ProtectedRoute from "@/components/HOC/ProtectedRoute";

export default function TambahJasaSparepartPage() {
  const { id } = useParams();

  const [openJasaModal, setOpenJasaModal] = useState(false);
  const [openSparepartModal, setOpenSparepartModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState({ id: null, type: null });

  const queryClient = useQueryClient();

  // CREATE / UPDATE JASA
  const jasaMutation = useMutation({
    mutationFn: ({ isEdit, payload }) => {
      if (isEdit) {
        return serviceOrderService.updateDetail(payload.id, payload);
      }
      return serviceOrderService.createDetail(id, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["service-orders", id]);
      setOpenJasaModal(false);
    },
  });

  // CREATE / UPDATE SPAREPART
  const sparepartMutation = useMutation({
    mutationFn: ({ isEdit, payload }) => {
      if (isEdit) {
        return serviceOrderService.updateDetail(payload.id, payload);
      }
      return serviceOrderService.createDetail(id, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["service-orders", id]);
      setOpenSparepartModal(false);
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.message || "Terjadi kesalahan silahkan coba lagi"
      );
    },
  });

  // DELETE
  const deleteMutation = useMutation({
    mutationFn: (detailId) => serviceOrderService.deleteDetail(detailId),
    onSuccess: () => {
      queryClient.invalidateQueries(["service-orders", id]);
      setDeleteModalOpen(false);
    },
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["service-orders", id],
    queryFn: () => serviceOrderService.getById(id),
    keepPreviousData: true,
  });

  // handle tambah/edit jasa
  const handleJasaSubmit = (data) => {
    jasaMutation.mutate({
      isEdit: !!data.id,
      payload: { ...data, type: "jasa" },
    });
  };

  // handle tambah/edit sparepart
  const handleSparepartSubmit = (data) => {
    sparepartMutation.mutate({
      isEdit: !!data.id,
      payload: { ...data, type: "sparepart" },
    });
  };

  const handleDelete = (detailId) => {
    setDeleteTarget(detailId);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    deleteMutation.mutate(deleteTarget);
  };

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <ProtectedRoute allowedRoles={["teknisi"]}>
      <h1 className="text-3xl font-semibold">Tambah Jasa & Sparepart</h1>

      {/* Informasi perangkat */}
      <Card>
        <CardHeader>
          <CardTitle className={"text-2xl"}>Informasi Perangkat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Pelanggan</p>
              <p className="font-medium">
                {data.customer?.name} / {data.customer?.phone || "-"}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Kategori</p>
              <p className="font-medium">{data.device?.category}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Merk / Model</p>
              <p className="font-medium">
                {data.device?.brand} {data.device?.model}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Kelengkapan</p>
              <p className="font-medium">{data.device?.accessories || "-"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Jenis Kerusakaan</p>
              <p className="font-medium">{data.damage}</p>
            </div>
            {/* <div>
            <p className="text-sm text-gray-500">Tingkat Kerusakan</p>
            <p className="font-medium">Handphone</p>
          </div> */}

            <div>
              <p className="text-sm text-gray-500">Estimasi Waktu Perbaikan</p>
              <p className="font-medium">{data.estimatedTime}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Estimasi Biaya Perbaikan</p>
              <p className="font-medium">
                Rp {data.estimatedCost.toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Jasa Perbaikan */}
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className={"text-2xl"}>Jasa Perbaikan</CardTitle>
          {data.services.length > 0 && (
            <Button
              size="sm"
              onClick={() => {
                setEditData(null);
                setOpenJasaModal(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" /> Tambah Jasa
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {data.services.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              <p className="mb-3">Belum ada jasa yang ditambahkan.</p>
              <Button
                size="sm"
                onClick={() => {
                  setEditData(null);
                  setOpenJasaModal(true);
                }}
              >
                <Plus className="mr-2 h-4 w-4" /> Tambah Jasa
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Jasa</TableHead>
                  <TableHead className="text-right">Harga</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.services.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell>{item.name || item.customServiceName}</TableCell>
                    <TableCell className="text-right">
                      Rp{" "}
                      {item.price?.toLocaleString() ||
                        item.customPrice?.toLocaleString()}
                    </TableCell>
                    <TableCell className="flex gap-2 justify-end">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => {
                          setEditData(item);
                          setOpenJasaModal(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleDelete(item.id)}
                        size="icon"
                        variant="destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Sparepart */}
      <Card>
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle>Sparepart</CardTitle>
          {data.spareparts.length > 0 && (
            <Button
              size="sm"
              onClick={() => {
                setEditData(null);
                setOpenSparepartModal(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" /> Tambah Sparepart
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {data.spareparts.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              <p className="mb-3">Belum ada sparepart yang ditambahkan.</p>
              <Button
                size="sm"
                onClick={() => {
                  setEditData(null);
                  setOpenSparepartModal(true);
                }}
              >
                <Plus className="mr-2 h-4 w-4" /> Tambah Sparepart
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama Sparepart</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead className="text-right">Harga</TableHead>
                  <TableHead className="text-right">Sub Total</TableHead>
                  <TableHead className="text-center w-32">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.spareparts.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell className="text-right">
                      Rp {item.price.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      Rp {item.subtotal.toLocaleString()}
                    </TableCell>
                    <TableCell className="flex gap-2 justify-center">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => {
                          setEditData(item);
                          setOpenSparepartModal(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleDelete(item.id)}
                        size="icon"
                        variant="destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Tombol aksi */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" size={"lg"}>
          <Link href={"/dashboard/perbaikan-aktif"}>Kembali</Link>
        </Button>
        <Button size={"lg"}>
          <Link href={"/dashboard/perbaikan-aktif"}>Simpan</Link>
        </Button>
      </div>

      {/* Modal Components */}
      <JasaFormModal
        open={openJasaModal}
        onClose={() => setOpenJasaModal(false)}
        onSubmit={handleJasaSubmit}
        defaultValues={editData}
      />
      <SparepartFormModal
        open={openSparepartModal}
        onClose={() => setOpenSparepartModal(false)}
        onSubmit={handleSparepartSubmit}
        defaultValues={editData}
      />

      <ConfirmDeleteModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        message={`Apakah Anda yakin ingin menghapus ${deleteTarget.type}?`}
      />
    </ProtectedRoute>
  );
}
