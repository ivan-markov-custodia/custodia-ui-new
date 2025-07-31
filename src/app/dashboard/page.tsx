"use client";
import React from "react";
import Header from "../../components/header";
import { useAuth } from "../../components/auth-provider";
import { useRouter } from "next/navigation";

const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header user={user} onLogout={logout} />
      <main className="p-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-lg bg-white p-8 shadow-md dark:bg-gray-800 text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome, {user.firstname} {user.lastname}!
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              You're successfully logged into your Custodia dashboard.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
