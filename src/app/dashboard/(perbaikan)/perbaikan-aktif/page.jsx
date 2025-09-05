// src/app/teknisi/perbaikan-aktif/page.jsx
"use client";

import ProtectedRoute from "@/components/HOC/ProtectedRoute";
import { AddRepairModal } from "@/components/teknisi/AddRepairModal";
import { ConfirmStartModal } from "@/components/teknisi/ConfirmationStartModal";
import RepairCard from "@/components/teknisi/RepairCard";
import RepairTabs from "@/components/teknisi/RepairTabs";
import { Button } from "@/components/ui/button";
import { serviceOrderService } from "@/services/serviceOrder.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Search } from "lucide-react";
import { useState } from "react";

export default function PerbaikanAktifPage() {
  const [filter, setFilter] = useState("Semua");
  const [searchInput, setSearchInput] = useState(""); // untuk input sementara
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const queryClient = useQueryClient();

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["service-orders", filter, search, page],
    queryFn: () =>
      serviceOrderService.getAllServiceOrders({
        page,
        limit: 5,
        status: filter,
        q: search,
      }),
    keepPreviousData: true,
  });

  const orders = data?.data || [];
  const pagination = data?.pagination || { page: 1, totalPages: 1 };

  const handleSearch = () => {
    setPage(1);
    setSearch(searchInput); // update query
  };

  const startMutation = useMutation({
    mutationFn: (id) => serviceOrderService.startRepair(id), // endpoint kerjakan
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["service-orders"],
      });
      setIsConfirmOpen(false);
      setSelectedOrder(null);
    },
  });

  const handleKerjakanClick = (order) => {
    setSelectedOrder(order);
    setIsConfirmOpen(true);
  };

  return (
    <ProtectedRoute allowedRoles={["admin", "teknisi"]}>
      <h1 className="text-3xl mb-4 font-semibold">Daftar Perbaikan Aktif</h1>
      <div className="flex justify-between items-center mb-6">
        <div className="flex bg-white items-center border rounded-md overflow-hidden w-full max-w-md">
          <span className="px-3 text-gray-400">
            <Search size={18} />
          </span>
          <input
            type="text"
            placeholder="Cari pelanggan / perangkat..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="flex-1 px-2 py-2.5 focus:outline-none"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()} // tekan Enter juga search
          />
          <Button size="sm" onClick={handleSearch} className={"mr-2"}>
            Search
          </Button>
        </div>

        <Button size={"lg"} onClick={() => setIsModalOpen(true)}>
          <Plus /> Tambah Perbaikan
        </Button>
      </div>
      {/* Tabs */}
      <RepairTabs
        onChange={(val) => {
          setFilter(val);
          setPage(1);
        }}
      />
      {/* Loading */}
      {isLoading && (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-28 bg-gray-200 animate-pulse rounded-lg"
            />
          ))}
        </div>
      )}
      {/* Error */}
      {isError && (
        <div className="text-red-600">Gagal memuat data. Coba lagi.</div>
      )}
      {/* Data */}
      {!isLoading &&
        !isError &&
        orders.map((item) => (
          <RepairCard
            key={item.id}
            data={item}
            onKerjakan={() => handleKerjakanClick(item)}
          />
        ))}
      {/* Empty */}
      {!isLoading && !isError && orders.length === 0 && (
        <p className="text-gray-500 mt-4">Tidak ada perbaikan ditemukan.</p>
      )}
      <div className="flex justify-center mt-6 gap-2">
        <button
          disabled={pagination.page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-3 py-1">
          {pagination.page} / {pagination.totalPages}
        </span>
        <button
          disabled={pagination.page === pagination.totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      <AddRepairModal
        open={isModalOpen}
        onOpenChange={() => setIsModalOpen(false)}
      />

      <ConfirmStartModal
        open={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        onConfirm={() => startMutation.mutate(selectedOrder?._id)}
        loading={startMutation.isLoading}
      />
    </ProtectedRoute>
  );
}
