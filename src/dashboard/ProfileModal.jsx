import { Modal, Stack, Typography } from "@mui/material";
import { ModalBox } from "../global/modalStyle";
import { useEffect, useState } from "react";
import axios from "axios";

import { handleexpiretoken, localstragedata } from "../global/globalfunction";
import { useNavigate } from "react-router-dom";
import { JustifyBox, UserAvatar } from "../global/globalStyle";
import { BASE_URL } from "../global/labelContants";

export const ProfileModal = ({ isOpen, onClose, selectedUserId }) => {
  const naviagte = useNavigate();
  const [user, setUser] = useState({});
  const { token } = localstragedata();

  useEffect(() => {
    const onlyUser = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/get-only-user`, {
          params: { id: selectedUserId },
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        if (response.data) {
          setUser(response.data.user);
        } else {
        }
      } catch (err) {
        handleexpiretoken(naviagte, err.response.status);
      }
    };
    onlyUser();
  }, [selectedUserId, isOpen]);
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalBox>
        <Stack alignItems={"center"} spacing={1}>
          <JustifyBox>
            <UserAvatar src={user?.img}></UserAvatar>
          </JustifyBox>

          <Typography variant="h6">{user?.name}</Typography>
          <Typography variant="body2"> Email -{user?.email}</Typography>
          <Typography variant="body2">
            {" "}
            Phone Number -{user?.phone_number}
          </Typography>
          <Typography variant="body2"> Role -{user?.role}</Typography>
        </Stack>
      </ModalBox>
    </Modal>
  );
};
