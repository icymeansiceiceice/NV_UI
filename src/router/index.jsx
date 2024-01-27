import App from '../App.jsx'
import Login from '../component/Login.jsx'
import {
    createBrowserRouter,
  } from "react-router-dom";
import CreateUser from '../component/createUser.jsx';
import UserDetail from '../component/UserDetail.jsx';

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login/>,
    },
    {
      path: "/home",
      element: <App/>,
    },
    {
      path: "/createUser",
      element: <CreateUser/>,
    },
    {
      path: "/userDetail",
      element: <UserDetail/>,
    }
  ]);

  export default router;