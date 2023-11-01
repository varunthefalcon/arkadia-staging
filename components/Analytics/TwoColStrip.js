import styles from "./analytics.module.css";

const TwoColStrip = ({
  title1,
  title2,
  subTitle1,
  subTitle2,
  bgColor = "#1027B8",
  fontColor = "white",
  borderColor = "white",
  style = {},
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: bgColor,
        padding: "25px",
        borderRadius: "8px",
        color: fontColor,
        textAlign: "center",
        ...style,
      }}
    >
      <div style={{ width: "49%", borderRight: `1px solid ${borderColor}` }}>
        <p className={styles.title}>{title1}</p>
        <p className={styles.subtitle}>{subTitle1}</p>
      </div>
      <div style={{ width: "49%" }}>
        <p className={styles.title}>{title2}</p>
        <p className={styles.subtitle}>{subTitle2}</p>
      </div>
    </div>
  );
};

export default TwoColStrip;
