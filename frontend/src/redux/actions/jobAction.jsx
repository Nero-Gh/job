import {
  JOB_LOAD_FAIL,
  JOB_LOAD_REQUEST,
  JOB_LOAD_SUCCESS,
} from "../constants/jobConstant";
import axios from "axios";

const endpoint = "http://localhost:5000";

export const jobLoadAction =
  (pageNumber, keyword = "", cat = "", location = "") =>
  async (dispatch) => {
    dispatch({ type: JOB_LOAD_REQUEST });
    try {
      const { data } = await axios.get(
        // `${endpoint}/api/job`
        // `/api/job?pageNumber=${pageNumber}&keyword=${keyword}&cat=${cat}&location=${location}`
        `${endpoint}/api/job?pageNumber=${pageNumber}&keyword=${keyword}&cat=${cat}&location=${location}`
      );

      dispatch({ type: JOB_LOAD_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: JOB_LOAD_FAIL,
        payload: error.response.data.error,
      });
    }
  };
