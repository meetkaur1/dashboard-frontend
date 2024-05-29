import { Alert, Snackbar } from "@mui/material";

export const MySnackbar = ({ isSnackbarOpen, setIsSnackbarOpen }) => {
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSnackbarOpen({
      state: false,
      message: null,
      color: isSnackbarOpen.color,
    });
  };
  const bgcolor = isSnackbarOpen.color === "success" ? "#2aa09c" : "";
  return (
    <Snackbar
      open={isSnackbarOpen.state}
      autoHideDuration={3000}
      onClose={handleSnackbarClose}
    >
      <Alert
        onClose={handleSnackbarClose}
        severity={isSnackbarOpen.color === "success" ? "success" : "error"}
        variant="filled"
        sx={{ backgroundColor: bgcolor }}
      >
        {isSnackbarOpen.message}
      </Alert>
    </Snackbar>
  );
};
