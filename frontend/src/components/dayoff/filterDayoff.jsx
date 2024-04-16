import React ,{useState,useEffect}from "react";
import { axiosInstance } from '../../api/globalApi';
import { useNavigate,Link } from 'react-router-dom';
import { Form,  Space, Button, DatePicker, Select, Input } from 'antd';
import Filter from "../filter";

function FilterDayoff({filterRequests,dayoffFilter}){

  const [createdAtAfter, setCreatedAtAfter] = useState('')
  const [createdAtBefore, setCreatedAtBefore] = useState('')
  const [limit, setLimit] = useState(null)
  const [sortBy, setSortBy] = useState(null)

    const [componentSize, setComponentSize] = useState('default');
    const { RangePicker } = DatePicker;
    const dateNow = new Date()
    const navigate = useNavigate()
    const [totalDayOff,setTotalDayOff] =useState()
    const [dayoffData, setDayoff] = useState([])

    const [form] = Form.useForm()
   useEffect(()=>{
    getData()
   },[])
          
    const getData = ()=>{
      
        axiosInstance.get(`/daysOff?page=1&limit=30&sortBy=createdAt&createdAtBefore=${dateNow}&createdAtAfter=2023-01-01`).then((response) => {
          setDayoff(response.data.daysOffList)
        }
        )
      
    }
 
 
  
 
  const handleOk = () => {
    
      axiosInstance.get(`/daysOff?page=1&limit=${limit}&sortBy=${sortBy}&createdAtBefore=${createdAtBefore}&createdAtAfter=${createdAtAfter}`).then((response) => {
     console.log('respons', response.data);

     filterRequests(response.data.daysOffList)
     dayoffFilter(response.data.dayoffFilter.length)
   
     }
     )
    };
const getList =()=>{

  return filterRequests(dayoffData)
  
}

const limitFilterdayoff =(limitdayoff)=>{
  setLimit(limitdayoff)

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
       setLimit={limitFilterdayoff}
       
       setCreatedAtBefore={createdAtBeforeFilter}
       setCreatedAtAfter={CreatedAtAfter}
       setSortBy={sortByFilter}
      />
        
      
        </>
    )
}
 export default FilterDayoff;