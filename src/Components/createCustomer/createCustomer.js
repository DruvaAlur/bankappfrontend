import axios from "axios";
import { useState } from "react";
import Box from "@mui/joy/Box";
import Alert from "@mui/material/Alert";
import TextField from "@mui/joy/TextField";
import NavBar from "../AdminDashboard/NavigationBar/NavBar";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
function CreateCustomer() {
  const [firstName, updatefirstName] = useState("");
  const [lastName, updatelastName] = useState("");
  const [username, updateUsername] = useState("");
  const [password, updatePassword] = useState("");
  const [status, updateStatus] = useState("");
  const [role, updateRole] = useState("user");
  const handleCreateCustomer = () => {
    axios
      .post("http://localhost:8800/api/v1/createCustomer", {
        firstName,
        lastName,
        username,
        password,
        role,
      })
      .then((resp) => {
        updateStatus(<Alert severity="success">Customer Created!</Alert>);
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
          label="First Name"
          placeholder="Type in here"
          variant="outlined"
          onChange={(e) => updatefirstName(e.target.value)}
        />
        <br />
        <TextField
          label="Last Name"
          placeholder="Type in here"
          variant="outlined"
          onChange={(e) => updatelastName(e.target.value)}
        />
        <br />
        <TextField
          label="UserName"
          placeholder="Type in here"
          variant="outlined"
          onChange={(e) => updateUsername(e.target.value)}
        />
        <br />
        <TextField
          label="Password"
          placeholder="Type in here"
          variant="outlined"
          onChange={(e) => updatePassword(e.target.value)}
        />
        <br />
        {/* <select
          id="role"
          name="role"
          onChange={(e) => {
            updateRole(e.target.value);
          }}
        >
          <option value="user">user</option>
          <option value="admin">admin</option>
        </select> */}
        <label>
          <b>Role</b>
        </label>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={role}
          label="Role"
          onChange={(e) => {
            updateRole(e.target.value);
          }}
          fullWidth
        >
          <MenuItem value={"user"}>user</MenuItem>
          <MenuItem value={"admin"}>admin</MenuItem>
        </Select>
        <br />
        <br />
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <button
            type="button"
            class="btn btn-primary"
            onClick={handleCreateCustomer}
          >
            Create Customer
          </button>
        </Box>
        {status}
      </form>
    </>
  );
}
export default CreateCustomer;
