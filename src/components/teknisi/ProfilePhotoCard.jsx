"use client";

import { useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { userService } from "@/services/user.service";
import { Image, Loader2, Trash, Upload } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth.store";

// === Validation schema ===
const schema = yup.object({
  avatar: yup
    .mixed()
    .test("fileSize", "File too large", (file) =>
      file ? file.size <= 2 * 1024 * 1024 : true
    )
    .test("fileType", "Unsupported file format", (file) =>
      file ? ["image/jpeg", "image/png", "image/jpg"].includes(file.type) : true
    ),
});

export default function ProfilePhotoCard({ user }) {
  const fileInputRef = useRef(null);
  const queryClient = useQueryClient();
  const { updateUser } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // === Upload Mutation ===
  const uploadMutation = useMutation({
    mutationFn: async (data) => {
      const formData = new FormData();
      if (data.avatar) {
        formData.append("photo", data.avatar);
      }
      return userService.uploadPhoto(formData);
    },
    onSuccess: (data) => {
      updateUser({ profilePicture: data.photo });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Foto berhasil di unggah");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Foto gagal diunggah");
    },
  });

  // === Delete Mutation ===
  const deleteMutation = useMutation({
    mutationFn: userService.deletePhoto,
    onSuccess: () => {
      updateUser({ profilePicture: null });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Foto berhasil di hapus");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Profile gagal dihapus");
    },
  });

  const onSubmit = (data) => {
    if (data.avatar) {
      uploadMutation.mutate(data);
    }
  };

  return (
    <Card className="md:col-span-1">
      <CardHeader>
        <CardTitle>
          <h3 className="text-center text-2xl font-semibold">
            Upload Foto Profile
          </h3>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        {/* Preview */}
        <div
          className="w-56 h-48 border rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden cursor-pointer hover:bg-gray-50"
          onClick={() => fileInputRef.current?.click()}
        >
          {user?.profilePicture ? (
            <img
              src={user.profilePicture}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center text-gray-400">
              <Image size={36} />
              <div className="flex mt-4 items-center justify-center  gap-2 text-base font-medium">
                <Upload size={18} />
                Upload Gambar
              </div>
              <div className="text-sm">
                File Format{" "}
                <span className="font-semibold text-slate-600">
                  jpg, jpeg, png
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Hidden input file */}
        <input
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          className="hidden"
          {...register("avatar")}
          ref={(e) => {
            register("avatar").ref(e);
            fileInputRef.current = e;
          }}
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setValue("avatar", e.target.files[0]);
              handleSubmit(onSubmit)(); // langsung submit saat pilih file
            }
          }}
        />

        {errors.avatar && (
          <p className="text-red-500 text-xs">{errors.avatar.message}</p>
        )}

        <div className="flex gap-2">
          {user?.profilePicture && (
            <Button
              type="button"
              variant="outline"
              onClick={() => deleteMutation.mutate()}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Menghapus
                </>
              ) : (
                <>
                  <Trash />
                  Hapus
                </>
              )}
            </Button>
          )}
          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadMutation.isPending}
          >
            {uploadMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Mengupload
              </>
            ) : (
              <>
                <Upload />
                Upload
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
