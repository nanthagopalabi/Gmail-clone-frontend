import { useState } from "react";
import API from "../service/centralAPI.js";

const useApi = (urlObject) => {
const [response, setResponse] = useState(null);
const [error, setError] = useState("");
const [isLoading, setIsLoading] = useState(false);

const call = async (payload,token,params) => {
  setResponse(null);
  setError("");
  setIsLoading(true);
    try {
      let res = await API(urlObject,payload,token,params);
      setResponse(res.data);
      return res
    } catch (error) {
      setError(error.message);
      return error
    } finally {
      setIsLoading(false);
    }
  };
  return { call, response, error, isLoading };
};
export default useApi;