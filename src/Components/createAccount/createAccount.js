import { useState } from "react";
import Box from "@mui/joy/Box";
import Alert from "@mui/material/Alert";
import TextField from "@mui/joy/TextField";
import NavBar from "../userDashboard/navigationBar/navigationBar";
import axios from "axios";
import { useParams } from "react-router-dom";
function CreateAccount() {
  const username = useParams();
  const [status, updateStatus] = useState();
  const [bankAbbre, updateBankAbbre] = useState();
  const handleCreateAccount = () => {
    axios
      .post(`http://localhost:8800/api/v1/createAccount/${username.username}`, {
        bankAbbre,
      })
      .then((resp) => {
        updateStatus(<Alert severity="success">Account Created!</Alert>);
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
            onClick={handleCreateAccount}
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
export default CreateAccount;
