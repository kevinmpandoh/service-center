"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download } from "lucide-react";
import { sparepartService } from "@/services/sparepart.service";
import { useState } from "react";

export function ExportDropdown({ startDate, endDate }) {
  const [loading, setLoading] = useState(false);

  const handleExport = async (format) => {
    try {
      setLoading(true);
      await sparepartService.exportUsed({ startDate, endDate, format });
    } catch (err) {
      console.error("Export error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button disabled={loading}>
          <Download className="mr-2 h-4 w-4" />
          {loading ? "Mengunduh..." : "Export"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleExport("excel")}>
          Export Excel
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("pdf")}>
          Export PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
