import React from "react";
import DateFormater from "../helpers/DateFormater";
import { useState, useEffect } from "react";
import { ErrorAlert } from "../types";
import AxiosClient from "../helpers/AxiosClient";
import Swal from "sweetalert2";
import RepliesForm from "./RepliesForm";
interface ReplyProps {
  reply: {
    id: number;
    email: string;
    reply: string;
    createdAt: string;
  };

  handleReload: () => void;
}

const Reply: React.FC<ReplyProps> = ({ reply, handleReload }) => {
  const [errorAlert, setErrorAlert] = useState<ErrorAlert>({});
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  useEffect(() => {
    if (errorAlert.msg) {
      const timer = setTimeout(() => {
        setErrorAlert({});
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [errorAlert]);

  const handleShowForm = () => {
    setShowEditForm(!showEditForm);
  };
  //function to edit a reply

  const handleEdite = () => {
    handleShowForm();

    console.log("Edit");
  };
  //function to delete a reply

  const handleDelete = async () => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (confirmDelete.isConfirmed) {
      try {
        const { data } = await AxiosClient.delete(
          `/comments/replies/${reply.id}`
        );

        setErrorAlert({
          title: data.title,
          msg: data.msg,
          error: data.error,
        });
        handleReload();
      } catch (error) {
        console.log("error", error);
        setErrorAlert({
          title: "Error",
          msg: "Error deleting comment",
          error: true,
        });
      }
    }
  };
  if (errorAlert.msg) {
    Swal.fire({
      title: errorAlert.title,
      text: errorAlert.msg,
      icon: errorAlert.error ? "error" : "success",
    });
  }
  return (
    <>
      <div className="flex flex-col bg-white rounded-sm p-2 my-2">
        <div className="flex justify-between items-center">
          <p className="text-gray-800 font-bold">{reply.email}</p>
          <p className="text-gray-500 text-sm font-bold">
            {DateFormater(reply.createdAt)}
          </p>
        </div>
        <p className="text-gray-800">{reply.reply}</p>
        <div className="flex flex-row gap-3">
          <button
            title="Edit"
            onClick={handleEdite}
            className="flex items-center px-4 hover:bg-yellow-200 hover:transition-colors rounded-sm p-2 border border-yellow-400"
          >
            <span className="material-symbols-outlined">edit</span>
          </button>
          <button
            title="Delete"
            onClick={handleDelete}
            className="flex items-center px-4 hover:bg-red-200 hover:transition-colors rounded-sm p-2 border border-red-400"
          >
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>
      </div>
      {showEditForm && (
        <RepliesForm
          id={0}
          dataform={{
            email: reply.email,
            reply: reply.reply,
            replyId: reply.id,
          }}
          handleReply={handleShowForm}
        />
      )}
    </>
  );
};

export default Reply;
