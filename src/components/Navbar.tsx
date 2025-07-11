"use client"

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bell, Search, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import ThemeToggle from "@/components/ThemeToggle";
import { SidebarTrigger } from "@/components/ui/sidebar/index";

const Navbar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 shadow-sm h-16">
      <div className="container mx-auto h-full px-4">
        <div className="flex items-center justify-between h-full gap-4">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="flex sm:hidden" />
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl font-bold text-primary dark:text-white"
            >
              <Link href="/">OpenBrief</Link>
            </motion.h1>
          </div>

          <div className="flex-1 max-w-md mx-4">
            {isSearchOpen ? (
              <div className="relative w-full animate-in slide-in-from-top-2">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search briefs..."
                  className="pl-8 h-9 w-full rounded-md"
                  autoFocus
                  onBlur={() => setIsSearchOpen(false)}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="hidden md:block relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search briefs..."
                  className="pl-8 h-9 w-full rounded-md"
                />
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {!isSearchOpen && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="h-5 w-5" />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative cursor-pointer"
                      aria-label="Notifications"
                    >
                      <Bell className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                      <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <div className="flex flex-col gap-2 p-4">
                      <h3 className="font-semibold">Notifications</h3>
                      <div className="text-sm text-muted-foreground">
                        <p className="py-2 border-b">
                          New brief template available: &quot; Product Launch &quot;
                        </p>
                        <p className="py-2 border-b">
                          Your brief &quot;Q4 Campaign &quot; was saved
                        </p>
                        <p className="py-2">Welcome to OpenBrief! 🎉</p>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="User profile"
                      className="cursor-pointer"
                    >
                      <User className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem className="font-medium cursor-pointer">
                      Guest User
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem disabled>
                      Profile (coming soon)
                    </DropdownMenuItem>
                    <DropdownMenuItem disabled>
                      Settings (coming soon)
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ThemeToggle showLabel />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;