
// import { UserOutlined } from '@ant-design/icons';
// import { Avatar, Button,Input } from 'antd';
// import Upload from 'antd/es/upload/Upload';
// import React, { useState }  from 'react';
// import { axiosInstance } from '../../api/globalApi';

// function Notification () {
//   const [image,setImage] = useState('')
//    function coverToBase64(e) {
//     console.log(e);
//     var reader = new FileReader();
//     reader.readAsDataURL(e.target.files[0]);
//     reader.onload= () =>{
//       console.log(reader.result);
//       setImage(reader.result)
//     };
//     reader.onerror = error => {
//       console.log("error",error)
//     }
//    }


//    function uploadImage(){
//     axiosInstance.post(`/users/profile-photo`)
//     constJSON.stringify({
//       basee64:image
//     }).then((res)=>res.json()).then((data)=>console.log(data))
//    }
//     return(
//         <>
//         {/* <Avatar icon={<UserOutlined/>} size="500"/>
//          <Upload onClick={coverToBase64} >
//           <Button >Click to upload</Button>
//          </Upload> */}
//          <Input accept='image/' type='file' onChange={coverToBase64}></Input>
//          {image=="" || image==null?"" :<Avatar size="300" src={image}/>} 
//          <Button onClick={uploadImage}>Upload</Button> 
//         </>
//     )
//  }
//  export default Notification;
//import avatar from "../../../src/"




import { useEffect, useState } from 'react';

import {Button, Form, Input,Avatar,Upload} from "antd"

import axios from 'axios';
import { ImportOutlined ,UserOutlined  } from '@ant-design/icons';
import { json } from 'react-router-dom';
import FilterData from '../../components/filterData';

 const url = "http://localhost:5000/users/profile-photo"
 //const url = "http://localhost:5000/users"

function Notification() {
  
   const [postImage, setPostImage] = useState( { myFile : ""})
   //get
   const [allImage,setAllImage] = useState([])
   // const createPost = async (newImage) => {
   //   try{
   //     await axios.post(url, newImage)
      
  //   }catch(error){
   //     console.log(error)
   //   }
   // }

   const createPost = async () => {
     axios.post(url, {
    avatar: postImage
  }, {
   
  })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });
  }
 
  const handleSubmit = (e) => {
     e.preventDefault();
     createPost(postImage)
    console.log("Uploaded")
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    
    setPostImage({ ...postImage, myFile : base64 })
  
     console.log("base",base64) 
     
   }
//get
const  getImage=()=>{
 axios.get('/users/get_profile-photo')
 //.then((res) => res.json())
 .then((data)=>{console.log(data)
  setAllImage(data.myFile)
})
}
useEffect(()=>{
  getImage()
},[])
   return (
      <>

      <FilterData/>
      <Avatar src={postImage.myFile } icon ={<UserOutlined /> } />
       <Input
           type="file"
          lable="Image"
          name="myFile"
           onChange={(e) => handleFileUpload(e)}
           />

           <h3>Doris Wilder</h3>
          <span>Designer</span>
           <Button type='submit' onClick={handleSubmit}>Submit</Button> 
      
    {/* {allImage.map(data=>{
      return(
      <Avatar src={data.myFile }  />
      )
    })} */}

    </>


    //   <div className="App">
    //   <form onSubmit={handleSubmit}>

    //     <label htmlFor="file-upload" className='custom-file-upload'>
     //       <img src={postImage.myFile } alt="" />
     //     </label>

     //     <input 
     //       type="file"
     //       lable="Image"
     //       name="myFile"
     //       id='file-upload'
     //      accept='.jpeg, .png, .jpg'
    //       onChange={(e) => handleFileUpload(e)}
    //      />

    //      <h3>Doris Wilder</h3>
    //      <span>Designer</span>

    //      <button type='submit'>Submit</button>
    //   </form>
    // </div>
  )
 }

export default Notification


export function convertToBase64(file){
  return new Promise((resolve, reject) => {
     const fileReader = new FileReader();
     fileReader.readAsDataURL(file);
     fileReader.onload = () => {
       resolve(fileReader.result)
    };
    fileReader.onerror = (error) => {
     reject(error)
  }
  })
 }
 



