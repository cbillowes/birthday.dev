import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GuestListType, guestListSchema } from "./schema";
import GuestList from "./list";
import { saveRsvp } from "./service";
import { Spinner } from "@/components/spinner";
import { useAuth } from "@/hooks/use-auth";
import { PrivacyPolicy } from "../privacy";

const GuestForm: React.FC = () => {
  const { user } = useAuth();
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const router = useRouter();

  const form = useForm<GuestListType>({
    resolver: zodResolver(guestListSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    criteriaMode: "all",
    shouldFocusError: true,
    delayError: 1000,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: GuestListType) => {
    if (!user) {
      setErrorMessage("You must be logged in to save your booking.");
      return;
    }
    const token = await user?.getIdToken();
    const saved = await saveRsvp(token, data);
    if (saved) {
      router.push("/manage");
    } else {
      setErrorMessage(
        "Your booking could not be saved. Please try again later."
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
    </div>
  );
};

export default GuestForm;
