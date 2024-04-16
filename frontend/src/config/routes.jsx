
import Da from '../pages/da';
import Home from '../pages/home'
import Login from '../pages/logingbt'
import Forgot from '../pages/forgot';
import Reset from '../pages/resetest';
import Logout from "../pages/logout";
import Results from "../pages/result";
import Employees from "../pages/pageDashboard/employees";
import Profile from "../pages/pageDashboard/profile";
import Requests from "../pages/dayoff/requests";
import Add from '../pages/pageDashboard/addUser';
import Notification from "../pages/pageDashboard/notification";
import UserRequest from "../pages/dayoff/userRequest";
import AddRequest from "../pages/dayoff/addRequest"
import deleteAllRequests from '../pages/dayoff/deleteAllRequest';
const routes =[
    {
        path:'/',
        element: Login ,
        routeKey: 'login'
      },
    {
      path:'/Home',
      element: Home ,
      routeKey: 'home'
    },
    {
      path:'/Da',
      element: Da ,
      routeKey: 'da'
    },
    {
      path:'/forgot',
      element: Forgot  ,
      routeKey: 'forgot'
    },
    {
      path:'/auth/requestResetPassword/:id/:token',
      element:  Reset ,
      routeKey: 'reset'
    },
     {
      path:'/Logout',
      element:  Logout  ,
      routeKey: 'logout'
    },
    {
      path:'/Results',
      element:  Results ,
      routeKey: 'results'
    },
    {
        path:'/Employees',
        element:  Employees  ,
        routeKey: 'employees'
      },
      {
        path:'/user/:id',
        element:  Profile  ,
        routeKey: 'profile'
      },  
     
      {
        path:'/Add',
        element:  Add  ,
        routeKey: 'add'
      },
     
      {
        path:'/Notification',
        element:  Notification  ,
        routeKey: 'notification'
      },
      {
        path:'/Requests',
        element:  Requests  ,
        routeKey: 'requests'
      },
      {
        path:'/UserRequest/:id',
        element:  UserRequest  ,
        routeKey: 'UserRequest'
      },
      {
        path:'/AddRequest',
        element:  AddRequest  ,
        routeKey: 'AddRequest'
      },
      {
        path:'/deleteAllRequests',
        element:  deleteAllRequests ,
        routeKey: 'deleteAllRequests'
      }
        
  ]
export default routes;
  
