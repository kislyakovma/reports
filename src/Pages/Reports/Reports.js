import React, { useState } from "react";
import { Select, Space } from "antd";
import Report from "../../Components/Report/Report";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { logout, useAuthDispatch } from "../../Context/index.js";
const { Option } = Select;

function Reports(props) {
  const [id, setId] = useState(0);
  const onSelect = (id) => {
    console.log(id);
    setId(id);
  };
  const dispatch = useAuthDispatch();
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Space direction='vertical' size={40} style={{ width: "80%" }}>
        <Button
          danger
          icon={<LogoutOutlined />}
          size={"middle"}
          style={{ float: "right" }}
          onClick={() => {
            logout(dispatch);
          }}
        >
          Выход
        </Button>
        <Select
          showSearch
          style={{ width: "100%" }}
          placeholder='Выбрать отчет'
          optionFilterProp='children'
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          filterSort={(optionA, optionB) =>
            optionA.children
              .toLowerCase()
              .localeCompare(optionB.children.toLowerCase())
          }
          onSelect={onSelect}
        >
          <Option value='1'>Добавочный номер</Option>
        </Select>
        <Report id={id} />
      </Space>
    </div>
  );
}
export default Reports;
