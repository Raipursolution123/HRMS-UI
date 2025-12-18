import API from "./api";

export const planApi = {
  getAll: () => API.get('/plans/'),
};