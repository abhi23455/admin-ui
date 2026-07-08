import axios from "axios";
import Icon from "../components/Elements/Icon";

const API_URL = "https://jwt-auth-eight-neon.vercel.app";

export const goalService = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/goals`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }, 
    });
    return response.data.data[0];
  } catch (error) {
    throw {
      status: error.response?.status,
      msg: error.response?.data?.msg,
    };
  }
};

export const expenseService = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/expenses`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }, 
    });
    return response.data.data;
  } catch (error) {
    throw {
      status: error.response?.status,
      msg: error.response?.data?.msg,
    };
  }
};

export const billService = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/bills`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }, 
    });
    // Map data untuk menambahkan icon
    const billsWithIcons = response.data.data.map(bill => {
      let icon = <Icon.Other />;
      if (bill.name?.toLowerCase().includes('figma')) icon = <Icon.Figma />;
      else if (bill.name?.toLowerCase().includes('adobe')) icon = <Icon.Adobe />;
      return { ...bill, icon };
    });
    return billsWithIcons;
  } catch (error) {
    throw {
      status: error.response?.status,
      msg: error.response?.data?.msg,
    };
  }
};