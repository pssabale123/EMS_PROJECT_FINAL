import React from "react";
import { TfiPencil } from "react-icons/tfi";
import { MdOutlineDeleteOutline } from "react-icons/md";

import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PaperItemsTable = (props) => {
  const { items, head, text, handleDelete } = props;

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname == "/paperSetter") {
      navigate("/paperSetter/papers");
    }
  }, [location]);

  return (
    <>
      <div className="">
        <table className="table-auto border-collapse bg-green-200 mt-2 w-full sm:rounded-lg shadow-xl ">
          <thead>
            <tr className="bg-[#172337] text-white h-10 flex justify-between items-center ">
              {head.map((h) => {
                return (
                  <th
                    key={h}
                    className={`text-left w-[35%] pl-4 font-thin text-gray-100`}
                  >
                    {h}
                  </th>
                );
              })}

              <th className={`text-center font-thin  text-gray-100 w-[35%] `}>
                Subject
              </th>

              <th className={`text-center font-thin  text-gray-100 w-[35%] `}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="">
            {items.map((item, index) => (
              // const ans = item.correctOption?.optionText;
              <tr key={index} className=" flex justify-between items-center ">
                <td className="w-[35%] text-left pl-2 pt-4 font-normal text-gray-600">
                  <div className="flex items-start flex-wrap">
                    <span className="m-1">
                      {index + 1 + "]   " + item[text]}
                    </span>
                  </div>
                </td>

                <td className="w-[35%] text-gray-500  flex  flex justify-center  ">
                  {item.subject?.name}
                </td>

                <td className="w-[35%] text-gray-500  flex  flex justify-center  ">
                  <span>
                    <NavLink to={`${item._id}`}>
                      <TfiPencil
                        size={30}
                        className="rounded-full bg-slate-100 p-1 mx-1 text-neutral-500 hover:bg-slate-200 cursor-pointer"
                        // onClick={() => updatePaperQuestion(item._id)}
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
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PaperItemsTable;
