import React from "react";
import { Button, Popconfirm, Space, Table } from "antd";
import dayjs from "dayjs";
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";

const DataDayoff = ({dataSourceDayoff,totalDayOff,onDeleteRequests, onEditRequests ,decisionRequests })=>{

    const columns = [
        {
            title:"startDay",
            dataIndex:"startDay",
            render:(date)=>{
                return <p>{dayjs(date).format('YYYY-MM-DD')}</p>
            }
        },
        {
            title:"endDay",
            dataIndex:"endDay",
            render:(date)=>{
                return <p>{dayjs(date).format('YYYY-MM-DD')}</p>
            }
        },
        {
            title:"type",
            dataIndex:"type",
            filters:[

                {
                value:"Paid",
                text:"Paid" 
                },

                {
                value:"Unpaid",
                text:"Unpaid" 
                },
                {
                value:"Sick",
                text:"Sick" 
                }
            ],
            onFilter:(value, record) => {
                return record.type === value
              }
        },
        {
            title:"decisionManager",
            children: [
             {
                title:"Status",
                
                render:(status ) =>{ return  <p> { status.decisionManager.status  ?"True":"False"} </p>}
             },
             {
                title:"Justification",
              
                render:(justification ) =>{ return  <p> { justification.decisionManager.justification} </p>}
             }
            ],
            
        },
        {
            title:"decisionDirector",
            children: [
             {
                title:"Status",
                
              
                render:(status ) =>{ return  <p>
                   <CheckCircleOutlined style={{ color: "green" }}/>
                   <CloseCircleOutlined  style={{ color: "red" }}/>
                   { status.decisionDirector.status  ? "True" :"False"} 
                   </p>}
             },
             {
                title:"Justification",
            
                render:(justification ) =>{ return  <p> { justification.decisionDirector.justification} </p>}
             }
            ],
            
        },
        
        {
            title:"statusReq",
            dataIndex:"statusReq",
            render:(status ) =>{ return  <p> {status?"True":"False"} </p>}
            
        },
        {
            title:"reqDayOff",
            dataIndex:"reqDayOff"
        },
        {
            title:"justificationSick",
            dataIndex:"justificationSick"
        },
        {
            title: 'Action',
            dataIndex: '',
            render: (_, record) => { 
              return dataSourceDayoff.length >= 1 ? (
      
                <Space size="middle">
                  <Popconfirm
                  title='Are you sure, you want to delete this user'
                  okText="Yes"
                  okType="danger"
                  onConfirm={() => onDeleteRequests(record)}
                >
                  <Button style={{ color: "red" }}>Delete
                    <DeleteOutlined />
                  </Button>
                </Popconfirm>
                    
                <Button  style={{ color: "green" , marginLeft:"30px"}}
              
              onClick={()=>{
                onEditRequests(record)
              }}
              >
            <EditOutlined/>
              Update
            </Button>  

            <Button  style={{ color: "gris" , marginLeft:"30px"}}
              
              onClick={()=>{
                decisionRequests(record)
              }}
              >
            <EditOutlined/>
              decision
            </Button> 
                
          </Space>
      
      
                
              ) : null
            }}
    ]
    return(
        <Table
        title={() => <span> Total users : {totalDayOff}</span>}
        columns={columns}
        dataSource={dataSourceDayoff}
        bordered
        />  
       ) 
    
}

export default DataDayoff;