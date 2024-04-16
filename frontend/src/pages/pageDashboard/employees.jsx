import React, {  useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { axiosInstance } from '../../api/globalApi';
import { useNavigate,Link } from 'react-router-dom';
import { DeleteOutlined,AudioOutlined} from '@ant-design/icons';
import { Button, DatePicker, Modal, Input,message,notification,Row,Col} from 'antd';
import deleteUser from "../../historique/delete";
import Data from '../../components/data';
import Menus from "../../components/menu"
import FilterData from '../../components/filterData';
import UpdateUser from '../../components/update';

// filtrage
const { Search } = Input;
const suffix = (<AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff',
    }}
  />
);



function Employees() {

  const navigate = useNavigate()

  const [totalUsersData, setTotalUsers] = useState(null)

  const [usersData, setUsers] = useState([])
  //filter
  const [value, setValue] = useState('')
 
  //update
  const [postImage, setPostImage] = useState( '')
 
  useEffect(() => {
    getData()
   }, [])

const { RangePicker } = DatePicker;


  const token = localStorage.getItem('token')
  const decodedToken = jwtDecode(token)
  const admin = decodedToken.role


 const home = () => {
    navigate('/Da')
  }
 
//getAll
  const dateNow = new Date()
  const getData = ()=>{
    if (admin === 'Super Admin') {
      axiosInstance.get(`/users?page=1&limit=30&sortBy=createdAt&createdAtBefore=${dateNow}&createdAtAfter=2023-01-01`)
      .then((response) => {
        setUsers(response.data.users)
        setTotalUsers(response.data.totalItems)
        console.log('response',response)
      })
    }
  }

 const dataSourceUser = usersData.map((item)=>({
  ...item,
  key : item._id
 }))

 
  const handleOk = (filter) => {

  setUsers(filter)

  };


    const isActive = usersData.map((data) => data.isActive)
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const showModalAddUser = () => {
      setOpen(true);
    };
    // const handleOkAdd = () => {
    //   setConfirmLoading(true);
    //   setTimeout(() => {
    //     setOpen(false);
    //     setConfirmLoading(false);
    //   }, 2000);
    // };
    // const handleCancelAdd = () => {
    //   console.log('Clicked cancel button');
    //   setOpen(false);
    // };


    const data = usersData;
    const userId = decodedToken.userId;
    const id = userId;

//delete
  const onDeleteUser=(record)=>{
    console.log('id',record._id)
    const id = record._id
    deleteUser(id)
     getData()
  };

//toggle
 const onToggle = (record)=>{
  const id = record._id
  axiosInstance.patch(`/users/toggle-enable/${id}`)
  .then((response)=>{
        console.log('toggle response',response)
      message.success(response.data)
      return getData()
    })

  }

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

const usersFilter=(filter)=>{
   setTotalUsers(filter)
}
  return (

    <>
     <Row>
          <Col>
          <Menus/>
          </Col>
          <Col span={20}>

         
          <Row >
          <Col  >
            <FilterData filterUsers={handleOk}
             usersFilter={usersFilter}
            />
          </Col>
          <Col  style={{margin:"10px"}}>

    <Search
      placeholder="input search text"
      //filter
      value={value}
      
      // onChange={(e) => {
      //   const currValue = e.target.value;
      //   setValue(currValue);
      //   const filteredData= data.filter(entry =>
      //     entry.firstName.includes(currValue)
      //     //entry.isActive.includes(currValue)||
      //     //entry.LastName.includes(currValue)
      //     )
      //       setUsers(filteredData)
      // }}

      // const  handleFilter =(event)=>{
      //   const newData = usersData.filter(row=>{
      //     return `${row.firstName} ${row.lastName} ${row.email}
      //     .toLowerCase().includes(event.target.value.toLowerCase())`
      //   })
      //   setUsers(newData)
      //   }

         onChange={(e) => {
         const currValue = e.target.value;
         setValue(currValue);
         const filteredData= data.filter(entry =>
          ` ${entry.firstName}`.includes(currValue) 
           ` ${entry.LastName}`.includes(currValue)
            `${entry.email}`.includes(currValue)
           )
            setUsers(filteredData)
      }}

      style={{
        width: 900,
        marginLeft:200
      }}
    />



       <Data
    dataSourceEmployees={dataSourceUser}
    onToggle={onToggle}
    onDeleteUser={onDeleteUser}
    onEditUser={onEditUser}
    totalUsersData ={totalUsersData}
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
          role={editingUser?.role}
          building={editingUser?.building}
          change={onEditUser}
          /> 
         
</Modal>  

      <Button onClick={()=>{}} style={{ color: "blue" , marginLeft:"30px"}}>
              <DeleteOutlined/>
              <Link to="/Add" >Add</Link>
      </Button>
          </Col>
          </Row>
          </Col>
      </Row>
</>
  );
}

export default Employees;