"use client";

import Image from "next/image";
import { Button } from "antd";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <div className={styles.landing_header}>
        <Image src="/assets/nav_logo.png" width={160} height={30} />
      </div>
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
          <Button className={styles.landing_button} ghost type="primary">
            <span>
              Asset Owner
              <Image
                src="/assets/landing_arrow_subtitle.png"
                alt="Next.js subtitle"
                style={{ paddingTop: "4px", marginLeft: "10px" }}
                height={12}
                width={12}
                priority
              />
            </span>
          </Button>

          <Button className={styles.landing_button} ghost type="primary">
            <span>
              Relationship Manager
              <Image
                src="/assets/landing_arrow_subtitle.png"
                alt="Next.js subtitle"
                style={{ paddingTop: "4px", marginLeft: "10px" }}
                height={12}
                width={12}
                priority
              />
            </span>
          </Button>
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
      <div className={styles.landing_footer}>
        Working with{" "}
        <Image
          src="/assets/partner_1.png"
          alt="Next.js subtitle"
          style={{ paddingTop: "4px", marginLeft: "10px" }}
          height={30}
          width={100}
          priority
        />
        <Image
          src="/assets/partner_2.png"
          alt="Next.js subtitle"
          style={{ paddingTop: "4px", marginLeft: "10px" }}
          height={30}
          width={200}
          priority
        />
      </div>
    </main>
  );
}
