import React, { useState } from "react";
import { api } from "../../../services/api";
import Loading from "../../Components/Loading";



export default async function ActiveAcc(){
  let token = window.location.pathname.replace('/', '')
  const [active,setActive] = useState<string>(null);
  
  await api.post(`activeacc/${token}`).then(response => 
    window.location.href = response.data).catch(error => {
      console.log(error);
    })


if (!active) return <Loading />    

return (
<div>
  
</div>

)




  }