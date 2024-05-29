import { Box, Divider, Typography } from "@mui/material";
import { useContext } from "react";
import { snackbarContext } from "../global/snackbarContext";

export const Welcome = () => {
  const snack = useContext(snackbarContext);
  return (
    <Box>
      <Typography variant="h5">Welcome {snack?.loggeduser?.name}!</Typography>
      <Divider />
    </Box>
  );
};
