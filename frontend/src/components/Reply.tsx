import React from "react";
import DateFormater from "../helpers/DateFormater";

interface ReplyProps {
  reply: {
    id: number;
    email: string;
    reply: string;
    createdAt: string;
  };
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
}

const Reply: React.FC<ReplyProps> = ({ reply, handleEdit, handleDelete }) => {
  return (
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
          onClick={() => handleEdit(reply.id)}
          className="flex items-center px-4 hover:bg-yellow-200 hover:transition-colors rounded-sm p-2 border border-yellow-400"
        >
          <span className="material-symbols-outlined">edit</span>
        </button>
        <button
          title="Delete"
          onClick={() => handleDelete(reply.id)}
          className="flex items-center px-4 hover:bg-red-200 hover:transition-colors rounded-sm p-2 border border-red-400"
        >
          <span className="material-symbols-outlined">delete</span>
        </button>
      </div>
    </div>
  );
};

export default Reply;
