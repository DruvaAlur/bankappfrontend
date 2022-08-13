import { useState } from "react";
import Box from "@mui/joy/Box";
import Alert from "@mui/material/Alert";
import TextField from "@mui/joy/TextField";
import NavBar from "../userDashboard/navigationBar/navigationBar";
import axios from "axios";
import { useParams } from "react-router-dom";
function DepositMoney() {
  const username = useParams();
  const [amount, updateAmount] = useState("");
  const [bankAbbre, updateBankAbbre] = useState("");
  const [status, updateStatus] = useState("");
  const handleDepositMoney = () => {
    axios
      .post(`http://localhost:8800/api/v1/depositMoney/${username.username}`, {
        amount,
        bankAbbre,
      })
      .then((resp) => {
        updateStatus(<Alert severity="success">Amount Deposit Success</Alert>);
      })
      .catch((error) => {
        updateStatus(<Alert severity="error">{error.response.data}</Alert>);
      });
  };
  return (
    <>
      <NavBar />
      <form style={{ width: "25vw" }}>
        <TextField
          label="Ammount"
          placeholder="Type in here"
          variant="outlined"
          onChange={(e) => updateAmount(e.target.value)}
        />
        <br />
        <TextField
          label="Bank Abbrevation"
          placeholder="Type in here"
          variant="outlined"
          onChange={(e) => updateBankAbbre(e.target.value)}
        />

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
