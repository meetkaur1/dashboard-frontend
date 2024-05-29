import { FormPaper } from "../global/formStyle";

import { form_register_labels, log_labels } from "../global/labelContants";

import { Register } from "./Register";

export const Sign = ({ isOpen, onClose, selectedUserId, allData }) => {
  return (
    <>
      {log_labels?.map((ele) => {})}

      <FormPaper elevation={10}>
        <Register mapdata={form_register_labels} />
      </FormPaper>
    </>
  );
};
