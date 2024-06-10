import { useState } from "react";
import StockDataContext from "./StockDataContext";

const StockDataSate = ({ children }) => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  //host server
  const host = "https://stock-market-server-json.onrender.com";
  // get all stock data from api/stock/stockdata
  const getAllData = async () => {
    try {
      setLoader(true);
      let p = await fetch(host + "/api/stock/stockdata");
      let fetchData = await p.json();
      setData(fetchData);
      setLoader(false);
    } catch (error) {
      setLoader(true);
      setData([]);
      setLoader(false);
    }
  };
  return (
    <StockDataContext.Provider value={{ data, loader, getAllData }}>
      {children}
    </StockDataContext.Provider>
  );
};

export default StockDataSate;
