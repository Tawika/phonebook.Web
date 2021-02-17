import axios, { AxiosRequestConfig} from 'axios'

const axiosConfig: AxiosRequestConfig = { baseURL: "https://localhost:5001"};

const axiosInstance = axios.create(axiosConfig);

export default axiosInstance;