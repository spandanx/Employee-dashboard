import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';

const port = 8080;

const LoginComponent = () => {

    const navigate = useNavigate();

    const [username, setUsername]= useState('');
    const [password, setPassword]= useState('');
    const [validForm, setValidForm]= useState(false);

	useEffect(()=>{
		if (username && password){
			setValidForm(true);
		}
		else{
			setValidForm(false);
		}
	},[username, password]);

	useEffect(()=>{
		if (window.localStorage.getItem("username")!='' && window.localStorage.getItem("role")!=''){
			navigate('/dashboard');
		}
	},[]);

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

	const authenicate = async(event) => {
		//mode: 'no-cors',
		event.preventDefault();
		console.log("authenicate() called");
		fetch(`http://localhost:${port}/api/authenticate`, {
		    method: "GET",
		    headers: {
			username: username,
			password: password,
			Accept: "application/json",
			"Content-Type": "application/json"
		    },
		})
		.then(response => response.json())
		.then(data => {
			data = JSON.parse(data);
			if (data["status"]==true){
				console.log("SUCCESS");
				console.log(data);
				window.localStorage.setItem("username", username);
				window.localStorage.setItem("role", data["role"]);
				getToast("Logged in", "SUCCESS");
				goToDashboard();
			}
			else{
				console.log("INVALID");
				window.localStorage.setItem("username", "");
				window.localStorage.setItem("role", "");
				getToast("Invalid username or password", "ERROR");
			}
		})
		.catch((err)=>{console.log(err)});
	}

    const goToDashboard = () => {
        navigate("/dashboard");
    }

    return (
      <form class="form-horizontal container" role="form">
        <p class="text-center">Login</p>
        <div class="form-group row my-3">
          <div class="col-sm-11">
            <input type="text" class="form-control select2-offscreen" id="to" placeholder="Username" tabIndex="-1"
                value={username} 
                onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div class="col-sm-1">
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
              <button disabled={!validForm} class="btn btn-success mx-1 col-sm-11" onClick={(event)=>authenicate(event)}>Login</button>
	  <div class="col-sm-1">
          </div>
        </div>
	<div class="form-group row my-3 text-center">
		<span>Register <a class="text-info" style={{cursor: 'pointer'}} onClick={()=>{navigate('/register')}}> here</a></span>
        </div>
	</form>
    );
}

export default LoginComponent
