import Link from 'next/link';
import { Code, Mail, MapPin, Calendar } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Code className="h-5 w-5 text-primary" />
              <span className="font-fira-code font-bold text-lg">
                <span className="text-primary">clarice</span>
                <span className="text-chart-1">.</span>
                <span className="text-chart-2">is</span>
                <span className="text-chart-3">(</span>
                <span className="text-chart-4">40</span>
                <span className="text-chart-3">)</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              A celebration of four decades of awesomeness
            </p>
          </div>

          <div>
            <h3 className="font-medium text-sm mb-3 tracking-wide uppercase">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/rsvp" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  RSVP
                </Link>
              </li>
              <li>
                <Link href="/manage" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                  Manage Booking
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-sm mb-3 tracking-wide uppercase">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2 text-chart-2" />
                <span>June 15, 2025 at 7:00 PM</span>
              </li>
              <li className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2 text-chart-1" />
                <span>The Tech Hub, 123 Coding Ave, San Francisco</span>
              </li>
              <li className="flex items-center text-sm text-muted-foreground">
                <Mail className="h-4 w-4 mr-2 text-chart-4" />
                <span>clarice@bouwer.dev</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Clarice’s 40th. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-2 md:mt-0">
            <span className="font-fira-code">// made with 💻 and 💖</span>
          </p>
        </div>
      </div>
    </footer>
  );
}