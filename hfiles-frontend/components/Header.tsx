'use client';
import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-blue-800 text-white flex justify-between items-center px-6 py-3 shadow-md">
      <div className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="HFiles Logo"
          width={40}
          height={40}
        />
        <h1 className="text-xl font-semibold tracking-wide">HFiles</h1>
      </div>
      <div className="flex items-center gap-4">
        <Image
          src="/User.png"
          alt="User Avatar"
          width={40}
          height={40}
          className="w-14 h-14 rounded-full border-white object-cover"
        />
      </div>
    </header>
  );
}
