import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import { UseFormReturn } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";
import { GuestListType } from "./schema";
import { Checkbox } from "../ui/checkbox";
import { ErrorMessage } from "../error-message";

interface GuestListProps {
  form: UseFormReturn<GuestListType>;
}

const GuestList: React.FC<GuestListProps> = ({ form }) => {
  const [showBookingInfo, setShowBookingInfo] = React.useState(false);

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
    <>
      <p>
        The guest list will be finalised closer to the event. You’re welcome to
        bring your partner or friends, but please keep the number of guests
        reasonable as space is limited. Bookings are not automatically confirmed
        — I’ll get in touch with you to confirm your spot.
      </p>
      <div className="w-20 h-1 bg-chart-1 mx-auto mb-6"></div>
      <div className="mt-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="booking-name"
                className="block text-white/90 mb-1"
              >
                <button
                  type="button"
                  className="mr-2"
                  onClick={() => setShowBookingInfo(!showBookingInfo)}
                >
                  ℹ️
                </button>{" "}
                <span className="font-semibold">Booking name</span>{" "}
                <i>(your name and surname)</i>.
              </label>
              {showBookingInfo && (
                <p className="text-sm font-light text-white/60 mb-2 leading-relaxed">
                  This information is shared with the venue. Your booking name
                  and the number of guests you’re bringing will be on the guest
                  list at the door. Ask for the table booked under Clarice
                  Bouwer.
                </p>
              )}
              <input
                id="booking-name"
                {...register(`bookingName`, {
                  required: "Booking name is required",
                })}
                className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-l-red-400 border-l-8"
              />
              <ErrorMessage>{errors.bookingName?.message}</ErrorMessage>
            </div>
            <div>
              <div className="text-white/90 mb-1 font-semibold">
                Guests
              </div>
              {guests.length === 0 && (
                <p className="text-sm font-light text-white/60 mb-2 leading-relaxed">
                  Ready, set, go! Add yourself and the people who do not want to
                  register that you would like to bring along.
                </p>
              )}
              {errors.guests?.root?.message && (
                <ErrorMessage>{errors.guests.root.message}</ErrorMessage>
              )}
            </div>
            {guests.map((_, index) => (
              <div
                key={`guest-${index}`}
                className="p-6 border-white/20 bg-black/20 rounded-lg shadow-sm border border-gray-200 animate-fadeIn"
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
                      <span className="font-semibold">Name and surname</span>
                    </label>
                    <input
                      id={`guests.${index}.name`}
                      {...register(`guests.${index}.name`)}
                      className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-l-red-400 border-l-8"
                    />
                    <ErrorMessage>
                      {errors.guests && errors.guests[index]?.name?.message}
                    </ErrorMessage>
                  </div>

                  <div>
                    <label
                      htmlFor={`guests.${index}.phone`}
                      className="block text-white/80 mb-1"
                    >
                      <span className="font-semibold">WhatsApp number</span>{" "}
                      <i>(include country code)</i>
                    </label>
                    <input
                      id={`guests.${index}.phone`}
                      type="tel"
                      {...register(`guests.${index}.phone`)}
                      className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-l-red-400 border-l-8"
                    />
                    <ErrorMessage>
                      {errors.guests && errors.guests[index]?.phone?.message}
                    </ErrorMessage>
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
                        <label htmlFor={`guests.${index}.consentForWhatsApp`}>
                          Add this number to the WhatsApp group for updates.
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor={`guests.${index}.phone`}
                      className="block text-white/80 mb-1"
                    >
                      <span className="font-semibold">Comments</span>{" "}
                      <i>(optional)</i>
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Have anything to say? Perhaps you have special requests or even suggestions for me. Also, note that the full menu is available so no need to worry about dietary restrictions. The menu will be shared when it is made available by the venue."
                      id={`guests.${index}.requests`}
                      {...register(`guests.${index}.requests`)}
                      className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addGuest}
            className="flex items-center justify-center w-full py-3 px-4 text-gray-800 rounded-md hover:bg-pink-600 hover:text-pink-50 transition-colors border-white bg-white"
          >
            <Plus size={18} className="mr-2" />
            Add a guest
          </button>
        </div>
      </div>
    </>
  );
};

export default GuestList;
