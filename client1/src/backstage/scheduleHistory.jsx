import { Table } from "antd";
import { useEffect, useState } from "react";

function ScheHistory() {
  const [schList, setSchList] = useState([]);
  useEffect(() => {
    fetch("http://122.9.12.102:8000/scheHistory")
      .then((response) => response.json())
      .then((data) => {
        setSchList(data);
      });
  }, []);
  const columns = [
    {
      title: "商品编号",
      dataIndex: "Pdt_id",
      key: "Pdt_id",
    },
    {
      title: "进货数量",
      dataIndex: "Rtk_no",
      key: "Rtk_no",
    },
    {
      title: "进货总价",
      dataIndex: "Rtk_price",
      key: "Rtk_price",
    },
    {
      title: "进货公司",
      dataIndex: "Spl_name",
      key: "Spl_name",
    },
    {
      title: "进货时间",
      dataIndex: "Rtk_time",
      key: "Rtk_time",
    },
  ];

  return (
    <>
      <Table
        dataSource={schList}
        columns={columns}
        rowKey={(r) => r.Pdt_id + r.Rtk_time}
      />
    </>
  );
}

export default ScheHistory;
