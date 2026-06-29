"use client";

import Image from "next/image";

type UniversalLoaderProps = {
  message?: string;
};

export default function UniversalLoader({
  message = "Loading DevFlow...",
}: UniversalLoaderProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b0b10]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-20 w-20">
          <div className="absolute inset-0 rounded-full border-2 border-violet-400/30 border-t-violet-500 animate-spin" />
          <div className="absolute inset-2 rounded-full bg-white/5" />
          <Image
            src="/logo.png"
            alt="DevFlow"
            fill
            className="object-contain p-3 animate-pulse"
            priority
          />
        </div>
        <p className="text-sm text-white/80 tracking-wide">{message}</p>
      </div>
    </div>
  );
}
