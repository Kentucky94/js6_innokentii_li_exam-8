import axios from 'axios';

const axiosAPI = axios.create({
  baseURL: 'https://js6-innokentii-li-ex8.firebaseio.com/',
});

export default  axiosAPI