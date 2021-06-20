import React, { useState } from "react";
import { Modal, Button } from "antd";

export const PasswordModal = ({ passwords }) => {
  const passwordsArr = Object.entries(passwords);
  passwordsArr.sort();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Show Passwords
      </Button>
      <Modal
        title="Passwords"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {passwordsArr.map((password) => {
          return (
            <p key={password[0]}>
              {" "}
              {password[0]} : {password[1]}{" "}
            </p>
          );
        })}
      </Modal>
    </>
  );
};
