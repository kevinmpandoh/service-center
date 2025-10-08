// src/app/teknisi/perbaikan-aktif/page.jsx
"use client";
import { PaginationControls } from "@/components/common/PaginationControls";
import { AddUserModal } from "@/components/modal/AddUserModal";
import { AddSparepartModal } from "@/components/sparepart/AddSparepartModal";
import { DeleteConfirmModal } from "@/components/sparepart/DeleteConfirmModal";
import RepairDetailModal from "@/components/teknisi/RepairDetailModal";
import RepairTabs from "@/components/teknisi/RepairTabs";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { userService } from "@/services/user.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import ProtectedRoute from "@/components/HOC/ProtectedRoute";
import { toast } from "sonner";

export default function KelolaUserPage() {
  const [searchInput, setSearchInput] = useState(""); // untuk input sementara
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modalData, setModalData] = useState(null); // bisa null atau objek sparepart
  const [deleteId, setDeleteId] = useState(null);
  const [filterRole, setFilterRole] = useState("all");
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users", search, page, filterRole],
    queryFn: () =>
      userService.getAll({
        page,
        limit: 5,
        q: search,
        filterRole,
      }),
    keepPreviousData: true,
  });

  const users = data?.data || [];
  const pagination = data?.pagination || { page: 1, totalPages: 1 };

  const mutation = useMutation({
    mutationFn: (id) => userService.delete(id),
    onSuccess: () => {
      setDeleteId(null);
      toast.success("User berhasil di hapus");
      queryClient.invalidateQueries(["users"]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Data berhasil dihapus");
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
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl mb-4 font-semibold">Daftar Pengguna</h1>

        <Button size={"lg"} onClick={() => setModalData({})}>
          <Plus /> Tambah User
        </Button>
      </div>
      {/* Tabs */}

      <div className="bg-white p-6 rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Nomor Handphone</TableHead>
              <TableHead>Role</TableHead>
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
            ) : users?.length > 0 ? (
              users.map((item, index) => (
                <TableRow key={item._id}>
                  <TableCell>{(page - 1) * 10 + index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.username}</TableCell>
                  <TableCell>{item.email}</TableCell>

                  <TableCell>{item.phone}</TableCell>
                  <TableCell className={"capitalize"}>{item.role}</TableCell>
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

      <AddUserModal
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
