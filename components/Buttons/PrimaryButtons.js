import Image from "next/image";
import { Button, ConfigProvider } from "antd";
import PropTypes from "prop-types";

const PrimaryButtons = (props) => {
  const {
    arrowIcon = false,
    label = "",
    onPress = () => {},
    disabled = false,
    loading = false,
    labelStyle = {},
    ...rest
  } = props;

  return (
    <>
      <Button
        onClick={onPress}
        disabled={disabled}
        loading={loading}
        style={
          disabled ? {} : { backgroundColor: "#1027B8", borderRadius: "2px" }
        }
        type="primary"
        {...rest}
      >
        <span style={labelStyle}>
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
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};
