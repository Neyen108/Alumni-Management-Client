import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import MenuItem from "antd/lib/menu/MenuItem";
import "./AppRouter.css";

import { Landing } from "../pages/Landing/Landing";
import { LogIn } from "../pages/LogIn/LogIn";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { BatchDashboard } from "../pages/Dashboard/BatchDashboard";
import { AlumniDetails } from "../pages/Dashboard/AlumniDetails";
import { AddEntry } from "../pages/Admin/AddEntry";
import { DeleteEntry } from "../pages/Admin/DeleteEntry";
import { EditEntry } from "../pages/Alumni/editEntry";

const { Header, Sider, Content } = Layout;

export const AppRouter = () => {
  const history = useHistory();

  //--------------------------------------STATE MANAGEMENT START-----------------------------------------------------------//

  const [collapsed, setCollapsed] = useState(false);
  const [isLanding, setIsLanding] = useState(true);
  const [user, setUser] = useState({ type: "none", isAuth: false });

  //useEffect to set the states from local storage
  useEffect(() => {
    if (history.location.pathname !== "/") {
      const localUser = window.localStorage.getItem("user");

      if (localUser !== null) {
        setUser(JSON.parse(localUser));
      }

      const landingStatus = window.localStorage.getItem("isLanding");

      if (landingStatus !== null) {
        setIsLanding(JSON.parse(landingStatus));
      }
    }
  }, []);

  //useEffect to set User State on local storage
  useEffect(() => {
    window.localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  //useEffect to set Landing Status on local storage
  useEffect(() => {
    window.localStorage.setItem("isLanding", isLanding);
  }, [isLanding]);

  //--------------------------------------------STATE MANAGEMENT END----------------------------------------------------//

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const menuItemClickHandler = (value) => {
    if (isLanding) {
      setUser({
        type: value,
        isAuth: false,
      });
      history.push("/login");
    } else {
      history.push(value);
    }
  };

  let menuItems = [];

  if (isLanding) {
    menuItems = [
      {
        key: 1,
        icon: <UserOutlined />,
        text: "LogIn as Admin",
        value: "admin",
      },
      {
        key: 2,
        icon: <UserOutlined />,
        text: "LogIn as Alumni",
        value: "alumni",
      },
      {
        key: 3,
        icon: <UserOutlined />,
        text: "LogIn as Student",
        value: "student",
      },
    ];
  } else if (
    isLanding === false &&
    user.type === "admin" &&
    user.isAuth === true
  ) {
    menuItems = [
      {
        key: 1,
        icon: <UserOutlined />,
        text: "Dashboard",
        value: "/dashboard",
      },
      {
        key: 2,
        icon: <UserOutlined />,
        text: "Add Alumni Entry",
        value: "/admin/addEntry",
      },
      {
        key: 3,
        icon: <UserOutlined />,
        text: "Delete Alumni Entry",
        value: "/admin/deleteEntry",
      },
    ];
  } else if (
    isLanding === false &&
    user.type === "alumni" &&
    user.isAuth === true
  ) {
    menuItems = [
      {
        key: 1,
        icon: <UserOutlined />,
        text: "Dashboard",
        value: "/dashboard",
      },
      {
        key: 2,
        icon: <UserOutlined />,
        text: "Edit Entry",
        value: "/alumni/editEntry",
      },
    ];
  } else if (
    isLanding === false &&
    user.type === "student" &&
    user.isAuth === true
  ) {
    menuItems = [
      {
        key: 1,
        icon: <UserOutlined />,
        text: "Dashboard",
        value: "/dashboard",
      },
    ];
  }

  return (
    <Layout>
      <Sider onCollapse={toggle} collapsible collapsed={collapsed} theme="dark">
        <div className="logo" />
        <Menu theme="dark" mode="inline">
          {menuItems.map((item) => {
            return (
              <MenuItem
                key={item.key}
                icon={item.icon}
                onClick={() => menuItemClickHandler(item.value)}
              >
                {item.text}
              </MenuItem>
            );
          })}
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-header " style={{ padding: 0 }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: toggle,
            }
          )}
          Alumni Management System
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "0px 0px",
            padding: 24,
            minHeight: "100vh",
          }}
        >
          <Switch>
            <Route
              path="/"
              exact={true}
              render={(props) => (
                <Landing {...props} clickHandler={menuItemClickHandler} />
              )}
            ></Route>
            <Route
              path="/login"
              render={(props) => (
                <LogIn
                  {...props}
                  setUser={setUser}
                  user={user}
                  setIsLanding={setIsLanding}
                />
              )}
            ></Route>
            <Route
              path="/dashboard"
              exact={true}
              render={(props) => <Dashboard {...props} user={user} />}
            ></Route>
            <Route
              path="/dashboard/:batchname"
              exact={true}
              render={(props) => <BatchDashboard {...props} user={user} />}
            ></Route>
            <Route
              path="/dashboard/:batchname/:id"
              exact={true}
              render={(props) => <AlumniDetails {...props} />}
            ></Route>
            <Route
              path="/admin/addEntry"
              exact={true}
              render={(props) => <AddEntry {...props} />}
            ></Route>
            <Route
              path="/admin/deleteEntry"
              exact={true}
              render={(props) => <DeleteEntry {...props} />}
            ></Route>
            <Route
              path="/alumni/editEntry"
              exact={true}
              render={(props) => <EditEntry {...props} user={user} />}
            ></Route>
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
};
