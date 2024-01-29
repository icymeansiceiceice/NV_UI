import axios from "axios"

const User_API_URL = 'http://localhost:8080/User'


class UserService {

    createUser = (user) => {
        return axios.post(User_API_URL + '/create', user);
    }

    updateUser = (user) => {
        return axios.post(User_API_URL + '/update', user);
    }

    getUserById = (id) => {
        return axios.get(User_API_URL + '/getUser/' + id);
    }
    DeleteById = (id) => {
        return axios.delete(User_API_URL + '/delete/' + id);
    }

    getUsers = () => {
        return axios.get(User_API_URL + '/getAllUser');
    }
}

export default new UserService();