
const get = async (axiosClient, url, params) => {
  const response = await axiosClient.get(url, { params });
  const body = response.data;
  return { response, body };
};

const post = async(axiosClient, url, data, hasFile) => {
  let headers = {
    'Content-Type': 'application/json',
  };

  if (hasFile) {
    headers = {
      'Content-Type': 'multipart/form-data',
    };
  }

  const response = await axiosClient.post(url, data, { headers });
  const body = response.data;
  return { response, body };
};

const httpMethods = {
  get,
  post,
};

export default httpMethods;