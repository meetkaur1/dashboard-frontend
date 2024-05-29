import { Avatar, Box, Grid, Paper, Stack, Typography } from "@mui/material";
import exportFromJSON from "export-from-json";
import axios from "axios";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PublishIcon from "@mui/icons-material/Publish";
import { handleexpiretoken, localstragedata } from "../global/globalfunction";
import { BASE_URL } from "../global/labelContants";

export const DownloadCsv = () => {
  // old component not using it - download csv with frontened
  const [datalength, setdatalength] = useState({
    allEmployees: [],
    activeEmployees: [],
    unactiveEmployees: [],
  });
  const { token } = localstragedata();
  const navigate = useNavigate();
  const getdata = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/all-data`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (response.data.data) {
        const data = response.data.data;
        let activeEmployeeslength = data.filter((ele) => ele.isActive);
        let unactiveEmployeeslength = data.filter((ele) => !ele.isActive);
        setdatalength({
          ...datalength,
          unactiveEmployees: unactiveEmployeeslength,
          activeEmployees: activeEmployeeslength,
          allEmployees: data,
        });
      } else {
      }
    } catch (err) {
      handleexpiretoken(navigate, err.response.status);
    }
  };
  const allemployeedata = (e) => {
    e.stopPropagation();
    const fileName = "all-employees";
    const exportType = exportFromJSON.types.csv;
    let data = datalength.allEmployees;

    exportFromJSON({ data, fileName, exportType });
  };
  const activeemployeedata = (e) => {
    e.stopPropagation();
    const fileName = "active-employees";
    const exportType = exportFromJSON.types.csv;
    let data = datalength.activeEmployees;

    exportFromJSON({ data, fileName, exportType });
  };
  const unactiveemployeedata = (e) => {
    e.stopPropagation();
    const fileName = "unactive-employees";
    const exportType = exportFromJSON.types.csv;
    let data = datalength.unactiveEmployees;

    exportFromJSON({ data, fileName, exportType });
  };
  const handlepublicevent = async (e, data) => {
    e.stopPropagation();

    const input = e.target.value;

    if (!input) {
      if (input?.file?.length == 0) {
        alert("no file selected");
        return;
      }
    } else {
      const formdata = new FormData();
      formdata.append("file", input);
      try {
        const response = await axios.post(
          `${BASE_URL}/upload-data`,
          { file: formdata },
          {
            headers: { contentType: "multipart/formdata" },
          }
        );
        if (response.status === 200) {
          alert("csv uplaoed suceesfyyu");
        }
      } catch (err) {}
    }
  };
  useEffect(() => {
    getdata();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Paper
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            padding: "15px",
            backgroundColor: "#ff9f1c",
            height: "120px",
            alignItems: "center",
            color: "white",
            cursor: "pointer",
          }}
          elevation={3}
          onClick={() => navigate("/dashboard/all-employees")}
        >
          <Stack>
            <Typography variant="h4">
              {datalength.allEmployees.length}
            </Typography>
            <Typography variant="body2">Total Employees</Typography>
          </Stack>
          <Box>
            {" "}
            <Avatar
              sx={{ width: 56, height: 56, backgroundColor: "#fec272" }}
              onClick={allemployeedata}
            >
              <FileDownloadIcon />
            </Avatar>
            <Avatar
              sx={{ width: 56, height: 56, backgroundColor: "#fec272" }}
              onClick={handlepublicevent}
            >
              <label for="file-upload">
                <PublishIcon sx={{ color: "#0d1933" }} />
              </label>
              <input
                id="file-upload"
                type="file"
                accept="text/csv"
                onChange={handlepublicevent}
              />
            </Avatar>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            padding: "15px",
            backgroundColor: "#ff6b6b",
            height: "120px",
            alignItems: "center",
            color: "white",
            cursor: "pointer",
          }}
          elevation={3}
          onClick={() => navigate("/dashboard/active-employees")}
        >
          <Stack>
            <Typography variant="h4">
              {datalength.activeEmployees.length}
            </Typography>
            <Typography variant="body2">Active Employees</Typography>
          </Stack>
          <Box>
            {" "}
            <Avatar
              sx={{ width: 56, height: 56, backgroundColor: "#fe9693" }}
              onClick={activeemployeedata}
            >
              <FileDownloadIcon />
            </Avatar>
          </Box>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Paper
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            padding: "15px",
            backgroundColor: "#4ecdc4",
            height: "120px",
            alignItems: "center",
            color: "white",
            cursor: "pointer",
          }}
          elevation={3}
          onClick={() => navigate("/dashboard/trash")}
        >
          <Stack>
            <Typography variant="h4">
              {datalength.unactiveEmployees.length}
            </Typography>
            <Typography variant="body2">Unactive Employees</Typography>
          </Stack>
          <Box>
            {" "}
            <Avatar
              sx={{ width: 56, height: 56, backgroundColor: "#7ae3de" }}
              onClick={unactiveemployeedata}
            >
              <FileDownloadIcon />
            </Avatar>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};
