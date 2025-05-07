import { SidebarInset, SidebarProvider, SidebarTrigger } from "../../../components/ui/sidebar"
import { AppSidebar } from "../../../components/app-sidebar"
import { Navigate } from "@tanstack/react-router";
import { Separator } from "../../../components/ui/separator";
import { DynamicBreadcrumb } from "../../../utils/dynamic-breadcrumb";

export default function Layout({ children }: { children: React.ReactNode }) {

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isAdmin = user.isAdmin;

  if (!isAdmin) {
    return <Navigate to="/admin/auth" />;
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="w-full my-3">
        <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <DynamicBreadcrumb />
        </header>
        <main className="h-screen w-full">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
