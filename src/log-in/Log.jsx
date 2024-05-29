import { Button } from "@mui/material";
import {
  BoxToCenter,
  CustomFormHelperText,
  CustomPbox,
  CustomPboxbtn,
  CustomTextField,
  FormPaper,
} from "./logStyle";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { form_labels } from "../global/labelContants";
import { Heading } from "../global/Heading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { snackbarContext } from "../global/snackbarContext";
import { localstragedata } from "../global/globalfunction";

export const Log = () => {
  const snack = useContext(snackbarContext);
  const navigate = useNavigate();
  const { user } = localstragedata();
  if (user) {
    navigate("/dashboard/all-employees");
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data, e) => {
    const getData = async (data) => {
      const response = await axios.post(
        `http://localhost:8000/api/user/login`,
        data
      );
      if (response.data.token) {
        let token = response.data.token;
        let user = response.data.user;
        const userJsonData = JSON.stringify(user);
        localStorage.setItem("token", token);
        localStorage.setItem("user", userJsonData);

        snack.setIsSnackbarOpen({
          state: true,
          message: `Welcome ${user.name}`,
          color: "success",
        });
        navigate("/dashboard");
      } else {
        snack.setIsSnackbarOpen({
          state: true,
          message: response.data.message,
          color: response.data.status,
        });
      }
    };
    getData(data);
  };

  return (
    <>
      <BoxToCenter>
        <FormPaper elevation={10}>
          <Heading name={"Log-in"} />
          <form onSubmit={handleSubmit(onSubmit)}>
            {form_labels.map((ele) => {
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
        </FormPaper>
      </BoxToCenter>
    </>
  );
};
