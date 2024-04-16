import React ,{useState,useEffect}from "react";
import { axiosInstance } from '../api/globalApi';
import { useNavigate,Link } from 'react-router-dom';
import { Form,  Space, Button, DatePicker, Select, Input } from 'antd';

function Filter({getList,handleOk,getData ,setLimit,setCreatedAtBefore,setCreatedAtAfter,setSortBy}){

 const { RangePicker } = DatePicker;
    const dateNow = new Date()
   
    const [form] = Form.useForm()
   
    const onChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
    const createdBefore = dateString[1]
    setCreatedAtBefore(createdBefore)
    const createdAfter = dateString[0]
    setCreatedAtAfter(createdAfter)

  };
 

 

    return(
        <>
        
      
        <Space.Compact direction='horizontal' size='large'>
      
          <Form
             layout='inline'
             form={form}
          >
            <Form.Item  name="sortby" >
              <Select placeholder="Field to sort by" style={{width:"100%"}} onSelect={(e) => setSortBy(e)}
              options={[
                {
                  value:"createdAt",
                  label: "createdAt"
                }
              ]}
              />
                
                
            
            </Form.Item>
            <Form.Item  name="Date">
              <RangePicker

                format="YYYY-MM-DD"
                onChange={onChange}
                
              />
            </Form.Item>
            <Form.Item  name="Limit" >
              <Input onChange={(e) =>  setLimit(e.target.value)}  />
            </Form.Item>
            <Form.Item>
              <Button onClick={()=>{
                handleOk()
              }}>on click</Button>
            </Form.Item>
            <Form.Item >
              <Button onClick={()=>{
                form.resetFields()
                getList()}}
                
          >on Cancel</Button>
            </Form.Item>
          </Form>
          
        </Space.Compact>
      
        </>
    )
}
 export default Filter;