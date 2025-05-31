"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Music,
  Gift,
  Code,
  Database,
  QrCode,
  ChevronsLeftRightEllipsis,
  Share2,
  Wine,
} from "lucide-react";
import { motion } from "framer-motion";
import CountdownTimer from "@/components/countdown-timer";
import GallerySection from "@/components/gallery-section";
import unicorn from "@/app/images/unicorn.png";
import { GhostLinkButton, PrimaryLinkButton } from "@/components/link-button";
import { Banner } from "@/components/banner";
import { FirebaseProvider } from "@/providers/firebase";
import { useAuth } from "@/hooks/use-auth";
import { PartyDetails } from "@/components/party-details";
import { Loading } from "@/components/loading";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;

  return (
    <FirebaseProvider>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center">
        <div className="container relative z-10 px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Image
              src={unicorn}
              alt="Unicorn"
              width={400}
              className="mx-auto mb-6"
              priority
            />
            <Banner size="lg" />

            <p className="mt-5 max-w-2xl mx-auto text-lg sm:text-xl text-gray-300 mb-8 font-thin">
              Join us for a night of celebration as we compile four decades of
              memories and initialize the next chapter of Clarice’s journey.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
              <PrimaryLinkButton size="lg" to="/rsvp">
                Register
              </PrimaryLinkButton>
              <GhostLinkButton size="lg" to="#details">
                View Details
              </GhostLinkButton>
            </div>

            <div className="mt-12">
              <CountdownTimer targetDate="2025-07-19T16:30:00" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Details Section */}
      <section id="details" className="py-16 bg-background">
        <div className="container px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-2">
              <Code className="h-6 w-6 text-primary" /> Party Details
            </h2>
            <div className="w-20 h-1 bg-chart-2 mx-auto"></div>
          </motion.div>
          <PartyDetails />
        </div>
      </section>

      {/* Registration Teaser Section */}
      {!user && (
        <section className="py-16 bg-chart-3/20">
          <div className="container px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-2">
                <Code className="h-6 w-6 text-primary" /> Next Steps
              </h2>
              <div className="w-20 h-1 bg-black/40 mx-auto mb-6"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-4 p-3 rounded-full bg-black/40">
                        <Database className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        Step 1: Register
                      </h3>
                      <p className="text-white mb-2">
                        You will gain exclusive access to the event details, the
                        photo gallery of memorable moments, event updates and
                        much more!
                      </p>
                      <GhostLinkButton
                        to="/register"
                        size="lg"
                        className="mt-4 hover:bg-white/40 border-white/60 bg-white/20 text-white"
                      >
                        Register Now
                      </GhostLinkButton>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-4 p-3 rounded-full bg-black/40">
                        <QrCode className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">
                        Step 2: Book your Spot
                      </h3>
                      <p className="text-white mb-2">
                        Book for you and on behalf of others! Space is limited
                        but I will try to accommodate everyone. Once you book
                        your spot, I will let you know if you are in within a
                        few days.
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-4 p-3 rounded-full bg-black/40">
                        <Share2 className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Share</h3>
                      <p className="text-white">
                        Share this website with your friends and family! You can
                        also send me photos, or messages that you would like me
                        to publish on the website.
                      </p>
                      <GhostLinkButton
                        to={`https://wa.me/?text=${encodeURIComponent(
                          "Join me for Clarice's 40th birthday celebration! Register and book your spot at https://rsvp.clarice.bouwer.dev"
                        )}`}
                        size="lg"
                        className="mt-4 hover:bg-white/40 border-white/60 bg-white/20 text-white"
                        target="_blank"
                      >
                        Share on WhatsApp
                      </GhostLinkButton>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Event Info Tabs */}
      {user && (
        <section className="py-16 bg-muted/30">
          <div className="container px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-2">
                <Code className="h-6 w-6 text-primary" /> Event Information
              </h2>
              <div className="w-20 h-1 bg-chart-4 mx-auto"></div>
            </motion.div>

            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 h-auto">
                <TabsTrigger
                  value="about"
                  className="py-3 font-bold text-white"
                >
                  About the Party
                </TabsTrigger>
                <TabsTrigger value="menu" className="py-3 font-bold text-white">
                  Menu
                </TabsTrigger>
                <TabsTrigger value="faq" className="py-3 font-bold text-white">
                  FAQ
                </TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="mt-6">
                <Card className="border-border/50">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h3 className="text-xl font-bold mb-4 font-mono">
                          <Code /> About the Celebration
                        </h3>
                        <p className="text-muted-foreground mb-4">
                          Join us for an unforgettable evening celebrating
                          Clarice’s 40th birthday! The party will feature:
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <Code className="h-5 w-5 text-chart-1 mr-2 mt-0.5" />
                            <span>
                              Theme to be decided, so far it is tech-themed.
                            </span>
                          </li>
                          <li className="flex items-start">
                            <Music className="h-5 w-5 text-chart-2 mr-2 mt-0.5" />
                            <span>Light live music to set the mood.</span>
                          </li>
                          <li className="flex items-start">
                            <Gift className="h-5 w-5 text-chart-4 mr-2 mt-0.5" />
                            <span>Food, wine & cake are on the house.</span>
                          </li>
                          <li className="flex items-start">
                            <Wine className="h-5 w-5 text-chart-3 mr-2 mt-0.5" />
                            <span>
                              There will be an open bar which will be capped
                              until the budget is reached.
                            </span>
                          </li>
                        </ul>
                      </div>
                      <div className="relative h-64 md:h-full min-h-[200px] rounded-lg overflow-hidden">
                        <Image
                          src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/d6/8e/e7/caption.jpg?w=1000&h=-1&s=1"
                          alt="Party celebration"
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="menu" className="mt-6">
                <Card className="border-border/50">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-4 font-mono">
                      <Code /> Menu
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      A full menu will be made available on the website when the
                      owners get back from their vacation.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="faq" className="mt-6">
                <Card className="border-border/50">
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-4 font-mono">
                      <Code /> Frequently Asked Questions
                    </h3>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-bold mb-2">When is the big day?</h4>
                        <p className="text-muted-foreground">
                          My birthday is on Thursday, 30 October. I am
                          celebrating with a party while my mom is in Mauritius.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold mb-2">
                          Is there parking available?
                        </h4>
                        <p className="text-muted-foreground">
                          Yes, there is free parking available behind the
                          restaurant. It is encouraged to carpool or use a taxi
                          service if you are going to be drinking alcohol.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold mb-2">
                          Can I bring a plus one?
                        </h4>
                        <p className="text-muted-foreground">
                          Yes, you’re welcome to bring a guest or few. Please
                          make sure to include them in your booking or share
                          this website with them. Space is limited but I will
                          try my best to accommodate everyone.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold mb-2">
                          Are children welcome?
                        </h4>
                        <p className="text-muted-foreground">
                          This is an adults-only celebration. 18+ only.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-bold mb-2">
                          What if I have dietary restrictions?
                        </h4>
                        <p className="text-muted-foreground">
                          A full menu will be made available including starters,
                          mains and desserts. Selected wine, cocktails and other
                          beverages are included, until the budget has been
                          reached. You can buy drinks at the bar after that.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {user && (
        <section className="py-16 bg-muted/30">
          <div className="container px-4 sm:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Memories Through The Years
              </h2>
              <div className="w-20 h-1 bg-chart-3 mx-auto mb-6"></div>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Celebrating four decades of amazing moments, projects, and
                friendships.
              </p>
            </motion.div>
            <GallerySection />
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-background to-muted/30">
        <div className="container px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center gap-2">
              <Code className="h-6 w-6 text-primary" /> Ready to Join the
              Celebration?
            </h2>
            <div className="w-20 h-1 bg-chart-5 mx-auto mb-6"></div>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              What are you waiting for? Don’t miss this special celebration! Let
              us know if you’ll be joining us.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-chart-5 hover:bg-chart-5/90 text-white"
            >
              <Link href="/rsvp">Register Now</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </FirebaseProvider>
  );
}
