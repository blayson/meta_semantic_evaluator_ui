import http from "@/services/api";

const SuggestionsService = {
  baseUrl: "/suggestions",

  deleteSuggestion: async function (suggestions_id) {
    const url = `${this.baseUrl}/${suggestions_id}/delete`;
    return await http.delete(url);
  },

  submitSuggestions: async function (payload, changes) {
    const url = `${this.baseUrl}/submit?changes=${changes}`;
    return await http.post(url, payload);
  },

  editSuggestion: async function (payload) {
    const url = `${this.baseUrl}/${payload.reviewSuggestionId}/edit`;
    return await http.put(url, payload);
  },
};

export default SuggestionsService;
