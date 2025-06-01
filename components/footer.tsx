"use client";
import Link from "next/link";
import { Mail, MapPin, Calendar, PhoneIcon } from "lucide-react";
import { Banner } from "@/components/banner";
import { useAuth } from "@/hooks/use-auth";
import { GhostLinkButton } from "@/components/link-button";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { user } = useAuth();

  return (
    <footer className="border-t border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Banner showCode size="sm" />
            </div>
            <p className="text-sm text-muted-foreground">
              A celebration of four decades of awesomeness.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-sm mb-3 tracking-wide uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/rsvp"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Book your Spot
                </Link>
              </li>
              {user && (
                <li>
                  <Link
                    href="/dashboard"
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    My Dashboard
                  </Link>
                </li>
              )}
              <li>
                <Link
                  href="/manage"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Manage Booking
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-sm mb-3 tracking-wide uppercase">
              Contact Info
            </h3>
            {user && (
              <ul className="space-y-2">
                <li className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2 text-chart-2" />
                  <span>July 19, 2025 at 6:30 PM</span>
                </li>
                <li className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-2 text-chart-1" />
                  <span>Kalatua Garden Restaurant</span>
                </li>
                <li className="flex items-center text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 mr-2 text-chart-4" />
                  <span>clarice@bouwer.dev</span>
                </li>
                <li className="flex items-center text-sm text-muted-foreground">
                  <PhoneIcon className="h-4 w-4 mr-2 text-chart-5" />
                  <span className="text-muted-foreground">+230 5455 1651</span>
                </li>
              </ul>
            )}
            {!user && <div>Log in to see contact info</div>}
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Clarice’s 40th. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-2 md:mt-0">
            <span className="font-mono">{"//"} made with 💻 and 💖</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
