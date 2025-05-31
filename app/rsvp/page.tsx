"use client";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { Loading } from "@/components/loading";
import GuestForm from "@/components/rsvp/form";
import { useEffect, useState } from "react";
import { GuestListType } from "@/components/rsvp/schema";
import { getRsvp } from "@/components/rsvp/service";
import { useRouter } from "next/navigation";
import { ErrorToast } from "@/components/error-toast";

export default function RsvpPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [booking, setBooking] = useState<GuestListType>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;

    if (!user) {
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
    <div className="container py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          I’m thrilled to host you!
        </h1>
        <div className="w-20 h-1 bg-chart-1 mx-auto mb-6"></div>
        {!user && (
          <p className="max-w-2xl mx-auto">
            You need to be logged in before you can book your spot at the party.
            Space is limited, so get it while it is hot!
          </p>
        )}
      </motion.div>
      <GuestForm data={booking} />
      <ErrorToast
        message={errorMessage}
        onClose={() => setErrorMessage(null)}
      />
    </div>
  );
}
