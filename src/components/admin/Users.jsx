import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUsers } from "../../actions/userAction";
import AdminItemsTable from "./AdminItemsTable";

function User() {
  const users = useSelector((state) => state.userReducer.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const handleDeleteUser = (id)=>{
    dispatch(deleteUser(id));
  }

  return (
    <div>
      <AdminItemsTable items={users} head="Name" text="firstName" handleDelete={handleDeleteUser}/>
    </div>
  );
}

export default User;
