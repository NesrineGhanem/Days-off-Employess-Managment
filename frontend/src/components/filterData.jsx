import React ,{useState,useEffect}from "react";
import { axiosInstance } from '../api/globalApi';
import { useNavigate,Link } from 'react-router-dom';
import { Form,  Space, Button, DatePicker, Select, Input } from 'antd';
import Filter from "./filter";

function FilterData({filterUsers,usersFilter}){

  const [createdAtAfter, setCreatedAtAfter] = useState('')
  const [createdAtBefore, setCreatedAtBefore] = useState('')
  const [limit, setLimit] = useState(null)
  const [sortBy, setSortBy] = useState(null)

    const [componentSize, setComponentSize] = useState('default');
    const { RangePicker } = DatePicker;
    const dateNow = new Date()
    const navigate = useNavigate()
    const [totalUsers,setTotalUsers] =useState()
    const [usersData, setUsers] = useState([])
    const [form] = Form.useForm()
   useEffect(()=>{
    getData()
   },[])
          
    const getData = ()=>{
      
        axiosInstance.get(`/users?page=1&limit=30&sortBy=createdAt&createdAtBefore=${dateNow}&createdAtAfter=2023-01-01`).then((response) => {
          setUsers(response.data.users)
         
        }
        )
      
    }
 
  const handleOk = () => {
    
       axiosInstance.get(`/users?page=1&limit=${limit}&sortBy=${sortBy}&createdAtBefore=${createdAtBefore}&createdAtAfter=${createdAtAfter}`).then((response) => {
     console.log('respons', response.data);

     filterUsers(response.data.users)
     usersFilter(response.data.users.length)  
      }
      )
     console.log("handleok")
     console.log("limit",limit)
    };
const getList =()=>{
  
  return filterUsers(usersData)
  
}
const limitFilterUser =(limitUser)=>{
  setLimit(limitUser)

}
console.log("limitUser",limit)

const createdAtBeforeFilter =(befor) =>{
  setCreatedAtBefore(befor)
}
const CreatedAtAfter =(after) =>{
  setCreatedAtAfter(after)
}
const sortByFilter =(sort) =>{
  setSortBy(sort)
}

    return(
        <>
       <Filter
       getData={getData}
       getList={getList}
       
       handleOk={handleOk}
       setLimit={limitFilterUser}
       
       setCreatedAtBefore={createdAtBeforeFilter}
       setCreatedAtAfter={CreatedAtAfter}
       setSortBy={sortByFilter}
       />
      
      
      
        </>
    )
}
 export default FilterData;