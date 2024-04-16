import React, { useState} from 'react';
import { Button, Form, Input, notification, Space } from 'antd';
import { MailOutlined , UserOutlined} from '@ant-design/icons';
import { AuthUserContext } from "../context/authContext";
import { useNavigate} from "react-router-dom";
import {forgotPassword} from "../context/action"


function Forgot ()  {
  
  const { email, setEmail, setLogged} = AuthUserContext();
  const [errmessage,setMessage] = useState('');
  const navigate = useNavigate()
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(email !== "" ) {
        //continue script
       // await axiosInstance.post('/auth/forgotPassword',  {
        //  email: email})
         await forgotPassword({email})
        .then((res)=>{
            if(res.status === 200) {

                notification.open({
                message:<div style={{color:'green', textAlign:'center'}}>
                    <MailOutlined style={{fontSize:'30px',textAlign:'center'}}/>
                    <br/>
                     Please check your mail
                     </div>,
                description:'We have sent a link of reset password to your email'     
                 
               })
               setLogged(true)
               setEmail('')
               setMessage(true)
               navigate('/')
               
               
            }
        }) 
    } else{
        notification.open({
            message:<div style={{color:'red', textAlign:'center'}}>
                <MailOutlined style={{fontSize:'30px',textAlign:'center'}}/>
                <br/>
                 Please check your mail false
                 </div>,
            description:'We have sent a link of reset password to your email'     
             
           })
           navigate('/*')
       
    }
    
  };
  const onReset = () => {
    navigate('/')
  };
  return (
  <>
  <Form style={{position: 'relative'  ,marginLeft:"300px"}}>
  <h1>forgot your password</h1>
  <MailOutlined style={{position:'relative', top:'90px' ,left:'50px',fontSize:'30px',color:'gray', backgroundColor:"#e5e5e5"}}/>
  <div className='reset' style={{border:'1px solid gray',padding:'50px',height:'220px',width:'50%'}}>
  <p style={{marginLeft:'100px'}} >Please enter your email to send you a password reset link.</p>

  <Form.Item
      label="Email"
      name="email"

      rules={[{ required: true, message: 'Please input your email!' }]}
    >
      <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Enter your email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
    </Form.Item>
    
    <Form.Item>
      <Space direction='horizontal' size={400}>
      <Button type="primary" htmlType="submit" onClick={handleSubmit}>
        Send link via Email
      </Button>
      
      <Button htmlType="button" className=" login-form-forgot" onClick={onReset}>
        Cancel
      </Button>
      </Space>
    </Form.Item>  
    
    </div>      
  </Form>
  {errmessage  && <p>password reset link send succsfully in your email</p>}
  
  
  </>
  )
};

export default Forgot;