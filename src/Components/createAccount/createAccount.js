import { useState } from "react";
import Box from "@mui/joy/Box";
import Alert from "@mui/material/Alert";
import TextField from "@mui/joy/TextField";
import NavBar from "../AdminDashboard/NavigationBar/NavBar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
function CreateAccount() {
  const currentUser = useParams();
  const [status, updateStatus] = useState();
  const [bankAbbre, updateBankAbbre] = useState();
  const [username, updateUsername] = useState("");
  const navigation = new useNavigate();
  const [loginStatus, updateLoginStatus] = useState("");
  const [allBanks, updateAllBanks] = useState("");
  const [allCustomers, updateAllCustomers] = useState("");
  useEffect(() => {
    axios
      .post(
        `http://localhost:8800/api/v1/isAdminLoggedIn/${currentUser.username}`,
        {}
      )
      .then((resp) => {
        updateLoginStatus(true);
      })
      .catch((error) => {
        console.log(error.response.data);
        updateLoginStatus(false);
      });
    axios.get("http://localhost:8800/api/v1/getAllBanks").then((resp) => {
      updateAllBanks(resp.data);
      updateBankAbbre(resp.data[0].bankAbbre);
    });
    axios
      .post("http://localhost:8800/api/v1/getAllCustomers", {})
      .then((resp) => {
        updateAllCustomers(resp.data);
        updateUsername(resp.data[0].credential.username);
      });
  }, []);

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
  const handleCreateAccount = () => {
    axios
      .post(`http://localhost:8800/api/v1/createAccount`, {
        username,
        bankAbbre,
      })
      .then((resp) => {
        updateStatus(<Alert severity="success">Account Created!</Alert>);
      })
      .catch((error) => {
        updateStatus(<Alert severity="error">{error.response.data}</Alert>);
      });
  };
  let optionsOfAllBanks;
  if (allBanks != null) {
    optionsOfAllBanks = Object.values(allBanks).map((b) => {
      return <option value={b.bankAbbre}>{b.bankAbbre}</option>;
    });
  }
  let optionsOfAllCustomers;
  if (allCustomers != null) {
    optionsOfAllCustomers = Object.values(allCustomers).map((c) => {
      return (
        <option value={c.credential.username}>{c.credential.username}</option>
      );
    });
  }
  return (
    <>
      <NavBar username={currentUser.username} />

      <form style={{ width: "45vw", marginTop: "50px" }}>
        {/* <TextField
          label="Username"
          placeholder="Type in here"
          variant="outlined"
          onChange={(e) => updateUsername(e.target.value)}
        /> */}
        <label class="fw-bold">Username</label>
        <select
          id="Username"
          name="Username"
          onChange={(e) => {
            updateUsername(e.target.value);
          }}
          style={{ width: "200px", height: "30px" }}
        >
          {optionsOfAllCustomers}
        </select>
        {/* <TextField
          label="Bank Abbrevation"
          placeholder="Type in here"
          variant="outlined"
          onChange={(e) => updateBankAbbre(e.target.value)}
        /> */}
        <br />
        <br />

        <label class="fw-bold">Bank Abbrevation</label>
        <select
          id="BankAbbrevation"
          name="BankAbbrevation"
          onChange={(e) => {
            updateBankAbbre(e.target.value);
          }}
          style={{ width: "200px", height: "30px" }}
        >
          {optionsOfAllBanks}
        </select>
        <br />
        <br />
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <button
            type="button"
            class="btn btn-primary"
            onClick={handleCreateAccount}
            style={{ marginLeft: "200px" }}
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
