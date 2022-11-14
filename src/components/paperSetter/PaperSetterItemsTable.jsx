import React from "react";
import { TfiPencil } from "react-icons/tfi";
import { MdOutlineDeleteOutline } from "react-icons/md";

import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleFill,
} from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getAllPaperQuestions } from "../../actions/paperQuestion";

const PaperSetterItemsTable = (props) => {
  const {
    items,
    head,
    text,
    handleDelete,
    selectedPaper,
    handleAddPaperToQuestion,
  } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getAllPaperQuestions());
    if (location.pathname == "/paperSetter") {
      navigate("/paperSetter/papers");
    }
  }, []);

  return (
    <>
      <div className="">
        <table className="table-auto border-collapse bg-green-200 mt-2 w-full sm:rounded-2xl shadow-2xl ">
          <thead>
            <tr className="bg-[#172337] text-white h-10 flex justify-between items-center ">
              {head.map((h) => {
                return (
                  <th
                    key={h}
                    className={`text-left ${
                      h == "Question"
                        ? "w-[55%] pl-4"
                        : "w-[30%] pl-2 flex justify-center"
                    } font-thin text-gray-100 `}
                  >
                    {h}
                  </th>
                );
              })}

              <th className={`text-center font-thin  text-gray-100 w-[15%]`}>
                Marks
              </th>

              <th className="text-center font-thin  text-gray-100 w-[10%]">
                {selectedPaper ? "Select" : ""}
              </th>
            </tr>
          </thead>
          <tbody className="">
            {items.map((item, index) => (
              <tr key={index} className=" flex justify-between items-center ">
                <td className="w-[55%] text-left pl-2 pt-4 font-normal text-gray-600">
                  <div className="flex items-start flex-wrap">
                    <span className="m-1">
                      {index + 1 + "]   " + item[text]}
                    </span>
                  </div>
                </td>

                <td className="w-[30%] px-1 text-center font-normal text-gray-600">
                  {item?.correctOption?.optionText}
                </td>

                <td className="w-[18%] text-gray-500  flex  flex justify-center  ">
                  {selectedPaper ? (
                    item.marks
                  ) : (
                    <>
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
                    </>
                  )}
                </td>

                <td className="w-[8%] text-gray-500  flex  flex justify-center  ">
                  {selectedPaper ? (
                    item.isActive ? (
                      <div className="flex justify-center">
                        <RiCheckboxCircleFill
                          fontSize={28}
                          className="text-green-700"
                          onClick={() =>
                            handleAddPaperToQuestion(item._id, item.isActive)
                          }
                        />
                      </div>
                    ) : (
                      <div className="flex justify-center">
                        <RiCheckboxBlankCircleLine
                          fontSize={28}
                          color="black"
                          onClick={() =>
                            handleAddPaperToQuestion(item._id, item.isActive)
                          }
                        />
                      </div>
                    )
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PaperSetterItemsTable;
