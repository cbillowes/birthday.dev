"use client";
import { ErrorToast } from "@/components/error-toast";
import { Loading } from "@/components/loading";
import { BookingEntityType } from "@/components/rsvp/schema";
import {
  addNotesToBooking,
  confirmBooking,
  getBookings,
  resetBooking,
} from "@/components/rsvp/service";
import { Spinner } from "@/components/spinner";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { FirebaseProvider } from "@/providers/firebase";
import { motion } from "framer-motion";
import {
  MessageCircleCodeIcon,
  MessageCircleDashed,
  TicketCheckIcon,
  TicketMinusIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PortalPage() {
  const { user, loading } = useAuth();
  const [bookingEntity, setBookingEntity] = useState<BookingEntityType | null>(
    null
  );
  const [refreshFor, setRefreshFor] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [notes, setNotes] = useState<string | null>(null);
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
          setRefreshFor(null);
        } catch (error) {
          router.push("/dashboard");
        }
      }
    };
    getAllBookings();
  }, [refreshFor, user, loading, router]);

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
          <Dialog>
            <table className="w-full text-left border-collapse bg-black/20 border-white/20 border">
              <thead>
                <tr className="bg-black/50">
                  <th>&nbsp;</th>
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
                {bookings.map((booking, i) => {
                  const {
                    ref,
                    guests,
                    notes,
                    createdAt,
                    createdBy,
                    modifiedAt,
                    modifiedBy,
                    confirmedAt,
                    confirmedBy,
                  } = booking;
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
                      </td>
                      <td className="py-4 px-2 flex items-center justify-center whitespace-nowrap gap-2">
                        {j === 0 && (
                          <>
                            {user && confirmedAt && (
                              <span
                                onClick={() => {
                                  resetBooking(user, ref);
                                  setRefreshFor(ref);
                                }}
                                className="cursor-pointer hover:text-chart-5 rounded-md transition-colors"
                              >
                                {refreshFor === ref ? (
                                  <Spinner />
                                ) : (
                                  <TicketMinusIcon />
                                )}
                              </span>
                            )}
                            {user && !confirmedAt && (
                              <span
                                onClick={() => {
                                  confirmBooking(user, ref);
                                  setRefreshFor(ref);
                                }}
                                className="cursor-pointer hover:text-chart-5 rounded-md transition-colors"
                              >
                                {refreshFor === ref ? (
                                  <Spinner />
                                ) : (
                                  <TicketCheckIcon />
                                )}
                              </span>
                            )}
                            {user && notes && (
                              <DialogTrigger
                                asChild
                                className="cursor-pointer hover:text-chart-5 rounded-md transition-colors"
                                onClick={() => {
                                  setBookingEntity(booking);
                                  setShowDialog(true);
                                }}
                              >
                                <MessageCircleCodeIcon />
                              </DialogTrigger>
                            )}
                            {user && !notes && (
                              <DialogTrigger
                                asChild
                                className="cursor-pointer hover:text-chart-5 rounded-md  transition-colors"
                                onClick={() => {
                                  setBookingEntity(booking);
                                  setShowDialog(true);
                                }}
                              >
                                <MessageCircleDashed />
                              </DialogTrigger>
                            )}
                          </>
                        )}
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
                })}
              </tbody>
            </table>
            {showDialog && (
              <DialogContent className="max-w-3xl p-0 bg-white text-black border-none">
                <DialogTitle
                  className="sr-only text-black"
                  aria-describedby="Notes"
                >
                  Notes
                </DialogTitle>
                <div className="relative max-w-[800px] md:h-[450px] w-full h-[250px]">
                  <h2 className="font-bold mb-1">
                    {bookingEntity?.guests[0].name}
                  </h2>
                  <textarea
                    id="Notes"
                    className="w-full h-[250px] md:h-[425px] p-4 bg-white text-black rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-chart-1"
                    placeholder="Add your notes here..."
                    value={notes || bookingEntity?.notes || ""}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                  <div className="absolute bottom-2 right-2">
                    <button
                      type="button"
                      className="mr-2 px-4 py-2 bg-chart-1 text-white rounded-md hover:bg-chart-5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => {
                        if (user && bookingEntity) {
                          addNotesToBooking(user, bookingEntity.ref, "");
                          setBookingEntity(null);
                          setRefreshFor(bookingEntity.ref);
                          setShowDialog(false);
                          setNotes(null);
                        }
                      }}
                    >
                      Clear
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 bg-chart-1 text-white rounded-md hover:bg-chart-5 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!bookingEntity || !user || !notes}
                      onClick={() => {
                        if (bookingEntity && user && notes) {
                          addNotesToBooking(user, bookingEntity.ref, notes);
                          setBookingEntity(null);
                          setRefreshFor(bookingEntity.ref);
                          setShowDialog(false);
                          setNotes(null);
                        }
                      }}
                    >
                      Save Notes
                    </button>
                  </div>
                </div>
              </DialogContent>
            )}
          </Dialog>
        </section>
      </div>
      <ErrorToast
        message={errorMessage}
        onClose={() => setErrorMessage(null)}
      />
    </FirebaseProvider>
  );
}
