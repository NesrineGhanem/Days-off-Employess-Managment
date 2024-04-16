import React from 'react';
import {AuthUserContext} from "../context/authContext"
import { Button, Checkbox, Form, Input, message } from 'antd';
import {  Link, useNavigate} from "react-router-dom";
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import jwt from 'jwt-decode';
import {loginUser} from '../context/action'

const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

function Login ()  {
  
    
    const { email, setEmail, password, setPassword , setLogged} = AuthUserContext();

    const navigate = useNavigate()

  const handleSubmit = async(event) => {
    event.preventDefault();
    
    // Submit the username and password to the server for authentication
   if(email !== "" && password !== "") {
        //continue script
        await loginUser({ email, password })
       /* await axiosInstance.post('/auth/login',  {
            email: email,
            password: password,}
         
          )*/
        .then((res)=>{
            if(res.status === 200) {
                
                message.success('login success')
                setLogged(true)
                navigate('/Da')
            }
            const token = res.data.token
            const decoded = jwt(token)
            if(decoded.role === "Super Admin") {
              setTimeout(() => {
                navigate('/Da')

            }, 1000);
            }
        }) 
    }
     else{
        message.error('login failed')
        navigate('/*')
      
    }
   
  
     };
    
     
  return (
  <>
  <div className="ant-row" style= {{height: "50vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
  <div className="ant-col ant-col-xs-20 ant-col-sm-16 ant-col-md-12 ant-col-lg-8 ant-col-xl-6">
  
  <h1>Welcome back</h1>
  <p className='para'>Welcome back ! Please enter your details</p>
  <Form onSubmit={handleSubmit}
    
    style={{ width: 400 }}
    layout="vertical"
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  ><Form.Item
      label="Email"
      name="email"
      //rules={[{ required: true, message: 'Please input your email!' }]}
      rules={[
        {
          required: true,
          message:'Please enter your email'
        },
        {
          min: 3
        },
        {
          type: 'email',
          message:'Please enter a valid email!'
        },
        {whitespace: true}
      ]}
      hasFeedback
    >
      <Input prefix={<UserOutlined className="site-form-item-icon" />}  placeholder="Enter your email"value={email} onChange={(e) => { setEmail(e.target.value) }} />
    </Form.Item>
    

    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true,
          },
          {min:3},
        ]}
        hasFeedback
    >
      <Input.Password  prefix={<LockOutlined className="site-form-item-icon" />} value={password}  onChange={(e) => { setPassword(e.target.value) }} />
    </Form.Item>
    <Form.Item>
      <Checkbox>Remember me
        <Link to="/forgot" >Forgot Password</Link>
      </Checkbox>
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit" onClick={handleSubmit}>
        Sign In
      </Button>
    </Form.Item>        
  </Form>
   
  </div>
  </div>
  </>
  )
};

export default Login;