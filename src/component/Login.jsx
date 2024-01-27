import React, { useEffect, useState } from "react"
import LoginService from "../services/LoginService";
import { useNavigate } from 'react-router-dom';

export default function Login(){

    let navigator = useNavigate();
    const [errorMessage,setErrorMessage] = useState({});
    const [authMessage,setAuthMessage] = useState('');
    const [isValid,setIsValid] = useState(false);
    const [user,setUser] = useState({
        name:'',
        password:''
    });


    useEffect(()=>{
        if(Object.keys(errorMessage).length === 0 && isValid){
            LoginService.login(user)
            .then(res => {
                localStorage.setItem("authenticatedUser",JSON.stringify(res.data));
                navigator('/home');
            })
            .catch(err => {
                setAuthMessage('Username or Password is incorrect!');
                navigator('/');
            });
        }
    },[errorMessage]);

    const handleChange = (e)=>{
        const value = e.target.value;
        setUser({...user,[e.target.name]:value})
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        setErrorMessage(validate(user));  
        setIsValid(true);
    }

    const validate = (values)=>{
        const errors = {};
        if (!values.name) {
            errors.name = "Phone number is required!";
        }
        if (!values.password) {
            errors.password = "Password is required!";
        }
        return errors;
    }

    const clear = (e)=>{
        e.preventDefault();
        setUser({
            name:'',
            password:''
        })
        setErrorMessage({});
        setIsValid(false);
    }

    return(
        <div>
            <form action="" onSubmit={handleSubmit}>
               <div>
                    <h1>Log In</h1>
                </div> 
                {authMessage && <p style={{color:'red'}}>{authMessage}</p>}
                <div>
                    {errorMessage.name && <p style={{color:'red'}}>{errorMessage.name}</p>}
                    <label htmlFor="">name</label>
                    <input type="text" name="name" value={user.name} onChange={(e)=> handleChange(e)} />
                </div>
                <div>
                    {errorMessage.password && <p style={{color:'red'}}>{errorMessage.password}</p>}
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
