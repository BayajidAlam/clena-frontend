import { authKey } from "@/constants/storageKey";
import { IGenericErrorResponse, ResponseSuccessType } from "@/types";
import { getFromLocalStorage } from "@/utils/local-storage";
import axios from "axios";

const instance = axios.create();

instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["Accept"] = "application/json";
instance.defaults.timeout = 60000;

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    const accessToken = getFromLocalStorage(authKey);
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
//@ts-ignore
instance.interceptors.response.use(
  // @ts-ignore 
  function (response) {
    const responseObject: ResponseSuccessType = {
      data: response?.data?.data,
      meta: response?.data?.meta,
    };
    return responseObject;
    // return Promise.resolve(responseObject);
  },
  function (error) {
    const responseObject:IGenericErrorResponse = {
      statusCode: error?.response?.data?.statusCode || 500,
      message: error?.response?.data?.message || "something went wrong",
      errorMessages: error?.response?.data?.message,
    };
    return responseObject;
    // return Promise.reject(responseObject);
  }
);

export { instance };
