import API from "./api";

export const getAllLeaveRequests = async (params) => {
  const res = await API.get("/company/admin/leave/all-requests/", { params });
  return res.data;
};