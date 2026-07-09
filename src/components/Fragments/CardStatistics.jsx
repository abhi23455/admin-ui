import React, { useContext } from "react";
import Card from "../Elements/Card";
import BarsDataset from "../Elements/BarsDataset";
import { ThemeContext } from "../../context/themeContext";

function CardStatistic(props) {
  const { data } = props;
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <>
      <Card
        title="Statistics"
        desc={
          <>
            <select className={`font-bold text-2xl ${isDarkMode ? 'text-white bg-gray-700 border border-gray-600' : 'text-black bg-white'}`}>
              <option>Weekly Comparison</option>
            </select>
            <BarsDataset dataset={data} />
          </>
        }
      />
    </>
  );
}

export default CardStatistic;