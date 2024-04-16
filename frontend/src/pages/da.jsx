
import React , { useEffect, useState } from 'react';
import {  UserOutlined, TeamOutlined, MailOutlined, BellFilled,PoweroffOutlined, CalendarOutlined  } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme,Card,Row, Typography, Badge,Space, Statistic} from 'antd';
import { useNavigate } from 'react-router-dom';
import Menus from "../components/menu"
import Data from '../components/data';
import DashboardCard from '../components/dashboard/dashboardCard';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import DashbordBarChart from '../components/dashboard/dashbordBarChart';
import { axiosInstance } from '../api/globalApi';
const { Header, Content, Footer, Sider } = Layout;

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


const Da = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [totalUsersData, setTotalUsers] = useState(null)
  // useEffect(() => {
  //   getData()
  //  }, [])
const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // const dateNow = new Date()

  // const getData = ()=>{
    
  //     axiosInstance.get(`/users?page=1&limit=30&sortBy=createdAt&createdAtBefore=${dateNow}&createdAtAfter=2023-01-01`)
  //     .then((response) => {
        
  //       setTotalUsers(response.data.totalItems)
  //       console.log('response',response)
  //     })
    
  // }
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
     <Menus/>
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
               
                <DashboardCard title={"Total user"} value={1111} 
                icon={<UserOutlined
                  style={{
                    color: "purple",
                    backgroundColor:"rgba(0,255,255,0.25)",
                    borderRadius: 20,
                    fontSize: 24,
                    padding:8
                  }}
                />}/>
                {/* <Data totalUsersData={totalUsersData}/> */}
                </Space>

                <Space direction='horizontal'>
               <DashboardCard title={"Total Day Off"} value={2345} icon={<CalendarOutlined
                style={{
                  color: "red",
                  backgroundColor:"rgba(0,255,255,0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding:8
                }}
               />}/>

                </Space>
                <DashbordBarChart/>
              
               
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
export default Da;