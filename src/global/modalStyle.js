import {
  styled,
  Box,
  Paper,
  Divider,
  TextField,
  FormHelperText,
} from "@mui/material";
export const BoxToCenter = styled(Box)(() => ({
  width: "100%",
  height: "fit-content",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
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
  padding: "20px",

  width: "30%",
  height: "fit-content",
}));
export const CustomDivider = styled(Divider)(() => ({
  color: "#00000",
  textAlign: "center",
  fontSize: "25px",
  margin: "10px 0px",
}));
export const CustomTextField = styled(TextField)(() => ({}));
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
  width: 320,

  backgroundColor: "#05080ea8",
  color: "white",

  padding: "30px",
  borderRadius: "5px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
}));
export const TextCenter = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
}));
