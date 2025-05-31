"use client";

import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RegisterForm from "@/components/register/form";
import LoginForm from "@/components/login/form";
import { PrivacyPolicy } from "@/components/privacy";
import { useAuth } from "@/hooks/use-auth";
import { Spinner } from "@/components/spinner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ManageBookingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !loading) {
      router.push("/booking");
    }
  }, [user, loading, router]);

  if (loading)
    return (
      <div className="max-w-2xl h-screen mx-auto mt-8 justify-center items-center flex">
        <Spinner />
      </div>
    );
  return (
    <div className="container py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Manage Your Booking
        </h1>
        <div className="w-20 h-1 bg-chart-4 mx-auto mb-6"></div>
      </motion.div>

      <div className="max-w-2xl mx-auto">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-2 h-auto bg-transparent gap-2">
            <TabsTrigger
              value="login"
              className="py-3 bg-black/40 data-[state=active]:bg-chart-4 data-[state=active]:text-black"
            >
              Log in
            </TabsTrigger>
            <TabsTrigger
              value="register"
              className="py-3 bg-black/40 data-[state=active]:bg-chart-4 data-[state=active]:text-black"
            >
              Register
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="mt-6">
            <LoginForm buttonClassName="bg-chart-4 hover:bg-chart4/50 focus:ring-chart-4 text-black" />
          </TabsContent>

          <TabsContent value="register" className="mt-6">
            <RegisterForm buttonClassName="bg-chart-4 hover:bg-chart4/50 focus:ring-chart-4 text-black" />
          </TabsContent>
        </Tabs>
      </div>
      <div className="mt-3 max-w-2xl mx-auto">
        <PrivacyPolicy />
      </div>
    </div>
  );
}
