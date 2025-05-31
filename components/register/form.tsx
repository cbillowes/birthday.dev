import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Spinner } from "@/components/spinner";
import { ErrorMessage } from "@/components/error-message";
import { registerUser } from "@/components/register/service";
import { UserType, userSchema } from "@/components/register/schema";
import { Checkbox } from "@/components/ui/checkbox";
import { loginUser } from "@/components/login/service";
import { cn } from "@/lib/utils";
import { ErrorToast } from "@/components/error-toast";

const RegisterForm: React.FC<{
  hideHeader?: boolean;
  buttonClassName?: string;
}> = ({
  hideHeader = false,
  buttonClassName = "bg-chart-5 hover:bg-chart5/50 focus:ring-chart-5",
}) => {
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [showPasswordInfo, setShowPasswordInfo] = React.useState(false);
  const router = useRouter();

  const form = useForm<UserType>({
    resolver: zodResolver(userSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    criteriaMode: "all",
    shouldFocusError: true,
    delayError: 1000,
  });

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setValue,
    watch,
  } = form;

  const acceptedTerms = watch("acceptedTerms");

  const onSubmit = async (data: UserType) => {
    const response = await registerUser(data);
    if (response.ok) {
      const token = await loginUser(data);
      localStorage.setItem("token", JSON.stringify(token));
      router.push("/dashboard");
    } else {
      setErrorMessage("Whoops, something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="p-6 border-white/10 bg-black/40 rounded-lg shadow-sm border animate-fadeIn text-left">
          {hideHeader === false && (
            <div className="flex justify-between items-center mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center flex justify-center items-center space-x-2 mx-auto"
              >
                <div>
                  <h3 className="text-lg font-medium mb-1">Register</h3>
                  <p>
                    You will gain exclusive access to the event details, the
                    photo gallery of memorable moments, event updates and much
                    more! If you don’t want to, you can message directly to book
                    your spot.
                  </p>
                </div>
              </motion.div>
            </div>
          )}
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-white/80 mb-1">
                <span className="font-semibold">Email address</span> (I’m not
                going to spam you, promise)
              </label>
              <input
                id="email"
                {...register("email")}
                className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-l-red-400 border-l-8"
              />
              <ErrorMessage>{errors.email?.message}</ErrorMessage>
            </div>

            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <div className="w-full">
                <label htmlFor="password" className="block text-white/80 mb-1">
                  <button
                    type="button"
                    className="mr-2"
                    onClick={() => setShowPasswordInfo(!showPasswordInfo)}
                  >
                    ℹ️
                  </button>{" "}
                  <span className="font-semibold">Password</span>
                  {showPasswordInfo && (
                    <span className="text-sm block">
                      Your password must contain at least 6 characters.
                    </span>
                  )}
                </label>
                <input
                  id="password"
                  type="password"
                  {...register("password")}
                  className="w-full px-3 py-2 bg-black/30 border border-white/20 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border-l-red-400 border-l-8"
                />
                <ErrorMessage>{errors.password?.message}</ErrorMessage>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
              <div className="w-full flex gap-2 items-center">
                <Checkbox
                  id="acceptedTerms"
                  checked={acceptedTerms}
                  onCheckedChange={(value) => {
                    setValue("acceptedTerms", value === true);
                  }}
                  className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="acceptedTerms">
                  I have read and agree to the Privacy Policy below.
                </label>
              </div>
            </div>
            <ErrorMessage>{errors.acceptedTerms?.message}</ErrorMessage>
          </div>
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                `mt-4 w-full py-3 px-4 rounded-md text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 bg-pink-600 hover:bg-blue-600 flex items-center justify-center`,
                buttonClassName
              )}
            >
              {isSubmitting && <Spinner />}
              {isSubmitting ? "Registering..." : "Register your account"}
            </button>
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

export default RegisterForm;
