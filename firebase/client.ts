import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  connectAuthEmulator,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJMG2DWeECsdFY6Rvu1JIkUN9L-6v1I0Y",
  authDomain: "skillup-pro.firebaseapp.com",
  projectId: "skillup-pro",
  storageBucket: "skillup-pro.firebasestorage.app",
  messagingSenderId: "572050790053",
  appId: "1:572050790053:web:0a5d4a52f4fd709dd41f4c",
  measurementId: "G-7RN1EBPMGY",
};

console.log(
  " ▗▖ ▗▖▗▄▄▄▖▗▖    ▗▄▄▖ ▗▄▖ ▗▖  ▗▖▗▄▄▄▖\n",
  "▐▌ ▐▌▐▌   ▐▌   ▐▌   ▐▌ ▐▌▐▛▚▞▜▌▐▌   \n",
  "▐▌ ▐▌▐▛▀▀▘▐▌   ▐▌   ▐▌ ▐▌▐▌  ▐▌▐▛▀▀▘\n",
  "▐▙█▟▌▐▙▄▄▖▐▙▄▄▖▝▚▄▄▖▝▚▄▞▘▐▌  ▐▌▐▙▄▄▖\n"
);

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

let analytics: ReturnType<typeof getAnalytics> | undefined = undefined;

// Only init analytics if running in the browser
if (typeof window !== "undefined") {
  isSupported()
    .then((supported) => {
      if (supported) {
        try {
          console.log(
            "I've got some analytics because I want to track usage and improve the app. Feel free to disable it if you prefer not to share any data. https://support.google.com/chrome/answer/2790761?hl=en&co=GENIE.Platform%3DDesktop"
          );
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

if (typeof window !== "undefined" && location.hostname === "localhost") {
  console.log("Connecting to Firebase Emulators...");
  connectAuthEmulator(auth, "http://localhost:9099");
}

export {
  app,
  analytics,
  auth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  signOut,
};
