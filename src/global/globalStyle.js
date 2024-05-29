import { Avatar, Box, Paper, styled } from "@mui/material";

export const VisibleIconAvatar = styled(Avatar)(() => ({
  backgroundColor: "#2e7d32",
  width: "35px",
  height: "35px",
}));
export const EditIconAvatar = styled(Avatar)(() => ({
  backgroundColor: "#e1891e",
  width: "35px",
  height: "35px",
}));
export const DeleteIconAvatar = styled(Avatar)(() => ({
  backgroundColor: "red",
  width: "35px",
  height: "35px",
}));
export const DeleteForeverIconAvatar = styled(Avatar)(() => ({
  backgroundColor: "red",
  width: "35px",
  height: "35px",
}));
export const RestoreIconAvatar = styled(Avatar)(() => ({
  backgroundColor: "#2e7d32",
  width: "35px",
  height: "35px",
}));
export const UserAvatar = styled(Avatar)(() => ({
  width: "55%",
  height: "25vh",
}));
export const Pflexcenter = styled(Paper)(() => ({
  padding: "5px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
export const FBoxwgten = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  gap: "10px",
  alignItems: "center",
}));
export const MainOutletBox = styled(Box)(() => ({
  flexGrow: 1,
  padding: "12px",
  paddingTop: "80px",
  backgroundColor: "#eeeeee",
  width: "100%",
  minHeight: "100vh",
  display: "flex",
}));
export const JustifyBox = styled(Box)(() => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
}));
