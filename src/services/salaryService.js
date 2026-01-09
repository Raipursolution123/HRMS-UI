import api from './api';

export const getSalarySheets = async (params = {}) => {
  const response = await api.get('/company/sheet/list/', { params });
  return response.data;
};


export const generateSinglePayslip = async (data) => {
  const response = await api.post('/company/payslip/generate/', data);
  return response.data;
};


export const generateBulkPayslips = async (data) => {
  const response = await api.post('/company/payslip/generate-bulk/', data);
  return response.data;
};


export const getPayslip = async (id) => {
  const response = await api.get(`/company/payslip/${id}/`);
  return response.data;
};


export const markPaymentPaid = async (data, exportCSV = false) => {
  const config = {};
  if (exportCSV) {
    config.params = { export: 'csv' };
    config.responseType = 'blob'; // Important for file download
  }
  const response = await api.post('/company/payments/mark-paid/', data, config);
  // Return the entire response if it's a blob, otherwise return data
  return exportCSV ? response : response.data;
};

export default {
  getSalarySheets,
  generateSinglePayslip,
  generateBulkPayslips,
  getPayslip,
  markPaymentPaid
};
