import React, { useEffect, useState } from "react"
import UserService from "../services/UserService";
import { useNavigate } from 'react-router-dom';

export default function UserDetail() {
    let navigator = useNavigate();
    const authUser = JSON.parse(localStorage.getItem('authenticatedUser'));

    const [errorMessage,setErrorMessage] = useState({});
    const [isValid,setIsValid] = useState(false);
    const [user,setUser] = useState({
        userID:'',
        name:'',
        email:'',
        phone:'',
        password:'',
        delete: false
    });

    useEffect(()=>{    
        UserService.getUserById(authUser.id)
            .then(res => {
                setUser(res.data);
            })
            .catch(err => {
                console.log(err);
            });

        if(Object.keys(errorMessage).length === 0 && isValid){
            UserService.updateUser(user)
            .then(res => {
                navigator('/home');
            })
            .catch(err => {
                console.log(err);
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
        if (!values.userID) {
          errors.userID = "UserID is required!";
        }
        if (!values.name) {
            errors.name = "Username is required!";
        }
        if (!values.email) {
            errors.email = "Email is required!";
        }
        if (!values.phone) {
            errors.phone = "Phone number is required!";
        }
        if (!values.password) {
            errors.password = "Password is required!";
        }
        return errors;
    }

    const clear = (e)=>{
        e.preventDefault();
        setUser({
            userID:'',
            name:'',
            email:'',
            phone:'',
            password:''
        })
        setErrorMessage({});
        setIsValid(false);
    }


    return(
          <div>
            <form action="" onSubmit={handleSubmit}>
               <div>
                    <h1>Update User</h1>
                </div>
                <div>
                    {errorMessage.userID && <p style={{color:'red'}}>{errorMessage.userID}</p>}
                    <label htmlFor="">userID</label>
                    <input type="text" name="userID" value={user.userID} onChange={(e)=> handleChange(e)} />
                </div> 
                <div>
                    {errorMessage.name && <p style={{color:'red'}}>{errorMessage.name}</p>}
                    <label htmlFor="">name</label>
                    <input type="text" name="name" value={user.name} onChange={(e)=> handleChange(e)} />
                </div>
                <div>
                    {errorMessage.email && <p style={{color:'red'}}>{errorMessage.email}</p>}
                    <label htmlFor="">email</label>
                    <input type="email" name="email" value={user.email} onChange={(e)=> handleChange(e)} />
                </div>
                <div>
                    {errorMessage.phone && <p style={{color:'red'}}>{errorMessage.phone}</p>}
                    <label htmlFor="">phone</label>
                    <input type="text" name="phone" value={user.phone} onChange={(e)=> handleChange(e)} />
                </div>
                <div>
                    {errorMessage.password && <p style={{color:'red'}}>{errorMessage.password}</p>}
                    <label htmlFor="">password</label>
                    <input type="password" name="password" value={user.password} onChange={(e)=> handleChange(e)} />
                </div>
                <div>
                    <button >save</button>
                </div>
                <div>
                    <button onClick={clear}>clear</button>
                </div>
                </form>
          </div>  
    )
}
