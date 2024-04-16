import { Button, Result } from 'antd';
import { useNavigate } from "react-router-dom";

function Results(){
    const navigate = useNavigate();
   
    const handleLogout = async(e) => {
        e.preventDefault();
        localStorage.clear();
        navigate('/');
               
           
        } ;
    const onResut = async(e) =>{
        e.preventDefault();
        navigate('/forgot')
    }    
    
return(
<>

 <Result
    status="success"
    title="Successfully Purchased Cloud Server ECS!"
    subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
    extra={[
      <Button type="primary" key="console" onClick={handleLogout}  >
        Logout
      </Button>,
      
      <Button htmlType="button" className=" login-form-forgot" onClick={onResut}>
      Cancel
    </Button>
    ]}
  />
</>)
};


export default Results;