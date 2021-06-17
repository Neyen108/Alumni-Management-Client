import React from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";
import "./LogIn.css";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export const LogIn = ({ setUser, user, setIsLanding }) => {
  //function to send login request on successful submit
  const onFinish = (values) => {
    console.log("Success:", values);
    axios.post("/login", {
      username: values.username,
      password: values.password,
    });
    //TODO: Add backend url, get response, set user state, set Landing page state
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const heading = `Log In as ${user.type}`;

  return (
    <div className="login">
      <div className="login-heading">{heading}</div>
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
