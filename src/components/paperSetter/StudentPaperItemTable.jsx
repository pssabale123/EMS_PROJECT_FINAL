import React from "react";
import { TfiPencil } from "react-icons/tfi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

const StudentPaperItemTable = (props) => {
  const { items, head, text, handleDelete } = props;

  // const handleUpdate = (id) => {};

  return (
    <>
      <table className="table-auto border-collapse bg-green-200 w-full mt-2 sm:rounded-lg shadow-xl">
        <thead>
          <tr className="bg-[#172337] text-white h-10 flex justify-between items-center pr-10">
            {head.map((h) => {
              return (
                <th
                  key={h}
                  className={` text-left  font-thin text-gray-100 ${
                    h == "Student Name"
                      ? "w-[35%] pl-4"
                      : " w-[28%] flex justify-center"
                  }`}
                >
                  {h}
                </th>
              );
            })}
            <th className=" text-center font-thin w-[15%] text-gray-100 pr-2">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => {
            return (
              <tr
                key={index}
                className=" h-16  flex justify-between items-center pr-10"
              >
                <td className="w-[35%] text-left  font-normal text-gray-600  ">
                  <div>
                    <span className="mr-1">{index + 1 + ") "}</span>
                    <span className="mx-1">{item.student?.firstName}</span>
                    <span className="mx-1">{item.student?.lastName}</span>
                  </div>
                </td>
                <td className="w-[28%] text-center font-normal text-gray-600  ">
                  <div>
                    <span className="">{item.paper?.name}</span>
                  </div>
                </td>

                <td className="w-[28%] text-center font-normal text-gray-600  ">
                  <div>
                    <span className="">{item.status}</span>
                  </div>
                </td>

                <td className="  text-gray-500 flex w-[15%]  px-8 ">
                  <span>
                    <NavLink to={`${item._id}`}>
                      <TfiPencil
                        size={30}
                        className="rounded-full bg-slate-100 p-1 mx-1 text-neutral-500 hover:bg-slate-200 cursor-pointer"
                        // onClick={() => handleUpdate(item._id)}
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
          })}
        </tbody>
      </table>
    </>
  );
};

export default StudentPaperItemTable;
