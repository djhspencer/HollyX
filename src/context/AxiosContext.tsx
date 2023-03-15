import axios, { AxiosInstance } from "axios";
import { useAuth } from "./AuthContext";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { createContext, ReactNode, useContext, useState } from "react";

type AxiosProviderProps = {
  children: ReactNode;
};

type AxiosContext = {
  authAxios: AxiosInstance;
  publicAxios: AxiosInstance;
};

const AxiosContext = createContext({} as AxiosContext);

export function useAxios() {
  return useContext(AxiosContext);
}

export function AxiosProvider({ children }: AxiosProviderProps) {
  const { getAccessToken, updateAuthState, authState } = useAuth();

  const authAxios = axios.create({
    baseURL: "http://localhost:4000/users",
  });

  const publicAxios = axios.create({
    baseURL: "http://localhost:4000/users",
  });

  authAxios.interceptors.request.use(
    (config) => {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${getAccessToken()}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const refreshAuthLogic = (failedRequest: any) => {
    //this will send the httponly refresh token
    console.log("refresh logic called");

    const options = {
      method: "GET",
      url: "http://localhost:4000/users/refresh",
      withCredentials: true,
    };

    return axios(options)
      .then(async (response) => {
        failedRequest.response.config.headers.Authorization =
          "Bearer " + response.data.accessToken;

        updateAuthState({
          accessToken: response.data.accessToken,
          authenticated: true,
        });

        return Promise.resolve();
      })
      .catch((e) => {
        updateAuthState({
          accessToken: null,
          authenticated: false,
        });
      });
  };

  createAuthRefreshInterceptor(authAxios, refreshAuthLogic, {
    statusCodes: [401, 403], // default: [ 401 ]
  });

  return (
    <AxiosContext.Provider
      value={{
        authAxios,
        publicAxios,
      }}
    >
      {children}
    </AxiosContext.Provider>
  );
}
