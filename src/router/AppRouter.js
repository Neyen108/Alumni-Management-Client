import React , { useState } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import './AppRouter.css';

import {Landing} from '../pages/Landing/Landing'


const { Header, Sider, Content } = Layout;

export const AppRouter = () => {
  const [collapsed, setCollapsed] = useState(true);
  // const [isLanding, setIsLanding] = useState(true);


  const toggle = () => {
    setCollapsed(!collapsed);
  }

  return (
    <BrowserRouter>
      <Layout>
        <Sider onCollapse={toggle} collapsible collapsed={collapsed} defaultCollapsed={true} theme='dark' >
          <div className="logo" />
          <Menu theme="dark" mode="inline" >
            <Menu.Item key="1" icon={<UserOutlined />}  >
              nav 1
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              nav 2
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              nav 3
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-header " style={{ padding: 0}}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
            Alumni Management System
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '0px 0px',
              padding: 24,
              minHeight: '100vh',
            }}
          >
            <Switch>
              <Route path='/' exact = {true} component={Landing}></Route>
              <Route path='/land' component={Landing}></Route> 
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </BrowserRouter>
    );
}

