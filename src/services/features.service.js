import http from "@/services/api";

const FeaturesService = {
  baseUrl: "/features",

  getAllFeatureNamesByLang: async function () {
    const url = `${this.baseUrl}/names?lang=czech`;
    return await http.get(url);
  },
};

export default FeaturesService;
