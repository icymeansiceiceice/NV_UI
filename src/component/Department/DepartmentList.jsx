import React, { useEffect, useState } from 'react'
import DepartmentService from '../../services/DepartmentService';
import { Link } from 'react-router-dom'
import UserService from '../../services/UserService';

export default function DepartmentList() {

    const [departments,setDepartments] = useState([]);
    const [users,setusers] = useState([]);

    useEffect(()=>{ 
            UserService.getUsers()
            .then(res=>{
                setusers(res.data);
            })
            .catch(err =>{
                console.log(err);
            });

            DepartmentService.getDepartments()
            .then(res=>{
                setDepartments(res.data);
                })
            .catch(err =>{
                console.log(err);
            });
            
    },[])



  return (
    <div>
        <div>
            <Link to='/createDepartment'>
                <button>Create Department</button>
            </Link>
        </div>
        <h1>Department List</h1>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>members</th>
                </tr>
                </thead>
                <tbody>
                    {
                        departments.map((data,index)=>(
                            <tr key={index}>
                                <td>{data.name}</td>
                                {
                                    users.map((memeber,index)=>{
                                        if(memeber.department!==null){
                                            if(data.id===memeber.department.id){
                                                return <td key={index}>{memeber.name}</td>
                                            }
                                        }
                                    })
                                }
                                <td>
                                    <Link to={`/departmentDetail/${data.id}`}><button>Edit</button></Link>
                                    <Link to={``}><button>Delete</button></Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
    </div>
  )
}
