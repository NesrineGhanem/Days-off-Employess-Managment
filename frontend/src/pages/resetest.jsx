
import React, { useState, useEffect} from 'react';
import { Button, Form, Input,message,Space } from 'antd';
import { LockOutlined} from '@ant-design/icons';
import { useNavigate, useParams , Link } from 'react-router-dom';
import { resetPassword } from '../context/action';

const onFinish = (values) => {
  console.log('Success:', values);
};


const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

function Reset ()  {
   
    const [password, setPassword] = useState([]);
    const [confirmPassword, setConfirmPassword] = useState([]);
    
    //const [errmessage,setMessage] = useState([]);
    const [setMessage] = useState([]);
    //const {token} = useParams();
    const tokenURL = useParams();
    const navigate = useNavigate()

 /*const handleSubmit =async (event) => {
    event.preventDefault();
    let token = tokenURL.token
    if( password !== confirmPassword) {
        //continue script
        //await axiosInstance.patch('/auth/requestResetPassword',  {
         //    password: password,
         //    token : token, })
         await resetPassword({password,token,confirmPassword})
        .then((res)=>{
            if(res.status === 200) {
                
                message.success('login success')
                
               
                setMessage(true)
                navigate('/Results')
            }
        }) 
    }
     else{
        navigate("*")
        message.error('reset failed')
      
    }
     }*/
    
     const handleSubmit = async(e) => {
      e.preventDefault();
      let token = tokenURL.token
      await resetPassword({password, confirmPassword,token})
      if(password !== confirmPassword) {
        
            message.success('login success');
            setMessage(true);
            //navigate('/Results')
      }else return navigate('/*')
  }

  useEffect(() => {
     const event = (e) =>{

       e.preventDefault();
          handleSubmit();
          //navigate('/Results')
      }
  }, [])

  const handleLogout = () => {
    
    localStorage.clear();
    navigate('/');
           
       
    } ;
const onResut = () =>{
    navigate('/forgot')
} 
  return (
  <>
 
 
  
  <div className="ant-row" style= {{height: "50vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
  <div className="ant-col ant-col-xs-20 ant-col-sm-16 ant-col-md-12 ant-col-lg-8 ant-col-xl-6">
  <h1>Please entre your new password</h1>
  <p className='para'>Your new password must be different from previous used password</p>
  <Form onSubmit={handleSubmit}
    
    style={{ width: 400 }}
    layout="vertical"
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
   
    <Form.Item
      label="New Password"
      name="New password"
      rules={[{ required: true },
        {min:3}
     
    ]}
    hasFeedback
    >
      <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} onChange={(e) => { setPassword(e.target.value) }} placeholder="Enter your new password"  value={password}/>
    </Form.Item>
    <Form.Item
      label="Confirm Password"
      name="Confirm password"
      dependencies={['New password']}
      rules={[{ required: true},
      ({getFieldValue})=>({
        validator(_,value){
          if(!value || getFieldValue('New password') === value) {
            return Promise.resolve()
          }
          return Promise.reject("The two passwords that you entered does not match! ")
        }
       })
      ]}
      hasFeedback
    >
      <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} onChange={(e) => { setConfirmPassword(e.target.value) }} placeholder="Enter your confirm password"  value={confirmPassword}/>
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit" onClick={handleSubmit}>
      <Link to="/Results">Confirm</Link>
      </Button>
      
      
      
    </Form.Item>  
   
    <Form.Item>
      <Space direction='horizontal' size={400}>
      <Button type="primary" htmlType="submit" onClick={handleLogout}>
      Logout

      </Button>
      
      <Button htmlType="button" className=" login-form-forgot" onClick={onResut}>
        Cancel
      </Button>
      </Space>
    </Form.Item>    
  </Form>
  
  </div>
 
  </div>
  </>
  )
};

export default Reset;
