import React from "react";
import {Modal,message} from "antd";
import { axiosInstance } from "../api/globalApi";

const deleteUser = (id)=>{
 axiosInstance.delete  (`users/${id}`)
 .then((response)=>{
   message.success(response.data.message)

 }).catch((error)=>{
   message.error(error.data.message)
 })
}
export default deleteUser;
   //  Modal.confirm({
   //      title:'Are you sure, you want to delete this user',
   //     okText: "Yes",
   //      okType:"danger",
   //    onOk:()=>{
   //       axiosInstance.delete(`users/${removeId}`)
   //        .then((response) => {
   //          console.log('response', response.data)
   //          message.success("L'utilisateur a été supprimé avec succès !");
 
           
   //      })
             
           
   //         .catch((err) => {
   //            message.error(`Erreur lors de la suppression de l'utilisateur : ${err.message}`);
   //          });
        
         
   //  }
   //  })

