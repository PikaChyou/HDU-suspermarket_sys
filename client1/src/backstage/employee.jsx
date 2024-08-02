import { useEffect, useState } from "react";
import { Table } from "antd";

function Emp() {
  const [empList, setEmpList] = useState([]);
  useEffect(() => {
    fetch("http://122.9.12.102:8000/emp")
      .then((response) => response.json())
      .then((data) => {
        setEmpList(data);
      });
  }, []);
  const columns = [
    {
      title: "编号",
      dataIndex: "Emp_id",
      key: "Emp_id",
    },
    {
      title: "姓名",
      dataIndex: "Emp_name",
      key: "Emp_name",
    },
    {
      title: "性别",
      dataIndex: "Emp_sex",
      key: "Emp_sex",
    },
    {
      title: "年龄",
      dataIndex: "Emp_age",
      key: "Emp_age",
    },
    {
      title: "联系方式",
      dataIndex: "Emp_tele",
      key: "Emp_tele",
    },
  ];

  return (
    <>
      <Table dataSource={empList} columns={columns} rowKey={(r) => r.Emp_id} />
    </>
  );
}

export default Emp;
