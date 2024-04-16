
import React, { Component, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { axiosInstance } from '../../api/globalApi';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import {
  Form, Radio, Space, Switch,
  Table, Card, Button, DatePicker,
  Modal, Select, Input,
  Tabs,
  Cascader,
  InputNumber,
  TreeSelect,
  Badge,
  Tag,Row,Col
} from 'antd';
import Menus from '../../components/menu';
import DataDayoff from '../../components/dayoff/dataDayoff';
import {setAuthToekn,isAuthenticated} from "../../context/action"
function Requests() {
  const [dayoffData, setDayoff] = useState([])

useEffect(()=>{
  getData()
},[])



 const token = localStorage.getItem('token');
 const decodedToken = jwtDecode(token);
 const userId = decodedToken.userId;
 const id = userId;

 const getData = ()=>{
   if(isAuthenticated) {
          setAuthToekn(token)
         console.log('token',token)
          axiosInstance.get(`daysOff/${id}`).then((response) => {
           console.log("response",response.data)
            setDayoff(response.data)
          })
        }}

const dataSourceRequests = dayoffData.map((item)=>({
          ...item,
          key : item._id
         }))

  
  return (
    <>
    <Row>
      <Col>
      <Menus/>
      </Col>
      <Col>
      <DataDayoff
    dataSourceDayoff={dataSourceRequests}
    
 />
      </Col>
    </Row>
    </>
   );
}


export default Requests;