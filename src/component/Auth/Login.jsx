import React, { useState } from "react"
import LoginService from "../../services/LoginService";
import { useNavigate } from 'react-router-dom';

export default function Login(){
    
    let navigator = useNavigate();
    const [user,setUser] = useState({
        name:'',
        password:''
    });

    const handleChange = (e)=>{
        const value = e.target.value;
        setUser({...user,[e.target.name]:value})
    }
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        LoginService.login(user)
            .then(res=>{
                console.log(res)
                localStorage.setItem('authUser',JSON.stringify(res.data));
                navigator('/home');
            })
            .catch(err=>{
                console.log(err);
                navigator('/');
            });
    }

    return(
        <div>
            <form action="" onSubmit={handleSubmit}>
               <div>
                    <h1>Log In</h1>
                </div> 
                <div>
                    <label htmlFor="">name</label>
                    <input type="text" name="name" value={user.name} onChange={(e)=> handleChange(e)} />
                </div>
                <div>
                    <label htmlFor="">password</label>
                    <input type="password" name="password" value={user.password} onChange={(e)=> handleChange(e)} />
                </div>
                <div>
                    <button>login</button>
                </div>
                <a href="">register</a>
            </form>
          </div> 
    )
};
