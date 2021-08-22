// import axios from "axios";
// import { API_URL } from "@/utils/constants";

// http.interceptors.request.use(
//   (config) => {
//     /*
//      * Here you can add a header with a JWT token, ensuring it will be
//      * sent with ALL your requests.
//      */
//     return config;
//   },
//   (error) => Promise.reject(error)
// );
//
// http.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     /*
//      * Here you can add a central error handling mechanism
//      */
//     // store.dispatch("setErrorMessage", { error: error.response.data });
//
//     return Promise.reject(error);
//   }
// );

// export const ApiService = {
//   // setHeader() {
//   //   axios.defaults.headers.common[
//   //     "Authorization"
//   //   ] = `Bearer ${TokenService.getToken()}`;
//   // }
//
//   removeHeader() {
//     axios.defaults.headers.common = {};
//   },
//
//   get(resource) {
//     return axios.get(resource);
//   },
//
//   post(resource, data) {
//     return axios.post(resource, data);
//   },
//
//   put(resource, data) {
//     return axios.put(resource, data);
//   },
//
//   delete(resource) {
//     return axios.delete(resource);
//   },
//
//   /**
//    * Perform a custom Axios request.
//    *
//    * data is an object containing the following properties:
//    *  - method
//    *  - url
//    *  - data ... request payload
//    *  - auth (optional)
//    *    - username
//    *    - password
//    **/
//   customRequest(data) {
//     return axios(data);
//   },
// };
