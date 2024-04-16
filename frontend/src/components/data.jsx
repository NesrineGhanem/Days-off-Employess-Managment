import React from "react";
import { Avatar, Space, Table, Button, Popconfirm } from "antd";
import {  DeleteOutlined, EditOutlined,UserOutlined } from '@ant-design/icons';

const Data =({onDeleteUser,onToggle,onEditUser,dataSourceEmployees,totalUsersData}) =>{
    
        
         const columns = [
    {
      title:"avatar",
      dataIndex:"avatar",
      aligin:"center",
      render:(avatar) =>{return(avatar) ?<Avatar src={avatar} size={{xs: 24,
        sm: 32,
        md: 40,
        lg: 64,
        xl: 70,
        xxl: 80,}}/>: <Avatar 
        size={{
          xs: 24,
          sm: 32,
          md: 40,
          lg: 64,
          xl: 70,
          xxl: 80,
        }} icon={<UserOutlined />} />}
    },
    {
    
      title:"first Name" ,
      dataIndex:"firstName" ,
      
    },
    
    {
       title:"Last Name",
       dataIndex:"LastName",
      
    },
    
    {
      title: 'Email',
      dataIndex: 'email',
      
    },
    {
      title: 'Role',
      dataIndex: 'role',
      
       filters:[
          {
            value:"Super Admin",
            text:"Super Admin" ,
          },
          {
            value:"Administration Director",
            text:"Administration Director" ,
          },
          {
            value:"Administration Assistant",
            text:"Administration Assistant" ,
          },
          {
            value:"Team Manager",
            text:"Team Manager" ,
          },
          {
            value:"Software Engineer",
            text:"Software Engineer" ,
          },
          {
            value:"Director",
            text:"Director" ,
          }
        ] ,
        
        onFilter:(value, record) => {
          return record.role === value
        }
       
    },
    {
      title: 'Building',
      dataIndex: 'building',
      
       filters:[
          {
            value:"Super Admin",
            text:"Super Admin" ,
          },
          {
            value:"Front-End",
            text:"Front-End" ,
          },
          {
            value:"Back-End",
            text:"Back-End" ,
          },
          {
            value:"Full-Stack",
            text:"Full-Stack" ,
          }
        
        ] ,
        
        onFilter:(value, record) => {
          return record.role === value
        }
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      
    },
    {
      title: 'Days Off',
      dataIndex: 'soldeDays',
      
    }, 
    {
      title: 'Status',
      dataIndex : 'isActive',
     
      filters: [
        {
          text: 'Active',
          value: 'true',
        },
        {
          text: 'Inactive',
          value: 'false',
        },
       
      ],
      

      
       render:(isActive) => {return <p>{isActive ?'Active':'Disable'}</p>},
    onFilter:(value, record) => {
      return record.isActive === value
    }
     },
    {
      title: 'Action',
      dataIndex: '',
      render: (_, record) => { 
        return dataSourceEmployees.length >= 1 ? (

          <Space size="middle">
            
            
            <Popconfirm
            title='Are you sure, you want to delete this user'
            okText="Yes"
            okType="danger"
            onConfirm={() => onDeleteUser(record)}
          >
            <Button style={{ color: "red" }}>Delete
              <DeleteOutlined />
            </Button>
          </Popconfirm>
        

            <Button  style={{ color: "green" , marginLeft:"30px"}} 
            onClick={()=>{
              onToggle(record)
            }}
            >

             <EditOutlined/>
              toggle 
            </Button>  


              <Button  style={{ color: "green" , marginLeft:"30px"}}
              onClick={()=>{
                onEditUser(record)
              }}
              >
            <EditOutlined/>
              Update
            </Button>    
           
           
    </Space>


          
        ) : null
      }}
    


  ];
   return(
    <Table
    title={() => <span> Total users : {totalUsersData}</span>}
    columns={columns}
    dataSource={dataSourceEmployees}
    bordered
    
    />  
   )     
 
}
export default Data;