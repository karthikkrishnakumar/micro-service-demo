import createAxiosClient from "./axiosClient.js";
import httpMethods from "./httpMethods.js";
import { handleErrorResponse } from "./errorUtils.js";
import { getUrl } from "./urlUtils.js";

const http = (urlType, token) => {
  const baseURL = getUrl(urlType);
  const axiosClient = createAxiosClient(baseURL, token);

  const get = async (url, params) => {
    try {
      return await httpMethods.get(axiosClient, url, params);
    } catch (error) {
      return handleErrorResponse(error);
    }
  };

  const post = async (url, data, hasFile) => {
    try {
      return await httpMethods.post(axiosClient, url, data, hasFile);
    } catch (error) {
      return handleErrorResponse(error);
    }
  };

  return { get, post };
};

export default http;
