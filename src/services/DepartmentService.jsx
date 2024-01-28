import axios from "axios"

const Department_API_URL = 'http://localhost:8080/department'


class DepartmeentService{

    createDepartment = (user)=>{
        return axios.post(Department_API_URL+'/create',user);
    }

    updateDepartment = (user)=>{
        return axios.post(Department_API_URL+'/update',user);
    }

    getDepartmentById = (id)=>{
        return axios.get(Department_API_URL+'/getDepartment/'+id);
    }

    getDepartments = ()=>{
        return axios.get(Department_API_URL+'/getAllDepartment');
    }
}

export default new DepartmeentService();

