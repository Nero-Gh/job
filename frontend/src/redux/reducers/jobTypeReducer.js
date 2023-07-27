//importing constants

import {
  JOB_TYPE_LOAD_FAIL,
  JOB_TYPE_LOAD_REQUEST,
  JOB_TYPE_LOAD_RESET,
  JOB_TYPE_LOAD_SUCCESS,
} from "../constants/jobConstant";

//reducer for loading jobs
export const loadJobTypeReducer = (state = { jobtype: [] }, action) => {
  switch (action.type) {
    case JOB_TYPE_LOAD_REQUEST:
      return { loading: true };
    case JOB_TYPE_LOAD_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        jobtype: action.payload.jobtype,
      };
    case JOB_TYPE_LOAD_FAIL:
      return { loading: false, error: action.payload };
    case JOB_TYPE_LOAD_RESET:
      return {};
    default:
      return state;
  }
};
