import React, { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";
import { GuestListType, guestListSchema } from "./schema";
import GuestList from "./list";
import { rsvp } from "./service";
import tada from "@/app/images/tada.png";

const GuestForm: React.FC = () => {
  const { width, height } = useWindowSize();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<GuestListType>({
    resolver: zodResolver(guestListSchema),
    defaultValues: {
      guests: [{ name: "", email: "", phone: "", requests: "" }],
    },
  });

  const guests = form.watch("guests") || [];

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: GuestListType) => {
    const saved = await rsvp(data);
    if (saved) {
      setSubmitted(true);
    } else {
      setSubmitted(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {!submitted && (
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
      )}
      {submitted && (
        <div className="text-center p-6 border-white/20 bg-white/10 rounded-lg shadow-sm border border-gray-200 animate-fadeIn">
          <Confetti width={width} height={height} />
          <h2 className="text-lg font-bold mb-4">Thank You Very Much!</h2>
          <p>
            We have received your response and look forward to hosting you at
            this once in a life time event.
          </p>
          <Image
            src={tada}
            alt="Tada"
            className="mx-auto mb-4"
            width={100}
          />
          <h2 className="text-lg font-bold mb-2 text-left pl-4">Who is joining us?</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 text-white/70">Name</th>
                <th className="px-4 py-2 text-white/70">WhatsApp number</th>
              </tr>
            </thead>
            <tbody>
              {guests.map((guest, index) => (
                <tr
                  key={`summary-row-${index}`}
                  className="border-t border-white/20"
                >
                  <td className="px-4 py-2 text-white/90">
                    {guest.name}
                  </td>
                  <td className="px-4 py-2 text-white/90">{guest.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GuestForm;
