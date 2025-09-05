"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Edit } from "lucide-react";
import ProfilePhotoCard from "@/components/teknisi/ProfilePhotoCard";
import { userService } from "@/services/user.service";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth.store";
import ProtectedRoute from "@/components/HOC/ProtectedRoute";

// ✅ Yup Schema
const schema = yup.object().shape({
  name: yup.string().required("Nama wajib diisi"),
  username: yup.string().required("Username wajib diisi"),
  phone: yup
    .string()
    .matches(/^[0-9]+$/, "Nomor telepon harus angka")
    .required("Nomor telepon wajib diisi"),
  email: yup.string().email("Email tidak valid").required("Email wajib diisi"),
  role: yup.string().required("Role wajib diisi"),
});

export default function ProfilePage() {
  const queryClient = useQueryClient();

  const updateAuthUser = useAuthStore((s) => s.login); // action dari store
  const [isEditing, setIsEditing] = useState(false);

  // ✅ Fetch data
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: userService.getCurrent,
  });

  // ✅ React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: profile,
  });

  // ✅ Update Mutation
  const updateMutation = useMutation({
    mutationFn: userService.updateCurrent,
    onSuccess: (data) => {
      updateAuthUser({ user: data }); // update juga ke store auth
      queryClient.setQueryData(["profile"], data);
      toast.success("Profile berhasil diperbarui");
      setIsEditing(false);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Profile gagal diupdate");
    },
  });

  if (isLoading) return <p>Loading...</p>;

  const onSubmit = (data) => {
    updateMutation.mutate(data);
  };

  return (
    <ProtectedRoute allowedRoles={["sparepart", "admin", "teknisi"]}>
      <>
        <h1 className="text-3xl font-semibold mb-6">Profile</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Upload Foto Profile */}

          <ProfilePhotoCard user={profile} />

          {/* Profile Saya */}
          <Card className="md:col-span-2">
            <CardHeader className="flex justify-between items-center">
              <CardTitle>
                <h3 className="text-2xl font-semibold">Profile Saya</h3>
              </CardTitle>
              {!isEditing && (
                <Button
                  variant="outline"
                  size="lg"
                  className="flex items-center gap-2 bg-slate-200"
                  onClick={() => {
                    reset(profile);
                    setIsEditing(true);
                  }}
                >
                  <Edit className="w-4 h-4" /> Edit
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Nama */}
                    <div>
                      <p className="text-base text-gray-500">Nama</p>
                      <Input {...register("name")} />
                      {errors.name && (
                        <p className="text-sm text-red-500">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    {/* Username */}
                    <div>
                      <p className="text-base text-gray-500">Username</p>
                      <Input {...register("username")} />
                      {errors.username && (
                        <p className="text-sm text-red-500">
                          {errors.username.message}
                        </p>
                      )}
                    </div>

                    {/* Nomor Telepon */}
                    <div>
                      <p className="text-base text-gray-500">Nomor Telepon</p>
                      <Input {...register("phone")} />
                      {errors.phone && (
                        <p className="text-sm text-red-500">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <p className="text-base text-gray-500">Email</p>
                      <Input {...register("email")} />
                      {errors.email && (
                        <p className="text-sm text-red-500">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Role */}
                    <div>
                      <p className="text-lg text-gray-500">Role</p>
                      <Input {...register("role")} disabled />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="flex items-center gap-1"
                    >
                      Batal
                    </Button>
                    <Button type="submit" className="flex items-center gap-1">
                      Simpan
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="grid grid-cols-2 space-y-2">
                  <div className="border-b-2">
                    <p className="text-base text-gray-500">Nama</p>
                    <p className="font-medium mb-4">{profile?.name}</p>
                  </div>
                  <div className="border-b-2">
                    <p className="text-base text-gray-500">Username</p>
                    <p className="font-medium">{profile?.username}</p>
                  </div>
                  <div className="border-b-2">
                    <p className="text-base text-gray-500">Nomor Telepon</p>
                    <p className="font-medium mb-4">{profile?.phone || "-"}</p>
                  </div>
                  <div className="border-b-2">
                    <p className="text-base text-gray-500">Email</p>
                    <p className="font-medium">{profile?.email || "-"}</p>
                  </div>
                  <div className="border-b-2">
                    <p className="text-base text-gray-500">Role</p>
                    <p className="font-medium  mb-4">{profile?.role}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </>
    </ProtectedRoute>
  );
}
