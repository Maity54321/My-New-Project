import {
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  CREATE_USERS_SUCCESS,
  CREATE_USERS_FAIL,
  DELETE_USERS_SUCCESS,
  DELETE_USERS_FAIL,
  SINGLE_USER_SUCCESS,
  SINGLE_USER_FAIL,
} from "./constants";

const initialState = {
  data: [],
  loading: false,
  error: null,
  datas: [],
};

export const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ALL_USERS_REQUEST:
      return { ...state, loading: true, error: null };
    case ALL_USERS_SUCCESS:
      // console.log(action.payload);
      return { ...state, loading: false, data: action.payload };
    case ALL_USERS_FAIL:
      return { ...state, loading: true, error: action.error };
    case CREATE_USERS_SUCCESS:
      console.log(action.payload.data);
      console.log(action.payload.response.data.id);

      const idName = "id";
      const id = action.payload.response.data.id;
      const obj = action.payload.data;
      obj[idName] = id;
      console.log("new Object:", obj);

      console.log("state:", state);
      const rowsPerPage = 5;
      const datas = state.data;
      const currentPage = 3;
      const startIndex = (currentPage - 1) * rowsPerPage;
      const endIndex = startIndex + rowsPerPage;
      const currentPageData: any = datas.slice(startIndex, endIndex);
      console.log("test", currentPageData);
      for (let i = currentPageData.length - 1; i >= 0; i--) {
        currentPageData[i + 1] = currentPageData[i];
      }
      currentPageData[0] = obj;
      console.log("testUltimate", currentPageData);

      return {
        ...state,
        loading: false,
        data: currentPageData,
        status: action.payload.response.status,
      };
    case CREATE_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case DELETE_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case DELETE_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case SINGLE_USER_SUCCESS:
      console.log(action.payload[0]);
      return {
        ...state,
        loading: false,
        data: action.payload[0],
      };
    case SINGLE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};
