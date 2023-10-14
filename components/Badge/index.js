import PropTypes from "prop-types";

const Badge = (props) => {
  return (
    <>
      <div
        style={{
          background: "#1027B8",
          height: "32px",
          width: "32px",
          textAlign: "center",
          color: "white",
          borderRadius: "50%",
          fontSize: "14px",
          fontWeight: "500",
        }}
      >
        <span style={{ lineHeight: "32px", verticalAlign: "middle" }}>
          {props.label || "U"}
        </span>
      </div>
    </>
  );
};

export default Badge;

Badge.propTypes = {
  label: PropTypes.string,
};
