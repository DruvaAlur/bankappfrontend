import axios from "axios";
import { useEffect, useState } from "react";
import NavBar from "../AdminDashboard/NavigationBar/NavBar";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
function GetAllCustomers() {
  const [allCustomers, updateAllCustomers] = useState("");
  const [pageNumber, updatePageNumber] = useState(1);
  const [limit, updateLimit] = useState(5);
  useEffect(() => {
    getCustomers();
  }, []);
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
  let rowOfCustomer;

  if (allCustomers != null) {
    rowOfCustomer = Object.values(allCustomers).map((c) => {
      return (
        <tr id={c.userId}>
          <td> </td>
          <td>{c.credential.username}</td>
          <td>{c.firstName}</td>
          <td>{c.lastName}</td>
          <td>{c.totalBalance}</td>
          <td id={c.credential.username}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={c.isActive}
                    // onChange={toogleActiveFlag}
                    id={c.userId}
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
      <NavBar />
      <div>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col"> </th>
              <th scope="col">Username</th>
              <th scope="col">Firstname</th>
              <th scope="col">Lastname</th>
              <th scope="col">Balance</th>
              <th scope="col">IsActive</th>
            </tr>
          </thead>
          <tbody>{rowOfCustomer}</tbody>
        </table>
      </div>
    </>
  );
}
export default GetAllCustomers;
