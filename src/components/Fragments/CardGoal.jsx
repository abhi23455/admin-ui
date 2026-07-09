import React, { useContext } from "react";
import Card from "../Elements/Card";
import Icon from "../Elements/Icon";
import CompositionExample from "../Elements/CompositionExample";
import CircularProgress from '@mui/material/CircularProgress';
import { ThemeContext } from "../../context/themeContext";

function CardGoal(props) {
  const { data, isLoading = false } = props;
  const { isDarkMode } = useContext(ThemeContext);

  // Support both snake_case (API) and camelCase (sample data)
  const targetAmount = data.target_amount || data.targetAmount;
  const presentAmount = data.present_amount || data.presentAmount;
  const chartValue = (presentAmount / targetAmount) * 100;
  
  const chartData = (
    <div className="p-2">
            <div className="flex justify-between items-center">
              <div className="flex">
                <span className={`text-2xl font-bold me-4 ${isDarkMode ? 'text-white' : 'text-black'}`}>
                  ${targetAmount}
                </span>
                <div className="p-2 bg-gray-05 text-gray-01 rounded-md box-border">
                  <Icon.Edit size={16} />
                </div>
              </div>
              <div className={isDarkMode ? 'text-gray-300' : ''}>Nov, 2023</div>
            </div>
            <div className="border-b-2 border-gray-05 my-4"></div>
            <div className="flex justify-between">
              <div>
                <div className={`flex mt-3 mb-10 ${isDarkMode ? 'text-gray-300' : 'text-gray-01'}`}>
                  <Icon.Award />
                  <div className="ms-2">
                    <div>Target Achieved</div>
                    <div className={`font-bold text-xl ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      ${presentAmount}
                    </div>
                  </div>
                </div>
                <div className={`flex ${isDarkMode ? 'text-gray-300' : 'text-gray-01'}`}>
                  <Icon.Target />
                  <div className="ms-2">
                    <div>This Month Target</div>
                    <div className={`font-bold text-xl ${isDarkMode ? 'text-white' : 'text-black'}`}>
                      ${targetAmount}
                    </div>
                  </div>
                </div>
              </div>
              <div className="ms-4 text-center">
                <CompositionExample data={chartValue} />
                <div className="flex justify-between">
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-03'}>$0</span>
                  <span className={`font-bold text-2xl ${isDarkMode ? 'text-white' : 'text-black'}`}>12K</span>
                  <span className={isDarkMode ? 'text-gray-400' : 'text-gray-03'}>$20K</span>
                </div>
                <div className={isDarkMode ? 'text-gray-300' : ''}>Target vs Achievement</div>
              </div>
            </div>
          </div>
  );

  return (
    <>
      <Card title="Goals" 
      				desc={
          isLoading || Object.keys(data).length === 0 ? (
	          	<div className="flex flex-col justify-center items-center h-full text-primary">
              <CircularProgress color="inherit" size={50} enableTrackSlot />
              Loading Data
            </div>
          ) : (
            chartData
          )
        } 
        />
    </>
  );
}

export default CardGoal;