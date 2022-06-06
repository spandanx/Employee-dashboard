import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import { TiTick } from "react-icons/ti";
import { BsExclamation } from "react-icons/bs";

const port = 8080;

const LoginComponent = () => {

    const navigate = useNavigate();

    const [username, setUsername]= useState('');
    const [password, setPassword]= useState('');
    const [repassword, setRePassword]= useState('');
    const [validForm, setValidForm]= useState(false);
    const [userNameError, setUserNameError]= useState('');

	useEffect(()=>{
		if (username && password && !userNameError && password==repassword){
			setValidForm(true);
		}
		else{
			setValidForm(false);
		}
	},[username, password, repassword, userNameError]);
	
	useEffect(()=>{
		if (username)
			checkIfexists();
		else
			setUserNameError("Empty");
	},[username]);


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
	const checkIfexists = async() => {
//		console.log("checkIfexists() called");
		fetch(`http://localhost:${port}/api/checkIfexists`, {
		    method: "GET",
		    headers: {
			username: username,
			Accept: "application/json",
			"Content-Type": "application/json"
		    }
		})
		.then(response => response.json())
		.then(data => {
			console.log(data);
			if (data=="true"){setUserNameError("Exists")}
			else {setUserNameError("")}
		})
		.catch((err)=>{
			console.log(err);
		});
	}
	const register = async(event) => {
		//mode: 'no-cors',
		event.preventDefault();
		getToast("Registering", "INFO");
		console.log("register() called");
		fetch(`http://localhost:${port}/api/user`, {
		    method: "POST",
		    headers: {
			Accept: "application/json",
			"Content-Type": "application/json"
		    },
		    body : JSON.stringify({
			username: username,
			password: password,
			role: 'user'
		    })
		})
		.then(response => {
			getToast("Registered", "SUCCESS");
			navigate('/login');			
		})
		.catch((err)=>{
			console.log(err);
			getToast(err, "ERROR");
		});
	}

    return (
      <form class="form-horizontal container" role="form">
        <p class="text-center">Register</p>
        <div class="form-group row my-3">
          <div class="col-sm-11">
            <input type="text" class="form-control select2-offscreen" id="to" placeholder="Username" tabIndex="-1"
                value={username} 
                onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div class="col-sm-1">
		{!userNameError && 
                    <div title={"Valid"} data-toggle="popover" data-trigger="hover" data-content="Some content"><TiTick color='green'/></div>
                  }
                  {userNameError && 
                    <div title={userNameError} data-toggle="popover" data-trigger="hover" data-content="Some content"><BsExclamation color='red'/></div>
                  }
          </div>
        </div>
	<div class="form-group row my-3">
          <div class="col-sm-11">
            <input type="password" class="form-control select2-offscreen" id="to" placeholder="Password" tabIndex="-1"
                value={password} 
                onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div class="col-sm-1">
          </div>
        </div>
	<div class="form-group row my-3">
          <div class="col-sm-11">
            <input type="password" class="form-control select2-offscreen" id="to" placeholder="Re enter password" tabIndex="-1"
                value={repassword} 
                onChange={(event) => setRePassword(event.target.value)}
            />
          </div>
          <div class="col-sm-1">
          </div>
        </div>
	<div class="form-group row my-3">
              <button disabled={!validForm} class="btn btn-success mx-1 col-sm-11" onClick={(event)=>register(event)}>Register</button>
	  <div class="col-sm-1">
          </div>
        </div>
	<div class="form-group row my-3 text-center">
		<span>Already have an account? <a class="text-info" style={{cursor: 'pointer'}} onClick={()=>{navigate('/login')}}> click here</a></span>
        </div>
	</form>
    );
}

export default LoginComponent
