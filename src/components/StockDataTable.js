import React, { useContext, useEffect, useState } from "react";
import TableData from "./TableData";
import StockDataContext from "../context/StockDataContext";
import DeleteModal from "./reuseable/DeleteModal";
import StockDataCUModal from "./reuseable/StockDataCUModal";
import Toast from "./reuseable/Toast";
import MultiChart from "./reuseable/MultiChart";

const StockDataTable = ({ showItem }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState([]);
  const [deleteClicked, setDeleteClicked] = useState(false);
  const [updateClicked, setUpdateClicked] = useState(false);
  const [addClicked, setAddClicked] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [singleData, setSingleData] = useState("");
  const [selectValue, setSelectValue] = useState();
  const [toast, setToast] = useState({
    clicked: false,
    color: "",
    messeage: "",
  });
  // context ==> StockDataContext
  const { data, loader, getAllData, addNewData, updateData, deleteData } =
    useContext(StockDataContext);

  // useffect for fetching all data
  useEffect(() => {
    getAllData();
  }, []);

  let count = 0;

  // chart logics
  let tradeCode = data.map((el) => el.trade_code);
  // console.log(tradeCode);
  let uniqueTradeCode = tradeCode.filter((value, index, array) => {
    // console.log(array);
    return array.indexOf(value) === index;
  });

  useEffect(() => {
    if (!selectValue) {
      setSelectValue(uniqueTradeCode[0]);
    }
  }, [selectValue, uniqueTradeCode]);

  const onchange = (e) => {
    setSelectValue(e.target.value);
  };

  // show only fiexd data
  let lastIndex = currentPage * showItem;
  let firstIndex = lastIndex - showItem;
  let totalPage = Math.ceil(data.length / showItem);

  useEffect(() => {
    setCurrentItems((prevState) => [
      ...prevState,
      ...data.slice(firstIndex, lastIndex),
    ]);
  }, [data, firstIndex, lastIndex]);

  // load more event
  const loadMoreData = () => {
    setCurrentPage((prevSate) => prevSate + 1);
  };
  //update event
  const addItem = () => {
    setAddClicked(true);
    // updateData(stockData);
    let stockData = {
      id: 0,
      date: new Date(),
      trade_code: "",
      high: 0,
      low: 0,
      open: 0,
      close: 0,
      volume: 0,
    };
    setSingleData(stockData);
  };

  //adding new data to server
  const addHandle = async (newStockData) => {
    let response = await addNewData(newStockData);
    if (!response.error) {
      currentItems.unshift(response);
      currentItems.pop();
      setCurrentItems((prevSate) => prevSate);
      setAddClicked(false);
      setToast({
        clicked: true,
        color: "#16a34a",
        messeage: "Data has been succesfully created...",
      });
    } else {
      setToast({
        clicked: true,
        color: "#dc2626",
        messeage: "Failed to create new data please try again...",
      });
    }
  };

  // add modal close
  const addModalClose = (close) => {
    if (close) {
      setAddClicked(false);
    }
  };

  //update event
  const updateItem = (stockData) => {
    setUpdateClicked(true);
    // updateData(stockData);
    setSingleData(stockData);
  };

  // sending data to server
  const updateHandle = async (id, updatedData) => {
    let response = await updateData(id, updatedData);
    if (!response.error) {
      const index = currentItems.findIndex((el) => {
        return el.id === id;
      });
      let newData = currentItems.filter((el) => {
        return el.id !== deleteId;
      });
      newData[index] = response;
      setCurrentItems(newData);
      setUpdateClicked(false);
      setToast({
        clicked: true,
        color: "#16a34a",
        messeage: "Data has been succesfully updated...",
      });
    } else {
      setUpdateClicked(false);
      setToast({
        clicked: true,
        color: "#dc2626",
        messeage: "Update failed please try again...",
      });
    }
  };

  //update modal close
  const updateModalClose = (close) => {
    if (close) {
      setUpdateClicked(false);
    }
  };

  //delete event
  const deleteItem = (id) => {
    setDeleteClicked(true);
    setDeleteId(id);
  };

  // delete confirmation event
  const deleteConfirm = async (res) => {
    if (res) {
      let response = await deleteData(deleteId);
      if (response.successful) {
        let newData = currentItems.filter((el) => {
          return el.id !== deleteId;
        });
        newData.push(data[lastIndex]);
        setCurrentItems(newData);
        setDeleteClicked(false);
        setToast({
          clicked: true,
          color: "#16a34a",
          messeage: "Data has been succesfully deleted...",
        });
      } else {
        setDeleteClicked(false);
        setToast({
          clicked: true,
          color: "#dc2626",
          messeage: "Delete failed please try again...",
        });
      }
    } else {
      setDeleteClicked(false);
    }
  };
  // toast timer
  if (toast.clicked) {
    setTimeout(() => {
      setToast({ clicked: false, color: "", messeage: "" });
    }, 5000);
  }
  //toas event
  const toastHandler = (close) => {
    if (close) {
      setToast({ clicked: false, color: "", messeage: "" });
    }
  };

  return (
    <>
      {toast.clicked && (
        <Toast
          color={toast.color}
          messeage={toast.messeage}
          toastHandler={toastHandler}
        />
      )}
      {deleteClicked && <DeleteModal deleteConfirm={deleteConfirm} />}
      {updateClicked && (
        <StockDataCUModal
          button="Update"
          singleData={singleData}
          actionHandle={updateHandle}
          actionModalClose={updateModalClose}
        />
      )}
      {addClicked && (
        <StockDataCUModal
          button="Create"
          singleData={singleData}
          actionHandle={addHandle}
          actionModalClose={addModalClose}
        />
      )}
      <div className="bg-gray-200">
        <div className="container mx-auto pb-10">
          <h1 className="text-3xl font-semibold text-center py-5">
            Stock Market Chart
          </h1>
          <div className="max-w-[640px] mx-auto">
            <div className="bg-slate-100 p-2 inline-block rounded-md mb-5">
              <select
                value={selectValue}
                onChange={onchange}
                className="bg-slate-100 "
              >
                {uniqueTradeCode.map((el, index) => (
                  <option key={index} value={el}>
                    {el}
                  </option>
                ))}
              </select>
            </div>
            {uniqueTradeCode.map((el) => {
              return (
                el === selectValue && (
                  <MultiChart key={el} selectValue={selectValue} data={data} />
                )
              );
            })}
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="flex flex-col overflow-x-auto">
          <div className="">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-x-auto relative">
                <h1 className="text-3xl font-semibold text-center mt-5 mb-10">
                  Stock Market Data
                </h1>
                <button
                  className="group h-10 w-40 overflow-hidden rounded-lg bg-green-500 text-base font-bold text-white absolute right-0 top-12"
                  onClick={addItem}
                >
                  Add More Data
                  <div className="absolute inset-0 h-full w-full scale-0 rounded-lg transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
                </button>
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
                      <th scope="col" className="px-6 py-4">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((el) => {
                      count++;
                      return (
                        <TableData
                          key={count}
                          count={count}
                          singleData={el}
                          updateItem={updateItem}
                          deleteItem={deleteItem}
                        />
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
      </div>
    </>
  );
};

export default StockDataTable;
