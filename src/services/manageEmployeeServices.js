import API from './api';

export const manageEmployeeApi = {
  getAll: () => API.get('/company/employees/'),
  create: (data) => API.post('/company/employees/create/', data),
};
