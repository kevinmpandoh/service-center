// src/app/teknisi/perbaikan-aktif/page.jsx
"use client";
import { DateRangePicker } from "@/components/common/DateRangePicker";
import { ExportDropdown } from "@/components/common/ExportDropdown";
import { PaginationControls } from "@/components/common/PaginationControls";
import ProtectedRoute from "@/components/HOC/ProtectedRoute";
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
import { serviceOrderService } from "@/services/serviceOrder.service";
import { useAuthStore } from "@/stores/auth.store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Eye, FileDown, Plus, Search } from "lucide-react";
import { useState } from "react";

export default function PerbaikanAktifPage() {
  const [searchInput, setSearchInput] = useState(""); // untuk input sementara
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [dateRange, setDateRange] = useState({
    from: null,
    to: null,
  });
  const { user } = useAuthStore();

  const [selectedId, setSelectedId] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["service-orders", search, dateRange, page],
    queryFn: () =>
      serviceOrderService.getAllFinishedServiceOrders({
        page,
        limit: 5,
        startDate: dateRange?.from
          ? dateRange.from.toISOString().split("T")[0]
          : undefined,
        endDate: dateRange?.to
          ? dateRange.to.toISOString().split("T")[0]
          : undefined,
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

  const handleDownloadInvoice = async (id) => {
    try {
      const response = await serviceOrderService.downloadInvoice(id);

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice-${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.log(err);
      toast.error("Gagal mengunduh nota");
    }
  };

  return (
    <ProtectedRoute allowedRoles={["admin", "teknisi"]}>
      <h1 className="text-3xl mb-4 font-semibold">Daftar Perbaikan Selesai</h1>
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2 items-center">
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

        {user.role === "admin" && orders?.length > 0 && (
          <ExportDropdown
            startDate={dateRange.from}
            endDate={dateRange.to}
            type={"service"}
          />
        )}
      </div>
      {/* Tabs */}

      <div className="bg-white p-6 rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>Pelanggan</TableHead>
              <TableHead>Perangkat</TableHead>
              <TableHead>Kerusakan</TableHead>
              <TableHead>Waktu Perbaikan</TableHead>
              <TableHead>Biaya</TableHead>
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
            ) : orders?.length > 0 ? (
              orders.map((item, index) => (
                <TableRow key={item._id}>
                  <TableCell>{(page - 1) * 10 + index + 1}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{item.customerName}</div>
                      <div className="text-sm text-muted-foreground">
                        {item.customerPhone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{item.deviceModel}</TableCell>
                  <TableCell>{item.damage || "-"}</TableCell>
                  <TableCell>{item.repairTime || "-"}</TableCell>
                  <TableCell>
                    Rp {item.totalCost.toLocaleString("id-ID")}
                  </TableCell>
                  <TableCell className={"text-center"}>
                    {/* <></> */}

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedId(item._id)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={"ghost"}
                      onClick={() => {
                        handleDownloadInvoice(item._id);
                      }}
                      // disabled={pickupMutation.isPending}
                    >
                      <FileDown className="mr-2" size={16} />
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

      {selectedId && (
        <RepairDetailModal
          open={!!selectedId}
          onClose={() => setSelectedId(null)}
          id={selectedId}
        />
      )}
    </ProtectedRoute>
  );
}
