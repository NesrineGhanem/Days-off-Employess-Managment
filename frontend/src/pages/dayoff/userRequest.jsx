import React ,{useEffect,useState} from "react";
import Menus from "../../components/menu";
import {Row , Col, Button, Modal, notification } from "antd"
import DataDayoff from '../../components/dayoff/dataDayoff';
import jwtDecode from 'jwt-decode';
import { axiosInstance } from '../../api/globalApi';
import deleteRequests from './deleteRequest';
import { DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import UpdateDayoff from "../../components/dayoff/updateDayoff";

function UserRequest(){
    const [dayoffData, setDayoff] = useState([])
     const token = localStorage.getItem('token');
     const decodedToken = jwtDecode(token);
     const userId = decodedToken.userId;

     const id = userId; 
    useEffect(()=>{
      getData()
    },[])
    
    
 const getData = ()=>{
       axiosInstance.get(`daysOff/${id}`).then((response) => {
               console.log("response",response)
                setDayoff(response.data)
              })
            }
     const dataSourceRequests = dayoffData.map((item)=>({
         ...item,
         key : item._id
       }))

  //delete
  const onDeleteRequests=(record)=>{
    console.log('id',record._id)
    const id = record._id
    deleteRequests(id)
    return getData()
  };   

  

  
   //update
 const [isEditing, setIsEditing] = useState(false);
 const [editingUser, setEditingUser] = useState([])

 const  onEditRequests = async(record)=>{
   setEditingUser(record);
   setIsEditing(true)
   console.log('edit')

   }
    const resetEditing= ()=>{
      setIsEditing(false);
      setEditingUser(null)
  }
  const onOkEditing = async () => {
   const id = editingUser._id;
      console.log('id:', id);
    
   await axiosInstance.put(`daysOff/${id}`,
   {...editingUser,type:editingUser?.type,justificationSick:editingUser?.justificationSick} )
         .then((response) => {
           console.log('response edit:', response);

           console.log('editing user:', editingUser);
           return getData()
           })
         .catch((error) => {
           notification.error({
            placement: 'top',
            bottom: 50,
            duration: 2,
             message: error.data.message
          })

         });
 }
 const onEdit =(record)=>{
     setEditingUser(record)
 }
    return(
        <>
        <Row>
            <Col>
            <Menus/>
            </Col>
            <Col>
            <DataDayoff dataSourceDayoff={dataSourceRequests}
            onDeleteRequests={onDeleteRequests}
            onEditRequests={onEditRequests} 

             />
   
<Button onClick={()=>{}} style={{ color: "blue" , marginLeft:"30px"}}>
              <DeleteOutlined/>
              <Link to="/AddRequest" >Add Request</Link>
      </Button>

                
      <Modal
          title="Edit User"
          open={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing();
            setEditingUser([])
          }}
          onOk={() => {
            onOkEditing()
            resetEditing()
            setEditingUser([])
          }}
        >
          
      <UpdateDayoff
           startDay={editingUser?.startDay}
           endDay={editingUser?.endDay}
          type={editingUser?.type}
          justificationSick={editingUser?.justificationSick}
          change={onEditRequests}
          />   
         
</Modal>
            </Col>
        </Row>
        </>
    )
}
export default UserRequest;