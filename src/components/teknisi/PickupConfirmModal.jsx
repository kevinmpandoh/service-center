// Komponen modal konfirmasi
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function PickupConfirmModal({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Konfirmasi</DialogTitle>
        </DialogHeader>
        <p>Apakah perangkat sudah diambil pelanggan?</p>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button onClick={onConfirm}>Ya, Ambil</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
