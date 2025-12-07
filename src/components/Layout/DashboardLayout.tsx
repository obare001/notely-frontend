import { AppSidebar } from "../Sidebar/AppSidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <AppSidebar />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
