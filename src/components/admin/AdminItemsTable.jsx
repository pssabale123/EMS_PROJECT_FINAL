import React, { useEffect } from "react";
import { TfiPencil } from "react-icons/tfi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

function AdminItemsTable(props) {
  const location = useLocation();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (location.pathname == "/admin") navigate("/admin/dashborard/subjects");
  // }, []);

  const { items, head, text, handleDelete } = props;
  return (
    <>
      <table className="table-auto border-collapse  w-full mt-2 bg-green-200 sm:rounded-lg shadow-xl  ">
        <thead>
          <tr className="bg-[#172337] text-white h-10 flex justify-between items-center pr-24">
            <th className=" text-left pl-6 font-thin text-gray-100">{head}</th>
            <th className=" text-center font-thin  text-gray-100 ">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => {
            return (
              <tr
                className=" h-16  flex justify-between items-center pr-20"
                key={index}
              >
                <td className="w-full text-left pl-4 font-normal text-gray-600  ">
                  <div>
                    <span className="mr-1">{index + 1}</span>
                    <span className="mx-2">{item[text]}</span>
                  </div>
                </td>
                <td className="  text-gray-500  flex  ">
                  <span>
                    <NavLink to={`${item._id}`}>
                      <TfiPencil
                        size={30}
                        className="rounded-full bg-slate-100 p-1 mx-1 text-neutral-500 hover:bg-slate-200 cursor-pointer"
                      />
                    </NavLink>
                  </span>
                  <span>
                    <NavLink onClick={() => handleDelete(item._id)}>
                      <MdOutlineDeleteOutline
                        size={30}
                        className="rounded-full bg-slate-100 p-1 mx-1 text-neutral-500 hover:bg-slate-200 cursor-pointer"
                      />
                    </NavLink>
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default AdminItemsTable;
