"use client";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

interface User {
  name: string;
}

interface HeaderProps {
  user: User;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    onLogout();
    router.push("/");
  };

  const handleProfileClick = () => {
    setIsDropdownOpen(false);
    router.push("/profile");
  };

  const handleScopesClick = () => {
    setIsDropdownOpen(false);
    router.push("/scopes");
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
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 rounded-lg px-3 py-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
          >
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
            <ChevronDown 
              className={`h-4 w-4 text-gray-500 transition-transform ${
                isDropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-gray-200 bg-white py-2 shadow-lg dark:border-gray-700 dark:bg-gray-800">
              <button
                onClick={handleProfileClick}
                className="flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <Image
                  src="/user.svg"
                  alt="Profile"
                  width={16}
                  height={16}
                  className="mr-3"
                />
                Profile
              </button>
              <button
                onClick={handleScopesClick}
                className="flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <Image
                  src="/eye.svg"
                  alt="Scopes"
                  width={16}
                  height={16}
                  className="mr-3"
                />
                Scopes
              </button>
              <hr className="my-2 border-gray-200 dark:border-gray-700" />
              <button
                onClick={handleLogout}
                className="flex w-full items-center px-4 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
              >
                <svg
                  className="mr-3 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </div>
          )}
        </div>
        <Button onClick={handleLogout} variant="logout" className="md:hidden">
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Header;
