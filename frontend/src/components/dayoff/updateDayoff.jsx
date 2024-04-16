import React from "react";
import {DatePicker, Form,Input,Select} from "antd";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";

 function UpdateDayoff({justificationSick,change,type,startDay,endDay}) {

       const {RangePicker} = DatePicker
       const [form] =Form.useForm()
       const token = localStorage.getItem('token')
       const decodedToken = jwtDecode(token)
       const Role = decodedToken.role
console.log('type',type)
console.log('just',justificationSick)
const onChange = (value, dateString) => {
  change((pre)=>{
    return {...pre,startDay:dateString[0], endDay:dateString[1]}
  })
};

const dateFormat ="YYYY/MM/DD"
    return(
        <>
          
        <Form   form={form}>
        <Form.Item> 
           <RangePicker
        format="YYYY-MM-DD"
        onChange={onChange}
        defaultValue={[dayjs(startDay,dateFormat),dayjs(endDay,dateFormat)]} 
         
        style={{ width: '100%' }}
      />
          </Form.Item> 
         
          <Form.Item label="justificationSick" >
          <Input
            value={justificationSick}
            onChange={(e) => {
              change((pre) => {
                return { ...pre, justificationSick: e.target.value };
              });
            }}
          />
          </Form.Item>

      

        <Form.Item label="type" >
        <Select 
        value={type}
        onChange={(value) => {
          change((pre) => {
            return { ...pre, type: value };
          });
        }}
        options={
            [
          { value:"Paid",
            label:"Paid",
           },
           { value:"Unpaid",
           label:"Unpaid",
          },
          { value:"Sick",
          label:"Sick",
         }
    ]
    }
        />
        

        
        </Form.Item>

        

        </Form>
        
        
         
        </>
    )
 }
  export default UpdateDayoff;