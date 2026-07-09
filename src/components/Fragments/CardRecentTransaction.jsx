import React, { useState, useContext } from "react";
import Card from "../Elements/Card";
import { ThemeContext } from "../../context/themeContext";

function CardRecentTransaction(props) {
  const { data } = props;
  const tabs = ["All", "Revenue", "Expense"];
  const [active, setActive] = useState("All");
  const { isDarkMode } = useContext(ThemeContext);

  const filteredData =
    active === "All" ? data : data.filter((item) => item.type === active);
    
  return (
    <>
      <Card
        title="Recent Transactions"
        link="/transactions"
        desc={
          <>
            <div className="mb-4">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  	className={
                    active == tab
                      ? "px-4 font-bold text-primary border-b-4 border-primary"
                      : `px-4 font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-01'}`
                  }
                  onClick={() => setActive(tab)}
                  value={tab}
                >
                  {tab}
                </button>
              ))}
            </div>
            						{filteredData.map((item) => (
              <div key={item.id} className="flex justify-between my-6">
                <div className="flex">
                  <div className="bg-special-bg text-gray-02 px-3 rounded-lg flex flex-col place-content-center">
                    {item.icon}
                  </div>
                  <div className="ms-4">
                    <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      {item.transactionName}
                    </span>
                    <br />
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-02'}>{item.shopName}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-02'}`}>
                    ${item.amount}
                  </span>
                  <br />
                  <span className={isDarkMode ? 'text-gray-300' : 'text-gray-02'}>{item.date}</span>
                </div>
              </div>
            ))}
          </>
        }
      />
    </>
  );
}

export default CardRecentTransaction;