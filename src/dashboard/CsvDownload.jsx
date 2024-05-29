import { Avatar, Box, Grid, Paper, Stack, Typography } from "@mui/material";
import axios from "axios";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { localstragedata } from "../global/globalfunction";
import { BASE_URL } from "../global/labelContants";

export const CsvDownload = () => {
  const { token } = localstragedata();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  useEffect(() => {
    const handleData = async () => {
      const response = await axios.get(`${BASE_URL}/all-data`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const allUserss = response.data.data;
      const activeUsers = [];
      const inActiveUsers = [];
      response.data.data.map((user) => {
        if (user.isActive) {
          activeUsers.push(user);
        } else {
          inActiveUsers.push(user);
        }
      });
      setData([
        {
          data: allUserss,
          NAME: "All Employees",
          PATH: "/dashboard/all-employees",
          LENGTH: allUserss.length,
          BGCOLOR: "#ff9f1c",
          BGCOLORL: "#fec272",
          user: "all-users",
        },
        {
          data: activeUsers,
          NAME: "Active Employees",
          PATH: "/dashboard/active-employees",
          LENGTH: activeUsers.length,
          BGCOLOR: "#ff6b6b",
          BGCOLORL: "#fe9693",
          user: "active-user",
        },
        {
          data: inActiveUsers,
          NAME: "InActive Employees",
          PATH: "/dashboard/trash",
          LENGTH: inActiveUsers.length,
          BGCOLOR: "#4ecdc4",
          BGCOLORL: "#7ae3de",
          user: "inactive-user",
        },
      ]);
    };
    handleData();
  }, []);
  const handleGetCSV = async (endPoint) => {
    const response = await axios({
      url: `${BASE_URL}/${endPoint}`,
      responseType: "blob",
      headers: { Authorization: "Bearer " + token },
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${endPoint}.csv`);
      link.click();
    });
  };
  const allUsers = async (e, endPoint) => {
    e.stopPropagation();
    try {
      handleGetCSV(endPoint);
    } catch (error) {}
  };

  return (
    <Grid container spacing={2}>
      {data?.map((ele, index) => {
        return (
          <Grid item xs={4} key={index}>
            <Paper
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                padding: "15px",
                backgroundColor: ele.BGCOLOR,
                height: "120px",
                alignItems: "center",
                color: "white",
                cursor: "pointer",
              }}
              elevation={3}
              onClick={() => navigate(ele.PATH)}
            >
              <Stack>
                <Typography variant="h4">{ele.LENGTH}</Typography>
                <Typography variant="body2">{ele.NAME}</Typography>
              </Stack>
              <Box>
                {" "}
                <Avatar
                  sx={{ width: 56, height: 56, backgroundColor: ele.BGCOLORL }}
                  onClick={(e) => allUsers(e, ele.user)}
                >
                  <FileDownloadIcon />
                </Avatar>
              </Box>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
};
