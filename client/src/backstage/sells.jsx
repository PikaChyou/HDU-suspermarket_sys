import { useEffect, useState } from "react";
import { Table } from "antd";

function Sells() {
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    fetch("http://122.9.12.102:8000/orders")
      .then((response) => response.json())
      .then((data) => {
        setOrderList(data);
      });
  }, []);
  const columns = [
    {
      title: "订单编号",
      dataIndex: "Order_id",
      key: "Order_id",
    },
    {
      title: "商品编号",
      dataIndex: "Pdt_id",
      key: "Pdt_id",
    },
    {
      title: "商品数量",
      dataIndex: "Order_num",
      key: "Order_num",
    },
    {
      title: "订单总价",
      dataIndex: "Order_price",
      key: "Order_price",
    },
    {
      title: "订单时间",
      dataIndex: "Order_time",
      key: "Order_time",
    },
    {
      title: "经手员工",
      dataIndex: "Emp_id",
      key: "Emp_id",
    },
  ];

  return (
    <>
      <Table
        dataSource={orderList}
        columns={columns}
        rowKey={(r) => r.Order_id + r.Pdt_id}
      />
    </>
  );
}

export default Sells;
