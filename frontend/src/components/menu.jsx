import React, { useState } from "react";
import {  UserOutlined, TeamOutlined, BellFilled,PoweroffOutlined  } from '@ant-design/icons';
import { Menu, Layout} from 'antd';
import { useNavigate } from 'react-router-dom';
import jwtDecode from "jwt-decode";
function Menus () {
    const {  Sider } = Layout;
    const [collapsed, setCollapsed] = useState(false);    
    const navigate = useNavigate();
     const token = localStorage.getItem('token')
     const decodedToken = jwtDecode(token)
     const id = decodedToken.userId
    return(
        <>
        <Sider style={{color:"black"}} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>       
       
        <Menu 
       span={4} theme="dark" style={{
        minHeight: '96vh',
      }}
           defaultSelectedKeys={[window.location.pathname]} mode="inline"
   onClick={({key})=>{
    if(key === "Signout"){
     //1000, sign out feature here
    }else{
      navigate(key)
    }
   }}
   items = {[
    {label:"Dashboard",key:`/Da` ,icon: <UserOutlined/>},
    {label:"Profile",key:`/user/${id}` ,icon: <UserOutlined/>},
    {label:"Employees",key:"/Employees",icon:<TeamOutlined /> },
    {label:"UserRequest",key:`/UserRequest/${id}` ,icon:<UserOutlined />},
    {label:"Requests",key:"/Requests" ,icon:<TeamOutlined />},
    {label:"Notification",key:"/Notification",icon:<BellFilled/>},
    {label:"Signout",key:"/",icon:<PoweroffOutlined />,danger:true},
]}>

</Menu>
</Sider>   

        </>
    )
}
export default Menus;