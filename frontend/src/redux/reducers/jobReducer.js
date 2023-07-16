//importing constants

import {
  JOB_LOAD_FAIL,
  JOB_LOAD_REQUEST,
  JOB_LOAD_RESET,
  JOB_LOAD_SUCCESS,
} from "../constants/jobConstant";

//reducer for loading jobs
export const loadJobReducer = (state = { jobs: [] }, action) => {
  switch (action.type) {
    case JOB_LOAD_REQUEST:
      return { loading: true };
    case JOB_LOAD_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        pages: action.payload.pages,
        page: action.payload.page,
        count: action.payload.count,
        SetUniqueLocation: action.payload.SetUniqueLocation,
        jobs: action.payload.jobs,
      };
    case JOB_LOAD_FAIL:
      return { loading: false, error: action.payload };
    case JOB_LOAD_RESET:
      return {};
    default:
      return state;
  }
};