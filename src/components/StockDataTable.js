import React, { useContext, useEffect, useState } from "react";
import TableData from "./TableData";
import StockDataContext from "../context/StockDataContext";

const StockDataTable = ({ showItem }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  // context ==> StockDataContext
  const { data, loader, getAllData } = useContext(StockDataContext);
  useEffect(() => {
    getAllData();
  }, []);
  let count = 0;

  let lastIndex = currentPage * showItem;
  let firstIndex = lastIndex - showItem;
  let totalPage = Math.ceil(data.length / showItem);
  //   let records = data.slice(firstIndex, lastIndex);

  useEffect(() => {
    setCurrentItems((prevState) => [
      ...prevState,
      ...data.slice(firstIndex, lastIndex),
    ]);
  }, [data, firstIndex, lastIndex]);

  const loadMoreData = () => {
    setCurrentPage((prevSate) => prevSate + 1);
  };
  return (
    <div className="flex flex-col overflow-x-auto">
      <div className="">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-x-auto">
            <h1 className="text-3xl font-semibold text-center my-5">
              Stock Market Data
            </h1>
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    #
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Trade Code
                  </th>
                  <th scope="col" className="px-6 py-4">
                    High
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Low
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Open
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Close
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Volume
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((el) => {
                  count++;
                  return (
                    <TableData key={count} count={count} singleData={el} />
                  );
                })}
              </tbody>
            </table>
            {loader ? (
              <p className="text-center mt-5 mb-10 cursor-pointer">
                Data Loading...
              </p>
            ) : (
              currentItems.length === 0 && (
                <p className="text-xl font-semibold text-center my-5">
                  There is no items available...
                </p>
              )
            )}
            {totalPage > currentPage && (
              <p
                className="text-center mt-5 mb-10 cursor-pointer"
                onClick={loadMoreData}
              >
                Load More...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockDataTable;
