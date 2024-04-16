import React from "react";
import {Form,Input,Select,Avatar} from "antd";
import jwtDecode from "jwt-decode";
import { convertToBase64 } from "./convertImage";
import { Option } from 'antd/es/mentions';
import fileDefault from '../assets/avatar-01.jpg'

 function UpdateUser({firstName,LastName,email,role,building,change,avatar}) {

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        change((pre) =>{
            return{...pre, avatar:base64||avatar||''}
        })
       }
//       console.log("base",postImage)
       const [form] =Form.useForm()
       const token = localStorage.getItem('token')
       const decodedToken = jwtDecode(token)
       const Role = decodedToken.role

     console.log("role", Role) 
     console.log('role', role) 
     console.log('building',building)
    return(
        <>
         {Role === "Super Admin" ?  
        <Form   form={form}>
            <Form.Item label="firstName" >
          <Input
            value={firstName}
            onChange={(e) => {
              change((pre) => {
                return { ...pre, firstName: e.target.value };
              });
            }}
          />
          </Form.Item>
          <Form.Item label="lastName" >
           <Input
            value={LastName}
            onChange={(e) => {
              change((pre) => {
                return { ...pre, LastName: e.target.value };
              });
            }}
          />
          </Form.Item>
          <Form.Item label="email" >
          <Input
            value={email}
            onChange={(e) => {
              change((pre) => {
                return { ...pre, email: e.target.value };
              });
            }}
          />
          </Form.Item>

       <Form.Item label="avatar" >
      <div>
        <label htmlFor='avatar'>
         <Avatar src={"" ||  avatar || fileDefault } alt='avatar' width='400px'  />
        </label>
       <Input
       onChange={handleFileUpload}
         return
          type='file' id='avatar' name="avatar" accept='.jpeg .png .jpg'/>
      </div>
      </Form.Item>

        <Form.Item label="role" >
        <Select placeholder="Software Engineer"
        value={role}
        onChange={(value) => {
          change((pre) => {
            return { ...pre, role: value };
          });
        }}
        options={
            [
                { value:"Director",
            label:"Director",
           },
           { value:"Administration Director",
           label:"Administration Director",
          },
          { value:"Administration Assistant",
          label:"Administration Assistant",
         },
         { value:"Team Manager",
         label:"Team Manager",
        },
         { value:"Software Engineer",
           label:"Software Engineer",
          },
    ]
    }
        />
          {/* <Option value="Super Admin">Super Admin</Option>
          <Option value="Director">Director</Option>
          <Option value="Administration Director">Administration Director</Option>
          <Option value="Administration Assistant">Administration Assistant</Option>
          <Option value="Team Manager">Team Manager</Option>
          <Option value="Software Engineer">Software Engineer</Option> */}

        
        </Form.Item>

         <Form.Item label="building"  >
        <Select placeholder="Front-End"
        value={building}
        onChange={(value) => {
          change((pre) => {
            return { ...pre, building: value };
          });
        }}
        options={[
            {
                value:"Front-End",
                label:"Front-End"
            },
            {
                value:"Back-End",
                label:"Back-End"
            },
              {
                value:"Full-Stack",
                label:"Full-Stack"
            },
        ]}
        />
        
        
        
        </Form.Item>  

        </Form>
         :
        <Form>
             <Form.Item label="firstName" >
           <Input
            value={firstName}
            onChange={(e) => {
              change((pre) => {
                return { ...pre, firstName: e.target.value };
              });
            }}
          />
          </Form.Item>

          <Form.Item label="lastName" >
           <Input
            value={LastName}
            onChange={(e) => {
              change((pre) => {
                return { ...pre, LastName: e.target.value };
              });
            }}
          />
          </Form.Item>
          <Form.Item label="email" >
          <Input
            value={email}
            onChange={(e) => {
              change((pre) => {
                return { ...pre, email: e.target.value };
              });
            }}
          /> 
          </Form.Item>
        </Form>
        } 
         
        </>
    )
 }
  export default UpdateUser;