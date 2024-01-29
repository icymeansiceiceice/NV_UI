import App from '../App.jsx'
import Login from '../component/Auth/Login.jsx'
import {
  createBrowserRouter,
} from "react-router-dom";
import CreateUser from '../component/User/CreateUser.jsx';
import UserDetail from '../component/User/UserDetail.jsx';
import UserList from '../UserList.jsx';
import DepartmentList from '../component/Department/DepartmentList.jsx';
import CreateDepartment from '../component/Department/createDepartment.jsx';
import DepartmentDetail from '../component/Department/DepartmentDetail.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  }, {
    path: "/login",
    element: <Login />
  }
  ,
  {
    path: "/home",
    element: <App />
  },
  {
    path: "/createUser",
    element: <CreateUser />
  },
  {
    path: "/userDetail/:id",
    element: <UserDetail />
  },
  {
    path: "/userList",
    element: <UserList />
  },

  {
    path: "/departmentList",
    element: <DepartmentList />
  },
  {
    path: "/createDepartment",
    element: <CreateDepartment />
  },
  {
    path: "/departmentDetail/:id",
    element: <DepartmentDetail />
  }
]);

export default router;