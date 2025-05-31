"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Focus, NotebookTabs, Sparkles, TerminalSquare } from "lucide-react";
import { FirebaseProvider } from "@/providers/firebase";
import { useAuth } from "@/hooks/use-auth";
import { PartyDetails } from "@/components/party-details";
import { Card, CardContent } from "@/components/ui/card";
import { GhostLinkButton } from "@/components/link-button";
import { Loading } from "@/components/loading";
import { getRsvp } from "@/components/rsvp/service";
import { GuestListType } from "@/components/rsvp/schema";
import { ErrorToast } from "@/components/error-toast";
import GuestForm from "@/components/rsvp/form";

export default function ManagePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [booking, setBooking] = useState<GuestListType>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
      return;
    }

    const checkBooking = async () => {
      try {
        if (!user) return;
        const booking = await getRsvp(user);
        setBooking(booking);
      } catch (error) {
        setErrorMessage(
          "An error occurred while fetching your booking. Please try again later."
        );
      }
    };
    checkBooking();
  }, [user, loading, router]);

  if (loading) return <Loading />;

  return (
    <FirebaseProvider>
      <div className="container py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Manage your Booking
          </h1>
          <div className="w-20 h-1 bg-chart-5 mx-auto mb-6"></div>
        </motion.div>
        <section className="max-w-7xl mx-auto mb-4">
          <GuestForm data={booking} />
        </section>
      </div>
      <ErrorToast
        message={errorMessage}
        onClose={() => setErrorMessage(null)}
      />
    </FirebaseProvider>
  );
}
