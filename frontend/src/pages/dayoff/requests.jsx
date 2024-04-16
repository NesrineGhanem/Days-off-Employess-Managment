
import React, { Component, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { axiosInstance } from '../../api/globalApi';
import { Link} from 'react-router-dom';

import {Button,Row,Col, message, notification, Modal, Select, Form} from 'antd';
import Menus from '../../components/menu';
import DataDayoff from '../../components/dayoff/dataDayoff';
import FilterDayoff from '../../components/dayoff/filterDayoff';
import deleteRequests from './deleteRequest';
import { DeleteOutlined } from '@ant-design/icons';
import deleteAllRequests from './deleteAllRequest';
import DecisionDayoff from '../../components/dayoff/decisonDayoff';
import TextArea from 'antd/es/input/TextArea';

function Requests() {
  const [dayoffData, setDayoff] = useState([])
  const [totalDayOff, setTotalDayoff] = useState(null)

useEffect(()=>{
  getData()
},[])



const token = localStorage.getItem('token')
const decodedToken = jwtDecode(token)
const admin = decodedToken.role
const userId = decodedToken.userId;

const dateNow = new Date()

  const getData = ()=>{
    if (admin === 'Super Admin'||'Director'|| 'Administration Director'||'Administration Assistant'|| 'Team manager'||'Software Engineer') {
      axiosInstance.get(`/daysOff?page=1&limit=100&sortBy=createdAt&createdAtBefore=${dateNow}&createdAtAfter=2023-01-01`)
      .then((response) => {
        console.log('response',response)
        setDayoff(response.data.daysOffList)
        
      })
    }
  }

const dataSourceRequests = dayoffData.map((item)=>({
          ...item,
          key : item._id
         }))

         const handleOk = (filter) => {

            setDayoff(filter)
          
            };


            const data = dayoffData;
          
            //const id = userId;
        
        //delete
           const onDeleteRequests=(record)=>{
             console.log('id',record._id)
             const id = record._id
             deleteRequests(id)
             return getData()
            
}; 

            //deleteAll
            //  const onDeleteRequestsAll=()=>{
            //   //console.log('id',record._id)
            //   //const id = record._id
            //    //deleteRequests(id)
            //    deleteAllRequests()
            //   return getData()
             
            // }; 

         //filter 
           const dayoffFilter=(filter)=>{
            setTotalDayoff(filter)
         }  
         //delete all
         
          const onDeleteRequestsAll = async ()=>{
            await axiosInstance.delete  (`/daysOff`)
            .then(
             (response)=>{
            message.success(response.data.message)
           return getData()
           }
            )
            .catch((error)=>{
          message.error(error.data.message)
          console.log('error',error)

          } 
           )
          } 
          

            // decision update
  const [isEditing, setIsEditing] = useState(false);
    const [editingUser, setEditingUser] = useState([])
 
    //const [status , setStatus]= useState()
    //const [justification , setJustification]= useState([]) 

  const  decisionRequests = async(record)=>{
    setEditingUser(record);
    setIsEditing(true)
    console.log('edit')

    }
    console.log("req",editingUser)

     const resetEditing= ()=>{
       setIsEditing(false);
       setEditingUser(null)
   }
   const onFinish = async () => {
    form.validateFields().then(async(values)=>{

    
    const id = editingUser._id;
    
    const token = localStorage.getItem('token')
    const decodedToken = jwtDecode(token)
  
    const userId = decodedToken.userId;
    //const id = userId;
       console.log('id:', id);
    
    await axiosInstance.patch(`/daysOff/decision/${id}`,
    {...values,userId} )
          .then((response) => {
            console.log('response edit:', response);
          
        
            setIsEditing(false)
            return getData()
            })

          .catch((error) => {
            notification.error({
             placement: 'top',
             bottom: 50,
             duration: 2,
              message: error.data.message
              
           }
           
           )
             console.log('err',error)
          }
          );
        })
  }

const [form] =Form.useForm()
  return (
    <>
    <Row>
      <Col>
      <Menus/>
      </Col>
      <Col span={20}>
      <Row>
        <Col>
        <FilterDayoff filterRequests={handleOk}
         dayoffFilter={dayoffFilter}
        />
        </Col>
      <Col>
      <DataDayoff
    dataSourceDayoff={dataSourceRequests} 
    totalDayOff={totalDayOff}
    onDeleteRequests={onDeleteRequests}
    decisionRequests={decisionRequests}
    />

<Button onClick={()=>{}} style={{ color: "blue" , marginLeft:"30px"}}>
              <DeleteOutlined/>
              <Link to="/AddRequest" >Add Request</Link>
      </Button>


      <Button onClick={()=>{
                onDeleteRequestsAll()
              }}
                style={{ color: "red" , marginLeft:"30px"}}>

                <DeleteOutlined />
                Delete All</Button>



                <Modal
          title="Edit User"
           open={isEditing}
          okText="Save"
           onCancel={() => {
             resetEditing();
             setEditingUser([])
           }}
           onOk={() => {
             onFinish()
            
            setEditingUser([])
         }}
        >
          
       {/* <DecisionDayoff
           setJustification={justificationReq}
           setStatus={statusReq}
          change={decisionRequests}
          />     */}

<Form   form={form}
onFinish={onFinish}
>
            <Form.Item label="justification" name={"justification"} >
            <TextArea rows={4}  
        
            // onChange={(e) => {
            //     setJustification (e.target.value)  
            //     }
            // }
              
          />
          </Form.Item>
         
   <Form.Item label="status"  name={"status"}>
        <Select
        // onChange={(e)=>{
        //     setStatus(e)
        // }}

        options={
            [
                { value:true,
            label:"True",
           },
           { value:false,
           label:"False",
          }
    ]}
    />
    </Form.Item>
     </Form>
         
</Modal>
                  
      </Col>
      </Row>
      </Col>
    </Row>
    </>
   );
}


export default Requests;