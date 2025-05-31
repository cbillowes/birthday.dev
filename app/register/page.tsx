"use client";
import { motion } from "framer-motion";
import { FirebaseProvider } from "@/providers/firebase";
import RegisterForm from "@/components/register/form";
import { PrivacyPolicy } from "@/components/privacy";

export default function RsvpPage() {
  return (
    <FirebaseProvider>
      <div className="container py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Register</h1>
          <div className="w-20 h-1 bg-chart-3 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto">
            You will gain exclusive access to the event details, the photo
            gallery of memorable moments, event updates and much more! If you
            don’t want to, you can message directly to book your spot.
          </p>
        </motion.div>
        <div className="mt-4 max-w-2xl mx-auto text-center animate-fadeIn">
          <RegisterForm
            hideHeader
            buttonClassName="bg-chart-3 hover:bg-chart3/50 focus:ring-white/50 text-white"
          />
          <div className="mt-2">
            <PrivacyPolicy />
          </div>
        </div>
      </div>
    </FirebaseProvider>
  );
}
