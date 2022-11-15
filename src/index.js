import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import DashboardContent from "./components/admin/DashboardContent";
import LandingPage from "./components/LandingPage";
import { AdminDashbord } from "./components/admin/AdminDashbord";
import { ExaminerDashboard } from "./components/examiner/ExaminerDashboard";
// import ExaminerDashboardContent from "./components/examiner/ExaminerDashboardContent";
import { PaperSetterDashboard } from "./components/paperSetter/PaperSetterDashboard";
// import PaperSetterDashboardContent from "./components/paperSetter/PaperSetterDashboardContent";
import { StudentDashboard } from "./components/student/StudentDashboard";
import StudentDashboardContent from "./components/student/StudentDashboardContent";
import Subject from "./components/admin/Subject";
import Users from "./components/admin/Users";

import store from "./store";
import Topic from "./components/examiner/Topic";
import QuestionBank from "./components/examiner/QuestionBank";
import Paper from "./components/paperSetter/Paper";
import PaperQuestion from "./components/paperSetter/PaperQuestion";
import StudentPaper from "./components/paperSetter/StudentPaper";
import ExamPaper, {
  getPaperIdForQuestion,
} from "./components/student/ExamPaper";
import RegisterForm from "./components/RegisterForm";
import ProtectedRouter from "./components/ProtectedRouter";
import UpdateSubject, { getSubjectId } from "./components/admin/UpdateSubject";
import UpdateUser, { getUserId } from "./components/admin/UpdateUser";
// import Add from "./components/admin/Add";
import AddSubject from "./components/admin/AddSubject";
import AddUser from "./components/admin/AddUser";
// import UpdateTopic, { getTopicId } from "./components/examiner/UpdateTopic";
// import UpdateQuestionBank from "./components/examiner/UpdateQuestionBank";

import AddUpdatePaperQuestion, {
  getPaperQuestionId,
} from "./components/paperSetter/AddUpdatePaperQuestion";
import AddUpdateStudentPaper, {
  getStudentPaperId,
} from "./components/paperSetter/AddUpdateStudentPaper";
import AddUpdatePaper, {
  getPaperId,
} from "./components/paperSetter/AddUpdatePaper";
import AddUpdateTopic, {
  getTopicId,
} from "./components/examiner/AddUpdateTopic";
import AddUpdateQuestion, {
  getQuestionId,
} from "./components/examiner/AddUpdateQuestion";
import CreateOption, {
  getQuestionOptionId,
} from "./components/examiner/CreateOption";
import UpdateOption, { getOptionId } from "./components/examiner/UpdateOption";
import PaperDetails from "./components/student/paperDetails";
import { Result } from "postcss";
import StudentResult, {
  getAnswers,
  getPaperIdForStudentAnswers,
} from "./components/student/StudentResult";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <RegisterForm />,
      },
      {
        path: "admin",
        element: (
          <ProtectedRouter>
            <AdminDashbord />
          </ProtectedRouter>
        ),
        // children: [
        //   {
        //     path: "dashboard",
        //     element: <DashboardContent />,
        children: [
          {
            // path: "subjects",
            index: true,
            element: <Subject />,
          },

          {
            path: "subjects",
            element: <Subject />,
          },

          {
            path: "subjects/:subjectId",
            loader: getSubjectId,
            element: <UpdateSubject />,
          },
          {
            path: "users",
            element: <Users />,
          },
          {
            path: "users/:userId",
            loader: getUserId,
            element: <UpdateUser />,
          },
          //   ],
          // },
          // {
          //   path: "add",
          //   element: <Add />,
          //   children: [
          {
            path: "add/subject",
            element: <AddSubject />,
          },

          {
            path: "add/user",
            element: <AddUser />,
          },
          //   ],
          // },
        ],
      },

      {
        path: "examiner",
        element: (
          <ProtectedRouter>
            <ExaminerDashboard />
          </ProtectedRouter>
        ),

        children: [
          {
            index: true,
            element: <Topic />,
          },
          {
            path: "topics",
            element: <Topic />,
          },
          {
            path: "topics/addTopic",
            element: <AddUpdateTopic />,
          },
          {
            path: "topics/:topicId",
            loader: getTopicId,
            element: <AddUpdateTopic />,
          },

          {
            path: "questionBank",
            element: <QuestionBank />,
          },
          {
            path: "questionBank/addQuestion",
            element: <AddUpdateQuestion />,
          },
          {
            path: "questionBank/:questionBankId",
            loader: getQuestionId,
            element: <AddUpdateQuestion />,
          },

          {
            path: "questionBank/createOption/:questionOptionId",
            loader: getQuestionOptionId,
            element: <CreateOption />,
          },
          {
            path: "questionBank/updateoption/:optionId",
            loader: getOptionId,
            element: <UpdateOption />,
          },
        ],
      },
      {
        path: "paperSetter",
        element: (
          <>
            <ProtectedRouter>
              <PaperSetterDashboard />
            </ProtectedRouter>
          </>
        ),

        children: [
          {
            // path: "papers",
            index: true,
            element: <Paper />,
          },
          {
            path: "papers",
            element: <Paper />,
          },
          {
            path: "papers/addPaper",
            element: <AddUpdatePaper />,
          },

          {
            path: "papers/:paperId",
            loader: getPaperId,
            element: <AddUpdatePaper />,
          },
          {
            path: "paperQuestions",
            element: <PaperQuestion />,
          },
          {
            path: "paperQuestions/addPaperQuestion",
            element: <AddUpdatePaperQuestion />,
          },
          {
            path: "paperQuestions/:paperQuestionId",
            loader: getPaperQuestionId,
            element: <AddUpdatePaperQuestion />,
          },
          {
            path: "studentPapers",
            element: <StudentPaper />,
          },
          {
            path: "studentPapers/addStudentPaper",
            element: <AddUpdateStudentPaper />,
          },
          {
            path: "studentPapers/:studentPaperId",
            loader: getStudentPaperId,
            element: <AddUpdateStudentPaper />,
          },
        ],
      },
      {
        path: "student",
        element: (
          <ProtectedRouter>
            <StudentDashboard />
          </ProtectedRouter>
        ),

        children: [
          // {
          //   index: true,
          //   element: <PaperDetails />,
          //   // element: <StudentResult />,
          // },
          {
            path: "result/:paperId",
            loader: getPaperIdForStudentAnswers,
            element: <StudentResult />,
          },
          {
            path: "examPaper/:paperId",
            loader: getPaperIdForQuestion,
            element: <ExamPaper />,
          },
        ],
      },
    ],
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    {/* //to provide store to all the components in app */}
    <RouterProvider router={router} />
  </Provider>
  //  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
