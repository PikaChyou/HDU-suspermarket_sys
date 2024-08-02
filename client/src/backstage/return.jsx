import { Table } from "antd";
import { useEffect, useState } from "react";

function Return() {
  const [rtnList, setRtnList] = useState([]);
  useEffect(() => {
    fetch("http://122.9.12.102:8000/returns")
      .then((response) => response.json())
      .then((data) => {
        setRtnList(data);
      });
  }, []);

  const columns = [
    {
      title: "单号",
      dataIndex: "Rtn_id",
      key: "Rtn_id",
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
      title: "总价",
      dataIndex: "Rtn_price",
      key: "Rtn_price",
    },
    {
      title: "退货时间",
      dataIndex: "Rtn_time",
      key: "Rtn_time",
    },
    {
      title: "经手员工编号",
      dataIndex: "Emp_id",
      key: "Emp_id",
    },
  ];

  return (
    <>
      <Table
        dataSource={rtnList}
        columns={columns}
        rowKey={(r) => r.Rtn_id + r.Pdt_id}
      />
    </>
  );
}

export default Return;
