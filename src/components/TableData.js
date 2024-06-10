import React from "react";

const tableData = ({ count, singleData }) => {
  const { date, trade_code, high, low, open, close, volume } = singleData;
  return (
    <tr className="border-b dark:border-neutral-500 hover:bg-slate-200 transition-colors">
      <td className="whitespace-nowrap px-6 py-4 font-medium">{count}</td>
      <td className="whitespace-nowrap px-6 py-4">{date}</td>
      <td className="whitespace-nowrap px-6 py-4">{trade_code}</td>
      <td className="whitespace-nowrap px-6 py-4">{high}</td>
      <td className="whitespace-nowrap px-6 py-4">{low}</td>
      <td className="whitespace-nowrap px-6 py-4">{open}</td>
      <td className="whitespace-nowrap px-6 py-4">{close}</td>
      <td className="whitespace-nowrap px-6 py-4">{volume}</td>
    </tr>
  );
};

export default tableData;
