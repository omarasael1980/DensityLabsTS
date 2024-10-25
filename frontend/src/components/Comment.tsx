import React from "react";

import DateFormater from "../helpers/DateFormater";

interface CommentProps {
  comment: {
    id: number;
    email: string;
    comment: string;
    createdAt: string;
  };
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
}

const Comment: React.FC<CommentProps> = ({
  comment,
  handleEdit,
  handleDelete,
}) => {
  return (
    <div className="bg-white w-2/3 rounded shadow-lg p-4 my-4 mx-auto">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">{comment.email}</h2>
        <p className="text-gray-500 text-sm font-bold">
          {DateFormater(comment.createdAt)}
        </p>
      </div>
      <p className="text-gray-500">{comment.comment}</p>
      <div className="flex flex-row gap-4 mt-4 items-center">
        <button
          title="Edit"
          onClick={() => handleEdit(comment.id)}
          className="flex items-center px-4 hover:bg-yellow-200 hover:transition-colors rounded-sm p-2 border border-yellow-400"
        >
          <span className="material-symbols-outlined">edit</span>
        </button>
        <button
          title="Delete"
          onClick={() => handleDelete(comment.id)}
          className="flex items-center px-4 hover:bg-red-200 hover:transition-colors rounded-sm p-2 border border-red-400"
        >
          <span className="material-symbols-outlined">delete</span>
        </button>
        <button
          title="Reply"
          onClick={() => handleDelete(comment.id)}
          className="flex px-4 items-center hover:bg-blue-200 hover:transition-colors rounded-sm p-2 border border-blue-400"
        >
          <span className="material-symbols-outlined">reply</span>
        </button>
      </div>
    </div>
  );
};

export default Comment;
