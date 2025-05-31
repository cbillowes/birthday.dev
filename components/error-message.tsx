import { ReactNode } from "react";

export const ErrorMessage = ({ children }: { children: ReactNode }) =>
  children && (
    <p className="mt-1 text-sm bg-red-700 text-red-100 rounded-sm py-1 px-3">
      {children}
    </p>
  );
