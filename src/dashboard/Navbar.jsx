import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";

import LogoutIcon from "@mui/icons-material/Logout";
import { Stack } from "@mui/material";

import { useState } from "react";
import { ConfirmModal } from "./ConfirmModal";

export default function Navbar() {
  const [logOpen, setlogOpen] = useState(false);
  const logout = () => {
    setlogOpen(true);
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            backgroundColor: "black",
          }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            ></IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              AWD
            </Typography>
            <Button color="inherit" onClick={logout}>
              <Stack
                direction={"row"}
                gap={1}
                alignItems={"center"}
                sx={{ color: "#2aa09c" }}
              >
                <LogoutIcon sx={{ fontSize: "20px" }} />
                <Typography sx={{ fontSize: "15px !important" }}>
                  Logout
                </Typography>
              </Stack>
            </Button>
          </Toolbar>
        </AppBar>
      </Box>

      <ConfirmModal
        isOpen={logOpen}
        onClose={() => setlogOpen(false)}
        actionType="logout"
        msg="Are you sure you want to log out?"
      />
    </>
  );
}
