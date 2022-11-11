import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_GOOGLE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_GOOGLE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_GOOGLE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_GOOGLE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_GOOGLE_APP_ID,
  databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
