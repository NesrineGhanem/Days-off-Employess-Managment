import React from "react";
import {  Route, Routes} from "react-router-dom";

import routes from "./config/routes";


function App() {
    return(
      
     
      <Routes>
      {routes.map(({element: Element , path, routeKey}) => 
      <Route 
      key={routeKey} 
      element={<Element />} 
      path={path} />
      )
      }
      
      <Route element={<i>Page not found - 404</i>} path="*"/>
    </Routes>
       
    )
 } export default App;

