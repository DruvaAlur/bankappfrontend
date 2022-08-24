import axios from "axios";
import { useState } from "react";
import Box from "@mui/joy/Box";
import Alert from "@mui/material/Alert";
import TextField from "@mui/joy/TextField";
import { useParams } from "react-router-dom";
import NavBar from "../userDashboard/navigationBar/navigationBar";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
function TransferMoney() {
  const navigation = new useNavigate();
  const [loginStatus, updateLoginStatus] = useState("");
  const currentUser = useParams();
  const [status, updateStatus] = useState("");
  const [amount, updateAmount] = useState("");
  const [creditCustomerusername, updateCreditCustomerusername] = useState("");
  const [creditBankAbbre, updateCreditBankAbbre] = useState("");
  const [debitBankAbbre, updateDebitBankAbbre] = useState("");
  const [allDebitAccounts, updateAllDebitAccounts] = useState("");
  const [allCreditAccounts, updateAllCreditAccounts] = useState("");
  const [allCreditCustomers, updateAllCreditCustomers] = useState("");

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
      .post(`http://localhost:8800/api/v1/getAllCustomers`)
      .then((resp) => {
        console.log(resp.data);
        updateAllCreditCustomers(resp.data);

        updateCreditCustomerusername(resp.data[0].credential.username);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
    axios
      .get(
        `http://localhost:8800/api/v1/getAllAccounts/${currentUser.username}`
      )
      .then((resp) => {
        updateAllDebitAccounts(resp.data);
        console.log(resp.data);
        updateDebitBankAbbre(resp.data[0].bank.bankAbbre);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);
  useEffect(() => {
    console.log("in effect");
    console.log(creditCustomerusername);
    if (creditCustomerusername) {
      axios
        .get(
          `http://localhost:8800/api/v1/getAllAccounts/${creditCustomerusername}`
        )
        .then((resp) => {
          updateAllCreditAccounts(resp.data);
          console.log(resp.data);
          updateCreditBankAbbre(resp.data[0].bank.bankAbbre);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  }, [creditCustomerusername]);
  let optionsOfBankAbbrevation;
  if (allDebitAccounts != null) {
    optionsOfBankAbbrevation = Object.values(allDebitAccounts).map((a) => {
      return <option value={a.bank.bankAbbre}>{a.bank.bankAbbre}</option>;
    });
  }
  let optionsOfCreditCustomers;
  if (allCreditCustomers != null) {
    optionsOfCreditCustomers = Object.values(allCreditCustomers).map((a) => {
      return (
        <option value={a.credential.username}>{a.credential.username}</option>
      );
    });
  }
  let optionsOfCreditBankAbbrevation;
  if (allCreditAccounts != null) {
    optionsOfCreditBankAbbrevation = Object.values(allCreditAccounts).map(
      (a) => {
        return <option value={a.bank.bankAbbre}>{a.bank.bankAbbre}</option>;
      }
    );
  }
  if (!loginStatus) {
    return (
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
    );
  }
  const handleTransferMoney = () => {
    axios
      .post(`http://localhost:8800/api/v1/transfer/${currentUser.username}`, {
        amount,
        creditCustomerusername,
        creditBankAbbre,
        debitBankAbbre,
      })
      .then((response) => {
        updateStatus(<Alert severity="success">Transfer Successfull!</Alert>);
      })
      .catch((error) => {
        updateStatus(<Alert severity="error">{error.response.data}</Alert>);
      });
  };
  return (
    <>
      <NavBar username={currentUser.username} />
      <form style={{ width: "25vw" }}>
        <TextField
          label="ammount"
          placeholder="Type in here"
          variant="outlined"
          onChange={(e) => updateAmount(e.target.value)}
        />
        {/* <TextField
          label="Credit Customer Username"
          placeholder="Type in here"
          variant="outlined"
          onChange={(e) => updateCreditCustomerusername(e.target.value)}
        /> */}
        <label class="fw-bold">Credit Customer Username</label>
        <select
          id="BankAbbrevation"
          name="BankAbbrevation"
          onChange={(e) => {
            updateCreditCustomerusername(e.target.value);
          }}
        >
          {optionsOfCreditCustomers}
        </select>
        {/* <TextField
          label="Credit Bank Abbrevation"
          placeholder="Type in here"
          variant="outlined"
          onChange={(e) => updateCreditBankAbbre(e.target.value)}
        /> */}
        <label class="fw-bold">Credit Bank Abbrevation</label>
        <select
          id="CreditBankAbbrevation"
          name="CreditBankAbbrevation"
          onChange={(e) => {
            updateCreditBankAbbre(e.target.value);
          }}
        >
          {optionsOfCreditBankAbbrevation}
        </select>
        {/* <TextField
          label="Debit Bank Abbrevation"
          placeholder="Type in here"
          variant="outlined"
          onChange={(e) => updateDebitBankAbbre(e.target.value)}
        /> */}
        <label class="fw-bold">Debit Bank Abbrevation</label>
        <select
          id="BankAbbrevation"
          name="BankAbbrevation"
          onChange={(e) => {
            updateDebitBankAbbre(e.target.value);
          }}
        >
          {optionsOfBankAbbrevation}
        </select>
        <br />
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <button
            type="button"
            class="btn btn-primary"
            onClick={handleTransferMoney}
          >
            Withdraw money
          </button>
        </Box>
        {status}
      </form>
    </>
  );
}
export default TransferMoney;
