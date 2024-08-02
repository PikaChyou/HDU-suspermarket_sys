import "./login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <button
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: "999",
          color: "#2c3e50",
          fontSize: "20px",
          fontWeight: "bold",
          backgroundColor: "white",
          border: "none",
          borderRadius: "5px",
          padding: "0px 5px",
          cursor: "pointer",
        }}
        onClick={() => {
          alert(
            "管理员账号：sm_admin\n管理员密码：Supermarket@admin0\n员工测试用账号：0001\n员工测试用密码：Supermarket@emp1"
          );
        }}
      >
        ?
      </button>
      <div className="bg-login">
        <div className="login-box">
          <div className="login-title">
            <h1>LOGIN</h1>
            <p>中小型超市管理系统</p>
          </div>
          <div className="input-box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="0 0 25 25"
            >
              <path
                fill="rgb(44, 62, 80,0.8)"
                fillRule="evenodd"
                d="M8 7a4 4 0 1 1 8 0a4 4 0 0 1-8 0m0 6a5 5 0 0 0-5 5a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3a5 5 0 0 0-5-5z"
                clipRule="evenodd"
              ></path>
            </svg>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="100%"
              viewBox="-2.5 0 25 25"
            >
              <path
                fill="rgb(44, 62, 80,0.8)"
                d="M16.07 8H15V5s0-5-5-5s-5 5-5 5v3H3.93A1.93 1.93 0 0 0 2 9.93v8.15A1.93 1.93 0 0 0 3.93 20h12.14A1.93 1.93 0 0 0 18 18.07V9.93A1.93 1.93 0 0 0 16.07 8M7 5.5C7 4 7 2 10 2s3 2 3 3.5V8H7zM10 16a2 2 0 1 1 2-2a2 2 0 0 1-2 2"
              ></path>
            </svg>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button
            onClick={() => {
              if (
                username === "sm_admin" &&
                password === "Supermarket@admin0"
              ) {
                alert("成功登录后台系统");
                navigate("/backstage");
              } else {
                fetch("http://122.9.12.102:8000/emp")
                  .then((response) => response.json())
                  .then((data) => {
                    const passwordExists = data.some(
                      (user) =>
                        user.Emp_pwd == password && user.Emp_id == username
                    );
                    if (passwordExists) {
                      alert("密码验证成功");
                      navigate("/frontstage/" + username);
                    } else {
                      alert("密码验证失败");
                    }
                  });
              }
            }}
          >
            SUBMIT
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
