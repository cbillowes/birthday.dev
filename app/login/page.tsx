"use client";
import { motion } from "framer-motion";
import { FirebaseProvider } from "@/providers/firebase";
import LoginForm from "@/components/login/form";

export default function LoginPage() {
  return (
    <FirebaseProvider>
      <div className="container py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Login</h1>
          <div className="w-20 h-1 bg-chart-5 mx-auto mb-6"></div>
          <p className="max-w-2xl mx-auto">
            Log in to access your account, RSVP, manage your booking and access
            exclusive content.
          </p>
        </motion.div>
        <div className="mt-4 max-w-2xl mx-auto text-center animate-fadeIn">
          <LoginForm
            hideHeader
            buttonClassName="bg-chart-5 hover:bg-chart5/50 focus:ring-white/50 text-white"
          />
        </div>
      </div>
    </FirebaseProvider>
  );
}
