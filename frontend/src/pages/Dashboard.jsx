import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Dashboard(){


    const navigate = useNavigate();
const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
};


const[data,setData]=useState([]);

useEffect(()=>{

load();

},[]);

const load=async()=>{

const res=await API.get("/appointments");

setData(res.data.data);

}

const book=async(id)=>{

await API.post(`/appointments/${id}/book`);

load();

}

return(

<div>
<div style={{ marginBottom: "20px" }}>
  <button onClick={() => navigate("/my")}>
    My Appointments
  </button>

  <button
    onClick={logout}
    style={{ marginLeft: "10px" }}
  >
    Logout
  </button>
</div>

<h1>Appointments</h1>

{

data.map((item)=>(

<div key={item._id}>

<p>

{new Date(item.date).toDateString()}

</p>

<p>

{item.startTime} - {item.endTime}

</p>

<p>

{item.status}

</p>

{

item.status==="AVAILABLE" &&

<button

onClick={()=>book(item._id)}

>

Book

</button>

}

<hr/>

</div>

))

}

</div>


)

}

export default Dashboard;