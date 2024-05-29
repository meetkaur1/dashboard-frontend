import { Button, Modal, Stack, Typography } from "@mui/material";
import { JustifyBox, ModalBox } from "../global/modalStyle";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { snackbarContext } from "../global/snackbarContext";
import axios from "axios";
import { handleexpiretoken, localstragedata } from "../global/globalfunction";
import { BASE_URL } from "../global/labelContants";

export const ConfirmModal = ({
  isOpen,
  onClose,
  actionType,
  deleteid,
  msg,
  allData,
}) => {
  const navigate = useNavigate();
  const snack = useContext(snackbarContext);
  const { token } = localstragedata();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const softdelete = async () => {
    try {
      const response = await axios.put(
        `${BASE_URL}/delete-restore`,
        { id: deleteid, isActive: false },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response) {
        snack.setIsSnackbarOpen({
          state: true,
          message: "Deleted successfully",
          color: "success",
        });
        allData();
        onClose();
      } else {
        snack.setIsSnackbarOpen({
          state: true,
          message: "Could not delete the employee",
          color: response.data.status,
        });
      }
    } catch (err) {
      handleexpiretoken(navigate, err.response.status);
    }
  };

  const permanentDelete = async () => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/permanent-delete?id=${deleteid}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response) {
        snack.setIsSnackbarOpen({
          state: true,
          message: response.data.message,
          color: response.data.status,
        });
        allData();
        onClose();
      } else {
        snack.setIsSnackbarOpen({
          state: true,
          message: response.data.message,
          color: response.data.status,
        });
      }
    } catch (err) {
      handleexpiretoken(navigate, err.response.status);
    }
  };

  const handleAction = () => {
    if (actionType === "logout") {
      logout();
    } else if (actionType === "softDelete") {
      softdelete();
    } else if (actionType === "permanentDelete") {
      permanentDelete();
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalBox>
        <Stack justifyContent={"center"} alignItems={"center"}>
          <Typography variant="h6">
            {actionType === "logout" ? "Confirm Logout" : "Confirm Delete"}
          </Typography>
          <Typography sx={{ color: "grey", textAlign: "center" }}>
            {msg ||
              (actionType === "logout"
                ? "Are you sure you want to log out?"
                : "Are you sure you want to delete this item?")}
          </Typography>
        </Stack>
        <JustifyBox>
          <Button onClick={onClose} color="success" variant="contained">
            Cancel
          </Button>
          <Button onClick={handleAction} color="error" variant="contained">
            Yes
          </Button>
        </JustifyBox>
      </ModalBox>
    </Modal>
  );
};
