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
          <p className="max-w-2xl mx-auto">
            You now have access to exclusive content in the website. You can
            also book your spot and manage your booking for this event.
          </p>
        </motion.div>
        <section id="details" className="max-w-7xl mx-auto mb-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {!booking && (
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center justify-end text-center">
                    <div className="mb-4 p-3 rounded-full bg-chart-1/20">
                      <Sparkles className="h-8 w-8 text-chart-1" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">Book your Spot</h3>
                    <p className="text-muted-foreground mb-2">
                      Book for yourself or a party of people.
                    </p>
                    <GhostLinkButton
                      to="/rsvp"
                      size="lg"
                      className="mt-4 border-chart-1 text-chart-1 hover:bg-chart-1/10"
                    >
                      Book your Spot
                    </GhostLinkButton>
                  </div>
                </CardContent>
              </Card>
            )}
            {booking && (
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center justify-end text-center">
                    <div className="mb-4 p-3 rounded-full bg-chart-1/20">
                      <NotebookTabs className="h-8 w-8 text-chart-1" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      Manage your Booking
                    </h3>
                    <p className="text-muted-foreground mb-2">
                      You do not currently have a booking.
                    </p>
                    <GhostLinkButton
                      to="/manage"
                      size="lg"
                      className="mt-4 border-chart-1 text-chart-1 hover:bg-chart-1/10"
                    >
                      Manage your Booking
                    </GhostLinkButton>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 rounded-full bg-chart-2/20">
                    <TerminalSquare className="h-8 w-8 text-chart-2" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Contact Details</h3>
                  <p className="text-muted-foreground mb-2 flex gap-2">
                    <a
                      href="mailto:clarice@bouwer.dev"
                      className="text-white hover:underline"
                    >
                      clarice@bouwer.dev
                    </a>{" "}
                    |
                    <a
                      href="tel:+23054551651"
                      className="text-white hover:underline"
                    >
                      +230 5455 1651
                    </a>
                  </p>
                </div>
                <GhostLinkButton
                  to="/vcard.vcf"
                  size="lg"
                  className="mt-4 border-chart-2 text-chart-2 hover:bg-chart-2/10"
                  as="clarice.vcf"
                  target="_blank"
                >
                  Add to Contacts
                </GhostLinkButton>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 rounded-full bg-chart-4/20">
                    <Focus className="h-8 w-8 text-chart-4" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Photo Gallery</h3>
                  <p className="text-muted-foreground mb-2">
                    Memories through the years.
                  </p>
                  <GhostLinkButton
                    to="/gallery"
                    size="lg"
                    className="mt-4 border-chart-4 text-chart-4 hover:bg-chart-1/10"
                  >
                    Browse
                  </GhostLinkButton>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
        <section id="details" className="max-w-7xl mx-auto">
          <PartyDetails />
        </section>
      </div>
      <ErrorToast
        message={errorMessage}
        onClose={() => setErrorMessage(null)}
      />
    </FirebaseProvider>
  );
}
