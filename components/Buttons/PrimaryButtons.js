import Image from "next/image";
import { Button } from "antd";
import PropTypes from "prop-types";
import styles from "./buttons.module.css";

const PrimaryButtons = (props) => {
  const { arrowIcon = false, label = "", onPress = () => {} } = props;

  return (
    <>
      <Button
        onClick={onPress}
        style={{ backgroundColor: "#1027B8", borderRadius: "2px" }}
        type="primary"
      >
        <span style={{ color: "white" }}>
          {label}
          {arrowIcon && (
            <Image
              src="/assets/landing_arrow_subtitle.png"
              alt="Next.js subtitle"
              style={{ paddingTop: "4px", marginLeft: "10px" }}
              height={12}
              width={12}
              priority
            />
          )}
        </span>
      </Button>
    </>
  );
};

export default PrimaryButtons;

PrimaryButtons.propTypes = {
  label: PropTypes.string,
  onPress: PropTypes.func,
  arrowIcon: PropTypes.bool,
};
