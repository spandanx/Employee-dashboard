import React, { Component, useEffect } from 'react';
import {Link, useNavigate} from "react-router-dom";
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { MdAccountCircle, MdContentCopy } from "react-icons/md";
//import Notification from './Notification';
//<Notification/>

const TopNavBar =() => {
  
  const navigate = useNavigate();

  useEffect(()=>{
	console.log('username value change detected');
	console.log(window.localStorage.getItem("username"));
	if (window.localStorage.getItem("username")==''){
	   navigate('/login');
	}
  },[window.sessionStorage.getItem("username")]);
  
  const getToast = (msg, type) => {
	let structure = {
	position: "bottom-right",
	autoClose: 5000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	pauseOnFocusLoss: false,
	draggable: true,
	progress: undefined
	};
	if (type=="ERROR"){
	    return toast.error(msg, structure);
	}
	if (type=="SUCCESS"){
	    return toast.success(msg, structure);
	}
	return toast.info(msg, structure);
  }

  const logout = async() => {
    window.localStorage.setItem("username", '');
    window.localStorage.setItem("role", '');
    getToast("Logged out", "SUCCESS");
    navigate('/login');
  }

    return (
      <ul class="nav justify-content-between">
      <li class="nav-item">
        <a class="nav-link active">E-Dashboard</a>
        <ToastContainer/>
      </li>
      <li class="nav-item">
	{(window.localStorage.getItem("username")!='' && window.localStorage.getItem("role")!='') &&
        <div class="btn-group">
          <a type="button" class="nav-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <MdAccountCircle color="blue" size="2em"/>
          </a>
          <div class="dropdown-menu dropdown-menu-right">
            <a class="dropdown-item fw-bold">Logged in as {window.localStorage.getItem("username")}</a>
            <div class="dropdown-divider"></div>
	    <a class="nav-link active btn col-md-5 align-content-center" onClick={logout}>Logout</a>
          </div>
        </div>
	}
      </li>
    </ul>
    );
}

export default TopNavBar;
