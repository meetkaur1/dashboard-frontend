import { Button } from "@mui/material";
import {
  CustomFormHelperText,
  CustomPbox,
  CustomPboxbtn,
  CustomTextField,
} from "../global/formStyle";
import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";

import axios from "axios";
import { snackbarContext } from "../global/snackbarContext";
import { useNavigate } from "react-router-dom";
import { handleexpiretoken, localstragedata } from "../global/globalfunction";
export const Register = ({
  isOpen,
  onClose,
  selectedUserId,
  allData,
  mapdata,
}) => {
  const naviagte = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });
  const snack = useContext(snackbarContext);
  const { token } = localstragedata();
  const onSubmit = async (data, e) => {
    if (selectedUserId) {
      await updateData(data);
    } else {
      const registerData = async () => {
        const response = await axios.post(
          `http://localhost:8000/api/user/register`,
          {
            ...data,
            name: data.first_name + " " + data.last_name,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (response.data) {
          reset();
          snack.setIsSnackbarOpen({
            state: true,
            message: response.data.message,
            color: response.data.status,
          });
        } else {
          snack.setIsSnackbarOpen({
            state: true,
            message: response.data.message,
            color: response.data.status,
          });
        }
      };
      registerData();
    }
  };
  const updateData = async (mydata) => {
    const { token } = localstragedata();
    try {
      const response = await axios.post(
        `http://localhost:8000/api/user/update?id=${selectedUserId}`,
        { ...mydata, name: mydata.first_name + " " + mydata.first_name },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.data.status === "success") {
        snack.setIsSnackbarOpen({
          state: true,
          message: response.data.message,
          color: response.data.status,
        });
        onClose();
        allData();
      } else {
        snack.setIsSnackbarOpen({
          state: true,
          message: response.data.message,
          color: response.data.status,
        });
      }
    } catch (err) {
      handleexpiretoken(naviagte, err.response?.status);

      snack.setIsSnackbarOpen({
        state: true,
        message: "error in sending the request",
        color: "error",
      });
    }
  };
  const onlyUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/user/get-only-user`,
        {
          params: { id: selectedUserId },
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      if (response.data) {
        // setUser({ ...response.data.user });
        let name = response.data.user.name;
        let spaceIndex = name.indexOf(" ");
        reset({
          first_name: name.slice(0, spaceIndex),
          last_name: name.slice(spaceIndex + 1),
          email: response.data.user.email,
          phone_number: response.data.user.phone_number,
          role: response.data.user.role,
        });
      } else {
      }
    } catch (err) {
      handleexpiretoken(naviagte, err.response.status);
    }
  };
  useEffect(() => {
    if (selectedUserId && isOpen) {
      onlyUser();
    } else {
    }
  }, [selectedUserId, isOpen]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} sm={{ width: "100%" }}>
      {mapdata?.map((ele, index) => {
        const options = {};

        options.pattern = {
          value: ele.REGEX,
          message: ele.RXMESSAGE,
        };
        return (
          <CustomPbox key={ele.NAME}>
            <CustomTextField
              fullWidth
              id={ele.NAME}
              label={ele.LABEL}
              variant="standard"
              error={Boolean(errors?.[ele.NAME])}
              name={ele.NAME}
              {...register(`${ele.NAME}`, {
                required: ele.RMESSAGE,
                ...options,
              })}
            />
            {errors?.[ele.NAME]?.message ? (
              <CustomFormHelperText>
                {errors?.[ele.NAME]?.message}
              </CustomFormHelperText>
            ) : (
              ""
            )}
          </CustomPbox>
        );
      })}
      <CustomPboxbtn>
        <Button
          variant="contained"
          type="submit"
          className="logButton"
          sx={{ backgroundColor: "#2aa09c", color: "white" }}
        >
          Submit
        </Button>
      </CustomPboxbtn>
    </form>
  );
};
