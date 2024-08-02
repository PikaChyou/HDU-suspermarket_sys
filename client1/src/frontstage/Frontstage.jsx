import { useState, useEffect } from "react";
import { Table, Drawer } from "antd";
import { useLocation } from "react-router-dom";
import "./frontstage.css";

function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // 月份是从0开始的
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}

function Frontstage() {
  const location = useLocation();
  const [pdtList, setPdtList] = useState([]);
  useEffect(() => {
    fetch("http://122.9.12.102:8000/warehouse")
      .then((response) => response.json())
      .then((data) => {
        setPdtList(data);
      });
  }, []);

  const [order, setOrder] = useState([]);
  const [open, setOpen] = useState(false);
  const orderColumns = [
    {
      title: "商品编号",
      dataIndex: "Pdt_id",
      key: "Pdt_id",
    },
    {
      title: "商品名称",
      dataIndex: "Pdt_name",
      key: "Pdt_name",
    },
    {
      title: "商品数量",
      dataIndex: "Order_num",
      key: "Order_num",
    },
    {
      title: "商品总价",
      dataIndex: "Order_price",
      key: "Order_price",
    },
    {
      title: "删除",
      dataIndex: "delete",
      key: "delete",
      render: (_, data) => {
        return (
          <button
            onClick={() => {
              if (confirm("是否确认删除商品" + data.Pdt_name + "?")) {
                setOrder(order.filter((item) => item.Pdt_id !== data.Pdt_id));
              }
            }}
          >
            删除
          </button>
        );
      },
    },
    {
      title: "修改数量",
      dataIndex: "change",
      key: "change",
      render: (_, data) => {
        return (
          <button
            onClick={() => {
              const num = prompt("请输入新的商品数量");
              if (num && parseInt(num) == num && num > 0) {
                setOrder(
                  order.map((item) => {
                    if (item.Pdt_id === data.Pdt_id) {
                      return {
                        ...item,
                        Order_num: num,
                        Order_price: num * item.Pdt_price,
                      };
                    } else {
                      return item;
                    }
                  })
                );
              } else {
                alert("请输入合法的商品数量");
              }
            }}
          >
            修改
          </button>
        );
      },
    },
  ];
  const pdtColumns = [
    {
      title: "商品编号",
      dataIndex: "Pdt_id",
      key: "Pdt_id",
    },
    {
      title: "商品名称",
      dataIndex: "Pdt_name",
      key: "Pdt_name",
    },
    {
      title: "新增",
      render: (_, data) => {
        return (
          <button
            onClick={() => {
              if (order.some((item) => item.Pdt_id === data.Pdt_id)) {
                alert("商品已存在");
                return;
              } else {
                setOrder([...order, data]);
              }
              setOpen(false);
            }}
          >
            添加
          </button>
        );
      },
    },
  ];

  return (
    <>
      <div className="bg-back"></div>
      <div className="front-box">
        <h1>fuck</h1>
        <Table
          dataSource={order}
          columns={orderColumns}
          rowKey={(r) => r.Pdt_id}
        ></Table>
        <div className="button-list">
          <button
            onClick={() => {
              setOpen(true);
            }}
          >
            新增商品
          </button>
          <button
            onClick={() => {
              fetch("http://122.9.12.102:8000/newOrder", {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                body: JSON.stringify(
                  order.map((item) => ({
                    Pdt_id: item.Pdt_id,
                    Order_num: parseInt(item.Order_num),
                    Order_price: item.Order_price,
                    Emp_id: location.pathname.slice(12),
                    Order_time: getCurrentDateTime(),
                  }))
                ),
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.status === "fail") {
                    alert("进货失败！存在不合法字段或商品已售罄。");
                  } else {
                    alert("进货成功！");
                    window.location.reload();
                  }
                });
            }}
          >
            提交订单
          </button>
          <button
            onClick={() => {
              fetch("http://122.9.12.102:8000/newReturn", {
                method: "POST",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
                body: JSON.stringify(
                  order.map((item) => ({
                    Pdt_id: item.Pdt_id,
                    Order_num: parseInt(item.Order_num),
                    Order_price: item.Order_price,
                    Emp_id: location.pathname.slice(12),
                    Order_time: getCurrentDateTime(),
                  }))
                ),
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.status === "fail") {
                    alert("退货失败！存在不合法字段。");
                  } else {
                    alert("退货成功！");
                    window.location.reload();
                  }
                });
            }}
          >
            确认退货
          </button>
        </div>
      </div>
      <Drawer
        title="选择商品"
        onClose={() => {
          setOpen(false);
        }}
        open={open}
        placement="left"
        width="33vw"
      >
        <Table
          dataSource={pdtList}
          columns={pdtColumns}
          rowKey={(r) => r.Pdt_id}
          size={"middle"}
        ></Table>
      </Drawer>
    </>
  );
}

export default Frontstage;
