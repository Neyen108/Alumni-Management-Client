import React from "react";
import "antd/dist/antd.css";
import { Table, Space, Button } from "antd";
import { PasswordModal } from "./PasswordModal";
import { useHistory } from "react-router-dom";

export const BatchTable = ({ batches, user }) => {
  const history = useHistory();

  //initialize table data from batches
  const data = batches.map((batch, i) => {
    return {
      key: i + 1,
      name: batch.batchName,
      passwords: batch.passwords,
    };
  });

  console.log(data);

  const goToBatchDashboard = (batchname) => {
    history.push(`/dashboard/${batchname}`);
  };

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
  };

  const columns = [
    {
      title: "Batch",
      dataIndex: "name",
      key: "name",

      sorter: (a, b) => {
        return a.name.localeCompare(b.name);
      },
      ellipsis: true,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => goToBatchDashboard(record.name)}
          >
            Details
          </Button>
          {user.type === "admin" ? (
            <PasswordModal passwords={record.passwords} />
          ) : (
            <></>
          )}
        </Space>
      ),
    },
  ];
  return (
    <>
      <Table columns={columns} dataSource={data} onChange={handleChange} />
    </>
  );
};
