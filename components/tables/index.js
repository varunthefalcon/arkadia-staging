const { Table, Button } = require("antd");
// import PropTypes from "prop-types";
import styles from "./page.module.css";

const ArkTable = (props) => {
  const {
    title = "",
    columnData = [],
    rowData = [],
    localeLabel = "",
    localeOnClick = () => {},
    emptylistAsButton = false,
    hideTitle = false,
    emptylistAsText = false,
  } = props;

  let additionalProps = {};

  if (emptylistAsButton) {
    additionalProps = {
      locale: {
        emptyText: (
          <div style={{ marginBlock: "60px" }}>
            <Button
              type="primary"
              onClick={localeOnClick}
              style={{ backgroundColor: "#1027B8" }}
            >
              {localeLabel}
            </Button>
          </div>
        ),
      },
    };
  } else if (emptylistAsText) {
    additionalProps = {
      locale: {
        emptyText: <div style={{ marginBlock: "60px" }}>{localeLabel}</div>,
      },
    };
  }
  return (
    <>
      <div className={styles.tablesWrapper}>
        <div
          className={styles.tablesTitle}
          style={{ display: hideTitle ? "none" : "" }}
        >
          {title}
        </div>
        <Table
          columns={columnData}
          dataSource={rowData}
          {...additionalProps}
          pagination={{ position: ["none", "none"] }}
        />
      </div>
    </>
  );
};

export default ArkTable;

// ArkTable.propTypes = {
//   title: PropTypes.string,
//   hideTitle: PropTypes.bool,
//   columnData: PropTypes.array,
//   rowData: PropTypes.array,
//   emptylistAsButton: PropTypes.bool,
//   emptylistAsText: PropTypes.bool,
//   localeLabel: PropTypes.string,
//   localeOnClick: PropTypes.func,
// };
