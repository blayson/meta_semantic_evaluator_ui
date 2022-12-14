import http from "@/services/api";

const AdminService = {
  baseUrl: "/admin",

  getAllUsers: async function () {
    const url = `${this.baseUrl}/users`;
    return await http.get(url);
  },

  getSuggestionsForApprove: async function (payload) {
    const url = `${this.baseUrl}/suggestions?start=${payload.start}&end=${payload.end}${payload.sort}${payload.filter}`;
    return await http.get(url);
  },

  rejectSuggestion: async function (suggestions_id) {
    const url = `${this.baseUrl}/suggestions/${suggestions_id}/reject`;
    return await http.put(url);
  },

  approveSuggestion: async function (suggestions_id) {
    const url = `${this.baseUrl}/suggestions/${suggestions_id}/approve`;
    return await http.put(url);
  },

  updateUser: async function (userId, userData) {
    const url = `${this.baseUrl}/users/${userId}/update`;
    return await http.put(url, userData);
  },

  deleteUser: async function (userId) {
    const url = `${this.baseUrl}/users/${userId}/delete`;
    return await http.delete(url);
  },
};

export default AdminService;
