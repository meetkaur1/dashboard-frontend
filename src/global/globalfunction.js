export const handleexpiretoken = (goto, status) => {
  if (status === 401) {
    localStorage.clear();
    goto("/");
  }
};
export const localstragedata = () => {
  let token = localStorage.getItem("token");
  let user = localStorage.getItem("user");
  return { token, user };
};
