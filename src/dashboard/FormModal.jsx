import { Modal } from "@mui/material";
import { ModalBox } from "../global/modalStyle";
import { update_form_labels } from "../global/labelContants";
import { Heading } from "../global/Heading";
import { Register } from "../Sign-in/Register";

export const FormModal = ({ isOpen, onClose, selectedUserId, allData }) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <ModalBox>
        <Heading name={"Update-Form"} />
        <Register
          isOpen={isOpen}
          onClose={onClose}
          selectedUserId={selectedUserId}
          allData={allData}
          mapdata={update_form_labels}
        />
      </ModalBox>
    </Modal>
  );
};
