import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deletePaper, getAllPapers } from "../../actions/paperAction";
import PaperItemsTable from "./PaperItemTable";
// import PaperSetterItemsTable from "./PaperSetterItemsTable";

const Paper = () => {
  const RemovePaperToast = () => {
    toast.error("Paper is remove....", {
      position: "top-center",
      autoClose: 2000,
    });
  };

  const dispatch = useDispatch();
  const papers = useSelector((state) => state.paperReducer.papers);

  useEffect(() => {
    dispatch(getAllPapers());
  }, []);

  const handlePaperDelete = (id) => {
    dispatch(deletePaper(id));
    RemovePaperToast();
  };

  // console.log(papers);
  const head = ["Name"];
  return (
    <div>
      <PaperItemsTable
        items={papers}
        head={head}
        text="name"
        handleDelete={handlePaperDelete}
      />
    </div>
  );
};

export default Paper;
