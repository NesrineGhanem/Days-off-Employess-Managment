
import React , { useState } from 'react';

import { theme,Card,Row, Typography,Space, notification,Col, Button ,Form,Input,Select, Avatar,Image } from 'antd';
import jwtDecode from 'jwt-decode';
import { axiosInstance } from '../../api/globalApi';
import Menus from '../../components/menu';

import { convertToBase64 } from '../../components/convertImage';
import fileDefault from '../../assets/avatar-01.jpg'

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const { Option } = Select;
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="216">+216</Option>
        
      </Select>
    </Form.Item>
  );
  
const Add =() => {
  
const [newUsers,setNewUsers] = useState(false);

const [postImage, setPostImage] = useState( )

const token = localStorage.getItem('token')
const decodedToken = jwtDecode(token)
const admin = decodedToken.role
const [form] = Form.useForm()
console.log(admin)
const onFinish = async (values) => {
   //setNewUsers(true)
console.log(values)
  try {
    if(admin != "Super Admin") {
      
      notification.open({
        message:<div style={{color:'red', textAlign:'center'}}>
            
            <br/>
             Please check your mail
             </div>,
        description:'We have sent a link of reset password to your email'     
         
       })
    }
    else{
      await axiosInstance.post('/users',
       {...values,avatar:postImage})
      .then((response) => {
        notification.open({
          message:<div style={{color:'green ', textAlign:'center'}}>
            
              <br/>
               
               </div>,
          description:'We have sent a link of reset password to your email'     
           
         })
         setNewUsers(response.data.user)
         form.resetFields()
        console.log('response',response.data.user)
        

        
      })
    }
  } catch (error){
    console.log('error',error)
  }
   
  }

 const {
    token: { colorBgContainer },
  } = theme.useToken();


  
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    
    setPostImage( base64 )
  
     console.log("base",base64) 
     
   }
  return (
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
   onFinishFailed={onFinishFailed}
   autoComplete="off"
   form={form}
   >
  <Form.Item
     label="First Name"
     name="firstName"
     rules={[{ required: true, message: 'Please input your first name!' }]}
   >
     <Input placeholder="Enter your first name" />
   </Form.Item>


   <Form.Item
     label="Last Name"
     name="LastName"
     rules={[{ required: true, message: 'Please input your last name!' }]}
   >
     <Input  />
   </Form.Item>

   <Form.Item
     label="Email"
     name="email"

     rules={[{ required: true, message: 'Please input your email!' }]}
   >
     <Input placeholder="Enter your email"  />
   </Form.Item>

   <Form.Item
       name="phone"
       label="Phone Number"
       rules={[
         {
           required: true,
           message: 'Please input your phone number!',
         },
       ]}
     >
       <Input
         addonBefore={prefixSelector}
         style={{
           width: '100%',
         }}
       />
     </Form.Item>

   <Form.Item   label="Role"
     name="role" 
     rules={[{ required: true, message: 'Please input your role!' }]}>
         <Select>
           <Select.Option value="Director">Director</Select.Option>
           <Select.Option value="Administration Assistant">Administration Assistant</Select.Option>
           <Select.Option value="Administration Director">Administration Director</Select.Option>
           <Select.Option value="Team manager">Team manager</Select.Option>
           <Select.Option value="Software Engineer">Software Engineer</Select.Option>
           <Select.Option value="Super-Admin">Super-Admin</Select.Option>
         </Select>
       </Form.Item>
   
   <Form.Item  label="Building"
     name="building"
     rules={[{ required: true, message: 'Please input your building!' }]}>
         <Select>
           <Select.Option value="Front-End">Front-End</Select.Option>
           <Select.Option value="Back-End">Back-End</Select.Option>
           <Select.Option value="Full-Stack">Full-Stack</Select.Option>
           <Select.Option value="Super-Admin">Super-Admin</Select.Option>
         </Select>
       </Form.Item>
   <Form.Item>

    <Form.Item name='avatar' label='avatar' >
      <div>
        <label htmlFor='avatar'>
        <Avatar src={postImage || fileDefault  } alt='avatar' width='400px'  />
        </label>
       <Input onChange={handleFileUpload} type='file' id='avatar' name="avatar" accept='.jpeg .png .jpg'/>
      </div>
      
    </Form.Item>
     <Button type="primary" htmlType="submit"  loading={newUsers}  > 
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
  );
};
export default Add;
