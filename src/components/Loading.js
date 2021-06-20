import React from "react";
import "./Loading.css";

import { Spin } from "antd";

export const Loading = () => {
  return (
    <div className="loading">
      <Spin size="large" />
    </div>
  );
};
