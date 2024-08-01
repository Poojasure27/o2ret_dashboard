"use client";
import React from "react";
import { logout } from "./actions";
import { useRouter } from "next/navigation";

const LogoutPage: React.FC = () => {
  const router = useRouter(); // Initialize useRouter

    const handleLogout = async () => {
        const res = await logout();
        if (res === "Logged out") {
        router.push("/");
        }
    };
    handleLogout();

  return null;
};

export default LogoutPage;