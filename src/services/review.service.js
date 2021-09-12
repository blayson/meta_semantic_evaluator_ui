import http from "@/services/api";

const ReviewService = {
  baseUrl: "/reviews",

  getReviews: async function (payload) {
    const url = `${this.baseUrl}?start=${payload.start}&end=${payload.end}${payload.sort}${payload.filter}`;
    return await http.get(url);
  },

  getProductCategories: async function () {
    const url = `${this.baseUrl}/categories`;
    return await http.get(url);
  },

  submitSuggestions: async function (review_id, payload, changes) {
    let url = `${this.baseUrl}/${review_id}/suggestions/submit?changes=${changes}`;
    return await http.post(url, payload);
  },
  deleteSuggestion: async function (suggestions_id) {
    let url = `${this.baseUrl}/suggestions/${suggestions_id}/delete`;
    return await http.delete(url);
  },
};

export default ReviewService;
