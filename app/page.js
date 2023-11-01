"use client";

import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "@/components/Navbar";
import SecondaryButton from "@/components/Buttons/SecondaryButtons";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";

export default function Home() {
  const router = useRouter();

  const handleClick = (e) => {
    console.log(e.target.id);
  };

  return (
    <main>
      <Navbar />
      <div className={styles.landing_wrapper}>
        <div className={styles.imageWrapper}>
          <Image
            src="/assets/landing_arrow.png"
            alt="Next.js Logo"
            fill
            priority
          />
        </div>
        <div className={styles.right_wrapper}>
          <p className={styles.landing_title}>
            Secure loans <br /> Connect investors
          </p>
          <p className={styles.landing_subtitle}>
            Bridge opportunity and capital by using assets as collateral to
            connect professional investors with the resources you need
          </p>

          <SecondaryButton
            label="Asset Owner"
            onPress={() => router.push("/login")}
            arrowIcon
          />

          <SecondaryButton
            label="Relationship Manager"
            onPress={() => router.push("/login")}
            arrowIcon
          />

          <div style={{ display: "flex" }}>
            <div className={styles.landing_stat_wrapper}>
              <span className={styles.landing_stat_wrapper_label}>
                Total Asset Financed{" "}
              </span>
              <br />
              <span className={styles.landing_stat_wrapper_value}>$ 256M</span>
            </div>
            <div className={styles.landing_stat_wrapper}>
              <span className={styles.landing_stat_wrapper_label}>
                Asset Tokenized{" "}
              </span>
              <br />
              <span className={styles.landing_stat_wrapper_value}>1108</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
