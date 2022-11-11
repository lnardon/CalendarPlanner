import Head from "next/head";
import Router, { useRouter } from "next/router";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { app } from "../firebase";

import styles from "../styles/Home.module.css";
import Calendar from "../components/Calendar";

export default function Home() {
  const router = useRouter();
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);
  function loginWithGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential: any = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      router.push(`/${uid}`);
    }
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Calendar Scheduler</title>
        <meta
          name="description"
          content="Calendar Scheduler for google calendar."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <button onClick={loginWithGoogle}>LOGIN</button>
      </main>

      <footer className={styles.footer}>
        <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
          Powered by Vercel
        </a>
      </footer>
    </div>
  );
}
