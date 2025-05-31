import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Spinner } from "@/components/spinner";
import { ErrorMessage } from "@/components/error-message";
import { loginUser } from "@/components/login/service";
import { UserType, userSchema } from "@/components/login/schema";
import { cn } from "@/lib/utils";

const LoginForm: React.FC<{
  hideHeader?: boolean;
  buttonClassName?: string;
}> = ({
  hideHeader = false,
  buttonClassName = "bg-chart-5 hover:bg-chart5/50 focus:ring-chart-5",
}) => {
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
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
  } = form;

  const onSubmit = async (data: UserType) => {
    try {
      const token = await loginUser(data);
      localStorage.setItem("token", JSON.stringify(token));
      router.push("/booking");
    } catch (error: any) {
      setErrorMessage(
        "Could not log you in. Please ensure your email and password are correct."
      );
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
                  <h3 className="text-lg font-medium mb-1">Login</h3>
                  <p>
                    Log in to gain exclusive access to the event details, the
                    photo gallery of memorable moments, event updates and much
                    more!
                  </p>
                </div>
              </motion.div>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-white/80 mb-1">
                <span className="font-semibold">Email address</span>
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
                  <span className="font-semibold">Password</span> (Forgotten?
                  let me know so that I can reset it for you.)
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
          </div>
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                `mt-4 w-full py-3 px-4 rounded-md text-white font-medium transition-colors focus:outline-none focus:ring-opacity-50 flex items-center justify-center`,
                buttonClassName
              )}
            >
              {isSubmitting && <Spinner />}
              {isSubmitting ? "Thinking..." : "Log in"}
            </button>
            {errorMessage && (
              <p className="mt-3 bg-red-200 text-red-900 text-sm p-4 rounded-md flex gap-2 items-center justify-start">
                🚨 <span className="font-bold">Whoops:</span> {errorMessage}
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
