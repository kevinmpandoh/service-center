"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { authService } from "@/services/auth.service";
import { toast } from "sonner";
import ProtectedRoute from "@/components/HOC/ProtectedRoute";

const schema = yup.object().shape({
  oldPassword: yup.string().required("Password lama wajib diisi"),
  newPassword: yup
    .string()
    .min(6, "Password minimal 6 karakter")
    .required("Password baru wajib diisi"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Konfirmasi password tidak sama")
    .required("Konfirmasi password wajib diisi"),
});

export default function SettingsPage() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // 🔥 React Query Mutation
  const mutation = useMutation({
    mutationFn: authService.changePassword,
    onSuccess: () => {
      toast.success("Password berhasil diubah");
      reset();
    },
    onError: (error) => {
      const res = error?.response?.data;

      if (res?.errors?.oldPassword) {
        setError("oldPassword", {
          type: "server",
          message: res.errors.oldPassword,
        });
      } else {
        toast.error(res?.message || "Terjadi kesalahan.");
      }
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };
  return (
    <ProtectedRoute allowedRoles={["sparepart", "admin", "teknisi"]}>
      <>
        <h1 className="text-3xl font-semibold mb-6">Pengaturan</h1>

        <Card>
          <CardHeader>
            <CardTitle className={"text-xl"}>Ubah Password</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-medium mb-1">
                    Password Lama
                  </label>
                  <Input
                    type="password"
                    className={"h-12"}
                    placeholder="Password lama"
                    {...register("oldPassword")}
                  />
                  {errors.oldPassword && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.oldPassword.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-medium mb-1">
                    Password Baru
                  </label>
                  <Input
                    type="password"
                    className={"h-12"}
                    placeholder="Password baru"
                    {...register("newPassword")}
                  />
                  {errors.newPassword && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.newPassword.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-lg font-medium mb-1">
                    Konfirmasi Password
                  </label>
                  <Input
                    type="password"
                    className={"h-12"}
                    placeholder="Konfirmasi password"
                    {...register("confirmPassword")}
                  />
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => reset()}
                  disabled={mutation.isPending}
                >
                  Batal
                </Button>
                <Button type="submit" disabled={mutation.isPending}>
                  {mutation.isPending ? "Menyimpan..." : "Simpan"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </>
    </ProtectedRoute>
  );
}
