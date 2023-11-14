import axios from 'axios';

const createAxiosClient = (baseURL, token) => {
  const client = axios.create({
    baseURL,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      Authorization: token ? `Bearer ${token}` : undefined,
    },
    withCredentials: true,
    
  });
  return client;
};

export default createAxiosClient;