import React from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

const RecentTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md shadow-gray-100 border border-gray-200/50">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h5 className="text-base font-semibold text-gray-800">
          Recent Transactions
        </h5>
        <button
          onClick={onSeeMore}
          className="flex items-center gap-2 text-sm text-gray-700 px-3 py-1.5 bg-gray-100 rounded-md hover:text-purple-500 bg-gray-50 hover:bg-purple-50 px-4 py-1.5 rounded-lg border-gray-200/50 cursor-pointer"
        >
          See All <LuArrowRight className="text-base" />
        </button>
      </div>

      {/* Transactions List */}
      <div className="mt-4 space-y-2">
        {transactions?.slice(0, 5)?.map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.type === "expense" ? item.category : item.source}
            icon={item.icon}
            date={moment(item.date).format("DD MMM YYYY")}
            amount={item.amount}
            type={item.type}
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
