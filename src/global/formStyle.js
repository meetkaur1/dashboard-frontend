import img from "../images/HRAWb5.jpg";

import {
  styled,
  Box,
  Paper,
  Divider,
  TextField,
  FormHelperText,
} from "@mui/material";
export const BoxToCenter = styled(Box)(() => ({
  height: "99.9vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundImage: `url(${img})`,
  backgroundSize: "cover",
}));
export const TableBox = styled(Box)(() => ({
  width: "100%",
  height: "fit-content",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "50px",
}));
export const FormPaper = styled(Paper)(() => ({
  padding: "10px",
  backgroundColor: "black",
  color: "white",
  width: "27%",
  height: "fit-content",
  borderRadius: "12px",
}));
export const CustomDivider = styled(Divider)(() => ({
  color: "#00000",
  textAlign: "center",
  fontSize: "25px",
  margin: "10px 0px",
}));
export const CustomTextField = styled(TextField)(() => ({
  [`& .MuiInput-root::before`]: {
    borderBottom: "1px solid white !important",
  },
  [`& .MuiInputLabel-sizeMedium`]: {
    color: "white",
  },
  [`& .Mui-focused`]: {
    color: "white !important",
  },
  [`& .MuiInputLabel-shrink`]: {
    color: "white",
  },
  [`& .MuiInput-underline`]: {
    borderBottom: "1px solid white",
  },
}));
export const CustomFormHelperText = styled(FormHelperText)(() => ({
  color: "#d32f2f",
}));
export const CustomPbox = styled(Box)(() => ({
  padding: "16px",
}));
export const CustomPboxbtn = styled(Box)(() => ({
  padding: "16px",
  textAlign: "end",
}));
export const JustifyBox = styled(Box)(() => ({
  padding: "16px",
  marginTop: "30px",
  display: "flex",
  justifyContent: "space-between",
}));
export const ModalBox = styled(Box)(() => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "#FFFFFF",
  border: "2px solid #000",
  padding: "30px",
}));
