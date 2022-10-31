import axios, { AxiosResponse } from "axios";
import { Task } from "../models/Task";

axios.defaults.baseURL = "https://localhost:5001"; 


const Tasks = {
    index: () => axios.get<Task[]>(`/task`).then((response: AxiosResponse<Task[]>)=>response.data),
    details: (id:string) => axios.get<Task>(`/task/${id}`).then((response: AxiosResponse<Task>)=>response.data),
    create: (task:Task) => axios.post<Task>(`/task/create`, task).then((response: AxiosResponse<Task>)=>response.data),
    update: (task:Task) => axios.post<Task>(`/task/update`, task).then((response: AxiosResponse<Task>)=>response.data),
    delete:(id:string) => axios.post<void>(`/task/delete/${id}`),
}


const api = {
    Tasks,
}

export default api;