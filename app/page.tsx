"use client";

import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { DashboardContent } from "@/components/dashboard-content";
import { ChatManagement } from "@/components/chat-management";
import { AnalyticsDashboard } from "@/components/analytics";
import { Settings } from "@/components/settings";

export default function Dashboard() {
  const [activeView, setActiveView] = useState("dashboard");

  const renderContent = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardContent />;
      case "chats":
        return <ChatManagement />;
      case "analytics":
        return <AnalyticsDashboard />;
      case "settings":
        return <Settings />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1f3a]">
      <SidebarProvider defaultOpen={true}>
        <AppSidebar activeView={activeView} setActiveView={setActiveView} />
        <main className="flex-1 p-6">{renderContent()}</main>
      </SidebarProvider>
    </div>
  );
}
