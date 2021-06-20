import React, { useState } from "react";
import {
  Table,
  Input,
  InputNumber,
  Popconfirm,
  Form,
  Typography,
  Button,
} from "antd";
import axios from "axios";
import { useHistory } from "react-router-dom";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

//TODO: api to edit entry

export const BatchDataTable = ({ user, batchData }) => {
  const history = useHistory();
  const [form] = Form.useForm();
  const [data, setData] = useState(batchData);
  const [editingKey, setEditingKey] = useState("");

  // console.log(batchData);

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      // ID: "",
      // Name: "",
      // Email: "",
      // CGPA: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });

        const response = await axios.post(
          "http://localhost:5000/api/admin/edit",
          {
            alumniData: newData[index],
          }
        );

        console.log(response.data);
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const openDetails = (batch, id) => {
    history.push(`/dashboard/${batch}/${id}`);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      width: "10%",
      editable: false,
      sorter: (a, b) => {
        return a.name.localeCompare(b.name);
      },
      ellipsis: true,
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "15%",
      editable: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "25%",
      editable: true,
    },
    {
      title: "CGPA",
      dataIndex: "CGPA",
      width: "15%",
      editable: true,
    },
    {
      title: "Show Details",
      dataIndex: "showDetails",
      render: (_, record) => {
        return (
          <Button
            onClick={() => {
              openDetails(record.batch, record.id);
            }}
          >
            Show Details
          </Button>
        );
      },
    },
  ];

  if (user.type === "admin") {
    columns.push({
      title: "Operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    });
  }
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "CGPA" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return (
    <>
      <h1 style={{ fontSize: "1.5rem" }}> {batchData[0].batch} </h1>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </>
  );
};
