"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function RepairFinishModal({ open, onClose, onSubmit }) {
  const [warranty, setWarranty] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(warranty);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Konfirmasi Selesai Perbaikan</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Pilih Garansi
            </label>
            <Select onValueChange={setWarranty} value={warranty}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih garansi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Non Garansi</SelectItem>
                <SelectItem value="7">7 Hari</SelectItem>
                <SelectItem value="14">14 Hari</SelectItem>
                <SelectItem value="30">30 Hari</SelectItem>
                <SelectItem value="90">90 Hari</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Batal
            </Button>
            <Button type="submit" disabled={!warranty}>
              Konfirmasi
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
