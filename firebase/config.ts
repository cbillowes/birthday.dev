import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  throw new Error("FIREBASE_SERVICE_ACCOUNT environment variable is not set");
}
const { client_email, project_id, private_key } = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT
);

if (process.env.NODE_ENV === "development") {
  process.env.FIRESTORE_EMULATOR_HOST = "localhost:8081";
  process.env.FIREBASE_AUTH_EMULATOR_HOST = "localhost:9099";
}

initializeApp({
  credential: cert({
    projectId: project_id,
    clientEmail: client_email,
    privateKey: private_key,
  }),
});

export const db = getFirestore();
export const auth = getAuth();
