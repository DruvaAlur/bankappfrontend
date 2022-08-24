import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "../AdminDashboard/NavigationBar/NavBar";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { Navigate, useNavigate, useParams } from "react-router-dom";
function GetAllCustomers() {
  const currentUser = useParams();
  const [allCustomers, updateAllCustomers] = useState("");
  const [pageNumber, updatePageNumber] = useState(1);
  const [limit, updateLimit] = useState(5);

  const [loginStatus, updateLoginStatus] = useState("");
  const navigation = new useNavigate();
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

    getCustomers();
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
  const handleGetAccountDetails = (c) => {
    console.log(c);
    navigation(`/adminDashboard/GetAccountDetails/${currentUser.username}`, {
      state: c,
    });
  };

  const handleUpdateCustomer = (username) => {
    navigation(`/adminDashboard/UpdateCustomer/${currentUser.username}`, {
      state: username,
    });
  };
  async function getCustomers() {
    axios
      .post("http://localhost:8800/api/v1/getAllCustomers", {
        limit,
        pageNumber,
      })
      .then((resp) => {
        updateAllCustomers(resp.data);
      })
      .catch((error) => {});
  }
  const toogleActiveFlag = (e) => {
    const username = e.target.id;
    console.log(username);
    axios
      .post("http://localhost:8800/api/v1/toggleActiveFlag", { username })
      .then((resp) => {
        getCustomers();
      })
      .catch((error) => {});
  };
  let rowOfCustomer;

  if (allCustomers != null) {
    rowOfCustomer = Object.values(allCustomers).map((c) => {
      return (
        <tr id={c.userId}>
          <td style={{ width: "15%" }}>{c.credential.username}</td>
          <td style={{ width: "15%" }}>{c.firstName}</td>
          <td style={{ width: "15%" }}>{c.lastName}</td>

          <td style={{ width: "10%" }}>{c.totalBalance}</td>
          <td style={{ width: "10%" }}>
            <button
              type="button"
              class="btn btn-primary"
              onClick={() => handleGetAccountDetails(c)}
              style={{ width: "auto" }}
            >
              account details
            </button>
          </td>
          <td style={{ width: "12%" }}>
            <button
              type="button"
              class="btn btn-primary"
              onClick={() => handleUpdateCustomer(c.credential.username)}
              style={{ width: "auto" }}
            >
              Update Customer
            </button>
          </td>
          <td id={c.credential.username} style={{ width: "10%" }}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={c.isActive}
                    onChange={toogleActiveFlag}
                    id={c.credential.username}
                  />
                }
              />
            </FormGroup>
          </td>
        </tr>
      );
    });
  }
  return (
    <>
      <NavBar username={currentUser.username} />
      <div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col" style={{ width: "15%" }}>
                Username
              </th>
              <th scope="col" style={{ width: "15%" }}>
                Firstname
              </th>
              <th scope="col" style={{ width: "15%" }}>
                Lastname
              </th>
              <th scope="col" style={{ width: "10%" }}>
                Balance
              </th>
              <th scope="col" style={{ width: "10%" }}>
                Account Details
              </th>
              <th scope="col" style={{ width: "12%" }}>
                Update Customers
              </th>
              <th scope="col" style={{ width: "10%" }}>
                IsActive
              </th>
            </tr>
          </thead>
          <tbody>{rowOfCustomer}</tbody>
        </table>
      </div>
    </>
  );
}
export default GetAllCustomers;
