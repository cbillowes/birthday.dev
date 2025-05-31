"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import Link from "next/link";
import Image from "next/image";
import { useWindowSize } from "react-use";
import tada from "@/app/images/tada.png";
import { Button } from "@/components/ui/button";
import { GuestListType } from "@/components/rsvp/schema";
import { FirebaseProvider } from "@/providers/firebase";
import RegisterForm from "@/components/register/form";
import { getRsvp } from "@/components/rsvp/service";
import { useAuth } from "@/hooks/use-auth";

export default function RsvpPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [rsvp, setRsvp] = useState<GuestListType>();
  const { width, height } = useWindowSize();

  useEffect(() => {
    const fetchRsvp = async () => {
      if (!user || loading) return;

      try {
        const token = await user.getIdToken();
        const rsvpData = await getRsvp(token);
        console.log(rsvpData);
        if (rsvpData) {
          setRsvp(rsvpData);
        } else {
          router.push("/rsvp");
        }
      } catch (error) {
        console.error("Failed to fetch RSVP data:", error);
        router.push("/rsvp");
      }
    }
    fetchRsvp();
  }, [user, loading, router]);

  return (
    <FirebaseProvider>
      <div className="container py-16 md:py-24">
        <Confetti width={width} height={height} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Thank You!</h1>
          <div className="w-20 h-1 bg-chart-1 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto">
            We have received your response under{" "}
            <strong className="font-bold">{rsvp?.bookingName}</strong> and look
            forward to hosting you at this once in a life time event.
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
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 text-white/70">Name</th>
                <th className="px-4 py-2 text-white/70">Number</th>
              </tr>
            </thead>
            <tbody>
              {rsvp?.guests?.map((guest, index) => (
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
          <div className="my-4 flex flex-col md:flex-row items-center justify-center gap-4">
            <Button
              variant="outline"
              className="bg-white text-chart-1 hover:bg-chart-5 text-gray-900 hover:text-white w-full"
              asChild
            >
              <span>Create account</span>
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
                Add to Calendar
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </FirebaseProvider>
  );
}
