import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteSubject, getAllSubjects } from "../../actions/subjectAction";
import AdminItemsTable from "./AdminItemsTable";

function Subject() {
  const subjects = useSelector((state) => state.subjectReducer.subjects);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSubjects());
  }, []);

  const handleSubjectDelete = (id)=>{
        dispatch(deleteSubject(id))
  }
  return (
    <div>
      <AdminItemsTable items={subjects} head="Subject Name" text="name" handleDelete={handleSubjectDelete} />
    </div>
  );
}

export default Subject;
