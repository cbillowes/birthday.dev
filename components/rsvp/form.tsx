import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GuestListType, guestListSchema } from "./schema";
import GuestList from "./list";
import { rsvp } from "./service";

const GuestForm: React.FC = () => {
  const router = useRouter();

  const form = useForm<GuestListType>({
    resolver: zodResolver(guestListSchema),
    defaultValues: {
      guests: [{ name: "", email: "", phone: "", requests: "" }],
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: GuestListType) => {
    const saved = await rsvp(data);
    if (saved) {
      sessionStorage.setItem("rsvp", JSON.stringify(form.getValues()));
      router.push("/thank-you");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <GuestList form={form} />
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 rounded-md text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 bg-pink-600 hover:bg-blue-600 flex items-center justify-center`}
          >
            {isSubmitting && (
              <svg
                className="mr-3 -ml-1 size-1 animate-spin text-white w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="2"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            {isSubmitting ? "Submitting..." : "Submit Guests"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GuestForm;
