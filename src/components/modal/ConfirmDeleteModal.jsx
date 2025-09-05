// src/components/ui/ConfirmDeleteModal.jsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ConfirmDeleteModal({
  open,
  onClose,
  onConfirm,
  title,
  message,
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title || "Konfirmasi Hapus"}</DialogTitle>
        </DialogHeader>
        <p>{message || "Apakah Anda yakin ingin menghapus item ini?"}</p>
        <DialogFooter className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Hapus
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
