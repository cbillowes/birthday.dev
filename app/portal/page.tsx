"use client";
import { ErrorToast } from "@/components/error-toast";
import { Loading } from "@/components/loading";
import { BookingEntityType } from "@/components/rsvp/schema";
import { getBookings } from "@/components/rsvp/service";
import { useAuth } from "@/hooks/use-auth";
import { FirebaseProvider } from "@/providers/firebase";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PortalPage() {
  const { user, loading } = useAuth();
  const [bookings, setBookings] = useState<BookingEntityType[]>([]);
  const [totalGuests, setTotalGuests] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getAllBookings = async () => {
      if (!user && !loading) {
        router.push("/login");
        return;
      }
      if (user) {
        try {
          const bookings = await getBookings(user);
          setBookings(bookings);
          setTotalGuests(
            bookings.reduce((acc, booking) => {
              return acc + (booking.guests?.length || 0);
            }, 0)
          );
        } catch (error) {
          router.push("/dashboard");
        }
      }
    };
    getAllBookings();
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
          <h1 className="text-3xl md:text-4xl font-bold mb-4"> Bookings</h1>
          <div className="w-20 h-1 bg-chart-5 mx-auto mb-6"></div>
          <p>
            {bookings.length} booking(s) and {totalGuests} guest(s) in total.
          </p>
        </motion.div>
        <section className="max-w-7xl mx-auto mb-4 overflow-scroll">
          <table className="w-full text-left border-collapse bg-black/20 border-white/20 border">
            <thead>
              <tr className="bg-black/50">
                <th>&nbsp;</th>
                <th className="px-4 py-2 text-white/70">Name</th>
                <th className="px-4 py-2 text-white/70">Number</th>
                <th className="px-4 py-2 text-white/70">WhatsApp?</th>
                <th className="px-4 py-2 text-white/70 whitespace-nowrap">Est. Time</th>
                <th className="px-4 py-2 text-white/70">Comments</th>
                <th className="px-4 py-2 text-white/70">Created</th>
                <th className="px-4 py-2 text-white/70">Modified</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(({ guests, createdAt, modifiedAt }, i) => {
                return guests?.map((guest, j) => (
                  <tr
                    key={`summary-row-${i}-${j}`}
                    className="border-t border-white/20"
                  >
                    <td className="px-4 py-2 text-white/70">
                      {i + 1}.{j + 1}
                    </td>
                    <td className="px-4 py-2 text-white/90 whitespace-nowrap">{guest.name}</td>
                    <td className="px-4 py-2 text-white/90 whitespace-nowrap">{guest.phone}</td>
                    <td className="px-4 py-2 text-white/90">
                      {guest.consentForWhatsApp ? "Yes" : "No"}
                    </td>
                    <td className="px-4 py-2 text-white/90">
                      {guest.expectedTime}
                    </td>
                    <td className="px-4 py-2 text-white/90">
                      {guest.requests || "No comments"}
                    </td>
                    <td className="px-4 py-2 text-white/90 whitespace-nowrap">
                      {new Date(createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-4 py-2 text-white/90 whitespace-nowrap">
                      {modifiedAt
                        ? new Date(modifiedAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "N/A"}
                    </td>
                  </tr>
                ));
              })}
            </tbody>
          </table>
          {/* {bookings.map(({ guests, createdAt }, index) => (
            <div key={bookingName} className="mb-2">
              <h2 className="text-lg font-bold flex flex-col md:flex-row justify-between bg-black/50 px-4 py-2 border border-white/20">
                <span>
                  #{index + 1}: {bookingName}
                </span>
                <span>
                  {new Date(createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </h2>
              <div className="overflow-scroll">
                <table className="w-full text-left border-collapse bg-black/20 border-white/20 border border-t-0">
                  <thead>
                    <tr className="bg-black/50">
                      <th className="px-4 py-2 text-white/70">Name</th>
                      <th className="px-4 py-2 text-white/70">Number</th>
                      <th className="px-4 py-2 text-white/70">
                        WhatsApp Group?
                      </th>
                      <th className="px-4 py-2 text-white/70">Est. Time</th>
                      <th className="px-4 py-2 text-white/70">Comments</th>
                    </tr>
                  </thead>
                  <tbody>
                    {guests?.map((guest, index) => (
                      <tr
                        key={`summary-row-${index}`}
                        className="border-t border-white/20"
                      >
                        <td className="px-4 py-2 text-white/90">
                          {guest.name}
                        </td>
                        <td className="px-4 py-2 text-white/90">
                          {guest.phone}
                        </td>
                        <td className="px-4 py-2 text-white/90">
                          {guest.consentForWhatsApp ? "Yes" : "No"}
                        </td>
                        <td className="px-4 py-2 text-white/90">
                          {guest.expectedTime}
                        </td>
                        <td className="px-4 py-2 text-white/90">
                          {guest.requests || "No comments"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))} */}
        </section>
      </div>
      <ErrorToast
        message={errorMessage}
        onClose={() => setErrorMessage(null)}
      />
    </FirebaseProvider>
  );
}
