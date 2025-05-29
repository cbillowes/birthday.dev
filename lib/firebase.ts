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

// Only init analytics if running in the browser
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      try {
        analytics = getAnalytics(app);
        console.log("✅ Analytics loaded");
      } catch (e) {
        console.warn("❌ Analytics failed to load:", e);
      }
    } else {
      console.warn("Analytics not supported in this browser.");
    }
  });
}

export { app, analytics };
