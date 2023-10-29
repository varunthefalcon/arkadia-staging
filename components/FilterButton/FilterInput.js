import { AudioOutlined } from "@ant-design/icons";
import { ConfigProvider, Select } from "antd";
import Search from "antd/es/input/Search";

const FilterInput = ({ assetTypes = [] }) => {
  const selectBefore = (
    <Select
      style={{ width: "150px", backgroundColor: "white !important" }}
      defaultValue="Filter"
    >
      <Select.Option value="Filter">Filter</Select.Option>
      {assetTypes.map((e) => (
        <Select.Option key={e} value={e}>
          {e}
        </Select.Option>
      ))}
    </Select>
  );

  const onSearch = (value, _e, info) => console.log(info?.source, value);

  return (
    <>
      <ConfigProvider theme={theme}>
        <Search
          addonBefore={selectBefore}
          placeholder="input search text"
          allowClear
          enterButton
          className="filter_input"
          style={{ color: "white", marginBottom: "3rem" }}
          onSearch={onSearch}
        />
      </ConfigProvider>
    </>
  );
};

const theme = {
  components: {
    Button: {
      colorPrimary: "#1027B8",
    },
  },
};

export default FilterInput;
