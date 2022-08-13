import axios from "axios";
import Box from "@mui/joy/Box";
import Alert from "@mui/material/Alert";
import TextField from "@mui/joy/TextField";
import { useState } from "react";
import NavBar from "../AdminDashboard/NavigationBar/NavBar";
function CreateBank() {
  const [bankName, updateBankName] = useState("");
  const [bankAbbre, updateBankAbbre] = useState("");
  const [status, updateStatus] = useState("");
  const handleCreateBank = () => {
    axios
      .post("http://localhost:8800/api/v1/createBank", { bankName, bankAbbre })
      .then((resp) => {
        updateStatus(<Alert severity="success">Bank Created!</Alert>);
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
          label="BankName"
          placeholder="Type in here"
          variant="outlined"
          onChange={(e) => updateBankName(e.target.value)}
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
            onClick={handleCreateBank}
          >
            Create Bank
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
export default CreateBank;
