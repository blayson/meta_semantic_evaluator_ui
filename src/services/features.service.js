import http from "@/services/api";

const FeaturesService = {
  baseUrl: "/features",

  getAllFeatureNamesByLang: async function (payload) {
    const url = `${this.baseUrl}/match/${payload.query}?lang=${payload.lang}&review_id=${payload.review_id}`;
    return await http.get(url);
  },
};

export default FeaturesService;
