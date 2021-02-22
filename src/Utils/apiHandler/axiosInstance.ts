import axios, { AxiosRequestConfig} from 'axios'

const axiosConfig: AxiosRequestConfig = { baseURL: "http://localhost"};

const axiosInstance = axios.create(axiosConfig);

export default axiosInstance;