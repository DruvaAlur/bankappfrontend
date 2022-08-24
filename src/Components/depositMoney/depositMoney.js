import { useEffect, useState } from "react";
import Box from "@mui/joy/Box";
import Alert from "@mui/material/Alert";
import TextField from "@mui/joy/TextField";
import NavBar from "../userDashboard/navigationBar/navigationBar";
import axios from "axios";
import { useParams } from "react-router-dom";
import isUserLoggedIn from "../isUserLoggedIn/IsUserLoggedIn";
import { Async } from "react-async";
import { Navigate, useNavigate } from "react-router-dom";

function DepositMoney() {
  const currentUser = useParams();
  const navigation = new useNavigate();
  const [amount, updateAmount] = useState("");
  const [bankAbbre, updateBankAbbre] = useState("");
  const [status, updateStatus] = useState("");
  const [loginStatus, updateLoginStatus] = useState("");
  const [allAccounts, updateAllAccounts] = useState("");
  useEffect(() => {
    axios
      .post(
        `http://localhost:8800/api/v1/isUserLoggedIn/${currentUser.username}`,
        {}
      )
      .then((resp) => {
        updateLoginStatus(true);
      })
      .catch((error) => {
        console.log(error.response.data);
        updateLoginStatus(false);
      });
    axios
      .get(
        `http://localhost:8800/api/v1/getAllAccounts/${currentUser.username}`
      )
      .then((resp) => {
        console.log(resp.data);
        updateAllAccounts(resp.data);
        updateBankAbbre(resp.data[0].bank.bankAbbre);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);
  if (!loginStatus) {
    return (
      <>
        <div
          style={{
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            flexDirection: "column",
          }}
        >
          <p style={{ color: "red", fontSize: "20px" }}>
            User not logged in please login by clicking below
          </p>

          <button
            onClick={() => navigation("/")}
            class="btn btn-secondary button"
          >
            login
          </button>
        </div>
      </>
    );
  }
  const handleDepositMoney = () => {
    axios
      .post(
        `http://localhost:8800/api/v1/depositMoney/${currentUser.username}`,
        {
          amount,
          bankAbbre,
        }
      )
      .then((resp) => {
        updateStatus(<Alert severity="success">Amount Deposit Success</Alert>);
      })
      .catch((error) => {
        updateStatus(<Alert severity="error">{error.response.data}</Alert>);
      });
  };
  let optionsOfBankAbbrevation;
  if (allAccounts != null) {
    optionsOfBankAbbrevation = Object.values(allAccounts).map((a) => {
      return <option value={a.bank.bankAbbre}>{a.bank.bankAbbre}</option>;
    });
  }
  return (
    <>
      <NavBar username={currentUser.username} />
      <form style={{ width: "25vw" }}>
        <TextField
          label="Ammount"
          placeholder="Type in here"
          variant="outlined"
          onChange={(e) => updateAmount(e.target.value)}
        />
        <br />
        {/* <TextField
          label="Bank Abbrevation"
          placeholder="Type in here"
          variant="outlined"
          onChange={(e) => updateBankAbbre(e.target.value)}
        /> */}
        <label class="fw-bold">Bank Abbrevation</label>
        <select
          id="BankAbbrevation"
          name="BankAbbrevation"
          onChange={(e) => {
            updateBankAbbre(e.target.value);
          }}
        >
          {optionsOfBankAbbrevation}
        </select>
        <br />
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <button
            type="button"
            class="btn btn-primary"
            onClick={handleDepositMoney}
          >
            Create Account
          </button>
          {/* <Button variant="solid" color="primary" onClick={handleLogin}>
                Submit
              </Button> */}
        </Box>
        {status}
      </form>
    </>
  );
}
export default DepositMoney;
