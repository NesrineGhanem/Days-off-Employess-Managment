import React from "react";
import {Button, Modal,Popconfirm,Space,message} from "antd";
import { axiosInstance } from "../../api/globalApi";
import { DeleteOutlined } from "@ant-design/icons";

const deleteAllRequests = async ()=>{
  
                 
await axiosInstance.delete  (`daysOff`)
.then((response)=>{
message.success(response.data.message)
                    
}).catch((error)=>{
message.error(error.data.message)
})

}
export default deleteAllRequests;