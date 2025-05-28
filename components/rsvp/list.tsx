import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { UseFormReturn } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { GuestListType } from "./schema";
import { Checkbox } from "../ui/checkbox";

interface GuestListProps {
  form: UseFormReturn<GuestListType>;
}

const ErrorMessage = ({ children }: { children: ReactNode }) =>
  children && (
    <p className="mt-1 text-sm bg-red-700 text-red-100 rounded-sm py-1 px-3">
      {children}
    </p>
  );

const GuestList: React.FC<GuestListProps> = ({ form }) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = form;
  const bookingName = watch("bookingName") || "";
  const guests = watch("guests") || [];

  const addGuest = () => {
    setValue("guests", [
      ...guests,
      {
        name: guests.length === 0 ? bookingName : "",
        email: "",
        phone: "",
        requests: "",
        consentForEmail: false,
        consentForWhatsApp: false,
      },
    ]);
  };

  const removeGuest = (index: number) => {
    const updatedGuests = guests.filter((_, i) => i !== index);
    setValue("guests", updatedGuests);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="booking-name" className="block text-white/90 mb-1">
            Booking name <i>(your name and surname)</i>.
          </label>
          <p className="text-sm font-light text-white/60 mb-2 leading-relaxed">
            Your booking details will be shared with the venue. Your name &
            surname and the number of guests you’re bringing will be on the
            guest list at the door.
          </p>
          <input
            id="booking-name"
            {...register(`bookingName`, {
              required: "Booking name is required",
            })}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-l-red-400 border-l-8"
          />
          <ErrorMessage>{errors.bookingName?.message}</ErrorMessage>
        </div>
        {guests.map((_, index) => (
          <div
            key={`guest-${index}`}
            className="p-6 border-white/20 bg-white/10 rounded-lg shadow-sm border border-gray-200 animate-fadeIn"
          >
            <div
              id={`guest-${index}`}
              className="flex justify-between items-center mb-4"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center flex justify-center items-center space-x-2"
              >
                <h3 className="text-lg font-medium">
                  Guest #{index + 1}: {guests[index].name}
                </h3>
              </motion.div>
              <button
                type="button"
                onClick={() => removeGuest(index)}
                className="p-2 text-white hover:bg-red-600 bg-white/20 rounded-full transition-colors"
                aria-label="Remove guest"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor={`guests.${index}.name`}
                  className="block text-white/80 mb-1"
                >
                  Full name of the guest
                </label>
                <input
                  id={`guests.${index}.name`}
                  {...register(`guests.${index}.name`)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-l-red-400 border-l-8"
                />
                <ErrorMessage>
                  {errors.guests && errors.guests[index]?.name?.message}
                </ErrorMessage>
              </div>

              <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                <div className="w-full">
                  <label
                    htmlFor={`guests.${index}.phone`}
                    className="block text-white/80 mb-1"
                  >
                    WhatsApp number <i>(with country code)</i>
                  </label>
                  <input
                    id={`guests.${index}.phone`}
                    type="tel"
                    {...register(`guests.${index}.phone`)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-l-red-400 border-l-8"
                  />
                  <ErrorMessage>
                    {errors.guests && errors.guests[index]?.phone?.message}
                  </ErrorMessage>
                </div>
                <div className="w-full">
                  <label
                    htmlFor={`guests.${index}.email`}
                    className="block text-white/80 mb-1"
                  >
                    Email address <i>(optional)</i>
                  </label>
                  <input
                    id={`guests.${index}.email`}
                    type="email"
                    {...register(`guests.${index}.email`)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="w-full">
                  <div className="flex justify-start items-center gap-4 text-white/80">
                    <Checkbox
                      id={`guests.${index}.consentForWhatsApp`}
                      checked={guests[index].consentForWhatsApp}
                      onCheckedChange={(value) => {
                        setValue(
                          `guests.${index}.consentForWhatsApp`,
                          value === true
                        );
                      }}
                      className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    Add this number to the WhatsApp group for updates.
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex justify-start items-center gap-4 text-white/80">
                    <Checkbox
                      id={`guests.${index}.consentForEmail`}
                      checked={guests[index].consentForEmail}
                      onCheckedChange={(value) => {
                        setValue(
                          `guests.${index}.consentForEmail`,
                          value === true
                        );
                      }}
                      className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    Send me emails regarding updates to the event, if any are
                    ever sent.
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor={`guests.${index}.phone`}
                  className="block text-white/80 mb-1"
                >
                  Special requests <i>(optional)</i>
                </label>
                <textarea
                  rows={5}
                  placeholder="Do you have any special requests or even suggestions? The full menu is available so no need to worry about dietary restrictions."
                  id={`guests.${index}.requests`}
                  {...register(`guests.${index}.requests`)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        ))}
        <p className="text-sm text-white/60 leading-relaxed">
          <strong>Privacy note: </strong>Your information is stored in Google
          Firebase Firestore and will be deleted after the event. You’ll only be
          added to a WhatsApp group if you give permission to receive updates
          there. Names are recorded so I know who’s attending and who to contact
          if needed before or during the event. I’ll only get in touch if it’s
          absolutely necessary—unless you’ve opted into the WhatsApp group.
        </p>
      </div>

      <button
        type="button"
        onClick={addGuest}
        className="flex items-center justify-center w-full py-3 px-4 text-gray-800 rounded-md hover:bg-pink-600 hover:text-pink-50 transition-colors border-white bg-white"
      >
        <Plus size={18} className="mr-2" />
        Add a guest
      </button>

      {errors.guests?.message && (
        <p className="text-sm text-red-600">{errors.guests.message}</p>
      )}
    </div>
  );
};

export default GuestList;
