"use client";

import { ErrorToast } from "@/components/error-toast";
import { Loading } from "@/components/loading";
import GuestForm from "@/components/rsvp/form";
import { BookingType } from "@/components/rsvp/schema";
import { cancelBooking, getBookingByRef } from "@/components/rsvp/service";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PortalManagementPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, loading } = useAuth();
  const [booking, setBooking] = useState<BookingType>();
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push("/login");
      return;
    }
    const checkBooking = async () => {
      try {
        const booking = await getBookingByRef(user, id as string);
        setBooking(booking);
      } catch (error) {
        setErrorMessage(
          "Could not find booking. Please check the link or contact support."
        );
      }
    };
    checkBooking();
  }, [id, user, loading, router]);

  if (loading) return <Loading />;

  const cancel = async () => {
    if (!user || !booking) return;
    try {
      const saved = await cancelBooking(user, booking);
      if (saved) {
        router.push("/portal");
      } else {
        setErrorMessage("Failed to cancel booking. Please try again later.");
      }
    } catch (error) {
      console.error("Error canceling booking:", error);
      setErrorMessage("Failed to cancel booking. Please try again later.");
    }
  };

  return (
    <div className="container py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Manage Booking</h1>
        <div className="w-20 h-1 bg-chart-1 mx-auto mb-6"></div>
        <p>
          <Button
            className="mt-2 bg-red-700 text-white hover:bg-red-800"
            onClick={cancel}
          >
            Cancel Booking
          </Button>
          <Button asChild>
            <Link
              href="/portal"
              className="ml-4 bg-white text-black hover:bg-chart-5"
            >
              Back to Portal
            </Link>
          </Button>
        </p>
      </motion.div>
      <GuestForm data={booking} redirectTo="/portal" />
      <ErrorToast message={errorMessage} onClose={() => setErrorMessage("")} />
    </div>
  );
}
