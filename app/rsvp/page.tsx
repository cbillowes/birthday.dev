"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import GuestForm from "@/components/rsvp/form";

export default function RsvpPage() {
  const [showPrivacy, setShowPrivacy] = useState(false);
  return (
    <div className="container py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-4 text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-4">RSVP</h1>
        <p className="max-w-2xl mx-auto">
          We are thrilled to host you! As mentioned in your invite, you can RSVP
          for your family, partner or friend in one go. Please let us know who
          will be joining.
        </p>
      </motion.div>
      <GuestForm />
      <div className="mt-3 max-w-2xl mx-auto">
        <div
          className="flex items-center justify-center gap-2 text-sm cursor-pointer bg-background/60 hover:bg-background transition-colors rounded-md py-3 w-full mx-auto rounded-md"
          onClick={() => setShowPrivacy(!showPrivacy)}
        >
          <span className="text-xl">💁</span>
          {showPrivacy ? "Hide" : "Display"} privacy note
        </div>
        {showPrivacy && (
          <p className="mt-1 text-sm text-white/60 leading-relaxed bg-background/60 p-4 rounded-md mb-4">
            <strong>Privacy note: </strong>Your information is stored in Google
            Firebase Firestore and will be deleted after the event. You’ll only
            be added to a WhatsApp group if you give permission to receive
            updates there. Names are recorded so I know who’s attending and who
            to contact if needed before or during the event. I’ll only get in
            touch if it’s absolutely necessary—unless you’ve opted into the
            WhatsApp group for updates.
          </p>
        )}
      </div>
    </div>
  );
}
