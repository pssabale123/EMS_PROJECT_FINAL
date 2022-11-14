import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteStudentPaper,
  getAllStudentPapers,
} from "../../actions/studentPaperAction";
import StudentPaperItemTable from "./StudentPaperItemTable";

const StudentPaper = () => {
  const studentPapers = useSelector(
    (state) => state.studentPaperReducer.studentPapers
  );

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getAllStudentPapers());
  }, []);
  
  const head = ["Student Name", "Paper", "Status"];

  const handleDelete = (id) => {
    // console.log(id);
    dispatch(deleteStudentPaper(id));
  };

  return (
    <div>
      <StudentPaperItemTable
        items={studentPapers}
        head={head}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default StudentPaper;
