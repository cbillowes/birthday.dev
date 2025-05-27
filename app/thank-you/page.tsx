"use client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import Link from "next/link";
import Image from "next/image";
import { useWindowSize } from "react-use";
import { Button } from "@/components/ui/button";
import tada from "@/app/images/tada.png";
import { GuestListType } from "../../components/rsvp/schema";
import { useEffect, useState } from "react";

export default function RsvpPage() {
  const router = useRouter();
  const [rsvp, setRsvp] = useState<GuestListType>();
  const { width, height } = useWindowSize();

  useEffect(() => {
    const rsvp = JSON.parse(
      sessionStorage.getItem("rsvp") || "{}"
    ) as GuestListType;
    setRsvp(rsvp);
    if (!rsvp) {
      router.push("/rsvp");
    }
  }, [router]);

  return (
    <div className="container py-16 md:py-24">
      <Confetti width={width} height={height} />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Thank You!</h1>
        <p className="max-w-2xl mx-auto">
          We have received your response under{" "}
          <strong className="font-bold">{rsvp?.surname}</strong> and look
          forward to hosting you at this once in a life time event.
        </p>
      </motion.div>
      <div className="max-w-2xl mx-auto text-center p-6 border-white/20 bg-white/10 rounded-lg shadow-sm border border-gray-200 animate-fadeIn">
        <Image
          src={tada}
          alt="Tada"
          width={80}
          height={80}
          className="mx-auto mb-4"
        />
        <div className="my-4 flex flex-col md:flex-row items-center justify-center gap-4">
          <Button
            variant="outline"
            className="bg-white text-chart-1 hover:bg-chart-5 text-gray-900 hover:text-white w-full"
            asChild
          >
            <Link
              href="/calendar.ics"
              target="_blank"
              download="save-the-date-clarice.ics"
            >
              Add to Calendar
            </Link>
          </Button>
          <Button
            variant="outline"
            className="bg-white text-chart-1 hover:bg-chart-5 text-gray-900 hover:text-white w-full"
            asChild
          >
            <Link href="/">Go home</Link>
          </Button>
        </div>
        <h2 className="text-lg font-bold mb-2 text-left pl-4">
          Who is joining us?
        </h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 text-white/70">Name</th>
              <th className="px-4 py-2 text-white/70">WhatsApp number</th>
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
      </div>
    </div>
  );
}
function useSession(arg0: string): [any, any] {
  throw new Error("Function not implemented.");
}
