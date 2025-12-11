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

// schema validasi
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
        token: data.token,
        user: data.user,
      });

      const roleRoutes = {
        admin: "/dashboard/admin",
        teknisi: "/dashboard/teknisi",
        sparepart: "/dashboard/sparepart",
      };

      router.push(roleRoutes[data.user.role] || "/");
      toast.success("Login berhasil");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Login gagal");
    },
  });

  const onSubmit = (data) => mutation.mutate(data);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start pt-20 px-4 bg-slate-200">
      {/* Back Button */}
      <Link
        href={"/"}
        className="absolute top-6 left-4 sm:left-10 flex items-center py-2 px-4 rounded-xl bg-white shadow-md text-slate-700"
      >
        <ChevronLeft size={18} /> Back
      </Link>

      {/* Logo */}
      <Image
        src={"/logo1.png"}
        alt="Logo"
        width={180}
        height={120}
        className="mb-4 w-40 sm:w-48"
      />

      <div className="text-black text-2xl sm:text-3xl font-semibold mb-6">
        Selamat Datang
      </div>

      {/* Form Container */}
      <div
        className="
        w-full max-w-md 
        bg-slate-900 text-white 
        rounded-2xl px-6 py-10 
        shadow-lg
      "
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <h2 className="text-center text-2xl font-semibold mb-4">Login</h2>

          {/* Username */}
          <div>
            <label className="text-sm">Username</label>
            <input
              type="text"
              {...register("username")}
              placeholder="username"
              className="
                mt-1 w-full bg-gray-50 text-black 
                rounded-md border border-gray-300 
                px-3 py-2 focus:border-blue-500 focus:outline-none
              "
            />
            {errors.username && (
              <p className="text-xs text-red-400 mt-1">
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
                placeholder="********"
                className="
                  mt-1 w-full bg-gray-50 text-black 
                  rounded-md border border-gray-300 
                  px-3 py-2 focus:border-blue-500 focus:outline-none
                "
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-400 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={mutation.isPending}
              className="
                w-full py-3 rounded-md 
                font-semibold border-2 border-white 
                bg-slate-800 hover:bg-slate-700 
                disabled:opacity-50 cursor-pointer
              "
            >
              {mutation.isPending ? "Loading..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
