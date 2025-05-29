import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBJMG2DWeECsdFY6Rvu1JIkUN9L-6v1I0Y",
  authDomain: "skillup-pro.firebaseapp.com",
  projectId: "skillup-pro",
  storageBucket: "skillup-pro.firebasestorage.app",
  messagingSenderId: "572050790053",
  appId: "1:572050790053:web:0a5d4a52f4fd709dd41f4c",
  measurementId: "G-7RN1EBPMGY",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

let analytics: ReturnType<typeof getAnalytics> | undefined = undefined;

console.log(
  " ▗▖ ▗▖▗▄▄▄▖▗▖    ▗▄▄▖ ▗▄▖ ▗▖  ▗▖▗▄▄▄▖\n",
  "▐▌ ▐▌▐▌   ▐▌   ▐▌   ▐▌ ▐▌▐▛▚▞▜▌▐▌   \n",
  "▐▌ ▐▌▐▛▀▀▘▐▌   ▐▌   ▐▌ ▐▌▐▌  ▐▌▐▛▀▀▘\n",
  "▐▙█▟▌▐▙▄▄▖▐▙▄▄▖▝▚▄▄▖▝▚▄▞▘▐▌  ▐▌▐▙▄▄▖\n"
);
console.log("Initializing Firebase app...");
console.log(
  "I've got some analytics because I want to track usage and improve the app. Feel free to disable it if you prefer not to share any data. https://support.google.com/chrome/answer/2790761?hl=en&co=GENIE.Platform%3DDesktop"
);
// Only init analytics if running in the browser
if (typeof window !== "undefined") {
  isSupported()
    .then((supported) => {
      if (supported) {
        try {
          analytics = getAnalytics(app);
          console.log("✅ Analytics loaded.");
        } catch (e) {
          console.warn("❌ Analytics failed to load:", e);
        }
      } else {
        console.warn("Analytics is not supported in this browser.");
      }
    })
    .catch((error) => {
      console.error("Error checking analytics support:", error);
    })
    .finally(() => {
      console.log("Analytics initialization complete.");
    });
}

export { app, analytics };
