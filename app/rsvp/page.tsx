"use client";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { PrivacyPolicy } from "@/components/privacy";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loading } from "@/components/loading";
import GuestForm from "@/components/rsvp/form";
import LoginForm from "@/components/login/form";
import RegisterForm from "@/components/register/form";

export default function RsvpPage() {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;

  return (
    <div className="container py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          I’m thrilled to host you!
        </h1>
        <div className="w-20 h-1 bg-chart-1 mx-auto mb-6"></div>
        {!user && (
          <p className="max-w-2xl mx-auto">
            You need to be logged in before you can book your spot at the party.
            Space is limited, so get it while it is hot!
          </p>
        )}
      </motion.div>

      {!user && (
        <>
          <div className="max-w-2xl mx-auto">
            <Tabs defaultValue="register" className="w-full">
              <TabsList className="grid w-full grid-cols-1 md:grid-cols-2 h-auto bg-transparent gap-2">
                <TabsTrigger
                  value="register"
                  className="py-3 bg-black/40 data-[state=active]:bg-chart-1/10 data-[state=active]:text-white"
                >
                  Register
                </TabsTrigger>
                <TabsTrigger
                  value="login"
                  className="py-3 bg-black/40 data-[state=active]:bg-chart-1/10 data-[state=active]:text-white"
                >
                  Login
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="mt-6">
                <LoginForm buttonClassName="bg-chart-1 hover:bg-chart-1/50 focus:ring-chart-1 text-white" />
              </TabsContent>

              <TabsContent value="register" className="mt-6">
                <RegisterForm buttonClassName="bg-chart-1 hover:bg-chart-1/50 focus:ring-chart-1 text-white" />
              </TabsContent>
            </Tabs>
          </div>
          <div className="mt-3 max-w-2xl mx-auto">
            <PrivacyPolicy />
          </div>
        </>
      )}
      {user && <GuestForm />}
    </div>
  );
}
