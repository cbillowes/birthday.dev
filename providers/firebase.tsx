"use client";

import * as React from "react";
import { analytics } from "@/firebase/client";

function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);

  // Ensure hydration mismatch is avoided
  React.useEffect(() => {
    setMounted(true);
    analytics;
  }, []);

  if (!mounted) {
    return null;
  }

  return children;
}

export { FirebaseProvider };
