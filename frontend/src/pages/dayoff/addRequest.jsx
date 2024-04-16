
import React , { useState } from 'react';
import { Card,Row, Typography,Space,Col, Button ,Form,Input,Select, notification, theme, DatePicker } from 'antd';
import jwtDecode from 'jwt-decode';
import { axiosInstance } from '../../api/globalApi';
import Menus from '../../components/menu';
import  { Dayjs } from 'dayjs';

import TextArea from 'antd/es/input/TextArea';
import { loginUser } from '../../context/action';
function AddRequest () {
    const [startDay, setStartDay] = useState('')
    const { RangePicker } = DatePicker;

    const [endDay, setEndDay] = useState('')
    const [selectedDate, setSelectedDate] = useState(null);
     const handleDateChange = (date) => {
    setSelectedDate(date);
  };

 const { TextArea } = Input;

const token = localStorage.getItem('token')
const decodedToken = jwtDecode(token)
const admin = decodedToken.role
const userId = decodedToken.userId
const [form] = Form.useForm()
console.log(admin)


const onFinish = async (values) => {
    

   try {
    
        
        console.log('values',{...values,startDay,endDay,userId})
           
            await axiosInstance.post('/daysOff',{...values,startDay,endDay,userId})
       .then((response) => {
       
        
          console.log('response',response)

          //setNewUsers(response.data.newDaysOff)
          //form.resetFields()
         //console.log('res',response.data.newDaysOff)
         })
        
      
     
   }
    catch (error){
     console.log('error',error)
   }
    
   }
 

 const {
    token: { colorBgContainer },
  } = theme.useToken();
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

console.log("response",)

const onChangeStartDay=(value,dateString)=>{
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
    
    setStartDay(dateString)
    
}

const onChangeEndDay=(value,dateString)=>{
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
    
    setEndDay(dateString)
    
}
console.log('start',startDay)
console.log('end',endDay)

const onChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
    const endDay = dateString[1]
    console.log('end dar', endDay);
    setEndDay(endDay)
    const startDay = dateString[0]
    console.log('start day:', startDay);
    setStartDay(startDay)
};
 return(
    <>
     <Row>
        <Col><Menus/></Col>
        <Col style={{marginLeft:25}}>
          
        <Typography.Title>Profile</Typography.Title>
             
           <Row>
               <Col span={18} push={6}>
               <Space direction='horizontal'>
               <Card >
               <Form 
   
   style={{ width: 400 }}
   layout="vertical"
   initialValues={{ remember: true }}
   onFinish={onFinish}
   //onFinishFailed={onFinishFailed}
   autoComplete="off"
   form={form}
   >
    
  
  <Form.Item
                                    
    rules={[
      {
       required: true,
       message: 'Please input the date !',
       },
    ]} >
      <RangePicker
        format="YYYY-MM-DD"
        onChange={onChange}
        style={{ width: '100%' }}
      />
  </Form.Item>
   
   <Form.Item  label="type"
     name="type"
     rules={[{ required: true, message: 'Please input your !' }]}>
         <Select>
           <Select.Option value="Paid">Paid</Select.Option>
           <Select.Option value="Unpaid">Unpaid</Select.Option>
           <Select.Option value="Sick">Sick</Select.Option>
         </Select>
       </Form.Item>

    <Form.Item label="justificationSick" name="justificationSick">
          <TextArea rows={4} />
    </Form.Item>
   
   <Form.Item>
   <Button type="primary" htmlType="submit"    > 
       Sign In
     </Button>
   </Form.Item>       
 </Form>
                   
  </Card>
  </Space>
  </Col>
  <Col span={6} pull={18}>
               

               
  </Col>
  </Row>
  </Col>
  
  </Row>
    </>
 )
}
export default AddRequest;