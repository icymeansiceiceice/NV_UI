import React, { useEffect, useState } from 'react'
import UserService from '../../services/UserService';
import { Link } from 'react-router-dom'

export default function UserList() {
    
    const [users, setUsers] = useState([]);

    useEffect(() => {
        UserService.getUsers()
            .then(res => {
                setUsers(res.data);
                console.log(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <div>
            <div>
                <Link to='/createUser'>
                    <button>Create User</button>
                </Link>
            </div>
            <h1>User List</h1>
            <table>
                <thead>
                    <tr>
                        <th>UserID</th>
                        <th>Name</th>
                        <th>email</th>
                        <th>phone</th>
                        <th>department</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((data, index) => (
                            <tr key={index}>
                                <td>{data.userID}</td>
                                <td>{data.name}</td>
                                <td>{data.email}</td>
                                <td>{data.phone}</td>
                                {data.department !== null && <td>{data.department.name}</td>}
                                <td>
                                    <Link to={`/userDetail/${data.id}`}><button>Edit</button></Link>
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
