
import React , { useState } from 'react';
import {  UserOutlined, TeamOutlined, MailOutlined, BellFilled,PoweroffOutlined  } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme,Card,Row, Typography, Badge,Space, Statistic} from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;


const Home = () => {
  const [collapsed, setCollapsed] = useState(false);
  
const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div
          style={{
            height: 32,
            margin: 16,
            background: 'rgba(255, 255, 255, 0.2)',
          }}
        />
       
           <Menu  theme="dark"
            defaultSelectedKeys={[window.location.pathname]} mode="inline"
       onClick={({key})=>{
        if(key === "Signout"){
         //1000, sign out feature here
        }else{
          navigate(key)
        }
       }}
       items = {[
        {label:"Profile",key:"/Profile" ,
        icon: <UserOutlined />,
        children:[
            {label:'admin',key:'/Profile'}
        ] },
        {label:"Employees",key:"/Employees",icon:<TeamOutlined />},
        {label:"Requests",key:"/Requests" ,icon:<TeamOutlined />},
        {label:"Notification",icon:<BellFilled/>},
        {label:"Signout",icon:<PoweroffOutlined />,danger:true},
    ]}>

    </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Typography.Title>Dashboard</Typography.Title>
            <Badge count={10} dot>
            <MailOutlined style={{fontSize:"24px"}}/>
            </Badge>
            <Badge count={20}>
            <BellFilled style={{fontSize:"24px"}}/>
            </Badge>
            <div style={{display: "flex" , justifyContent: "space-between" , padding:"40px"}}>
            <Row>
                <Space direction='horizontal'>
                <Card style={{flex: '1px',width:'300px',justifyContent: "space-between" ,margin:"40px" }}>
                    <MailOutlined style={{color:"blue", backgroundColor:"gray",borderRadius:20,fontSize:24,padding:8}}/>
                    <Statistic  title='orders' value={200}/>
                </Card>
                </Space>
                <Space direction='horizontal'>
                <Card style={{flex: '1px' ,width:'300px',margin:"40px"}}>test2</Card>
                </Space>
                <Space direction='horizontal'>
                <Card style={{flex: '1px',width:'300px',margin:"40px"}}>test3</Card>
                </Space>
                
            </Row>
            
                
        
          </div>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
            
          <Typography.Link href='tel:+123456789' target={"_blank"}>+123456789</Typography.Link>
          <br/>
          <Typography.Link href='http://google.com' target={"_blank"}>Team of use</Typography.Link>
           
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Home;