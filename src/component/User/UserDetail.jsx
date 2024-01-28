import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom';
import UserService from "../../services/UserService";
import DepartmentService from "../../services/DepartmentService";
import Select from 'react-select';

export default function UserDetail() {

   const {id} = useParams();
    let navigator = useNavigate();
    const [departments,setDepartments] = useState([]);
    const [editUser,setEditUser] = useState({
        id:'',
        userID:'',
        name:'',
        email:'',
        phone:'',
        password:'',
        delete:'',
        department:{}
    });

    useEffect(()=>{
        UserService.getUserById(id)
        .then(res=>{
            setEditUser(res.data);  
        })
        .catch(err=>{
            console.log(err);
        })
        DepartmentService.getDepartments()
        .then(res=>{
            setDepartments(res.data);
        })
        .catch(err=>{
            console.log(err);
        })

    },[])

    const handleChange = (e)=>{
        const value = e.target.value;
        if(e.target.name === 'department'){
            let  departmen = {
                id: e.target.value
            }
            setEditUser({...editUser,department:departmen})
        }
        if(e.target.name !== 'department'){
            setEditUser({...editUser,[e.target.name]:value})
        }
        
    }
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        UserService.updateUser(editUser)
            .then(res=>{
                navigator('/userList');
            })
            .catch(err=>{
                console.log(err);
            });
        console.log(editUser);
    }

    const clear = (e)=>{
        e.preventDefault();
        setUser({
            userID:'',
            name:'',
            email:'',
            phone:'',
            password:'',
            department:{
                id:''
            }
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
                <input type="text" hidden name="id" value={editUser.id ?? ''} onChange={(e)=>handleChange(e)}/>
                <div>
                    <label htmlFor="">userID</label>
                    <input type="text" name="userID" value={editUser.userID ?? ''} onChange={(e)=> handleChange(e)} />
                </div> 
                <div>
                    <label htmlFor="">name</label>
                    <input type="text" name="name" value={editUser.name ?? ''} onChange={(e)=> handleChange(e)} />
                </div>
                <div>
                    <label htmlFor="">email</label>
                    <input type="email" name="email" value={editUser.email ?? ''} onChange={(e)=> handleChange(e)} />
                </div>
                <div>
                    <label htmlFor="">phone</label>
                    <input type="text" name="phone" value={editUser.phone ?? ''} onChange={(e)=> handleChange(e)} />
                </div>
                <div>
                    <label htmlFor="">password</label>
                    <input type="password" name="password" value={editUser.password ?? ''} onChange={(e)=> handleChange(e)} />
                </div>

                <div>
                <label htmlFor="">department</label>
                <select name="department" value={editUser.department?.id ?? ''}  onChange={(e)=>handleChange(e)}>
                    {
                      departments.map((data,index)=>(
                        <option value={data.id ?? 
                        ''} key={index} >{data.name}</option>
                      ))  
                    }
                </select>

                </div>

                <div>
                    <button >Update</button>
                </div>
                <div>
                    <button onClick={clear}>clear</button>
                </div>
                </form>
          </div>  
    )
}
