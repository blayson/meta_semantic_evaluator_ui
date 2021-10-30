import http from "@/services/api";

const SuggestionsService = {
  baseUrl: "/suggestions",

  deleteSuggestion: async function (suggestions_id) {
    let url = `${this.baseUrl}/${suggestions_id}/delete`;
    return await http.delete(url);
  },

  submitSuggestions: async function (payload, changes) {
    let url = `${this.baseUrl}/submit?changes=${changes}`;
    return await http.post(url, payload);
  },

  getSuggestionsForApprove: async function (payload) {
    const url = `${this.baseUrl}?start=${payload.start}&end=${payload.end}${payload.sort}${payload.filter}`;
    return await http.get(url);
  },

  rejectSuggestion: async function (suggestions_id) {
    const url = `${this.baseUrl}/${suggestions_id}/reject`;
    return await http.put(url);
  },

  approveSuggestion: async function (suggestions_id) {
    const url = `${this.baseUrl}/${suggestions_id}/approve`;
    return await http.put(url);
  },
};

export default SuggestionsService;
