import { Stack } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import RestoreIcon from "@mui/icons-material/Restore";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import axios from "axios";

import { snackbarContext } from "../global/snackbarContext";
import DataTable from "./DataTable";
import { handleexpiretoken, localstragedata } from "../global/globalfunction";
import { useNavigate } from "react-router-dom";
import { ConfirmModal } from "./ConfirmModal";
import {
  DeleteForeverIconAvatar,
  RestoreIconAvatar,
} from "../global/globalStyle";
import { BASE_URL } from "../global/labelContants";

function Trash() {
  const naviagte = useNavigate();
  const { token } = localstragedata();
  const [data, setdata] = useState([]);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [userid, setuserid] = useState("");
  const snack = useContext(snackbarContext);
  const restoreEmployee = async (data) => {
    const response = await axios.put(`${BASE_URL}/delete-restore`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (response) {
      snack.setIsSnackbarOpen({
        state: true,
        message: `Restored successfully`,
        color: "success",
      });
      allData();
    } else {
      snack.setIsSnackbarOpen({
        state: true,
        message: "could not delete the employee",
        color: response.data.status,
      });
    }
  };
  const allData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/all-data`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (response.data.data) {
        const activeData = response.data.data.filter(
          (ele) => ele.isActive === false
        );
        let responsed_data = activeData.reverse();
        setdata(responsed_data);
      } else {
      }
    } catch (err) {
      handleexpiretoken(naviagte, err.response.status);
    }
  };

  useEffect(() => {
    allData();
  }, []);
  const columns = [
    {
      name: "_id",
      label: "id",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value, data) => {
          return data.rowIndex + 1;
        },
        setCellHeaderProps: () => ({
          style: { backgroundColor: "#0d1933", color: "white" },
        }),
      },
    },
    {
      name: "name",
      label: "Full Name",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: { backgroundColor: "#0d1933", color: "white" },
        }),
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: { backgroundColor: "#0d1933", color: "white" },
        }),
      },
    },
    {
      name: "phone_number",
      label: "Phone Number",
      options: {
        filter: true,
        Sort: true,
        setCellHeaderProps: () => ({
          style: { backgroundColor: "#0d1933", color: "white" },
        }),
      },
    },
    {
      name: "role",
      label: "Role",
      options: {
        filter: true,
        Sort: true,
        setCellHeaderProps: () => ({
          style: { backgroundColor: "#0d1933", color: "white" },
        }),
      },
    },
    {
      name: "isActive",
      label: "Actions",
      options: {
        filter: true,
        Sort: true,
        customBodyRender: (value, data) => {
          return (
            <Stack direction="row" spacing={1}>
              <RestoreIconAvatar>
                <RestoreIcon
                  onClick={() => {
                    restoreEmployee({ id: data.rowData[0], isActive: true });
                  }}
                />
              </RestoreIconAvatar>
              <DeleteForeverIconAvatar>
                <DeleteForeverIcon
                  onClick={() => {
                    setuserid(data.rowData[0]);
                    setDeleteOpen(true);
                  }}
                />
              </DeleteForeverIconAvatar>
            </Stack>
          );
        },
        setCellHeaderProps: () => ({
          style: { backgroundColor: "#0d1933", color: "white" },
        }),
      },
    },
  ];
  const options = {
    filter: false,
    download: false,
    search: false,
    print: false,
    viewColumns: false,
    selectableRows: false,
  };
  return (
    <>
      <DataTable columns={columns} data={data} />

      <ConfirmModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        actionType="permanentDelete"
        deleteid={userid}
        msg="Are you sure you want to permanently delete this employee data?"
        allData={allData}
      />
    </>
  );
}

export default Trash;
