import {
  Avatar,
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { snackbarContext } from "../global/snackbarContext";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import EditIcon from "@mui/icons-material/Edit";
import { FormModal } from "./FormModal";
import DeleteIcon from "@mui/icons-material/Delete";
import { DeleteModal } from "./DeleteModal";
import { handleexpiretoken, localstragedata } from "../global/globalfunction";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../global/labelContants";

export const MyProfile = () => {
  const [isformModel, setFormModal] = useState(false);
  const snack = useContext(snackbarContext);
  let { token, user } = localstragedata();
  user = JSON.parse(user);
  const userid = user["_id"];
  const [image, setimage] = useState("");
  const [userdata, setuserdata] = useState("");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const navigate = useNavigate();
  const convertToBase64 = (e) => {
    const file = e.target.files[0];
    if (file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        if (e.loaded <= 200000) {
          getData({ img: reader.result, id: userid });
        } else {
          snack.setIsSnackbarOpen({
            state: true,
            message: `Image size is too Big`,
            color: "error",
          });
        }
      };
      reader.onerror = (error) => {
        snack.setIsSnackbarOpen({
          state: true,
          message: `error in rendring`,
          color: "error",
        });
      };
    }
  };

  const getData = async (data) => {
    const response = await axios.put(`${BASE_URL}/upload-img`, data);
    if (response) {
      setimage(response.data.img);
    } else {
      snack.setIsSnackbarOpen({
        state: true,
        message: response.data.message,
        color: response.data.status,
      });
    }
  };
  const onlyUser = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/get-only-user`, {
        params: { id: userid },
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (response.data) {
        setuserdata(response.data.user);
        snack.setloggeduser(response.data.user);
      } else {
      }
    } catch (err) {
      handleexpiretoken(navigate, err.response.status);
    }
  };
  // const imageupload = async (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     const imageData = new FormData();
  //     imageData.append("file", file);
  //     imageData.append("id", userid);
  //     try {
  //       const response = await axios.put(
  //         `${BASE_URL}/upload-image`,
  //         imageData,
  //         {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //         }
  //       );
  //       if (response) {
  //         setimage(response.data.img);
  //       } else {
  //         snack.setIsSnackbarOpen({
  //           state: true,
  //           message: response.data.message,
  //           color: response.data.status,
  //         });
  //       }
  //     } catch (error) {
  //       snack.setIsSnackbarOpen({
  //         state: true,
  //         message: error,
  //         color: "error",
  //       });
  //     }
  //   } else {
  //   }
  // };
  useEffect(() => {
    onlyUser();
  }, [image]);
  return (
    <>
      <Box>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <Paper
              sx={{
                padding: "10px",
              }}
            >
              <Stack alignItems={"center"} spacing={1}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    width: "100%",
                  }}
                >
                  <label htmlFor="file-upload">
                    <EditIcon sx={{ color: "#0d1933" }} />
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    name="file"
                    onChange={convertToBase64}
                  />
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Avatar
                    sx={{ width: "50%", height: "150px" }}
                    src={userdata?.img}
                  >
                    <label htmlFor="file-upload">
                      <AddCircleOutlineIcon
                        sx={{
                          width: 46,
                          height: 46,
                          color: "#eeeeee7a",
                          cursor: "pointer",
                        }}
                      />
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      name="file"
                      onChange={convertToBase64}
                    />
                  </Avatar>
                </Box>
                <Typography variant="h5">{userdata?.name}</Typography>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={8}>
            <Paper
              sx={{
                padding: "5px",
              }}
            >
              <List
                sx={{ width: "100%", padding: 0 }}
                aria-label="mailbox folders"
              >
                <ListItem>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Typography variant="body1">Profile Data</Typography>
                    <Stack direction={"row"} spacing={1}>
                      <EditIcon
                        sx={{ color: "#0d1933" }}
                        onClick={() => setFormModal(true)}
                      />
                      <DeleteIcon
                        sx={{ color: "#ed1515" }}
                        onClick={() => {
                          setDeleteOpen(true);
                        }}
                      />
                    </Stack>
                  </Box>
                </ListItem>
                <Divider />
                <ListItem>
                  <Grid container alignItems={"center"}>
                    <Grid item xs={3}>
                      <Typography variant="h6">Full Name</Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography variant="body2">{userdata?.name}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <Divider />
                <ListItem>
                  <Grid container alignItems={"center"}>
                    <Grid item xs={3}>
                      <Typography variant="h6">Email</Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography variant="body2">{userdata?.email}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <Divider />
                <ListItem>
                  <Grid container alignItems={"center"}>
                    <Grid item xs={3}>
                      <Typography variant="h6">Phone Number</Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography variant="body2">
                        {userdata?.phone_number}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <Divider />
                <ListItem>
                  <Grid container alignItems={"center"}>
                    <Grid item xs={3}>
                      <Typography variant="h6">Role</Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography variant="body2">{userdata?.role}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <FormModal
        isOpen={isformModel}
        onClose={() => setFormModal(false)}
        selectedUserId={userid}
        allData={onlyUser}
      />
      <DeleteModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        deleteid={userid}
        msg={"Are you sure you want to delete your profile"}
      />
    </>
  );
};
