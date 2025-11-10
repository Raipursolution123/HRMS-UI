import { useState, useEffect } from 'react';
import { authAPI } from '../services/authServices';
import { departmentAPI } from '../services/departmentServices';
import { data } from 'react-router-dom';
import { manageEmployeeApi } from '../services/manageEmployeeServices';

export const useManageEmployee = () => {
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEmployee = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await manageEmployeeApi.getAll();
      setEmployee(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch departments');
    } finally {
      setLoading(false);
    }
  };

  const addEmployee = async (employeeData) => {
    console.log(employeeData,"employeeData"); 
    try {
      setLoading(true);
      await manageEmployeeApi.create(employeeData);
      await fetchEmployee();
    }catch (err) {
      setError(err.response?.data?.message || 'Failed to add department');
    }finally {
      setLoading(false);
    }
  };

  // Update department (PUT/PATCH)
  const updateDepartment = async (id, data) => {
    try {
      setLoading(true);
      await departmentAPI.update(id, data); // PUT /company/departments/<id>/
      await fetchEmployee();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update department');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete department
  const deleteDepartment = async (id) => {
    try {
      setLoading(true);
      await departmentAPI.delete(id); // DELETE /company/departments/<id>/
      await fetchEmployee();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete department');
      throw err;
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchEmployee();
  }, []);

  return {
    employee,
    loading,
    error,
    addEmployee,
    // refetch: fetchDepartments,
    // addDepartment,
    // updateDepartment,
    // deleteDepartment,
  };
};