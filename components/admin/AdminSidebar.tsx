"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Dashboard", href: "/admin/dashboard" },
  { name: "Projects", href: "/admin/dashboard/projects" },
  { name: "Blogs", href: "/admin/dashboard/blogs" },
  { name: "Contacts", href: "/admin/dashboard/contacts" },
  { name: "Settings", href: "/admin/settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-background text-foreground p-6 hidden md:flex flex-col justify-between shadow-md">
      <div>
        <h2 className="text-2xl font-bold mb-8">🚀 Admin Panel</h2>
        <nav className="space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "block px-4 py-2 rounded-md transition-all duration-200",
                pathname === link.href
                  ? "bg-white/30 text-black font-semibold shadow"
                  : "hover:bg-white/10"
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>

      <p className="text-xs text-white/50 mt-10">© 2025 Nexora</p>
    </aside>
  );
}
