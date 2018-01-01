import axios from 'axios';

const config = {
    headers:
    {
        'Content-Type' : 'application/json'
    }
};

const instance = axios.create({
    baseURL : 'http://localhost:3005/'
}, config);

export default instance;