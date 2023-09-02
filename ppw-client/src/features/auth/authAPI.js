import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URI || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true,
  },
  withCredentials: true,
});

export const registerUserEmail = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await API.post(`/auth/register-user-email`, data);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const verifyOTP = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await API.post(`/auth/verify-otp`, data);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const registerRestCredentials = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await API.patch(`/auth/register-user-credentials`, data);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const login = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await API.post(`/auth/login`, data);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await API.post(`/auth/user`);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const logoutUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await API.post(`/auth/logout`);
      console.log(res);
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};
