import { notification } from 'antd';
import { axiosInstance } from "../api/globalApi";
import axios from "axios";

export const isAuthenticated = async () => {
	const user = localStorage.getItem('currentUser');
	if (!user) {
		return {}
	}
	return JSON.parse(user);
};

export const loginUser = async (loginPayload) => {
	const requestOptions = {
	  method: 'POST',
	  headers: { 'Content-Type': 'application/json' },
	  data: loginPayload,
	};
	try {
	  let response = await axiosInstance('/auth/login', requestOptions)
	  let data = response
	  if (data) {
		let { token, RefreshToken } = response.data
		let user = JSON.stringify(data)
		localStorage.setItem('currentUser', user);
		localStorage.setItem('token', token);
	    localStorage.setItem('RefreshToken', RefreshToken);
		return data
	  }
	  return data;
	} catch (error) {
	  notification.error({
		placement: 'top',
		bottom: 50,
		duration: 1,
		message: error.response.data.error
	  })
	}
  }

  export  const forgotPassword = async(forgotPayload) => {
	const requestOptions = {
	  method: 'POST',
	  data: forgotPayload
	};
	try{
	  let response = await axiosInstance('/auth/forgotPassword', requestOptions)
	  let data = response
	  if(data) {
		return data
	  }
	}catch(error){
	  notification.error({
		placement: 'top',
		bottom: 50,
		duration: 1,
		message: error.response.data.error
	  })
	}
  
  }

  export  const resetPassword = async (forgotPayload) => {
	const requestOptions = {
	  method: 'PATCH',
	  headers: { 'Content-Type': 'application/json' },
	  data: forgotPayload,
	};
	try {
  
	  let response = await axiosInstance('/auth/requestResetPassword', requestOptions)
  
  
	  let data = response
	  if (data) {
		let userData = JSON.stringify(data)
		return userData
  
	  }
	} catch (error) {
	  console.log({ error: 'Can not change the password !' });
	}
  }


  export const setAuthToekn = token => {
	if(token) {
		axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

	} else{
		delete axios.defaults.headers.common["Authorization"]
	}
  }



 /* export  const getAll = async(getAllPayload) => {
	const requestOptions = {
	  method: 'GET',
	  data: getAllPayload
	};
	try{
	  let response = await axiosInstance('/users', requestOptions)
	  let data = response
	  if(data) {
		return data
	  }
	}catch(error){
	  notification.error({
		placement: 'top',
		bottom: 50,
		duration: 1,
		message: error.response.data.error
	  })
	}
  
  }*/


   export  const getAll = async(authHeader) => {
	const requestOptions = {
	  method: 'GET',
	  data: authHeader
	};
	try{
	  let response = await axiosInstance('/users', requestOptions)
	  let data = response
	  if(data) {
		return data
	  }
	}catch(error){
	  notification.error({
		placement: 'top',
		bottom: 50,
		duration: 1,
		message: error.response.data.error
	  })
	}
  
  }


