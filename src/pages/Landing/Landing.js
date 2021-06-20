import React from "react";
import { Space, Button } from "antd";
import "./Landing.css";

export const Landing = ({ clickHandler }) => {
  return (
    <>
      <div className="landing">
        <div className="col-1">
          <h1 className="heading-main">Alumni Management System</h1>
          <h1 className="heading-submain">
            Computer Science and Engineering Department
          </h1>
          <h3 className="heading-last">Tezpur University</h3>
        </div>
        <div className="col-2">
          <Space direction="vertical">
            <Button
              type="primary"
              size="large"
              onClick={() => clickHandler("admin")}
            >
              LogIn as Admin
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={() => clickHandler("alumni")}
            >
              LogIn as Alumni
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={() => clickHandler("student")}
            >
              LogIn as Student
            </Button>
          </Space>
        </div>
      </div>
    </>
  );
};
