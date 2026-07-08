import React from "react";
import Card from "../Elements/Card";
import Icon from "../Elements/Icon";
import CircularProgress from '@mui/material/CircularProgress';

const categoryIcons = {
  "Housing": <Icon.House />,
  "Food": <Icon.Food />,
  "Transportation": <Icon.Transport />,
  "Entertainment": <Icon.Gamepad />,
  "Shopping": <Icon.Shopping />,
  "Others": <Icon.Other />,
};

function CardExpenses(props) {
  const { data } = props;
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (data && data.length > 0) {
      setIsLoading(false);
    } else {
      // Setelah 2 detik, anggap loading selesai dan tampilkan sample
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-full text-primary">
        <CircularProgress color="inherit" size={50} enableTrackSlot />
        Loading Data
      </div>
    );
  }

  // Data dummy untuk testing (sesuai gambar dosen) jika API tidak mengembalikan data
  const sampleCategories = [
    { id: 1, category: "Housing", amount: 250, percentage: 15, arrow: "down", items: [{ name: "House Rent", amount: 20, date: "17 May 2023" }, { name: "Parking", amount: 120, date: "17 May 2023" }] },
    { id: 2, category: "Food", amount: 350, percentage: 8, arrow: "down", items: [{ name: "Grocery", amount: 120, date: "17 May 2023" }, { name: "Restaurant Bill", amount: 80, date: "17 May 2023" }] },
    { id: 3, category: "Transportation", amount: 50, percentage: 12, arrow: "down", items: [{ name: "Taxi Fare", amount: 30, date: "17 May 2023" }, { name: "Metro Card Bill", amount: 230, date: "17 May 2023" }] },
    { id: 4, category: "Entertainment", amount: 80, percentage: 15, arrow: "down", items: [{ name: "Movie Ticket", amount: 50, date: "17 May 2023" }, { name: "iTunes", amount: 190, date: "17 May 2023" }] },
    { id: 5, category: "Shopping", amount: 420, percentage: 25, arrow: "up", items: [{ name: "Shirt", amount: 120, date: "17 May 2023" }, { name: "Jeans", amount: 80, date: "17 May 2023" }] },
    { id: 6, category: "Others", amount: 50, percentage: 23, arrow: "up", items: [{ name: "Donation", amount: 30, date: "17 May 2023" }, { name: "Gift", amount: 120, date: "17 May 2023" }] },
  ];

  // Coba kelompokkan data dari API, jika tidak berhasil gunakan sample
  let expenseCategories = sampleCategories;
  try {
    const groupedExpenses = data.reduce((acc, expense) => {
      if (!acc[expense.category]) {
        acc[expense.category] = {
          id: expense.id,
          category: expense.category,
          amount: 0,
          percentage: 15,
          arrow: "down",
          items: [],
        };
      }
      acc[expense.category].amount += expense.amount;
      acc[expense.category].items.push(expense);
      return acc;
    }, {});
    const grouped = Object.values(groupedExpenses);
    if (grouped.length > 0) {
      expenseCategories = grouped;
    }
  } catch (e) {
    console.error("Error grouping data:", e);
  }

  const expenseContent = (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {expenseCategories.map((category) => (
        <div key={category.id} className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-md">
                {categoryIcons[category.category] || <Icon.Other />}
              </div>
              <div>
                <div className="font-semibold">{category.category}</div>
                <div className="text-2xl font-bold">${category.amount}</div>
              </div>
            </div>
            <div className="text-right">
              <span className={`text-sm ${category.arrow === "up" ? "text-red-500" : "text-green-500"}`}>
                {category.percentage}% {category.arrow === "up" ? <Icon.ArrowUp size={14} /> : <Icon.ArrowDown size={14} />}
              </span>
            </div>
          </div>
          <div className="text-xs text-gray-500 mb-3">Compare to the last month</div>
          <div className="space-y-2">
            {category.items.slice(0, 2).map((item, itemIdx) => (
              <div key={itemIdx} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                <span className="text-sm">{item.name}</span>
                <div className="text-right">
                  <span className="text-sm font-semibold">${item.amount}</span>
                  <div className="text-xs text-gray-400">{item.date || "17 May 2023"}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <Card title="Expenses Comparison" desc={expenseContent} />
    </>
  );
}

export default CardExpenses;
