import API from "./api";

export const warningApi = {
    getAll: () => API.get("/company/warnings/"),
    create: (payload)=> API.post("/company/warnings/",payload)

}