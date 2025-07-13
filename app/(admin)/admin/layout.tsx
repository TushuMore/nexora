import { ReactNode } from "react";
import { UserButton } from "@clerk/nextjs";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-muted/10">
      {/* Sidebar (client component) */}
      <AdminSidebar />

      {/* Main Panel */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="w-full h-20 px-6 py-4 flex justify-end items-center bg-background shadow-sm sticky top-0 z-10">
          <UserButton afterSignOutUrl="/" />
        </header>

        {/* Main Content */}
        <main className="p-6">
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
