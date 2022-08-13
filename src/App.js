import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { CssVarsProvider } from "@mui/joy/styles";
import Login from "./Components/Login/login";
import AdminDashboard from "./Components/AdminDashboard/adminDashboard";
import CreateBank from "./Components/createBank/createBank";
import CreateCustomer from "./Components/createCustomer/createCustomer";
import UserDashboard from "./Components/userDashboard/userDashboard";
import GetAllCustomers from "./Components/getAllCustomers/getAllCustomers";
import CreateAccount from "./Components/createAccount/createAccount";
import DepositMoney from "./Components/depositMoney/depositMoney";
function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/adminDashboard" element={<AdminDashboard />} />
      <Route exact path="/adminDashboard/createBank" element={<CreateBank />} />
      <Route
        exact
        path="/adminDashboard/createCustomer"
        element={<CreateCustomer />}
      />
      <Route
        exact
        path="/userDashboard/:username"
        element={<UserDashboard />}
      />
      <Route
        exact
        path="/adminDashboard/getAllCustomers"
        element={<GetAllCustomers />}
      />
      <Route
        exact
        path="/userDashboard/createAccount/:username"
        element={<CreateAccount />}
      />
      <Route
        exact
        path="/userDashboard/depositMoney/:username"
        element={<DepositMoney />}
      />
    </Routes>
  );
}

export default App;
