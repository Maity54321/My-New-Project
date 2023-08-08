import { takeLatest, put, call, takeEvery } from "redux-saga/effects";
import {
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  CREATE_USERS_REQUEST,
  DELETE_USERS_REQUEST,
  UPDATE_USERS_REQUEST,
  SINGLE_USER_REQUEST,
} from "./constants";
import Axios from "axios";
import {
  createUserFail,
  createUserSuccess,
  deleteUserFail,
  deleteUserRequest,
  deleteUserSuccess,
  fetchDataFail,
  fetchDataSuccess,
  singleUserFail,
  singleUserSuccess,
  updateUserFail,
  updateUserSuccess,
} from "./userActions";

const fetchUsersAPI = (data: any): any => {
  console.log(data);

  return new Promise((resolve, reject) => {
    Axios.get(
      `http://localhost:4000/api?page=${data.page}&limit=${data.limit}`
    ).then((response) => resolve(response));
  });
};

const createUserAPI = (data: any) => {
  return new Promise((resolve, reject) => {
    Axios.post(`http://localhost:4000/api`, data).then((response) =>
      resolve({ response, data })
    );
  });
};

const deleteUserAPI = (id: any) => {
  return new Promise((resolve, reject) => {
    Axios.delete(`http://localhost:4000/api/${id}`).then((response) =>
      resolve(response)
    );
  });
};

const updateUserAPI = (id: any) => {
  return new Promise((resolve, reject) => {
    Axios.put(`http://localhost:4000/api/${id}`).then((response) =>
      resolve(response)
    );
  });
};

const singleUserAPI = (id: any) => {
  return new Promise((resolve, reject) => {
    Axios.get(`http://localhost:4000/api/${id}`).then((response) => {
      resolve(response);
    });
  });
};

function* singleUser(action: any): Generator<any> {
  try {
    const response: any = yield call(singleUserAPI, action.payload);
    // console.log(response.data);
    yield put(singleUserSuccess(response.data));
  } catch (error) {
    yield put(singleUserFail(error));
  }
}

function* updateUser(action: any): any {
  try {
    const response = yield call(updateUserAPI, action.payload);
    yield put(updateUserSuccess(response.status));
  } catch (error) {
    yield put(updateUserFail(error));
  }
}

function* deleteUser(action: any): any {
  try {
    const response = yield call(deleteUserAPI, action.payload);
    yield put(deleteUserSuccess(response.status));
  } catch (error) {
    yield put(deleteUserFail(error));
  }
}

function* createUser(action: any): any {
  try {
    const response = yield call(createUserAPI, action.payload);
    console.log(response);
    yield put(createUserSuccess(response));
  } catch (error) {
    yield put(createUserFail(error));
  }
}

function* fetchDataSaga(action: any): any {
  try {
    const response: any = yield call(fetchUsersAPI, action.payload);
    console.log(response);
    yield put(fetchDataSuccess(response.data.data));
  } catch (error) {
    yield put(fetchDataFail(error));
  }
}

function* userSaga(): any {
  yield takeLatest(ALL_USERS_REQUEST, fetchDataSaga);
  yield takeEvery(CREATE_USERS_REQUEST, createUser);
  yield takeLatest(DELETE_USERS_REQUEST, deleteUser);
  yield takeLatest(UPDATE_USERS_REQUEST, updateUser);
  yield takeLatest(SINGLE_USER_REQUEST, singleUser);
}

export default userSaga;
