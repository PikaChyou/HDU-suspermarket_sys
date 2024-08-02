import { Outlet, useNavigate } from "react-router-dom";
import "./backstage.css";

function Backstage() {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-back"></div>
      <div className="content-box">
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div className="sider">
            <button onClick={() => navigate(`employee`)}>员工名册</button>
            <button onClick={() => navigate(`new`)}>新增员工</button>
            <button onClick={() => navigate(`schedule`)}>进货计划</button>
            <button onClick={() => navigate(`scheHistory`)}>进货历史</button>
            <button onClick={() => navigate(`sells`)}>销售记录</button>
            <button onClick={() => navigate(`charts`)}>近七日流水</button>
            <button onClick={() => navigate(`current`)}>当日流水</button>
            <button onClick={() => navigate(`return`)}>退货记录</button>
            <button onClick={() => navigate(`warehouse`)}>库存查询</button>
          </div>

          <div id="main">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Backstage;
