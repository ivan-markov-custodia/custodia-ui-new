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
        <div className="rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
          <div className="space-y-2">
            {Object.entries(user).map(([key, value]) =>
              typeof value !== "object" ? (
                <div
                  key={key}
                  className="flex justify-between border-b border-gray-200 py-2 dark:border-gray-700"
                >
                  <span className="font-medium text-gray-600 capitalize dark:text-gray-400">
                    {key.replace(/([A-Z])/g, " $1")}
                  </span>
                  <span className="text-right text-gray-800 dark:text-gray-200">
                    {String(value)}
                  </span>
                </div>
              ) : null,
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
