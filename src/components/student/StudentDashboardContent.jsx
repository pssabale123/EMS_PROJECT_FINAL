import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { getCurrentPaper } from "../../actions/paperAction";
import PaperDetails from "./paperDetails";

function StudentDashboardContent() {
  const [paperId, SetpaperId] = useState("");
  // console.log("paperid ", paperId);
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (paperId) dispatch(getCurrentPaper(paperId));
  }, [paperId]);

  const paper = useSelector((state) => state.paperReducer.currentPaper);
  // console.log("paper", paper);

  return (
    <div className="px-4 h-full">
      <div className="flex justify-between items-center   py-3 ">
        <div className="font-bold text-xl">Dashboard</div>
      </div>
      <div className="flex item-center"></div>
      <hr
        className="border-[2px] border-t-0 border-slate-300 rounded-md"
        style={{ marginTop: "-2px" }}
      />
      <div className="h-14 w-full bg-[#172337] text-slate-300 flex items-center justify-between pl-4 pr-24">
        {location.pathname == "/student" ? (
          <span className="flex item-center">Paper Details</span>
        ) : (
          <>
            <span>Test Questions</span>
            <span className="flex flex-col">
              <div className="">Paper : {paper.name}</div>
              <div className="">Total Marks : {paper.totalMarks}</div>
            </span>
          </>
        )}
      </div>
      <div className="paperWindow h-[calc(100vh-160px)] ">
        {location.pathname == "/student" ? (
          <PaperDetails SetpaperId={SetpaperId} />
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}

export default StudentDashboardContent;
