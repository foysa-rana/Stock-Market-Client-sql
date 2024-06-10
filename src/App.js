import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import StockDataTable from "./components/StockDataTable";
import StockDataSate from "./context/StockDataSate";
import Navbar from "./components/Navbar";

// react router
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="App">
        <Navbar />
        <Outlet />
      </div>
    ),
    children: [
      {
        index: true,
        element: (
          <div className="container mx-auto">
            <StockDataSate>
              <StockDataTable showItem={15} />
            </StockDataSate>
          </div>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
