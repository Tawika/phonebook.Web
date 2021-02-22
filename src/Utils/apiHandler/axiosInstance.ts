import axios, { AxiosRequestConfig} from 'axios'

const axiosConfig: AxiosRequestConfig = { baseURL: "http://localhost:80"};

const axiosInstance = axios.create(axiosConfig);

export default axiosInstance;