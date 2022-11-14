import { combineReducers } from "redux";
import { subjectReducer } from "./subjectReducer";
import { userReducer } from "./userReducer";
import { topicReducer } from "./topicReducer";
import { questionReducer } from "./questionReducer";
import { paperReducer } from "./paperReducer";
import { paperQuestionReducer } from "./paperQuestionReducer";
import { studentPaperReducer } from "./studentPaperReducer";
import { loginReducer } from "./loginReducer";
import { answerOptionReducer } from "./answerOptionReducer";

export default combineReducers({
  subjectReducer,
  userReducer,
  topicReducer,
  questionReducer,
  paperReducer,
  paperQuestionReducer,
  studentPaperReducer,
  loginReducer,
  answerOptionReducer,
});
