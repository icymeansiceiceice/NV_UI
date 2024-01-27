import axios from "axios"

const User_API_URL = 'http://localhost:8080/Auth'


class LoginService{

    login = (user)=>{
        return axios.post(User_API_URL+'/login',user);
    }

}

export default new LoginService();