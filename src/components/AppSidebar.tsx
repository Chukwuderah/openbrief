"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  FolderClosed,
  Home,
  LogOut,
  Settings,
  X,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./ThemeToggle";

const menuItems = [
  { icon: Home, label: "Dashboard", to: "/" },
  { icon: FileText, label: "Generate Brief", to: "/brief" },
  { icon: FolderClosed, label: "Saved Briefs", to: "#", disabled: true },
  { icon: Settings, label: "Settings", to: "#", disabled: true },
];

export function AppSidebar() {
  const { isMobile, setOpenMobile } = useSidebar();
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="p-4 relative">
        {isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 md:hidden"
            onClick={() => setOpenMobile(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close Sidebar</span>
          </Button>
        )}
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold text-primary"
        >
          OpenBrief
        </motion.h2>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = pathname === item.to;

                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.disabled ? "Coming soon" : item.label}
                      className={`${
                        item.disabled ? "opacity-50 cursor-not-allowed" : ""
                      } ${isActive ? "bg-muted text-primary font-semibold" : ""}`}
                      onClick={
                        item.disabled
                          ? (e) => {
                              e.preventDefault();
                            }
                          : isMobile
                          ? () => setOpenMobile(false)
                          : undefined
                      }
                    >
                      <Link href={item.to}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-4 space-y-4">
          <ThemeToggle showLabel />
          <SidebarMenuButton
            asChild
            variant="outline"
            className="w-full justify-start text-destructive hover:text-destructive"
            tooltip="Logout"
          >
            <button disabled>
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </SidebarMenuButton>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
