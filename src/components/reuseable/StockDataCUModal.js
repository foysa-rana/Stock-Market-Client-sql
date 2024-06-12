import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { FaXmark } from "react-icons/fa6";

import "react-datepicker/dist/react-datepicker.css";

const StockDataCUModal = ({
  button,
  singleData,
  actionHandle,
  actionModalClose,
}) => {
  const { id, date, trade_code, high, low, open, close, volume } = singleData;
  const [startDate, setStartDate] = useState(new Date(date));
  const [changeData, setChangeData] = useState({
    date: startDate,
    trade_code,
    high,
    low,
    open,
    close,
    volume,
  });
  const onChange = (e) => {
    setChangeData({ ...changeData, [e.target.name]: e.target.value });
  };
  //   console.log(singleData);

  return (
    <div className="relative z-10">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-start justify-center p-4 text-center sm:p-0 sm:items-center">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold">Update Data</h1>
                    <button
                      type="button"
                      onClick={() => {
                        actionModalClose(true);
                      }}
                    >
                      <FaXmark />
                    </button>
                  </div>
                  <div className="mt-2">
                    <form action="">
                      <div className="relative mb-2">
                        <label
                          htmlFor="date"
                          className="leading-7 text-sm text-gray-600"
                        >
                          Date
                        </label>
                        <div className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                          <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                          />
                        </div>
                      </div>
                      <div className="relative mb-2">
                        <label
                          htmlFor="trade_code"
                          className="leading-7 text-sm text-gray-600"
                        >
                          Trade Code
                        </label>
                        <input
                          type="text"
                          id="trade_code"
                          name="trade_code"
                          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          value={changeData.trade_code}
                          onChange={onChange}
                        />
                      </div>
                      <div className="relative mb-2">
                        <label
                          htmlFor="high"
                          className="leading-7 text-sm text-gray-600"
                        >
                          High
                        </label>
                        <input
                          type="number"
                          id="high"
                          name="high"
                          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          value={changeData.high}
                          onChange={onChange}
                        />
                      </div>
                      <div className="relative mb-2">
                        <label
                          htmlFor="low"
                          className="leading-7 text-sm text-gray-600"
                        >
                          Low
                        </label>
                        <input
                          type="number"
                          id="low"
                          name="low"
                          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          value={changeData.low}
                          onChange={onChange}
                        />
                      </div>
                      <div className="relative mb-2">
                        <label
                          htmlFor="open"
                          className="leading-7 text-sm text-gray-600"
                        >
                          Open
                        </label>
                        <input
                          type="number"
                          id="open"
                          name="open"
                          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          value={changeData.open}
                          onChange={onChange}
                        />
                      </div>
                      <div className="relative mb-2">
                        <label
                          htmlFor="close"
                          className="leading-7 text-sm text-gray-600"
                        >
                          Close
                        </label>
                        <input
                          type="number"
                          id="close"
                          name="close"
                          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          value={changeData.close}
                          onChange={onChange}
                        />
                      </div>
                      <div className="relative mb-2">
                        <label
                          htmlFor="volume"
                          className="leading-7 text-sm text-gray-600"
                        >
                          Volume
                        </label>
                        <input
                          type="number"
                          id="volume"
                          name="volume"
                          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          value={changeData.volume}
                          onChange={onChange}
                        />
                      </div>
                    </form>
                    <button
                      className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg w-full mt-5"
                      onClick={() => {
                        id > 0
                          ? actionHandle(id, changeData)
                          : actionHandle(changeData);
                      }}
                    >
                      {button}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockDataCUModal;
