import React from 'react'
import { useParams } from 'react-router-dom';

export default function DepartmentDetail() {

    let {id} = useParams();
    let navigator = useNavigate();
    const [department,setDepartment] = useState({
        name:'',
        user:[]
    });

    const handleChange = (e)=>{
        const value = e.target.value;
        setDepartment({...department,[e.target.name]:value})
    }
    
    const handleSubmit = (e)=>{
        e.preventDefault();

    }

    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
               <div>
                    <h1>Log In</h1>
                </div> 
                <div>
                    <label htmlFor="">name</label>
                    <input type="text" name="name" value={department.name} onChange={(e)=> handleChange(e)} />
                </div>
                <div>
                    <label htmlFor="">password</label>
                    <input type="password" name="password" value={department.password} onChange={(e)=> handleChange(e)} />
                </div>
                <div>
                    <button>login</button>
                </div>
                <a href="">register</a>
            </form>
          </div> 
  )
}
