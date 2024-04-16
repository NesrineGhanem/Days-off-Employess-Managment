import React, { useState } from "react";
import {Form,Input,Select,Avatar} from "antd";
import jwtDecode from "jwt-decode";
import TextArea from "antd/es/input/TextArea";


 function DecisionDayoff({status,change,justification,setStatus,setJustification}) {
    
   
//       console.log("base",postImage)
       const [form] =Form.useForm()
       const token = localStorage.getItem('token')
       const decodedToken = jwtDecode(token)
       const id = decodedToken.userId

     //console.log("role", Role) 
      //console.log('justif dirc', decisionDirector[justification]) 
     // console.log('stat dirc', decisionDirector[status]) 
    //  console.log('building',building)
    
    

    return(
        <>
          
        <Form   form={form}>
            <Form.Item label="justification" >
            <TextArea rows={4}  
        
            onChange={(e) => {
                setJustification (e.target.value)  
                }
            }
              
          />
          </Form.Item>
         
   <Form.Item label="Status" >
        <Select 
        onChange={(e)=>{
            setStatus(e)
        }}

        options={
            [
                { value:"true",
            label:"true",
           },
           { value:"false",
           label:"false",
          }
    ]}
    />
    </Form.Item>
     </Form>
       </>
    )
 }
  export default DecisionDayoff;