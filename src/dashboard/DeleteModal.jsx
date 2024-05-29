import { Button, Modal, Stack, Typography } from "@mui/material";
import { JustifyBox, ModalBox, TextCenter } from "../global/modalStyle";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { snackbarContext } from "../global/snackbarContext";
import axios from "axios";
import { handleexpiretoken, localstragedata } from "../global/globalfunction";
import { BASE_URL } from "../global/labelContants";

export const DeleteModal = ({ isOpen, onClose, deleteid, msg, allData }) => {
  // old Modal -not using
  const navigate = useNavigate();
  const snack = useContext(snackbarContext);
  const { token } = localstragedata();
  const logout = () => {
    localStorage.clear();
    navigate("/");
    softdelete();
  };
  const softdelete = async () => {
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
        message: `Deleted successfully`,
        color: "success",
      });
    } else {
      snack.setIsSnackbarOpen({
        state: true,
        message: "could not delete the employee",
        color: response.data.status,
      });
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

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalBox>
        <Stack justifyContent={"center"} alignItems={"center"}>
          <Typography variant="h6">Confirm Delete</Typography>
          <Typography sx={{ color: "grey", textAlign: "center" }}>
            {msg}
          </Typography>
        </Stack>
        <JustifyBox>
          <Button onClick={onClose} color="success" variant="contained">
            Cancel
          </Button>
          <Button
            onClick={
              JSON.parse(localStorage.getItem("user"))["_id"] == deleteid
                ? logout
                : permanentDelete
            }
            color="error"
            variant="contained"
          >
            Yes
          </Button>
        </JustifyBox>
      </ModalBox>
    </Modal>
  );
};
