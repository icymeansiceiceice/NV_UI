import axios from "axios"

const Department_API_URL = 'http://localhost:8080/department'


class DepartmentService {

    createDepartment = (user) => {
        return axios.post(Department_API_URL + '/create', user);
    }

    updateDepartment = (user) => {
        return axios.post(Department_API_URL + '/update', user);
    }

    getDepartmentById = (id) => {
        return axios.get(Department_API_URL + '/getDepartment/' + id);
    }

    getDepartments = () => {
        return axios.get(Department_API_URL + '/getAllDepartment');
    }

    addUser = (user) => {
        return axios.post(Department_API_URL + '/addUser', user);
    }
    removeDepartment = (id) => {
        console.log(id)
        return axios.delete(Department_API_URL + '/delete/', id);
    }

}

export default new DepartmentService();

