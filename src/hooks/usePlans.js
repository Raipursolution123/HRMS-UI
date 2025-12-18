import { useState, useEffect } from "react";
import { planApi } from "../services/planServices";
import { message } from 'antd';

export const usePlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPlans = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await planApi.getAll();
      setPlans(response.data);
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Failed to fetch plans";
      setError(errorMsg);
      message.error(errorMsg);
      console.error("Error fetching plans:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  return {
    plans,
    loading,
    error,
    refreshPlans: fetchPlans
  };
};
