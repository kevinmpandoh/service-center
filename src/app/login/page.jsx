"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { authService } from "../../services/auth.service";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth.store";
import Link from "next/link";

// schema validasi yup
const schema = yup.object({
  username: yup.string().required("Username wajib diisi"),
  password: yup.string().required("Password wajib diisi"),
});

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // mutation login
  const mutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      useAuthStore.getState().login({
        token: data.token, // mapping dari accessToken -> token
        user: data.user, // pastikan user punya role
      });

      const roleRoutes = {
        admin: "/dashboard/admin",
        teknisi: "/dashboard/teknisi",
        sparepart: "/dashboard/sparepart",
      };

      const redirectPath = roleRoutes[data.user.role] || "/";
      router.push(redirectPath);

      toast.success("Login berhasil");
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Login gagal");
    },
  });

  const onSubmit = (data) => mutation.mutate(data);

  return (
    <div className="relative flex flex-col gap-5 min-h-screen items-center pt-20 bg-slate-200">
      <Link
        href={"/"}
        className="absolute top-10 left-10 flex items-center py-2 px-4 rounded-[16px] bg-slate-100 shadow-md"
      >
        <ChevronLeft size={18} /> Back
      </Link>
      <Image src={"/logo1.png"} alt="Logo" width={196} height={121} />
      <div className="text-center justify-start text-black text-3xl font-semibold font-['Nunito'] leading-10">
        Selamat Datang
      </div>

      <div className="w-[550px] flex justify-center items-center rounded-2xl bg-slate-900 py-12 px-20 text-white shadow-lg">
        {/* Logo dan Judul */}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h2 className="mb-4 text-center text-3xl font-semibold">Login</h2>

          {/* Username */}
          <div className="w-[365px]">
            <label className="text-sm ">User Name</label>
            <input
              type="text"
              {...register("username")}
              className="mt-1 w-full bg-gray-50 rounded-md border border-gray-300 px-3 py-2 text-black focus:border-blue-500 focus:outline-none"
              placeholder="username"
            />
            {errors.username && (
              <p className="mt-1 text-xs text-red-400">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="mt-1 w-full rounded-md  bg-gray-50 border border-gray-300 px-3 py-2 text-black focus:border-blue-500 focus:outline-none"
                placeholder="********"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex w-full justify-center mt-10">
            <button
              type="submit"
              disabled={mutation.isPending}
              className="w-[180px] rounded-md border-2 border-white py-2 font-medium text-white disabled:opacity-50 cursor-pointer hover:bg-slate-700 bg-slate-900"
            >
              {mutation.isPending ? "Loading..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
