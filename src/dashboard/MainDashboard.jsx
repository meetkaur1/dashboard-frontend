import { Box } from "@mui/material";
import Navbar from "./Navbar";
import { MyDrawer } from "./Drawer";
import { MainOutlet } from "./MainOutlet";
export const MainDashboard = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />
      <MyDrawer />
      <MainOutlet />
    </Box>
  );
};
