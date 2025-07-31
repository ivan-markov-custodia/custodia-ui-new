"use client";
import React from "react";
import Header from "../../components/header";
import { useAuth } from "../../components/auth-provider";
import { useRouter } from "next/navigation";

const ProfilePage: React.FC = () => {
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
          <h1 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
            Profile
          </h1>
          <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
            <div className="mb-6 flex items-center space-x-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
                <span className="text-2xl font-bold text-gray-600 dark:text-gray-300">
                  {user.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {user.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
              </div>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                  Personal Information
                </h3>
                <div className="space-y-3">
                  {Object.entries(user).map(([key, value]) => {
                    if (typeof value !== "object" && value !== null && key !== 'name') {
                      return (
                        <div key={key} className="flex justify-between border-b border-gray-200 pb-2 dark:border-gray-700">
                          <span className="font-medium text-gray-600 capitalize dark:text-gray-400">
                            {key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
                          </span>
                          <span className="text-right text-gray-800 dark:text-gray-200">
                            {String(value)}
                          </span>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
              
              {user.billingAddress && (
                <div>
                  <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                    Billing Address
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-800 dark:text-gray-200">
                      {user.billingAddress.address1}
                    </p>
                    <p className="text-gray-800 dark:text-gray-200">
                      {user.billingAddress.city}, {user.billingAddress.state} {user.billingAddress.postalCode}
                    </p>
                    <p className="text-gray-800 dark:text-gray-200">
                      {user.billingAddress.country}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;