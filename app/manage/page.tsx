"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FirebaseProvider } from "@/providers/firebase";
import { useAuth } from "@/hooks/use-auth";
import { Loading } from "@/components/loading";
import { getBooking } from "@/components/rsvp/service";
import { BookingType } from "@/components/rsvp/schema";
import GuestForm from "@/components/rsvp/form";

export default function ManagePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [booking, setBooking] = useState<BookingType>();

  useEffect(() => {
    if (!user && !loading) {
      router.push("/login");
      return;
    }

    const checkBooking = async () => {
      try {
        if (!user) return;
        const booking = await getBooking(user);
        setBooking(booking);
      } catch (error) {}
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
          className="max-w-2xl text-center mb-12 mx-auto"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Manage your Booking
          </h1>
          <div className="w-20 h-1 bg-chart-5 mx-auto mb-6"></div>
          <p>
            Please note that changing your booking will reset the confirmation
            state. You will receive a new confirmation message from me, should
            their be enough space available.
          </p>
        </motion.div>
        <section className="max-w-7xl mx-auto mb-4">
          <GuestForm data={booking} />
        </section>
      </div>
    </FirebaseProvider>
  );
}
