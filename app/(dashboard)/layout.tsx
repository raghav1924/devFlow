import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050509] text-white flex">
      {/* Sidebar */}
      <aside className="hidden md:flex md:w-64 lg:w-72 flex-col border-r border-white/10 bg-black/60">
        <div className="h-16 flex items-center gap-2 px-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="relative ">
              <Image
                src="/logo_text.png"
                alt="DevFlow"
                // fill
                className="object-contain"
                priority
                width={150}
                height={150}
              />
            </div>
            {/* <span className="font-semibold tracking-tight text-sm">DevFlow</span> */}
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 text-sm">
          <NavItem href="/dashboard" label="Dashboard" active />
          <NavItem href="#" label="API Logs" />
          <NavItem href="#" label="Integrations" />
          <NavItem href="#" label="Settings" />
        </nav>
      </aside>

      {/* Main column */}
      <div className="flex-1 flex flex-col">
        {/* Top navbar */}
        <header className="h-16 flex items-center justify-between px-4 lg:px-8 border-b border-white/10 bg-black/60">
          <div className="flex items-center gap-3 text-xs text-white/70">
            <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <span>Production</span>
            </span>
            <span className="hidden sm:inline text-white/40">/</span>
            <span className="hidden sm:inline text-white/80">DevFlow</span>
          </div>

          <div className="flex items-center gap-3 text-xs text-white/70">
            <button className="hidden sm:inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 hover:bg-white/10 transition">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>99.98% uptime</span>
            </button>
            <button className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition">
              <span className="h-1 w-1 rounded-full bg-white" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

type NavItemProps = {
  href: string;
  label: string;
  active?: boolean;
};

function NavItem({ href, label, active }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 rounded-lg px-3 py-2 transition ${
        active
          ? "bg-violet-600 text-white shadow-[0_10px_40px_rgba(139,92,246,0.5)]"
          : "text-white/70 hover:bg-white/5"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
      <span>{label}</span>
    </Link>
  );
}

