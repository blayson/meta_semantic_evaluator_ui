import http from "@/services/api";

const SuggestionsService = {
  baseUrl: "/suggestions",

  deleteSuggestion: async function (suggestions_id) {
    let url = `${this.baseUrl}/${suggestions_id}/delete`;
    return await http.delete(url);
  },
};

export default SuggestionsService;
