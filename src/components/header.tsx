"use client";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface User {
  name: string;
}

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const router = useRouter();

  const handleLogout = () => {
    onLogout();
    router.push("/");
  };

  return (
    <header className="flex items-center justify-between bg-white p-4 shadow-md dark:bg-black">
      <Image
        src="/custodia-logo.svg"
        alt="Custodia Logo"
        width={150}
        height={50}
      />
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Image
            src="/user.svg"
            alt="User Icon"
            width={24}
            height={24}
            className="rounded-full bg-gray-200 p-1 dark:bg-gray-700"
          />
          <span className="font-medium text-black dark:text-white">
            {user.name}
          </span>
        </div>
        <Button onClick={handleLogout} variant="logout">
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Header;
