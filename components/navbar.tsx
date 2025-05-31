"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Banner } from "@/components/banner";
import { useAuth } from "@/hooks/use-auth";
import { Spinner } from "@/components/spinner";
import { auth, signOut } from "@/firebase/client";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const navItems = [
    { href: "/", label: "Home", show: true },
    { href: "/gallery", label: "Gallery", show: true },
    { href: "/register", label: "Register", show: !user },
    {
      href: "/booking",
      label: "Manage Booking",
      show: true,
    },
    { label: "Login", href: "/login", show: !user },
    {
      onClick: handleLogout,
      label: "Logout",
      href: "javascript:void(0);",
      show: !!user,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/80 border-b border-border/40">
      <div className="container flex h-16 items-center justify-between">
        <Banner showCode to="/" size="sm" />

        {/* Desktop Navigation */}
        {loading && <Spinner />}
        {!loading && (
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map(
              (item) =>
                item.show && (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={item.onClick}
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      pathname === item.href
                        ? "text-chart-5"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                )
            )}
            <Button
              asChild
              className="bg-chart-5 hover:bg-chart-2/90 text-white"
            >
              <Link href="/rsvp">Book your Spot</Link>
            </Button>
          </nav>
        )}

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden"
          >
            <div className="container py-4 flex flex-col space-y-4">
              {navItems.map(
                (item) =>
                  item.show && (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "py-2 px-3 rounded-md transition-colors",
                        pathname === item.href
                          ? "bg-primary/10 text-foreground"
                          : "text-muted-foreground hover:bg-primary/5 hover:text-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                  )
              )}
              <Button
                asChild
                className="w-full bg-chart-5 hover:bg-chart-5/90 text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Link href="/rsvp">Book your Spot</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
