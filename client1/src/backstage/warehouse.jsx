import { Table } from "antd";
import { useEffect, useState } from "react";

function Warehouse() {
  const [pdtList, setEmpList] = useState([]);
  useEffect(() => {
    fetch("http://122.9.12.102:8000/warehouse")
      .then((response) => response.json())
      .then((data) => {
        setEmpList(data);
      });
  }, []);
  const columns = [
    {
      title: "编号",
      dataIndex: "Pdt_id",
      key: "Pdt_id",
    },
    {
      title: "商品名称",
      dataIndex: "Pdt_name",
      key: "Pdt_name",
    },
    {
      title: "库存数量",
      dataIndex: "Pdt_num",
      key: "Pdt_num",
    },
    {
      title: "商品单价",
      dataIndex: "Pdt_price",
      key: "Pdt_price",
    },
    {
      title: "最新入库时间",
      dataIndex: "In_time",
      key: "In_time",
    },
  ];

  return (
    <>
      <Table dataSource={pdtList} columns={columns} rowKey={(r) => r.Pdt_id} />
    </>
  );
}

export default Warehouse;
