// src/components/teknisi/ConfirmStartModal.jsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function ConfirmStartModal({ open, onOpenChange, onConfirm, loading }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Mulai Perbaikan?</DialogTitle>
        </DialogHeader>
        <p className="text-gray-600">
          Apakah Anda yakin ingin memulai perbaikan ini? Tindakan ini tidak bisa
          dibatalkan.
        </p>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Batal
          </Button>
          <Button onClick={onConfirm} disabled={loading}>
            {loading ? "Memulai..." : "Ya, Kerjakan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
