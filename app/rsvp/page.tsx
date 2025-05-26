"use client";
import { motion } from "framer-motion";
import GuestForm from "@/components/rsvp/form";

export default function RsvpPage() {
  return (
    <div className="container py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4">RSVP</h1>
        <p className="max-w-2xl mx-auto">
          We are thrilled to host you! As mentioned in your invite, you can RSVP
          for your family, partner or friend in one go. Please let us know who
          will be joining.
        </p>
      </motion.div>
      <GuestForm />
    </div>
  );
}
