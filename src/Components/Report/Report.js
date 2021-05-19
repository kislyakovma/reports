import React, { useState } from "react";
import { DatePicker, Space, Input, Table, Button } from "antd";
import axios from "axios";
import { DownloadOutlined } from "@ant-design/icons";
import { Excel } from "antd-table-saveas-excel";
const { RangePicker } = DatePicker;
const { Search } = Input;

const headers = {
  Connection: "keep-alive",
  "Cache-Control": "max-age=0",
  "sec-ch-ua": "^\\^",
  "sec-ch-ua-mobile": "?0",
  "Upgrade-Insecure-Requests": "1",
  Origin: "https://10.230.230.36",
  "Content-Type": "application/x-www-form-urlencoded",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.85 Safari/537.36",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
  "Sec-Fetch-Site": "same-origin",
  "Sec-Fetch-Mode": "navigate",
  "Sec-Fetch-User": "?1",
  "Sec-Fetch-Dest": "document",
  Referer: "https://10.230.230.36/admin/config.php?display=cdr",
  "Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
};

const params = [["display", "cdr"]];

function Report(props) {
  const getData = (number, days) => {
    let data = {
      startday: "2021-05-13",
      startmonth: "2021-05-13",
      startyear: "2021-05-13",
      starthour: "00",
      startmin: "00",
      endday: "2021-05-13",
      endmonth: "2021-05-13",
      endyear: "2021-05-13",
      endhour: "23",
      endmin: "59",
      need_html: "true",
      need_csv: "true",
      limit: "10000",
      cnum: "",
      cnum_mod: "begins_with",
      cnam: "",
      cnam_mod: "begins_with",
      outbound_cnum: "",
      outbound_cnum_mod: "begins_with",
      did: "",
      did_mod: "begins_with",
      order: "dst",
      dst: "156",
      dst_mod: "begins_with",
      dst_cnam: "",
      dst_cnam_mod: "begins_with",
      userfield: "",
      userfield_mod: "begins_with",
      accountcode: "",
      accountcode_mod: "begins_with",
      dur_min: "",
      dur_max: "",
      disposition: "all",
      sort: "DESC",
      group: "day",
    };

    axios
      .post("https://10.230.230.36/admin/config.php", {
        headers: headers,
        params: params,
        data: data,
        verify: false,
        auth: { username: "mkislyakov", password: "Mk123456" },
      })
      .then((res) => {
        console.log(res);
        setExp(false);
        setTloading(false);
      })
      .catch((err) => {
        console.log(err);
        setExp(false);
        setTloading(false);
      });
  };
  const [tLoading, setTloading] = useState(true);
  const [number, setNumber] = useState(156);
  const [exp, setExp] = useState(true);
  const [tVisible, setTvisible] = useState("hidden");
  const choose = () => {
    switch (props.id) {
      case "1":
        return id_1();

      default:
        return <h1>Пожалуйста, выберите отчет</h1>;
    }
  };
  const id_1 = () => {
    const columns = [
      {
        title: "Дата",
        dataIndex: "date",
      },
      {
        title: "Номер внешнего звонящего",
        dataIndex: "chinese",
        sorter: {
          compare: (a, b) => a.chinese - b.chinese,
          multiple: 3,
        },
      },
      {
        title: "Внутренний номер сотрудника",
        dataIndex: "math",
        sorter: {
          compare: (a, b) => a.math - b.math,
          multiple: 2,
        },
      },
      {
        title: "ФИО Сотрудника",
        dataIndex: "english",
        sorter: {
          compare: (a, b) => a.english - b.english,
          multiple: 1,
        },
      },
    ];

    const data = [
      {
        key: "1",
        name: "John Brown",
        chinese: 98,
        math: 60,
        english: 70,
      },
      {
        key: "2",
        name: "Jim Green",
        chinese: 98,
        math: 66,
        english: 89,
      },
      {
        key: "3",
        name: "Joe Black",
        chinese: 98,
        math: 90,
        english: 70,
      },
      {
        key: "4",
        name: "Jim Red",
        chinese: 88,
        math: 99,
        english: 89,
      },
    ];

    function onChange(pagination, filters, sorter, extra) {
      console.log("params", pagination, filters, sorter, extra);
    }

    const onNumber = (e) => {
      setNumber(e);
      setTvisible("visible");
      console.log("kek");
      getData(1, 1);
    };
    return (
      <Space direction='vertical' size={22}>
        <Space direction='horizontal' size={18} style={{ width: "1)" }}>
          <RangePicker />
          <Search
            placeholder='Добавочный номер'
            enterButton='Отчет'
            onSearch={onNumber}
          />
          <Button
            type='primary'
            icon={<DownloadOutlined />}
            size={"middle"}
            disabled={exp}
            onClick={() => {
              const excel = new Excel();
              excel
                .addSheet("test")
                .addColumns(columns)
                .addDataSource(data)
                .saveAs("report.xlsx");
            }}
          >
            Экспорт в Excel
          </Button>
        </Space>
        <Table
          columns={columns}
          dataSource={data}
          onChange={onChange}
          loading={tLoading}
          style={{ visibility: tVisible }}
        />
      </Space>
    );
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {choose()}
    </div>
  );
}
export default Report;
