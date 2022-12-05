import axios from 'axios';

export const getUsers = () => {

  return axios.get('https://reqres.in/api/users?page=2');
};