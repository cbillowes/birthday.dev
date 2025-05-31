import {
  Toast,
  ToastAction,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

export const ErrorToast = ({
  message,
  onClose,
}: {
  message?: string | null;
  onClose: () => void;
}) => {
  return (
    <ToastProvider>
      <Toast
        open={!!message}
        className="bg-red-600 text-white max-w-sm"
      >
        <div className="flex flex-col items-start justify-start text-left gap-2">
          <ToastTitle>🚨 The horror!</ToastTitle>
          <ToastDescription>{message}</ToastDescription>
        </div>
        <ToastAction altText="Close" onClick={onClose} className="border-white hover:bg-white hover:text-black">
          Close{" "}
        </ToastAction>
      </Toast>
      <ToastViewport className="fixed bottom-0 right-0 w-full max-w-fit p-4" />
    </ToastProvider>
  );
};
