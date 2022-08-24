import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";

import Button from "@mui/material/Button";

import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function ResponsiveAppBar(prop) {
  const username = prop.username;
  //   const username = props.username;
  //   const [anchorElNav, setAnchorElNav] = React.useState(null);
  //   const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigation = new useNavigate();

  const transferMoney = () => {
    navigation(`/userDashboard/transferMoney/${username}`);
  };
  const handleWithdrawMoney = () => {
    navigation(`/userDashboard/withdrawMoney/${username}`);
  };
  const selfTransfer = () => {
    navigation(`/userDashboard/selfTransfer/${username}`);
  };
  //   const handleUpdateContact = () => {
  //     navigation(`/userDashboard/UpdateContacts/${username}`);
  //   };
  //   const handleGetAllContact = () => {
  //     navigation(`/userDashboard/GetAllContacts/${username}`);
  //   };
  //   const handleCreateContactDetail = () => {
  //     navigation(`/userDashboard/createContactDetail/${username}`);
  //   };
  const handleLogout = async () => {
    await axios.post("http://localhost:8800/api/v1/logout").then(() => {
      navigation("/");
    });
  };
  const handleGetAllAccounts = () => {
    navigation(`/userDashboard/getAccounts/${username}`);
  };
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "Inherit",
              textDecoration: "none",
            }}
            // onClick={() =>
            // //   navigation(`/userDashboard/createContacts/${props.username}`)
            // }
          >
            Banking App
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              // onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={() => {
                navigation(`/userDashboard/depositMoney/${username}`);
              }}
            >
              Deposit Money
            </Button>
            <Button
              onClick={handleWithdrawMoney}
              sx={{ my: 2, color: "white", display: "block" }}
              //   onClick={handleGetAllContact}
            >
              Withdraw Money
            </Button>
            <Button
              // onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={transferMoney}
            >
              Transfer Money
            </Button>
            <Button
              // onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={selfTransfer}
            >
              Self Transfer
            </Button>
            <Button
              onClick={handleGetAllAccounts}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Get All Accounts
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Button
              // onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
