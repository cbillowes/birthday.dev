import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookingType, bookingTypeSchema } from "./schema";
import GuestList from "./list";
import { saveBooking } from "./service";
import { Spinner } from "@/components/spinner";
import { useAuth } from "@/hooks/use-auth";
import { PrivacyPolicy } from "@/components/privacy";
import { ErrorToast } from "@/components/error-toast";

const GuestForm: React.FC<{
  data?: BookingType;
  redirectTo?: string;
}> = ({ data, redirectTo = "/thank-you" }) => {
  const [mounted, setMounted] = useState(false);
  const { user } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<BookingType>({
    resolver: zodResolver(bookingTypeSchema),
    defaultValues: {
      guests: data?.guests || [
        {
          name: "",
          phone: "",
          requests: "",
          consentForWhatsApp: false,
          expectedTime: "16h30",
        },
      ],
    },
    mode: "onBlur",
    reValidateMode: "onBlur",
    criteriaMode: "all",
    shouldFocusError: true,
    delayError: 1000,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = form;

  useEffect(() => {
    if (!mounted && data) {
      reset(data);
      setMounted(true);
    }
  }, [mounted, data, reset]);

  const onSubmit = async (data: BookingType) => {
    if (!user) {
      setErrorMessage("You must be logged in to save your booking.");
      return;
    }
    try {
      const saved = await saveBooking(user, data);
      if (saved) {
        router.push(redirectTo);
      } else {
        setErrorMessage(
          "Your booking could not be saved. Please try again later."
        );
      }
    } catch (error) {
      console.error("Error saving booking:", error);
      setErrorMessage(
        "An error occurred while saving your booking. Please try again later."
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto border-white/10 bg-black/40 rounded-lg shadow-sm border animate-fadeIn p-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <GuestList form={form} />
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-md text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-chart-1/40 focus:ring-opacity-50 bg-chart-1 hover:bg-chart-5 flex items-center justify-center`}
          >
            {isSubmitting && <Spinner />}
            {isSubmitting ? "Saving..." : "Save your booking"}
          </button>
          {errorMessage && (
            <p className="mt-3 bg-red-200 text-red-900 text-sm p-4 rounded-md flex gap-2 items-center justify-start">
              🚨 <span className="font-bold">Whoops:</span> {errorMessage}
            </p>
          )}
          <div className="mt-4">
            <PrivacyPolicy />
          </div>
        </div>
      </form>
      <ErrorToast
        message={errorMessage}
        onClose={() => setErrorMessage(null)}
      />
    </div>
  );
};

export default GuestForm;
