import {
  ALL_USERS_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  CREATE_USERS_FAIL,
  CREATE_USERS_REQUEST,
  CREATE_USERS_SUCCESS,
  DELETE_USERS_FAIL,
  DELETE_USERS_REQUEST,
  DELETE_USERS_SUCCESS,
  SINGLE_USER_FAIL,
  SINGLE_USER_REQUEST,
  SINGLE_USER_SUCCESS,
  UPDATE_USERS_FAIL,
  UPDATE_USERS_REQUEST,
  UPDATE_USERS_SUCCESS,
} from "./constants";

export const fetchAllUsers: any = (data: any) => ({
  type: ALL_USERS_REQUEST,
  payload: data,
});

export const fetchDataSuccess: any = (data: any) => ({
  type: ALL_USERS_SUCCESS,
  payload: data,
});

export const fetchDataFail: any = (error: any) => ({
  type: ALL_USERS_FAIL,
  payload: error,
});

export const createUserRequest = (data: any) => ({
  type: CREATE_USERS_REQUEST,
  payload: data,
});

export const createUserSuccess: any = (data: any) => ({
  type: CREATE_USERS_SUCCESS,
  payload: data,
});

export const createUserFail: any = (error: any) => ({
  type: CREATE_USERS_FAIL,
  payload: error,
});

export const deleteUserRequest = (id: any) => ({
  type: DELETE_USERS_REQUEST,
  payload: id,
});

export const deleteUserSuccess: any = (data: any) => ({
  type: DELETE_USERS_SUCCESS,
  payload: data,
});

export const deleteUserFail: any = (error: any) => ({
  type: DELETE_USERS_FAIL,
  payload: error,
});

export const updateUserRequest = (id: any) => ({
  type: UPDATE_USERS_REQUEST,
  payload: id,
});

export const updateUserSuccess: any = (data: any) => ({
  type: UPDATE_USERS_SUCCESS,
  payload: data,
});

export const updateUserFail: any = (error: any) => ({
  type: UPDATE_USERS_FAIL,
  payload: error,
});

export const singleUserRequest = (id: any) => ({
  type: SINGLE_USER_REQUEST,
  payload: id,
});

export const singleUserSuccess: any = (data: any) => ({
  type: SINGLE_USER_SUCCESS,
  payload: data,
});

export const singleUserFail: any = (error: any) => ({
  type: SINGLE_USER_FAIL,
  payload: error,
});
