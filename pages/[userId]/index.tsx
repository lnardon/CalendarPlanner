import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { database } from "../../firebase";
import { onValue, ref, set } from "firebase/database";

import styles from "./styles.module.css";
import Calendar from "../../components/Calendar";

export default function Home() {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isTimeSelectionOpen, setIsTimeSelectionOpen] = useState(false);
  const [isSchedulerInfoOpen, setSchedulerInfoOpen] = useState(false);
  const router = useRouter();

  setTimeout(() => {
    setIsTimeSelectionOpen(true);
  }, 2000);

  setTimeout(() => {
    setSchedulerInfoOpen(true);
  }, 5000);

  useEffect(() => {
    Promise.resolve(ref(database, "users/" + router.query.userId)).then((a) => {
      onValue(a, (snapshot) => {
        setIsLoading(false);
        if (snapshot.size > 0) {
          const data = snapshot.val();
          setUsername(data?.username);
        } else {
          if (!isLoading) router.push("/");
        }
      });
    });
  });

  function writeUserData() {
    set(ref(database, "users/" + router.query.userId), {
      username: "name",
      email: "email",
      profile_picture: "imageUrl",
    });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{username}&apos;s calendar</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2>{username}&apos;s calendar</h2>
        <div className={styles.calendarContainer}>
          <Calendar getData={(e) => console.log(e)} />
          {isTimeSelectionOpen && (
            <div className={styles.timeContainer}>
              <h2>Select time</h2>
            </div>
          )}
          {isSchedulerInfoOpen && (
            <div className={styles.schedulerInfoContainer}>
              <h2>Add your personal info</h2>
            </div>
          )}
        </div>
        {/* <button onClick={writeUserData}>ADD</button> */}
      </main>

      <footer className={styles.footer}>
        <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
          Powered by Vercel
        </a>
      </footer>
    </div>
  );
}
