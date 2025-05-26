import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  throw new Error('FIREBASE_SERVICE_ACCOUNT environment variable is not set');
}
const { client_email, project_id, private_key } = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT,
);

initializeApp({
  credential: cert({
    projectId: project_id,
    clientEmail: client_email,
    privateKey: private_key,
  }),
});

export const db = getFirestore();
