"use client";
import React from "react";
import Header from "../../components/header";
import { useAuth } from "../../components/auth-provider";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, MapPin, Building, Calendar, Globe, CheckCircle, XCircle } from "lucide-react";

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

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString();
  };

  const formatAddress = (address: any) => {
    if (!address) return "Not provided";
    return address.asText || "Address information available";
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header user={user} onLogout={logout} />
      <main className="p-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <User className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                User Profile
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Your account information and preferences
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Personal Information */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Personal Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Full Name</label>
                  <p className="text-gray-900 dark:text-white font-medium">{user.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">First Name</label>
                  <p className="text-gray-900 dark:text-white">{user.firstname || "Not provided"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Last Name</label>
                  <p className="text-gray-900 dark:text-white">{user.lastname || "Not provided"}</p>
                </div>
                {user.title && (
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Title</label>
                    <p className="text-gray-900 dark:text-white">{user.title}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Contact Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
                  <div className="flex items-center gap-2">
                    <p className="text-gray-900 dark:text-white">{user.email}</p>
                    {user.emailVerified ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user.emailVerified ? "Verified" : "Not verified"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Mobile Phone</label>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <p className="text-gray-900 dark:text-white">{user.mobile || "Not provided"}</p>
                    {user.mobile && (
                      user.mobileVerified ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )
                    )}
                  </div>
                  {user.mobile && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {user.mobileVerified ? "Verified" : "Not verified"}
                    </p>
                  )}
                </div>
                {user.office && (
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Office Phone</label>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <p className="text-gray-900 dark:text-white">{user.office}</p>
                      {user.extension && (
                        <span className="text-sm text-gray-500 dark:text-gray-400">ext. {user.extension}</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Address Information */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Address Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Billing Address</label>
                  <p className="text-gray-900 dark:text-white">{formatAddress(user.billingAddress)}</p>
                </div>
                {user.address && (
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Primary Address</label>
                    <p className="text-gray-900 dark:text-white">{formatAddress(user.address)}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Company & Account Information */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Building className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Company & Account
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Company ID</label>
                  <p className="text-gray-900 dark:text-white">{user.companyId}</p>
                </div>
                {user.employeeId && (
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Employee ID</label>
                    <p className="text-gray-900 dark:text-white">{user.employeeId}</p>
                  </div>
                )}
                {user.subsidiaryId && (
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Subsidiary ID</label>
                    <p className="text-gray-900 dark:text-white">{user.subsidiaryId}</p>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Account Status</label>
                  <div className="flex items-center gap-2">
                    {user.active ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    <p className="text-gray-900 dark:text-white capitalize">
                      {user.active ? "Active" : "Inactive"}
                    </p>
                  </div>
                  {user.reason && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                      Reason: {user.reason}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Preferences & Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:col-span-2">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Preferences & Settings
              </h2>
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Locale</label>
                  <p className="text-gray-900 dark:text-white">{user.locale || "Not set"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Timezone</label>
                  <p className="text-gray-900 dark:text-white">{user.timezone || "Not set"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">OAuth Status</label>
                  <div className="flex items-center gap-2">
                    {!user.oauthDisabled ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    <p className="text-gray-900 dark:text-white">
                      {!user.oauthDisabled ? "Enabled" : "Disabled"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Dates */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:col-span-2">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Important Dates
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Start Date</label>
                  <p className="text-gray-900 dark:text-white">{formatDate(user.startDate)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Information Last Updated</label>
                  <p className="text-gray-900 dark:text-white">{formatDate(user.infoChangedOn)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Status Changed On</label>
                  <p className="text-gray-900 dark:text-white">{formatDate(user.statusChangedOn)}</p>
                </div>
                {user.mobileVerificationDate && (
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Mobile Verified On</label>
                    <p className="text-gray-900 dark:text-white">{formatDate(user.mobileVerificationDate)}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;