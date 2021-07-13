import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, InputNumber, message } from "antd";
import axios from "axios";
import { Loading } from "../../components/Loading";

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const { Option } = Select;

export const EditEntry = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [alumniData, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAlumniData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/alumni/getAlumniInfo",
          {
            alumniDataRef: user.alumniUser.alumniDataRef,
          }
        );

        const _alumniData = await response.data.alumniData;

        setData(_alumniData);
        setIsLoading(false);
      } catch {
        alert("Data not found");
      }
    };

    if (user.type === "alumni") {
      fetchAlumniData();
    }
  }, []);

  console.log("alumnidata", alumniData);

  const onFinish = async (values) => {
    console.log("success", values);
    const key = "updatable";
    try {
      message.loading({ content: "Loading...", key });
      const response = await axios.post(
        "http://localhost:5000/api/admin/addEntry",
        {
          values: values,
        }
      );
      message.success({ content: "Success!", key });
    } catch {
      alert("Error");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  if (Object.entries(alumniData).length !== 0) {
    console.log(alumniData.batch);
    return (
      <>
        {isLoading ? (
          <Loading></Loading>
        ) : (
          <Form
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            name="basic"
            layout="horizontal"
            size="middle"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Batch"
              name="batch"
              initialValue={alumniData.batch}
            >
              <Input disabled />
            </Form.Item>

            <Form.Item label="ID" name="id" initialValue={alumniData.id}>
              <Input disabled />
            </Form.Item>

            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true }]}
              initialValue={alumniData.name}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true }]}
              initialValue={alumniData.email}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="CGPA"
              name="CGPA"
              rules={[{ required: true }]}
              initialValue={alumniData.CGPA}
            >
              <InputNumber disabled />
            </Form.Item>

            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: true }]}
              initialValue={alumniData.gender}
            >
              <Select>
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Programme"
              name="programme"
              rules={[{ required: true }]}
              initialValue={alumniData.programme}
            >
              <Select>
                <Option value="Bachelor of Technology">
                  Bachelor of Technology
                </Option>
              </Select>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        )}
      </>
    );
  } else {
    return <Loading />;
  }
};
