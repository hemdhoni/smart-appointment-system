import {useState} from "react";
import API from "../api/axios";
import {useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";

function Login(){

const navigate=useNavigate();

const[email,setEmail]=useState("");

const[password,setPassword]=useState("");

const login = async () => {
  try {
    const res = await API.post("/auth/login", {
      email,
      password,
    });

    localStorage.setItem("token", res.data.token);

    navigate("/dashboard");
  } catch (err) {
    alert(err.response?.data?.message || "Login Failed");
  }
};

return(

<div>

<h2>Login</h2>

<input

placeholder="Email"

onChange={(e)=>setEmail(e.target.value)}

/>

<input

type="password"

placeholder="Password"

onChange={(e)=>setPassword(e.target.value)}

/>

<button onClick={login}>

Login

</button>

<Link to="/register">Create Account</Link>
</div>

)

}

export default Login;