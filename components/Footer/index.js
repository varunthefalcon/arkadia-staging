import styles from "./page.module.css";
import Image from "next/image";

const Footer = () => {
  return (
    <>
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
    </>
  );
};

export default Footer;
