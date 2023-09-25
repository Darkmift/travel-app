import Axios from 'axios';
import LocalStorageService from '../services/localstorage-handler.service';
import { BASE_URL, TOKEN_LS_KEY } from '../constants';

enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

const axiosInstance = Axios.create({
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = LocalStorageService.get(TOKEN_LS_KEY);

  console.log(
    '🚀 ~ Request URL:',
    config.url,
    '\n🚀 ~ Request Method:',
    config.method,
    '\n🚀 ~ Request Body:',
    config.data ? config.data : 'No body'
  );

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

// Store access_token to ls if exists in response.data
axiosInstance.interceptors.response.use((response) => {
  if (response.data && response.data.access_token) {
    LocalStorageService.set(TOKEN_LS_KEY, response.data.access_token);
  }
  return response;
});

/*
axiosInstance.interceptors.response.use(
(response) => {
  return response;
},
(error) => {
  console.log("🚀 ~ file: HttpService.ts:39 ~ error:", error);
  if (error.response.status === 401) {
  // dispatch the logout action
  store.dispatch(logout());
  }
  return Promise.reject(error);
}
);
*/

export const httpService = {
  get(endpoint: string, data?: unknown, params?: unknown) {
    return requestHttp(endpoint, Methods.GET, data, params);
  },
  post(endpoint: string, data: unknown, params?: unknown) {
    return requestHttp(endpoint, Methods.POST, data, params);
  },
  put(endpoint: string, data: unknown, params?: unknown) {
    return requestHttp(endpoint, Methods.PUT, data, params);
  },
  delete(endpoint: string, data?: unknown, params?: unknown) {
    return requestHttp(endpoint, Methods.DELETE, data, params);
  },
};

const requestHttp = async (endpoint: string, method: Methods, data?: unknown, params?: unknown) => {
  console.info('initiating httpRequest with:', { endpoint, data, method, params });
  try {
    const res = await axiosInstance({
      url: `${BASE_URL}${endpoint}`,
      method,
      data: method !== 'GET' ? data : null,
      params: method === 'GET' ? params : null,
    });
    return res.data;
  } catch (err) {
    console.log(
      `Had Issues ${method}ing to the backend, endpoint: ${BASE_URL}${endpoint}, with data:`,
      data
    );
    console.dir(err);
    // if (err.response && err.response.status === 401) {
    //     // Depends on routing startegy - hash or history
    //     // window.location.assign('/#/login')
    //     // window.location.assign('/login')
    //     router.push('/login');
    // }
    throw err;
  }
};
