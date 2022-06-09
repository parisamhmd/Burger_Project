import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-fb02e-default-rtdb.firebaseio.com/'
})

export default instance; 