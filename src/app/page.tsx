"use client";
import Image from "next/image";
import { useState, FormEvent, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth-provider";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { user, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, rememberMe: true, web: true }),
      });

      if (res.ok) {
        const data = await res.json();
        login(data.user, data.jwtToken, data.scopes);
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="flex h-[412px] w-[368px] flex-col justify-between rounded-lg bg-white p-8 shadow-[0px_2px_1px_-1px_rgba(0,0,0,0.2),0px_1px_1px_0px_rgba(0,0,0,0.14),0px_1px_3px_0px_rgba(0,0,0,0.12)] dark:bg-black">
        <div>
          <div className="mb-6 flex justify-center">
            <Image
              src="/custodia-logo.svg"
              alt="Custodia Logo"
              width={150}
              height={50}
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <Input
                type="email"
                id="email"
                placeholder="name@company.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  <Image
                    src={showPassword ? "/eye-slash.svg" : "/eye.svg"}
                    alt="Toggle password visibility"
                    width={16}
                    height={16}
                    className="text-gray-500 dark:text-gray-400"
                  />
                </button>
              </div>
            </div>
            {error && (
              <p className="mt-2 text-center text-sm text-red-600">{error}</p>
            )}
            <div className="mb-6 text-right text-sm">
              <a
                href="#"
                className="font-medium text-[#2ec762] hover:underline dark:text-[#2ec762]"
              >
                Forgot password?
              </a>
            </div>
            <Button type="submit">Login to your account</Button>
          </form>
        </div>
        <p className="text-center text-sm font-light text-gray-500 dark:text-gray-400">
          Don’t have an account yet?{" "}
          <a
            href="#"
            className="font-medium text-[#2ec762] hover:underline dark:text-[#2ec762]"
          >
            Sign up
          </a>
        </p>
      </div>
    </main>
  );
}
