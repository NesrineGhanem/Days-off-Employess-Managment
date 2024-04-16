import React from "react";
import {Modal,message} from "antd";
import { axiosInstance } from "../../api/globalApi";

const deleteRequests = (id)=>{
 axiosInstance.delete  (`daysOff/${id}`)
 .then((response)=>{
   message.success(response.data.message)
   
 }).catch((error)=>{
   message.error(error.data.message)
 })
}
export default deleteRequests;