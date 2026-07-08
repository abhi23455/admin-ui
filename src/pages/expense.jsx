import React, { useContext, useEffect, useState } from "react"; 
import MainLayout from "../components/Layouts/MainLayout";
import CardExpenses from "../components/Fragments/CardExpenses";
import { expenseService } from "../services/dataService";
import { AuthContext } from "../context/authContext";
import { expensesBreakdowns } from "../data.jsx";

function Expense() {
  const [expenses, setExpenses] = useState([]);
  const { logout } = useContext(AuthContext);

  const fetchExpenses = async () => {
    try {
      console.log("Fetching expenses...");
      const data = await expenseService();
      console.log("Expenses data received:", data);
      setExpenses(data || []);
    } catch (err) {
      console.error("Error fetching expenses:", err);
      // Use sample data instead of showing snackbar
      setExpenses(expensesBreakdowns);
      if (err.status === 401) {
        logout();
      }
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <>
      <MainLayout>
        <CardExpenses data={expenses} />
      </MainLayout>
    </>
  );
}

export default Expense;
