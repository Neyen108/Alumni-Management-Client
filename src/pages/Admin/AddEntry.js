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

export const AddEntry = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [batchNames, setBatchNames] = useState([]);

  const [batchesData, setBatchesData] = useState([]);

  const [validateStatus, setValidateStatus] = useState("");

  const [batch, setBatch] = useState(null);

  //get batches once, only when reload occurs
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const batchesResponse = await axios.get(
          "http://localhost:5000/api/general/getBatches"
        );

        const _batchesData = await batchesResponse.data.batchesData;

        console.log(_batchesData);

        setBatchesData(_batchesData);

        const _batchNames = [];
        _batchesData.forEach((data) => {
          _batchNames.push(data.batchName);
        });

        if (_batchNames.length !== 0) {
          setBatchNames(_batchNames);
          setIsLoading(false);
        }
      } catch {
        alert("error");
      }
    };

    fetchBatches();
  }, []);

  const onFinish = async (values) => {
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

  const validateInput = (e) => {
    e.preventDefault();

    const id = e.target.value;

    if (id[0] !== "C" || id[1] !== "S" || id[2] !== "B" || id.length !== 8) {
      setValidateStatus("error");
      return;
    }

    const _batch = batchesData.filter((data) => data.batchName === batch);

    if (_batch.length !== 0) {
      const _ids = Object.keys(_batch[0].passwords);

      const check = _ids.filter((data) => data === id);

      if (check.length === 0) {
        setValidateStatus("success");
      } else {
        setValidateStatus("error");
      }
    }
  };

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
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="Batch" name="batch" rules={[{ required: true }]}>
            <Select onChange={(value) => setBatch(value)}>
              {batchNames.map((batchName) => {
                return <Option key={batchName}>{batchName}</Option>;
              })}
            </Select>
          </Form.Item>

          <Form.Item
            label="ID"
            name="id"
            hasFeedback
            validateStatus={validateStatus}
            rules={[{ required: true }]}
          >
            <Input onBlur={(e) => validateInput(e)} />
          </Form.Item>

          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="CGPA" name="CGPA" rules={[{ required: true }]}>
            <InputNumber />
          </Form.Item>

          <Form.Item label="Gender" name="gender" rules={[{ required: true }]}>
            <Select>
              <Option value="Male">Male</Option>
              <Option value="Female">Female</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Programme"
            name="programme"
            rules={[{ required: true }]}
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
};
