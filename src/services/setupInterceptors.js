import axiosInstance from "./api";
import { SRE_TOKEN } from "@/helpers/constants";

// eslint-disable-next-line no-unused-vars
const setup = (store) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem(SRE_TOKEN);
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;

        const parts = token.split(".");
        const rawToken = atob(parts[1]);
        console.log(rawToken);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // axiosInstance.interceptors.response.use(
  //   (res) => {
  //     return res;
  //   },
  //   async (err) => {
  //     const originalConfig = err.config;
  //
  //     if (originalConfig.url !== "/auth/login" && err.response) {
  //       // Access Token was expired
  //       if (err.response.status === 401 && !originalConfig._retry) {
  //         originalConfig._retry = true;
  //
  //         try {
  //           const rs = await axiosInstance.post("/auth/refreshtoken", {
  //             refreshToken: TokenService.getLocalRefreshToken(),
  //           });
  //
  //           const { accessToken } = rs.data;
  //
  //           store.dispatch("auth/refreshToken", accessToken);
  //           TokenService.updateLocalAccessToken(accessToken);
  //
  //           return axiosInstance(originalConfig);
  //         } catch (_error) {
  //           return Promise.reject(_error);
  //         }
  //       }
  //     }
  //
  //     return Promise.reject(err);
  //   }
  // );
};

export default setup;
