"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { sparepartService } from "@/services/sparepart.service";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DeleteConfirmModal } from "@/components/sparepart/DeleteConfirmModal";
import { AddSparepartModal } from "@/components/sparepart/AddSparepartModal";
import { PaginationControls } from "@/components/common/PaginationControls";
import { DateRangePicker } from "@/components/common/DateRangePicker";
import { ExportDropdown } from "@/components/common/ExportDropdown";
import { Search } from "lucide-react";
import ProtectedRoute from "@/components/HOC/ProtectedRoute";

export default function SparepartTerpakaiPage() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [dateRange, setDateRange] = useState({
    from: null,
    to: null,
  });

  const [page, setPage] = useState(1);

  const [deleteId, setDeleteId] = useState(null);
  const [modalData, setModalData] = useState(null);

  const { data, isLoading } = useQuery({
    queryKey: ["used-spareparts", search, dateRange, page],
    queryFn: () =>
      sparepartService.getUsed({
        q: search,
        startDate: dateRange?.from
          ? dateRange.from.toISOString().split("T")[0]
          : undefined,
        endDate: dateRange?.to
          ? dateRange.to.toISOString().split("T")[0]
          : undefined,
        page,
        limit: 10,
      }),
    keepPreviousData: true,
  });

  const spareparts = data?.data || [];
  const pagination = data?.pagination || { page: 1, totalPages: 1 };

  const handleSearch = () => {
    setPage(1);
    setSearch(searchInput);
  };

  return (
    <ProtectedRoute allowedRoles={["admin", "sparepart"]}>
      <h1 className="text-2xl mb-6 font-semibold">Daftar Sparepart Terpakai</h1>

      <div className="flex flex-wrap gap-3 items-center justify-between mb-6">
        <div className="flex gap-2 items-center">
          <div className="flex bg-white items-center border rounded-md overflow-hidden w-full max-w-md">
            <span className="px-3 text-gray-400">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="Cari sparepart"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="flex-1 px-2 py-2.5 focus:outline-none"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()} // tekan Enter juga search
            />
            <Button size="sm" onClick={handleSearch} className={"mr-2"}>
              Search
            </Button>
          </div>

          <DateRangePicker
            value={dateRange}
            onChange={setDateRange}
            onClear={() =>
              setDateRange({
                from: null,
                to: null,
              })
            }
          />
        </div>

        <ExportDropdown startDate={dateRange.from} endDate={dateRange.to} />
      </div>

      <div className="bg-white p-4 rounded-md border">
        <h2 className="text-lg mb-4 font-medium">Riwayat Selesai Perbaikan</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Nama Sparepart</TableHead>
              <TableHead>Teknisi</TableHead>
              <TableHead>Harga Jual</TableHead>
              <TableHead>Jumlah Stok</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  Loading...
                </TableCell>
              </TableRow>
            ) : spareparts.length > 0 ? (
              spareparts.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{(page - 1) * 10 + index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.technician}</TableCell>
                  <TableCell>{item.sellingPrice}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>Rp {item.total.toLocaleString("id-ID")}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  Tidak ada data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <PaginationControls
        page={pagination.page}
        totalPages={pagination.totalPages}
        onPageChange={setPage}
      />
      {/* <div className="flex justify-center mt-6 gap-2">
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
      </div> */}

      {/* Modal Konfirmasi Hapus */}
      <DeleteConfirmModal
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
        id={deleteId}
      />

      {/* Modal Edit */}
      <AddSparepartModal
        open={!!modalData}
        onOpenChange={() => setModalData(null)}
        initialData={modalData}
      />
    </ProtectedRoute>
  );
}
