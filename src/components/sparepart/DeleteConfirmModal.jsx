// src/components/sparepart/DeleteConfirmModal.jsx
"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sparepartService } from "@/services/sparepart.service";
import { userService } from "@/services/user.service";
import { toast } from "sonner";

export function DeleteConfirmModal({ open, onOpenChange, id }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id) => userService.delete(id),
    onSuccess: () => {
      toast.success("User berhasil di hapus");
      queryClient.invalidateQueries(["spareparts"]);
      onOpenChange(false);
    },
  });

  const handleDelete = () => {
    if (id) {
      mutation.mutate(id);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Konfirmasi Hapus</DialogTitle>
        </DialogHeader>
        <p>Apakah Anda yakin ingin menghapus sparepart ini?</p>
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? "Menghapus..." : "Hapus"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
