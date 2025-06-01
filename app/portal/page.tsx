"use client";
import { ErrorToast } from "@/components/error-toast";
import { Loading } from "@/components/loading";
import { BookingEntityType } from "@/components/rsvp/schema";
import {
  confirmBooking,
  getBookings,
  resetBooking,
} from "@/components/rsvp/service";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { FirebaseProvider } from "@/providers/firebase";
import { motion } from "framer-motion";
import {
  MessageSquareDiff,
  TicketCheckIcon,
  TicketMinusIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PortalPage() {
  const { user, loading } = useAuth();
  const [refresh, setRefresh] = useState(false);
  const [bookings, setBookings] = useState<BookingEntityType[]>([]);
  const [totalGuests, setTotalGuests] = useState(0);
  const [totalConfirmedGuests, setTotalConfirmedGuests] = useState(0);
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
          setTotalConfirmedGuests(
            bookings.reduce((acc, booking) => {
              return (
                acc + (booking.confirmedAt !== null ? booking.guests.length : 0)
              );
            }, 0)
          );
          setRefresh(false);
        } catch (error) {
          router.push("/dashboard");
        }
      }
    };
    getAllBookings();
  }, [refresh, user, loading, router]);

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
          <table className="mx-auto">
            <tbody>
              <tr>
                <td className="px-4 py-2">Bookings:</td>
                <td className="px-4 py-2 text-white font-bold">
                  {bookings.length}
                </td>
                <td className="px-4 py-2">Confirmed Guests:</td>
                <td className="px-4 py-2 text-green-400 font-bold">
                  {totalConfirmedGuests}
                </td>
                <td className="px-4 py-2">Unconfirmed Guests:</td>
                <td className="px-4 py-2 text-red-400 font-bold">
                  {totalGuests - totalConfirmedGuests}
                </td>
              </tr>
            </tbody>
          </table>
        </motion.div>
        <section className="max-w-7xl mx-auto mb-4 overflow-scroll">
          <table className="w-full text-left border-collapse bg-black/20 border-white/20 border">
            <thead>
              <tr className="bg-black/50">
                <th>&nbsp;</th>
                <th className="px-4 py-2 text-white/70">Name</th>
                <th className="px-4 py-2 text-white/70">Number</th>
                <th className="px-4 py-2 text-white/70">WhatsApp?</th>
                <th className="px-4 py-2 text-white/70 whitespace-nowrap">
                  Est. Time
                </th>
                <th className="px-4 py-2 text-white/70">Comments</th>
                <th className="px-4 py-2 text-white/70">Notes</th>
                <th className="px-4 py-2 text-white/70">Created</th>
                <th className="px-4 py-2 text-white/70">Modified</th>
                <th className="px-4 py-2 text-white/70">Confirmed</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(
                (
                  {
                    ref,
                    guests,
                    notes,
                    createdAt,
                    createdBy,
                    modifiedAt,
                    modifiedBy,
                    confirmedAt,
                    confirmedBy,
                  },
                  i
                ) => {
                  return guests?.map((guest, j) => (
                    <tr
                      key={`summary-row-${i}-${j}`}
                      className={cn(
                        "border-t border-white/20",
                        confirmedAt ? "text-green-400" : "text-white/90"
                      )}
                    >
                      <td className="px-4 py-2 whitespace-nowrap">
                        {i + 1}.{j + 1}{" "}
                        {user && confirmedAt && (
                          <span
                            onClick={() => {
                              resetBooking(user, ref);
                              setRefresh(true);
                            }}
                            className="cursor-pointer"
                          >
                            <TicketMinusIcon />
                          </span>
                        )}
                        {user && !confirmedAt && (
                          <span
                            onClick={() => {
                              confirmBooking(user, ref);
                              setRefresh(true);
                            }}
                            className="cursor-pointer"
                          >
                            <TicketCheckIcon />
                          </span>
                        )}
                        {/* {notes && (
                          <span
                            onClick={() => {
                              confirmBooking(user, ref);
                              setRefresh(true);
                            }}
                            className="cursor-pointer"
                          >
                            <MessageSquareDiff />
                          </span>
                        )} */}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {guest.name}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {guest.phone}
                      </td>
                      <td className="px-4 py-2">
                        {guest.consentForWhatsApp ? "Yes" : "No"}
                      </td>
                      <td className="px-4 py-2">{guest.expectedTime}</td>
                      <td className="px-4 py-2">
                        {guest.requests || "No comments"}
                      </td>
                      <td className="px-4 py-2">
                        {(j === 0 && notes) || "No notes"}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {new Date(createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                        <br />
                        {createdBy}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {modifiedAt
                          ? new Date(modifiedAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "N/A"}
                        <br />
                        {modifiedBy}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        {confirmedAt
                          ? new Date(confirmedAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "N/A"}
                        <br />
                        {confirmedBy}
                      </td>
                    </tr>
                  ));
                }
              )}
            </tbody>
          </table>
        </section>
      </div>
      <ErrorToast
        message={errorMessage}
        onClose={() => setErrorMessage(null)}
      />
    </FirebaseProvider>
  );
}
