import React from "react";

const tableData = ({ count, singleData, updateItem, deleteItem }) => {
  const { id, date, trade_code, high, low, open, close, volume } = singleData;

  const dateShorten = date.split("T")[0];
  return (
    <tr className="border-b dark:border-neutral-500 hover:bg-slate-200 transition-colors">
      <td className="whitespace-nowrap px-6 py-4 font-medium">{count}</td>
      <td className="whitespace-nowrap px-6 py-4">{dateShorten}</td>
      <td className="whitespace-nowrap px-6 py-4">{trade_code}</td>
      <td className="whitespace-nowrap px-6 py-4">{high}</td>
      <td className="whitespace-nowrap px-6 py-4">{low}</td>
      <td className="whitespace-nowrap px-6 py-4">{open}</td>
      <td className="whitespace-nowrap px-6 py-4">{close}</td>
      <td className="whitespace-nowrap px-6 py-4">{volume}</td>
      <td className="whitespace-nowrap px-6 py-4">
        <ul>
          <li
            onClick={() => {
              updateItem(singleData);
            }}
          >
            Edit
          </li>
          <li
            onClick={() => {
              deleteItem(id);
            }}
          >
            Delete
          </li>
        </ul>
      </td>
    </tr>
  );
};

export default tableData;
