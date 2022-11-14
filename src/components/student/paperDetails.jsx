import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllStudentPapers } from "../../actions/studentPaperAction";
import jwt_decode from "jwt-decode";
import { useState } from "react";

function PaperDetails(props) {
  const { SetpaperId } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.loginReducer.token);
  const decode = jwt_decode(token);
  const [assign, setAssign] = useState(false);
  const studentPaperArr = [];

  let studentPapers = useSelector(
    (state) => state.studentPaperReducer.studentPapers
  );

  useEffect(() => {
    dispatch(getAllStudentPapers());
  }, []);

  const handleStartExam = (id) => {
    // dispatch(getCurrentPaper(id));
    SetpaperId(id);
    navigate(`examPaper/${id}`);
  };

  useEffect(() => {
    studentPapers.forEach((p) => {
      if (p.student._id == decode._id) {
        setAssign(true);
      }
    });
  });

  // console.log("assign", assign);

  return assign ? (
    <>
      {studentPapers.map((p) => {
        if (p.student._id == decode._id) {
          return (
            <div className="h-cover w-full flex mt-5 " key={p._id}>
              <div className="  h-cover py-3 w-full mx-2 rounded-2xl border border-black overflow-hidden flex flex-col justify-around items-center shadow-2xl bg-green-100">
                <div className="w-full h-full bg-green-100 flex justify-around items-center ">
                  <div className="text-slate-600 font-bold  w-full text-start px-8 py-2">
                    {p.paper?.name}
                  </div>
                  <div className="flex w-full justify-end px-5 ">
                    {/* <NavLink to={"examPaper"}> */}
                    <button
                      className="bg-[#FFD630] flex mx-2 p-1 px-5 font-bold rounded-2xl hover:text-white focus:bg-green-400"
                      onClick={() => handleStartExam(p.paper._id)}
                    >
                      Start Exam
                    </button>
                    {/* </NavLink> */}
                  </div>
                </div>
              </div>
            </div>
          );
        }
      })}
    </>
  ) : (
    <div className="h-full w-full flex mt-5  justify-center">
      <div className="  h-[100px] w-1/2 rounded-3xl bg-green-300  border border-black overflow-hidden flex flex-col justify-around items-center ">
        <div className="w-full h-cover bg-green-300  flex justify-around items-center ">
          <div className="text-slate-600 font-bold  w-full text-center">
            Paper Not Scheduled !
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaperDetails;
