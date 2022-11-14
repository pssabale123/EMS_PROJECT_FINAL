import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login";
import { Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { LoginDashbord } from "./components/admin/AdminDashbord";
import { ExaminerDashboard } from "./components/examiner/ExaminerDashboard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadLogin } from "./actions/loginAction";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllTopics } from "./actions/topicAction";
import { getAllOptions, getCurrentOption } from "./actions/answerOptionAction";

function App() {
  const token = useSelector((state) => state.loginReducer.token);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadLogin());
  }, [token]);
  return (
    <div className="h-screen">
      {token ? (
        <Outlet />
      ) : (
        <>
          <Navbar />
          <Outlet />
        </>
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
