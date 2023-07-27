import {
  JOB_TYPE_LOAD_FAIL,
  JOB_TYPE_LOAD_REQUEST,
  JOB_TYPE_LOAD_SUCCESS,
} from "../constants/jobConstant";
import axios from "axios";

const endpoint = "http://localhost:5000";

export const jobTypeLoadAction = () => async (dispatch) => {
  dispatch({ type: JOB_TYPE_LOAD_REQUEST });
  try {
    const { data } = await axios.get(`${endpoint}/api/type/jobs`);

    dispatch({ type: JOB_TYPE_LOAD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: JOB_TYPE_LOAD_FAIL,
      payload: error.response.data.error,
    });
  }
};
