import React from "react";

import {  Layout, Typography} from 'antd';
const { Footer } = Layout;
 function Footerpage () {
    return(
        <>
         <Footer
          style={{
            textAlign: 'center',
          }}
        >
            
          <Typography.Link href='tel:+123456789' target={"_blank"}>+123456789</Typography.Link>
          <br/>
          <Typography.Link href='http://google.com' target={"_blank"}>Team of use</Typography.Link>
           
        </Footer>
        </>
    )
 }
 export default Footerpage;