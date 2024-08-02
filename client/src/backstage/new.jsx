import { Form, Input, Button, InputNumber, Radio } from "antd";

const onFinish = (values) => {
  console.log(values);
  fetch("http://122.9.12.102:8000/newEmp", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: JSON.stringify(values),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.status === "fail") {
        alert("添加失败！存在不合法字段。");
      } else {
        alert("添加成功！");
        window.location.reload();
      }
    });
};

export default function New() {
  return (
    <>
      <Form
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 12,
        }}
        style={{
          maxWidth: 600,
          position: "relative",
          top: 100,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item label="编号" name="Emp_id">
          <Input />
        </Form.Item>

        <Form.Item label="姓名" name="Emp_name">
          <Input />
        </Form.Item>

        <Form.Item label="性别" name="Emp_sex">
          <Radio.Group>
            <Radio value="男"> 男 </Radio>
            <Radio value="女"> 女 </Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="年龄" name="Emp_age">
          <InputNumber />
        </Form.Item>

        <Form.Item label="联系方式" name="Emp_tele">
          <Input />
        </Form.Item>

        <Form.Item label="密码" name="Emp_pwd">
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
