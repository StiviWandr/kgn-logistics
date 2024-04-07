import  { useState } from 'react';
import { Layout, Menu, Drawer, Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setVisible(false);
  };

  return (
    <Layout style={{minHeight: '100vh'}}>
      <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed} breakpoint="lg" onBreakpoint={broken => {
        if (broken) {
          setCollapsed(true);
        }
      }}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[location.pathname]}>
          <Menu.Item key="/home" onClick={() => handleNavigate('/home')}>
            Home
          </Menu.Item>
          <Menu.Item key="/users" onClick={() => handleNavigate('/users')}>
            Users
          </Menu.Item>
          
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, backgroundColor: '#fff' }}>
            {
                window.innerWidth < 900 && (
                    <Button type="primary" onClick={showDrawer} icon={<MenuOutlined />} style={{ marginBottom: 16 }}>
                        {collapsed ? 'Open' : 'Close'}
                    </Button>
                )
            }
         
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, minHeight: 360 }}><Outlet /></div>
        </Content>
      </Layout>
      <Drawer title="Basic Drawer" placement="left" onClose={onClose} visible={visible}>
        <Menu theme="light" mode="vertical" defaultSelectedKeys={[location.pathname]}>
          <Menu.Item key="/home" onClick={() => handleNavigate('/home')}>
            Home
          </Menu.Item>
          <Menu.Item key="/users" onClick={() => handleNavigate('/users')}>
            Users
          </Menu.Item>
         
        </Menu>
      </Drawer>
    </Layout>
  );
};

export default AppLayout;
