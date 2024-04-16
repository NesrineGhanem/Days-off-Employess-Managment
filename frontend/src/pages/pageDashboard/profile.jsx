
import React ,{useEffect,useState}from "react";
import { Button, Table,Input,Space,Row,Col,Avatar,notification} from "antd";
import {UserOutlined} from '@ant-design/icons';

import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { axiosInstance } from "../../api/globalApi";
import {setAuthToekn,isAuthenticated} from "../../context/action";
import Menus from "../../components/menu";
import Data from "../../components/data";
import UpdateUser from "../../components/update";
import Modal from "antd/es/modal/Modal";

 function Profile () {
  //  const columns =[
  //    {
  //      key:'1',
  //      title:"avatar",
  //     dataIndex:"avatar",
  //     aligin:"center",
  //     render:(avatar) =>{return(avatar) ?<Avatar src={avatar} size={{xs: 24,
  //       sm: 32,md: 40,lg: 64,xl: 70,xxl: 80,}}/>: <Avatar
  //       size={{ xs: 24, sm: 32,md: 40, lg: 64, xl: 70,xxl: 80,
  //        }} icon={<UserOutlined />} />}
  //   },
  //   {
  //       key:'2',
  //       title:'firstName',
  //       dataIndex: 'firstName'
  //   },
  //   {
  //       key:'3',
  //       title:'LastName',
  //       dataIndex: 'LastName'
  //   },

  //    {
  //      key: '4',
  //      title: 'Email',
  //      dataIndex: 'email'
  //    },
  //    {
  //      key: '5',
  //      title: 'Role',
  //      dataIndex: 'role'
  //   },
  //   {
  //      key: '6',
  //      title: 'Building',
  //      dataIndex: 'building'
  //    },
  //    {
  //      key: '7',
  //      title: 'Phone',
  //      dataIndex: 'phone'
  //   },
  //   {
  //     key: '8',
  //     title: 'Days Off',
  //      dataIndex: 'soldeDays'
  //    }
  //    ,
  //    {
  //     key: '9',
  //     title: 'Status',
  //     dataIndex : 'isActive'

  //    },
  //  ]
  const navigate = useNavigate();

  const [usersData,setUsers] = useState([]);
  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.userId;
  const id = userId;
    useEffect(() => {
 
     getData()
    }, [])
  // useEffect(()=>{
  //   if(token) {
  //     setAuthToekn(token)

  //     //console.log('token')
  //     axiosInstance.get(`users/${id}`).then((response) => {
  //       //console.log('response', response.data)
  //       setUsers(response.data)
  //     })
  //   }
  // }
  // )
 
   const [postImage, setPostImage] = useState( '')
 
    const dateNow = new Date()
   const data = usersData;
   const getData = ()=>{
    if(isAuthenticated) {
           setAuthToekn(token)
           console.log('token',token)
           axiosInstance.get(`users/${id}`).then((response) => {
             //console.log('response', response.data)
            setUsers(response.data)
           })
         }
    
    
   }

   
   const dataSourceUser = usersData.map((item)=>({
    ...item,
    key : item._id
   }))

   //update
 const [isEditing, setIsEditing] = useState(false);
 const [editingUser, setEditingUser] = useState([])
 const onEditUser=(record)=>{
  setIsEditing(true);
  setEditingUser(record)
  }
    const resetEditing=()=>{
      setIsEditing(false);
      setEditingUser(null)
  }
  const onOkEditing = async () => {
   const id = editingUser._id;
      console.log('id:', id);
    console.log('postImage',postImage)
   await axiosInstance.put(`users/${id}`,
   {...editingUser,avatar:postImage||editingUser?.avatar||''} )
         .then((response) => {
           console.log('response edit:', response);

            notification.success({
            placement: 'top',
             bottom: 50,
             duration: 2,
              message: response.data.message
          })
          setPostImage('')

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
    return(
        <>
        <Row>
          <Col>
          <Menus/>
          </Col>
          <Col style={{marginRight:9}}> 
        
        
         <Space style={{marginButtom:16}} > 
          <Button onClick>home</Button>
        </Space>
         
         <Data
    dataSourceEmployees={dataSourceUser}
    onEditUser={onEditUser}
     />


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
          
    <UpdateUser
          avatar={editingUser?.avatar}
          firstName={editingUser?.firstName}
          LastName={editingUser?.LastName}
          email={editingUser?.email}
          change={onEditUser}
          /> 
         
</Modal>

        </Col>
        </Row>
        </>
    )
 } export default Profile

