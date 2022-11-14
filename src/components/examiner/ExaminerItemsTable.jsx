import React from "react";
import { TfiPencil } from "react-icons/tfi";
import { MdAdd, MdOutlineDeleteOutline } from "react-icons/md";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOption, getAllOptions } from "../../actions/answerOptionAction";
import CreateOption from "./CreateOption";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

{
  /* //flex item-start flex-wrap */
}

const ExaminerItemsTable = (props) => {
  const [showPopUp, setShowPopUp] = useState(false);

  const { items, head, text, handleDelete, handleCreateOption, selectedTopic } =
    props;

  // console.log("selectedTopic", selectedTopic);

  const questions = useSelector((state) => state.questionReducer.questions);
  const options = useSelector(
    (state) => state.answerOptionReducer.answerOptions
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  let val = 0;

  useEffect(() => {
    if (location.pathname == "/examiner") navigate("/examiner/topics");

    dispatch(getAllOptions());
  }, []);

  const handleDeleteOption = (id) => {
    console.log("delete", id);
    dispatch(deleteOption(id));
  };

  // const handleCreateOption = () => {
  //   setShowPopUp(true);
  // };

  return (
    <>
      <div className="">
        <table className="table-auto border-collapse bg-green-200 mt-2 w-full sm:rounded-lg shadow-xl ">
          <thead>
            <tr className="bg-[#172337] text-white h-10 flex justify-between items-center pr-24">
              {head.map((h) => {
                val++;
                return (
                  <th
                    key={h}
                    className={`text-left w-[60%] pl-6 ${
                      val == 2 && text == "text" ? "pl-[17%]" : ""
                    }  font-thin text-gray-100`}
                  >
                    {h}
                  </th>
                );
              })}

              <th className={` text-start font-thin  text-gray-100  `}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="">
            {items
              // .filter((i) =>
              //   i.topic?._id === selectedTopic ? selectedTopic : ""
              // )
              .map((item, index) => {
                return (
                  <tr
                    key={index}
                    className=" flex justify-between items-center pr-20 "
                  >
                    <td className="w-[60%] text-left pl-2 pt-2 font-normal text-gray-600 ">
                      <div className="">
                        <span className="mr-1">{index + 1}</span>
                        <span className="mx-2">
                          {item[text]}

                          {text === "text" ? (
                            <div>
                              <MdAdd
                                className="bg-yellow-400 rounded-full text-white shadow-md cursor-pointer "
                                size={22}
                                onClick={() => handleCreateOption(item._id)}
                              />
                              {/* <div
                                className={`w-full h-screen flex justify-center items-center  absolute bg-black/10 ${
                                  showPopUp ? "block" : "hidden"
                                }`}
                                style={{
                                  top: "50%",
                                  left: "50%",
                                  transform: "translate(-50%,-50%)",
                                }}
                              >
                                <div className="w-[34%] mx-auto  pb-4 border-2 rounded-3xl bg-white border-2 border-yellow-300 ">
                                  <div className="flex justify-end p-3">
                                    <IoClose
                                      className="cursor-pointer text-center flex justify-end rounded-full text-black-500 hover:bg-yellow-400"
                                      onClick={() => setShowPopUp(false)}
                                      size={30}
                                    />
                                  </div>

                                  <div className="px-14">
                                    <CreateOption />
                                  </div>
                                </div>
                              </div> */}
                            </div>
                          ) : (
                            ""
                          )}
                        </span>

                        <div className="mx-1">
                          {text == "text"
                            ? options.map((o) => {
                                if (o.question._id === item._id)
                                  return (
                                    <span
                                      className="flex pl-7 pt-1 "
                                      key={o._id}
                                    >
                                      <div className="mr-2">
                                        <MdOutlineDeleteOutline
                                          size={20}
                                          className="text-red-600 rounded-full bg-slate-100 p-1 text-neutral-500 hover:bg-slate-200 cursor-pointer"
                                          onClick={() =>
                                            handleDeleteOption(o._id)
                                          }
                                        />
                                      </div>

                                      <NavLink
                                        to={`updateOption/${o._id} `}
                                        className="text-blue-500"
                                      >
                                        {o.option + "]  " + o.optionText}
                                      </NavLink>
                                    </span>
                                  );
                              })
                            : ""}
                        </div>
                      </div>
                      {/* <div className="flex justify-end pr-5 "></div> */}
                    </td>

                    {location.pathname == "/examiner/topics" ? (
                      <td className=" px-1 text-center font-normal text-gray-600">
                        {item.subject.name}
                      </td>
                    ) : (
                      ""
                    )}

                    <td className="w-[30%] px-1 text-center font-normal text-gray-600">
                      {/* {console.log(questions)} */}
                      {questions.map((q) => {
                        if (q._id === item._id)
                          return (
                            <div key={q._id}>
                              <span className="" key={q._id}>
                                {q.correctOption != null
                                  ? q.correctOption.optionText
                                  : "null"}
                              </span>
                            </div>
                          );
                      })}
                    </td>

                    <td className="w-[25%] text-gray-500  flex  flex justify-end  ">
                      <span>
                        <NavLink to={`${item._id}`}>
                          <TfiPencil
                            size={30}
                            className="rounded-full bg-slate-100 p-1 mx-1 text-neutral-500 hover:bg-slate-200 cursor-pointer"
                          />
                        </NavLink>
                      </span>
                      <span>
                        <MdOutlineDeleteOutline
                          size={30}
                          className="rounded-full bg-slate-100 p-1 mx-1 text-neutral-500 hover:bg-slate-200 cursor-pointer"
                          onClick={() => handleDelete(item._id)}
                        />
                      </span>
                    </td>
                  </tr>
                );
                // }
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ExaminerItemsTable;
