import Login from '../component/Auth/Login.jsx'
import { createBrowserRouter, } from "react-router-dom";
import Home from '../pages/Home.jsx';
import UserList from '../pages/UserList.jsx';

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
    element: <Home />
  }, {
    path: "/userlist",
    element: <UserList />
  }
]);

export default router;