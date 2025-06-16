import React from "react";
import { useEffect } from "react";
import { prepareExpenseBarChartData } from "../../utils/helper";
import { useState } from "react";
import CustomBarChart from "../../components/Charts/CustomBarChart";
const Last30DaysExpenses = ({ data }) => {
  const [chartData, setCharData] = useState([]);
  useEffect(() => {
    const result = prepareExpenseBarChartData(data);
    setCharData(result);
    return () => {};
  }, [data]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md shadow-gray--100 border border-gray-200/50 col-span-1">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 30 Days Expenses</h5>
      </div>
      <CustomBarChart data={chartData} />
    </div>
  );
};

export default Last30DaysExpenses;
