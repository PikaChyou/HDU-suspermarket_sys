import * as echarts from "echarts";
import { useRef, useEffect, useState, useLayoutEffect } from "react";

function Charts() {
  const chartsRef = useRef(null);
  const [cdata, setCdata] = useState([]);
  useEffect(() => {
    fetch("http://122.9.12.102:8000/charts")
      .then((response) => response.json())
      .then((data) => {
        setCdata(data);
      });
  }, []); // 仅在组件挂载时请求数据

  useLayoutEffect(() => {
    if (chartsRef.current && cdata.length > 0) {
      const chartInstance = echarts.init(chartsRef.current);
      const option = {
        // title: {
        //   text: "销售总额",
        // },
        tooltip: {},
        xAxis: {
          type: "category",
          data: cdata.map((item) => item.Sale_date),
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: cdata.map((item) => item.Total_sales),
            type: "bar",
          },
        ],
      };
      chartInstance.setOption(option);

      return () => {
        // 销毁图表实例，释放内存
        chartInstance.dispose();
      };
    }
  }, [cdata]); // 当cdata更新时，重新渲染图表

  return (
    <div
      id="main"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div ref={chartsRef} style={{ width: "100%", height: "100%" }}></div>
    </div>
  );
}

export default Charts;
