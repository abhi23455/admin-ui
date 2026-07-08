import React, { useContext, useEffect, useState } from "react"; 
import MainLayout from "../components/Layouts/MainLayout";
import CardBalance from "../components/Fragments/CardBalance";
import CardGoal from "../components/Fragments/CardGoal";
import CardUpcomingBill from "../components/Fragments/CardUpcomingBill";
import CardRecentTransaction from "../components/Fragments/CardRecentTransaction";
import CardStatistics from "../components/Fragments/CardStatistics";
import CardExpenseBreakdown from "../components/Fragments/CardExpenseBreakdown";
import { transactions, expensesBreakdowns, balances, expensesStatistics, goals as sampleGoals } from "../data.jsx";
import { goalService, billService } from "../services/dataService";
import { AuthContext } from "../context/authContext";
import AppSnackbar from "../components/Elements/AppSnackbar";

function dashboard() {
  	const [goals, setGoals] = useState({});
    const [isLoadingGoals, setIsLoadingGoals] = useState(true);
    const [bills, setBills] = useState(null); // Ubah initial state menjadi null
    const { logout } = useContext(AuthContext);

    const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const fetchGoals = async () => {
    setIsLoadingGoals(true);
    try {
      const data = await goalService();
      setGoals(data);
    } catch (err) {
      console.error("Error fetching goals:", err);
      setGoals(sampleGoals); // Set to sample data
      if (err.status === 401) {
        logout();
      }
    } finally {
      setIsLoadingGoals(false);
    }
  };

  const fetchBills = async () => {
    try {
      const data = await billService();
      setBills(data);
    } catch (err) {
      console.error("Error fetching bills:", err);
      setBills([]); // Set ke array kosong, CardUpcomingBill akan gunakan sample data
      if (err.status === 401) {
        logout();
      }
    }
  };

  useEffect(() => {
    fetchGoals();
    fetchBills();
  }, []);
  
  console.log(goals);
  console.log(bills);
  return (
    <>
       	<MainLayout>
        <div className="grid sm:grid-cols-12 gap-6">
          <div className="sm:col-span-4">
            <CardBalance data={balances} />
          </div>
          <div className="sm:col-span-4">
            <CardGoal data={goals} isLoading={isLoadingGoals} />
          </div>
          <div className="sm:col-span-4">
            <CardUpcomingBill data={bills} />
          </div>
          					<div className="sm:col-span-4 sm:row-span-2">
            <CardRecentTransaction data={transactions} />
          </div>
          <div className="sm:col-span-8">
            <CardStatistics data={expensesStatistics} />
          </div>
          <div className="sm:col-span-8">
            <CardExpenseBreakdown data={expensesBreakdowns} />
          </div>
        </div>

        <AppSnackbar
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          onClose={handleCloseSnackbar}
        />
      </MainLayout>
    </>
  );
}

export default dashboard;