require("express-async-errors");

const subjectRouter = require("../routes/subject");
const topicsRoute = require("../routes/topicsRoute");
const userRouter = require("../routes/user");
const questionsRoute = require("../routes/questionsRoute");
const answerOptionsRoute = require("../routes/answerOptionsRoute");
const papersRoute = require("../routes/papersRoute");
const paperQuestionsRoute = require("../routes/paperQuestionsRoute");
const studentPapersRoute = require("../routes/studentPapersRoute");
const studentAnswersRoute = require("../routes/studentAnswersRoutes");
const error = require("../middleware/errorMiddleware");
const login = require("../routes/login");
module.exports = function (app) {
  //subjects routers
  app.use("/api/subjects", subjectRouter);

  //topics routers
  app.use("/api/topics", topicsRoute);

  //users routers
  app.use("/api/users", userRouter);

  //questions routers
  app.use("/api/questions", questionsRoute);

  //answerOption routers
  app.use("/api/answerOptions", answerOptionsRoute);

  //paper routers
  app.use("/api/papers", papersRoute);

  //paperQuestion routers
  app.use("/api/paperQuestions", paperQuestionsRoute);

  //studentPaper routers
  app.use("/api/studentPapers", studentPapersRoute);

  //studentAnswer routers
  app.use("/api/studentAnswers", studentAnswersRoute);

  //login routes
  app.use("/api/login", login);

  //handling errors
  app.use(error);
};
