import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import {
  drawer_list_points,
  drawer_list_points_user,
} from "../global/labelContants";
import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { snackbarContext } from "../global/snackbarContext";

export const MyDrawer = () => {
  const naviagte = useNavigate();
  const drawerWidth = 240;
  const snack = useContext(snackbarContext);
  let points =
    snack?.loggeduser.role == "admin"
      ? drawer_list_points
      : drawer_list_points_user;
  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,

          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {points?.map((ele, index) => (
              <ListItem key={ele.NAME} disablePadding>
                <ListItemButton
                  component={NavLink}
                  to={ele.LINK}
                  className="hello"
                >
                  <ListItemIcon
                    sx={{ marginLeft: "10px", minWidth: "35px" }}
                    className="list-icon"
                  >
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={ele.NAME} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      ;
    </>
  );
};
