import { Box, Stack, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { ProfileModal } from "./ProfileModal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../global/tableStyle";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { snackbarContext } from "../global/snackbarContext";
import DataTable from "./DataTable";
import { handleexpiretoken, localstragedata } from "../global/globalfunction";
import {
  FBoxwgten,
  Pflexcenter,
  VisibleIconAvatar,
} from "../global/globalStyle";
import { BASE_URL } from "../global/labelContants";

function AllEmployees(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [data, setdata] = useState([]);
  const [originaldata, setoriginaldata] = useState([]);
  const snack = useContext(snackbarContext);
  const { token } = localstragedata();
  const navigate = useNavigate();
  const allData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/all-data`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (response.data.data) {
        let responsed_data = response.data.data.reverse();
        setdata(responsed_data);
        setoriginaldata(responsed_data);
      } else {
      }
    } catch (err) {
      handleexpiretoken(navigate, err.response.status);
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
            </Stack>
          );
        },
        setCellHeaderProps: () => ({
          style: { backgroundColor: "#0d1933", color: "white" },
        }),
      },
    },
  ];

  const finddata = (e) => {
    const searched_value = e.target.value;

    if (searched_value) {
      let searchedData = originaldata.filter((ele) => {
        let email_to_search = ele.email.split("@")[0];
        return (
          ele.name.includes(searched_value) ||
          email_to_search.includes(searched_value) ||
          ele?.phone_number?.toString().includes(searched_value)
        );
      });
      setdata(searchedData);
    } else {
      setdata(originaldata);
    }
  };
  const handleDownload = async (e, data) => {
    e.stopPropagation();
    const file = e.target.files[0];

    if (!file) {
      alert("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`${BASE_URL}/upload-data`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + token,
        },
      });

      if (response.status === 200) {
        snack.setIsSnackbarOpen({
          state: true,
          message: response.data.message,
          color: response.data.status,
        });
        allData();
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
    <>
      <Stack direction={"row"} justifyContent={"space-between"} pb={2}>
        <Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              color="rgb(13, 25, 51)"
              onChange={finddata}
            />
          </Search>
        </Box>
        {snack.loggeduser.role === "admin" ? (
          <FBoxwgten>
            <Pflexcenter>
              <Stack
                direction={"row"}
                onClick={() => navigate("/dashboard/register")}
                sx={{ cursor: "pointer" }}
              >
                <AddIcon />
                <Typography>Add User</Typography>
              </Stack>
            </Pflexcenter>
            <Pflexcenter>
              <label htmlFor="file-upload">
                <Stack direction={"row"} sx={{ cursor: "pointer" }}>
                  <FileUploadIcon sx={{ color: "#0d1933" }} />
                  Upload Document
                </Stack>
              </label>
              <input
                id="file-upload"
                type="file"
                accept="text/csv"
                onChange={handleDownload}
              />
            </Pflexcenter>
          </FBoxwgten>
        ) : (
          ""
        )}
      </Stack>
      <DataTable columns={columns} data={data} />
      <ProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedUserId={selectedUserId}
      />
    </>
  );
}

export default AllEmployees;
