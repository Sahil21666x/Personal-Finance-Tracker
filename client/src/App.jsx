import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import DashBoard from "./pages/DashBoard";
import LoginPage from "./pages/LoginPage";
import Transactions from "./components/Transactions";
import AddTransaction from "./components/AddTransaction";

export default function App() {

  const user = JSON.parse(localStorage.getItem("user"));

  console.log(user,"app js user");

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashBoard />       
          </ProtectedRoute>
        }

        children={[
          <Route path="transactions"
           key={"transactions"}
           element={
            <ProtectedRoute>
              <Transactions user={user}/>
            </ProtectedRoute>
          } />,
          <Route path="add-transaction"
          key={"add-transaction"} 
          element={
            <ProtectedRoute>
              <AddTransaction />
            </ProtectedRoute>
        } />,
        ]}
        
      />
    </Routes>
  );
}
