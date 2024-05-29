import { Stack } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import axios from "axios";

import { ProfileModal } from "./ProfileModal";
import { snackbarContext } from "../global/snackbarContext";
import { FormModal } from "./FormModal";
import DataTable from "./DataTable";
import { handleexpiretoken, localstragedata } from "../global/globalfunction";
import { useNavigate } from "react-router-dom";
import {
  DeleteIconAvatar,
  EditIconAvatar,
  VisibleIconAvatar,
} from "../global/globalStyle";
import { BASE_URL } from "../global/labelContants";

function ActiveEmployees() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isformModel, setFormModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [data, setdata] = useState([]);
  const snack = useContext(snackbarContext);
  const naviagte = useNavigate();
  const { token } = localstragedata();
  const softdelete = async (data) => {
    const response = await axios.put(`${BASE_URL}/delete-restore`, data, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (response) {
      snack.setIsSnackbarOpen({
        state: true,
        message: `Deleted successfully`,
        color: response.data.status,
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
      const response = await axios.get(
        `http://localhost:8000/api/user/all-data`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.data.data) {
        const activeData = response.data.data.filter(
          (ele) => ele.isActive == true
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
              <VisibleIconAvatar>
                <VisibilityIcon
                  onClick={() => {
                    setIsModalOpen(true);
                    setSelectedUserId(data.rowData[0]);
                  }}
                  fontSize="20px"
                />
              </VisibleIconAvatar>
              <EditIconAvatar>
                <EditIcon
                  onClick={() => {
                    setFormModal(true);
                    setSelectedUserId(data.rowData[0]);
                  }}
                  fontSize="20px"
                />
              </EditIconAvatar>
              <DeleteIconAvatar>
                <DeleteIcon
                  onClick={() => {
                    softdelete({ id: data.rowData[0], isActive: false });
                  }}
                  fontSize="20px"
                />
              </DeleteIconAvatar>
            </Stack>
          );
        },
        setCellHeaderProps: () => ({
          style: { backgroundColor: "#0d1933", color: "white" },
        }),
      },
    },
  ];
  return (
    <>
      <DataTable columns={columns} data={data} />
      <ProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedUserId={selectedUserId}
      />
      <FormModal
        isOpen={isformModel}
        onClose={() => setFormModal(false)}
        selectedUserId={selectedUserId}
        allData={allData}
      />
    </>
  );
}

export default ActiveEmployees;
