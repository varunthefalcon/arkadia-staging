import Image from "next/image";
import { Button } from "antd";
import PropTypes from "prop-types";
import styles from "./buttons.module.css";

import { ConfigProvider } from "antd";

const theme = {
  components: {
    Button: {
      colorPrimary: "#1027B8",
      borderRadius: 2,
    },
  },
};

const GhostButtons = (props) => {
  const { arrowIcon = false, label = "", onPress = () => {} } = props;

  return (
    <>
      <ConfigProvider theme={theme}>
        <Button
          onClick={onPress}
          type="primary"
          ghost
          // style={{ backgroundColor: "#1027B8" }}
        >
          <span>
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
      </ConfigProvider>
    </>
  );
};

export default GhostButtons;

GhostButtons.propTypes = {
  label: PropTypes.string,
  onPress: PropTypes.func,
  arrowIcon: PropTypes.bool,
};
