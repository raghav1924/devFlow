"use client";

import { useAuth } from "@/hooks/useAuth";
import { signOut } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user === null) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || user === null) {
    return <p>Loading...</p>;
  }

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">
            Production API Overview
          </h1>
          <p className="mt-1 text-sm text-white/60">
            Welcome back, {user.email}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:bg-white/10 transition"
        >
          Log out
        </button>
      </div>

      <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-[#151524] to-[#050509] p-4 text-sm text-white/80">
        Dashboard content goes here.
      </div>
    </div>
  );
}

