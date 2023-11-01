const { Table, Button } = require("antd");
import PropTypes from "prop-types";
import styles from "./page.module.css";
import { PlusCircleFilled, PlusCircleOutlined } from "@ant-design/icons";

const ArkTable = (props) => {
  const {
    title = "",
    columnData = [],
    rowData = [],
    localeLabel = "",
    localeOnClick = () => {},
    rBtnLabel = "",
    rBtnOnClick = () => {},
    emptylistAsButton = false,
    hideTitle = false,
    emptylistAsText = false,
    ...rest
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

  additionalProps = { ...additionalProps, ...rest };
  return (
    <div className={styles.tablesWrapper} key={title}>
      <div
        className={styles.tablesTitle}
        style={{ display: hideTitle ? "none" : "" }}
      >
        <span>{title}</span>
        {!!rBtnLabel && (
          <Button
            onClick={rBtnOnClick}
            style={{
              height: "25px",
              fontSize: "12px",
              fontWeight: "700",
              color: "#1027B8",
            }}
            icon={<PlusCircleFilled style={{ color: "#1027B8" }} />}
          >
            {rBtnLabel}
          </Button>
        )}
      </div>
      <Table
        columns={columnData}
        dataSource={rowData}
        {...additionalProps}
        rowClassName={styles.pointer}
      />
    </div>
  );
};

export default ArkTable;

ArkTable.propTypes = {
  title: PropTypes.string,
  hideTitle: PropTypes.bool,
  columnData: PropTypes.array,
  rowData: PropTypes.array,
  emptylistAsButton: PropTypes.bool,
  emptylistAsText: PropTypes.bool,
  localeLabel: PropTypes.string,
  localeOnClick: PropTypes.func,
};
