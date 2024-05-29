import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { Sign } from "./Sign-in/Sign";
import { Log } from "./log-in/Log";
import { MainDashboard } from "./dashboard/MainDashboard";
import { Welcome } from "./dashboard/Welcome";
import AllEmployees from "./dashboard/AllEmployees";
import ActiveEmployees from "./dashboard/ActiveEmployees";
import Trash from "./dashboard/Trash";
import { MySnackbar } from "./global/MySnackbar";
import { snackbarContext } from "./global/snackbarContext";
import { useContext, useEffect, useState } from "react";
import { MyProfile } from "./dashboard/MyProfile";
import { FileUpload } from "./dashboard/FileUpload";
import PrivateComponent from "./global/PrivateComponent";
import { CsvDownload } from "./dashboard/CsvDownload";
import { DataContext } from "./global/DataContext";

function App() {
  const [employeedata, setEmployeeData] = useState({
    all: [],
    active: [],
    inactive: [],
  });
  const data = useContext(DataContext);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState({
    state: false,
    message: null,
    color: null,
  });
  const [loggeduser, setloggeduser] = useState("");

  let local_user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();
  useEffect(() => {
    if (local_user) {
      setloggeduser(local_user);
    }
  }, [location.pathname]);

  return (
    <>
      <snackbarContext.Provider
        value={{ isSnackbarOpen, setIsSnackbarOpen, loggeduser, setloggeduser }}
      >
        <Routes>
          <Route path="/" element={<Log />} />
          <Route element={<PrivateComponent />}>
            <Route path="/dashboard" element={<MainDashboard />}>
              <Route index element={<Welcome />} />
              <Route path="all-employees" element={<AllEmployees />} />
              <Route path="active-employees" element={<ActiveEmployees />} />
              <Route path="my-profile" element={<MyProfile />} />
              <Route path="download-csv" element={<CsvDownload />} />
              <Route path="trash" element={<Trash />} />
              <Route path="register" element={<Sign />} />
            </Route>
          </Route>
          <Route path="/upload" element={<FileUpload />} />
        </Routes>
        <MySnackbar
          isSnackbarOpen={isSnackbarOpen}
          setIsSnackbarOpen={setIsSnackbarOpen}
        />
      </snackbarContext.Provider>
    </>
  );
}

export default App;
