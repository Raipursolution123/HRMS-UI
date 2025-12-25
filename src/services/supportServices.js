import API from './api';

export const supportAPI = {
  createTicket: (formData) => API.post('/support/create/', formData),
};

