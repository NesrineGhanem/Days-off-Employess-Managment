import React from "react";
import { useNavigate } from "react-router-dom";
import {   notification ,Alert,Space,Button} from 'antd';

function Logout (){
    const navigate = useNavigate();
   
    const handleLogout = async(e) => {
        e.preventDefault();
        localStorage.clear();
        navigate('/');
               
            notification.open({
             message:<div style={{color:'green', textAlign:'center'}}>
                  <br/>
                  User logout
                  </div>,
             placement: 'top' ,
             bottom: 50   
                  
              
            })
        
    }    
    return(
        <>
        
          <Alert
          style={{
            width: '30%',
            marginLeft:'500PX',
            marginTop:'130px',
            textAlign: 'center'
        
          }}
      message="Success Tips"
      description="loyout"
      type="success"
      layout="vertical"
      showIcon
      action={
        <Space align="end" direction="horizontal">
        <Button  onClick={handleLogout} 
        size="small" type="text"
         style={{color:"#8bc34a" , fontSize:"20px" ,backgroundColor:"#E5E5E5" ,marginTop:"50PX",marginRight:'150px', textAlign: 'center'}}>
         sigup 
        </Button>
        </Space> 
        
    }
    />
       
        </>
    )
}export default Logout;





