import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../userDashboard/navigationBar/navigationBar";

import { Navigate, useNavigate } from "react-router-dom";
function GetAccounts() {
  const currentUser = useParams();

  const [accounts, updateAccounts] = useState([]);
  const navigation = new useNavigate();
  const [loginStatus, updateLoginStatus] = useState("");

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
        console.log(resp);
        updateAccounts(resp.data);
      })
      .catch((error) => {
        console.log(error.response.data);
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

  let rowOfAccounts = Object.values(accounts).map((c) => {
    return (
      <>
        {
          <>
            <tr>
              <td>{c.bank.bankName}</td>
              <td>{c.bank.bankAbbre}</td>
              <td>{c.balance}</td>
            </tr>
          </>
        }
      </>
    );
  });

  return (
    <>
      <NavBar username={currentUser.username} />
      <table class="table table-striped">
        <thead>
          <tr>
            <th>BankName</th>
            <th>Bank Abbrevation</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>{rowOfAccounts}</tbody>
      </table>
    </>
  );
}
export default GetAccounts;
