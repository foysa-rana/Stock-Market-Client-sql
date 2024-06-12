import { useState } from "react";
import StockDataContext from "./StockDataContext";

const StockDataSate = ({ children }) => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  //host server
  const host = "https://stock-market-sql.onrender.com";

  // get all stock data from /api/stock/getall/stockdata
  const getAllData = async () => {
    try {
      setLoader(true);
      let p = await fetch(host + "/api/stock/getall/stockdata");
      let fetchData = await p.json();
      setData(fetchData);
      setLoader(false);
    } catch (error) {
      setLoader(true);
      setData([]);
      setLoader(false);
    }
  };

  //add new stock data from /api/stock/create/stockdata
  const addNewData = async (data) => {
    const { date, trade_code, high, low, open, close, volume } = data;
    let p = await fetch(`${host}/api/stock/create/stockdata`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date,
        trade_code,
        high,
        low,
        open,
        close,
        volume,
      }),
    });
    let fetchData = await p.json();
    return fetchData;
  };

  //update stock data from /api/stock/update/stockdata/:id
  const updateData = async (id, data) => {
    const { date, trade_code, high, low, open, close, volume } = data;
    let p = await fetch(`${host}/api/stock/update/stockdata/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date,
        trade_code,
        high,
        low,
        open,
        close,
        volume,
      }),
    });
    let fetchData = await p.json();
    return fetchData;
  };

  //delete stock data from /api/stock/delete/stockdata/:id
  const deleteData = async (id) => {
    let p = await fetch(`${host}/api/stock/delete/stockdata/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let fetchData = await p.json();
    // let newData = data.filter((el) => {
    //   return el.id !== id;
    // });
    // setData(newData);
    return fetchData;
  };
  return (
    <StockDataContext.Provider
      value={{ data, loader, getAllData, addNewData, updateData, deleteData }}
    >
      {children}
    </StockDataContext.Provider>
  );
};

export default StockDataSate;
