"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarCheck,
  MapPin,
  Music,
  Gift,
  PartyPopper,
  Code,
} from "lucide-react";
import { motion } from "framer-motion";
import CountdownTimer from "@/components/countdown-timer";
import GallerySection from "@/components/gallery-section";
import unicorn from "@/app/images/unicorn.png";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  // Ensure hydration mismatch is avoided
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="h-full w-full bg-cover bg-center">
            <div className="h-full w-full bg-black/70"></div>
          </div>
        </div>

        <div className="container relative z-10 px-4 py-16 sm:px-6 sm:py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Image src={unicorn} alt="Unicorn" width={400} className="mx-auto mb-6" />
            <h1 className="font-fira-code text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              <span className="text-white">clarice</span>
              <span className="text-chart-1">.</span>
              <span className="text-chart-2">is</span>
              <span className="text-chart-5">(</span>
              <span className="text-chart-4">40</span>
              <span className="text-chart-5">)</span>
            </h1>

            <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-300 mb-8">
              Join us for a night of celebration as we compile four decades of
              memories and initialize the next chapter of Clarice’s journey.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-chart-5 hover:bg-chart-5/90 text-white"
              >
                <Link href="/rsvp">RSVP Now</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-chart-4/10"
              >
                <Link href="#details">View Details</Link>
              </Button>
            </div>

            <div className="mt-12">
              <CountdownTimer targetDate="2025-07-19T18:30:00" />
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 rounded-full bg-chart-1/20">
                    <CalendarCheck className="h-8 w-8 text-chart-1" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Date & Time</h3>
                  <p className="text-muted-foreground mb-2">
                    Saturday, July 19, 2025
                  </p>
                  <p className="text-muted-foreground">6:30 PM - Midnight</p>
                  <Button
                    variant="outline"
                    className="mt-4 border-chart-1 text-chart-1 hover:bg-chart-1/10"
                    asChild
                  >
                    <Link
                      href="/calendar.ics"
                      download="save-the-date-clarice.ics"
                    >
                      Add to Calendar
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 rounded-full bg-chart-2/20">
                    <MapPin className="h-8 w-8 text-chart-2" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Venue</h3>
                  <p className="text-muted-foreground mb-2">
                    Kalatua Garden Restaurant
                  </p>
                  <p className="text-muted-foreground">
                    Twenty-Foot Rd, Pereybere, Mauritius
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <Button
                      variant="outline"
                      className="mt-4 border-chart-2 text-chart-2 hover:bg-chart-2/10"
                      asChild
                    >
                      <a
                        href="https://maps.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Map
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      className="mt-4 border-chart-2 text-chart-2 hover:bg-chart-2/10"
                      asChild
                    >
                      <a
                        href="https://www.google.com/maps?rlz=1C5CHFA_enMU1093MU1093&gs_lcrp=EgZjaHJvbWUqDggAEEUYJxg7GIAEGIoFMg4IABBFGCcYOxiABBiKBTIGCAEQRRhAMgYIAhBFGDkyEAgDEAAYkQIYsQMYgAQYigUyDQgEEAAYkQIYgAQYigUyBggFEEUYPDIGCAYQRRg8MgYIBxBFGDzSAQgxMDM0ajBqMagCALACAA&um=1&ie=UTF-8&fb=1&gl=mu&sa=X&geocode=KcEzzdrQq30hMfEazFrUBR_x&daddr=MU,+Twenty-Foot+Rd,+Pereybere+30546"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Get Directions
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 p-3 rounded-full bg-chart-4/20">
                    <PartyPopper className="h-8 w-8 text-chart-4" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Dress Code</h3>
                  <p className="text-muted-foreground">Wear whatever makes you comfortable and is socially acceptable.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Event Info Tabs */}
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
              <TabsTrigger value="about" className="py-3 font-bold text-white">
                About the Party
              </TabsTrigger>
              <TabsTrigger value="gifts" className="py-3 font-bold text-white">
                Gift Information
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
                      <h3 className="text-xl font-bold mb-4 font-fira-code">
                        <Code /> About the Celebration
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Join us for an unforgettable evening celebrating
                        Clarice’s 40th birthday! The party will feature:
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <Code className="h-5 w-5 text-chart-1 mr-2 mt-0.5" />
                          <span>Tech-themed cocktails and hors d'oeuvres</span>
                        </li>
                        <li className="flex items-start">
                          <Music className="h-5 w-5 text-chart-2 mr-2 mt-0.5" />
                          <span>
                            DJ spinning the best hits from the 90s to now
                          </span>
                        </li>
                        <li className="flex items-start">
                          <Gift className="h-5 w-5 text-chart-4 mr-2 mt-0.5" />
                          <span>Special surprises throughout the night</span>
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

            <TabsContent value="gifts" className="mt-6">
              <Card className="border-border/50">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 font-fira-code">
                    <Code /> Gift Registry
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Your presence is the greatest gift! However, if you’d like
                    to contribute something, Clarice has created a registry with
                    some items she’d love.
                  </p>
                  <p className="text-muted-foreground mb-6">
                    Alternatively, contributions to her favorite charity, Girls
                    Who Code, would be greatly appreciated.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      asChild
                      variant="outline"
                      className="border-chart-1 text-chart-1 hover:bg-chart-1/10"
                    >
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        View Registry
                      </a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="border-chart-2 text-chart-2 hover:bg-chart-2/10"
                    >
                      <a
                        href="https://girlswhocode.com/donate"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Donate to Girls Who Code
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="faq" className="mt-6">
              <Card className="border-border/50">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 font-fira-code">
                    <Code /> Frequently Asked Questions
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold mb-2">
                        Is there parking available?
                      </h4>
                      <p className="text-muted-foreground">
                        Yes, complimentary valet parking will be available at
                        the venue.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">
                        Can I bring a plus one?
                      </h4>
                      <p className="text-muted-foreground">
                        Yes, you're welcome to bring a guest. Please make sure
                        to include them in your RSVP.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">Are children welcome?</h4>
                      <p className="text-muted-foreground">
                        This is an adults-only celebration. We appreciate your
                        understanding.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">
                        What if I have dietary restrictions?
                      </h4>
                      <p className="text-muted-foreground">
                        Please note any dietary restrictions in your RSVP, and
                        we'll do our best to accommodate them.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Gallery Section */}
      <GallerySection />

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
              <Code className="h-6 w-6 text-primary" /> Ready to Join the Celebration?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Don’t miss this special celebration! Let us know if you’ll be
              joining us.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-chart-2 hover:bg-chart-2/90 text-white"
            >
              <Link href="/rsvp">RSVP Now</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
