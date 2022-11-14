import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTopic, getAllTopics } from "../../actions/topicAction";
import ExaminerItemsTable from "./ExaminerItemsTable";

function Topic() {
  const topics = useSelector((state) => state.topicReducer.topics);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTopics());
  }, []);

  const handleTopicDelete = (id) => {
    console.log(id);
    dispatch(deleteTopic(id));
  };

  const head = ["Topic Name", "Subject"];
  return (
    <div>
      <ExaminerItemsTable
        items={topics}
        head={head}
        text="name"
        handleDelete={handleTopicDelete}
      />
    </div>
  );
}

export default Topic;
