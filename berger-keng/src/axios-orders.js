import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-my-burger-f73fb.firebaseio.com/'
});

export default instance;