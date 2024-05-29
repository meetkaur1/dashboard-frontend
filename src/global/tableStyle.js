import {
  styled,
  Box,
  Paper,
  Divider,
  TextField,
  FormHelperText,
  InputBase,
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
  width: 400,
  backgroundColor: "#FFFFFF",
  border: "2px solid #000",
  padding: "30px",
}));
export const CardPaper = styled(Paper)(() => ({
  border: "1px solid black",
  width: "100%",
  height: "350px",
}));
export const Search = styled(Paper)(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  "&:hover": {},
  color: "rgb(13, 25, 51)",
  marginLeft: 0,
  width: "50%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "rgb(13, 25, 51)",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    color: "rgb(13, 25, 51) !important",

    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: "rgb(13, 25, 51)",
    },
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "30ch",
      "&:focus": {
        width: "38ch",
      },
    },
  },
}));
export const StyledAdduser = styled(Box)(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(1, 1, 1, 0),
  color: "rgb(13, 25, 51) !important",

  "& p": {
    textOverflow: "ellipsis !important",
    color: "rgb(13, 25, 51)",
  },
  // vertical padding + font size from searchIcon
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  transition: theme.transitions.create("width"),
  [theme.breakpoints.up("sm")]: {
    width: "30ch",
    "&:focus": {
      width: "38ch",
    },
  },
}));
