"use client";
import Image from "next/image";
import React from "react";

import { LogOut, Settings, User } from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";
import { useMutation } from "@tanstack/react-query";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";

export default function UserDropdown({ isOpen, onToggle, onClose }) {
  const { user, logout } = useAuthStore();

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      logout(); // hapus token & user dari zustand + localStorage
      router.push("/login"); // redirect ke login
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Logout gagal");
    },
  });

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={`flex items-center gap-2 border p-1 pr-4 rounded-full text-gray-700 dark:text-gray-400 dropdown-toggle ${
          isOpen ? "bg-slate-50" : ""
        }`}
      >
        <div className="overflow-hidden rounded-full h-10 w-10">
          <img
            src={user?.profilePicture || "/profile-default.png"}
            alt="User"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="text-left">
          <span className="block font-semibold text-gray-700 text-base dark:text-gray-400">
            {user?.name}
          </span>
          <span className="mt-0.5 capitalize block text-sm text-gray-500 dark:text-gray-400">
            {user?.role}
          </span>
        </div>

        <svg
          className={`stroke-gray-500 dark:stroke-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <Dropdown
        isOpen={isOpen}
        onClose={onClose}
        className="absolute right-0 mt-[17px] flex w-[320px] flex-col rounded-2xl border border-gray-200 bg-white p-4 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
      >
        <ul className="flex flex-col gap-1 pb-3 border-b border-gray-200 dark:border-gray-800">
          <li>
            <DropdownItem
              onItemClick={onClose}
              tag="a"
              href="/dashboard/profile"
              className="flex items-center gap-3 px-3 py-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              <User
                className="text-primary  dark:group-hover:fill-gray-300"
                size={24}
              />
              <span className="text-base font-medium">Akun Saya</span>
            </DropdownItem>
          </li>
          <li>
            <DropdownItem
              onItemClick={onClose}
              tag="a"
              href="/dashboard/pengaturan"
              className="flex items-center gap-3 px-3 py-3 font-semibold text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
            >
              <Settings
                className="text-primary  dark:group-hover:fill-gray-300"
                size={24}
              />
              <span className="text-base font-medium">Pengaturan</span>
            </DropdownItem>
          </li>
        </ul>
        <button
          onClick={() => mutation.mutate()}
          className="flex items-center gap-3 px-4 py-3 mt-3 font-semibolld text-gray-700 rounded-lg group text-theme-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
        >
          <LogOut
            className="text-primary  dark:group-hover:fill-gray-300"
            size={24}
          />
          Log Out
        </button>
      </Dropdown>
    </div>
  );
}
