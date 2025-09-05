// src/components/sparepart/AddSparepartModal.jsx
"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { userSchema } from "@/schemas/users.schema";
import { userService } from "@/services/user.service";

export function AddUserModal({ open, onOpenChange, initialData }) {
  const isEdit = Boolean(initialData?._id);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema(isEdit)),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      phone: "",
      role: "teknisi",
      password: "",
    },
  });

  // Prefill saat edit
  useEffect(() => {
    if (initialData) {
      reset({
        name: initialData.name || "",
        username: initialData.username || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        role: initialData.role || "teknisi",
        password: "", // kosong saat edit
      });
    }
  }, [initialData, reset]);

  const mutation = useMutation({
    mutationFn: (data) =>
      isEdit
        ? userService.update(initialData._id, data)
        : userService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      onOpenChange(false);
      reset();
    },
  });

  const onSubmit = (data) => {
    if (initialData?._id && !data.password) {
      delete data.password;
    }
    mutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Pengguna" : "Tambah Pengguna"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm">Nama Lengkap</label>
            <Input {...register("name")} />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="text-sm">Username</label>
            <Input {...register("username")} />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>
          <div>
            <label className="text-sm">Email</label>
            <Input {...register("email")} />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="text-sm">Nomor Telepon</label>
            <Input {...register("phone")} />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1">Role</label>
            <Select
              onValueChange={(val) => setValue("role", val)}
              defaultValue={initialData?.role || "teknisi"}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="teknisi">Teknisi</SelectItem>
                <SelectItem value="sparepart">Sparepart</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="text-sm text-red-500">{errors.role.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1">
              Password{" "}
              {initialData?._id && (
                <span className="text-gray-400">(kosong = tidak diubah)</span>
              )}
            </label>
            <Input type="password" {...register("password")} />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Batal
            </Button>
            <Button type="submit" disabled={mutation.isLoading}>
              {mutation.isLoading
                ? "Menyimpan..."
                : isEdit
                ? "Simpan Perubahan"
                : "Tambah"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
