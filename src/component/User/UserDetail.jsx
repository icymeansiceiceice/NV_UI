import React from "react"
import { useNavigate, useParams } from 'react-router-dom';
import UserService from "../../services/UserService";

export default function UserDetail() {

   const {id} = useParams();
    let navigator = useNavigate();
    const [user,setUser] = useState({
        id:'',
        userID:'',
        name:'',
        email:'',
        phone:'',
        password:'',
        delete: ''
    });

    const handleChange = (e)=>{
        const value = e.target.value;
        setUser({...user,[e.target.name]:value})
    }
    
    const handleSubmit = (e)=>{
        e.preventDefault();
        UserService.updateUser(user)
            .then(res=>{
                console.log(res)
                navigator('/home');
            })
            .catch(err=>{
                console.log(err);
            });
    }

    return(
          <div>
            <form action="" onSubmit={handleSubmit}>
               <div>
                    <h1>Update User</h1>
                </div>
                <div>
                    <label htmlFor="">userID</label>
                    <input type="text" name="userID" value={user.userID} onChange={(e)=> handleChange(e)} />
                </div> 
                <div>
                    <label htmlFor="">name</label>
                    <input type="text" name="name" value={user.name} onChange={(e)=> handleChange(e)} />
                </div>
                <div>
                    <label htmlFor="">email</label>
                    <input type="email" name="email" value={user.email} onChange={(e)=> handleChange(e)} />
                </div>
                <div>
                    <label htmlFor="">phone</label>
                    <input type="text" name="phone" value={user.phone} onChange={(e)=> handleChange(e)} />
                </div>
                <div>
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
