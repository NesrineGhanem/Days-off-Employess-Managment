import React from "react";
import { Breadcrumb, Layout, Menu, theme,Card,Row, Typography, Badge,Space, Statistic} from 'antd';
import {  UserOutlined, TeamOutlined, MailOutlined, BellFilled,PoweroffOutlined  } from '@ant-design/icons';
import DashbordBarChart from "./dashbordBarChart";
function DashboardCard({title,value,icon}) {
return(
    <>
     {/* <Card style={{flex: '1px',width:'300px',justifyContent: "space-between" ,margin:"40px" }}>
                    <MailOutlined style={{color:"blue", backgroundColor:"gray",borderRadius:20,
                    fontSize:24,padding:8}}/>
                    <Statistic  title='orders' value={200}/>
                </Card> */}
      {/* <Card style={{flex: '1px' ,width:'300px',margin:"40px"}}>Total Users</Card>
                <Statistic  title='orders' value={totalUsersData}/>            */}
  <Space direction='horizontal'>
  <Card style={{flex: '1px',width:'300px',justifyContent: "space-between" ,margin:"40px" }}>
      {/* <MailOutlined style={{color:"blue", backgroundColor:"gray",borderRadius:20,fontSize:24,padding:8}}/> */}
      {icon}
      <Statistic  title={title} value={value}/>
      
  </Card>
  </Space>
    </>
)
}
export default DashboardCard