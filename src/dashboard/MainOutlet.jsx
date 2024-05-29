import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import { MainOutletBox } from "../global/globalStyle";

export const MainOutlet = () => {
  return (
    <MainOutletBox>
      <Box sx={{ width: "100%" }}>
        <Outlet />
      </Box>
    </MainOutletBox>
  );
};
