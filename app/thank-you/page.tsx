"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Confetti from "react-confetti";
import { motion } from "framer-motion";
import { useWindowSize } from "react-use";
import { Button } from "@/components/ui/button";
import { BookingType } from "@/components/rsvp/schema";
import { FirebaseProvider } from "@/providers/firebase";
import { getBooking } from "@/components/rsvp/service";
import { useAuth } from "@/hooks/use-auth";
import { Loading } from "@/components/loading";
import { ErrorToast } from "@/components/error-toast";
import tada from "@/app/images/tada.png";

export default function ThankYouPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [booking, setBooking] = useState<BookingType>();
  const { width, height } = useWindowSize();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooking = async () => {
      if (!user || loading) return;

      try {
        const booking = await getBooking(user);
        if (booking) {
          setBooking(booking);
        } else {
          router.push("/manage");
        }
      } catch (error) {
        console.error(
          "Something went wrong will trying to fetch your booking."
        );
      }
    };
    fetchBooking();
  }, [user, loading, router]);

  if (loading) return <Loading />;

  return (
    user && (
      <FirebaseProvider>
        <div className="container py-16 md:py-24">
          <Confetti width={width} height={height} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Thank You for Booking!
            </h1>
            <div className="w-20 h-1 bg-chart-1 mx-auto mb-6"></div>
            <p className="max-w-2xl mx-auto">
              I’ve received your response and will let you know once a spot has
              been successfully confirmed for you (and your guests) at my
              birthday party.
            </p>
          </motion.div>
          <div className="max-w-2xl mx-auto text-center p-6 border-white/10 bg-black/40 rounded-lg shadow-sm border border-gray-200 animate-fadeIn">
            <Image
              src={tada}
              alt="Tada"
              width={80}
              height={80}
              className="mx-auto mb-4"
            />
            <h2 className="text-lg font-bold mb-2 text-left pl-4">
              Who is joining us?
            </h2>
            <div className="overflow-scroll">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-white/70">Name</th>
                    <th className="px-4 py-2 text-white/70">Number</th>
                  </tr>
                </thead>
                <tbody>
                  {booking?.guests?.map((guest, index) => (
                    <tr
                      key={`summary-row-${index}`}
                      className="border-t border-white/20"
                    >
                      <td className="px-4 py-2 text-white/90">{guest.name}</td>
                      <td className="px-4 py-2 text-white/90">{guest.phone}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="my-4 flex flex-col md:flex-row items-center justify-center gap-4">
              <Button
                variant="outline"
                className="bg-white text-chart-1 hover:bg-chart-5 text-gray-900 hover:text-white w-full"
                asChild
              >
                <Link href="/manage" className="text-black">
                  Manage your Booking
                </Link>
              </Button>
              <Button
                variant="outline"
                className="border-white bg-transparent text-white text-chart-1 hover:bg-chart-5 hover:text-white w-full"
                asChild
              >
                <Link
                  href="/calendar.ics"
                  target="_blank"
                  download="save-the-date-clarice.ics"
                  className="text-white"
                >
                  Save the Date
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <ErrorToast
          message={errorMessage}
          onClose={() => setErrorMessage(null)}
        />
      </FirebaseProvider>
    )
  );
}
