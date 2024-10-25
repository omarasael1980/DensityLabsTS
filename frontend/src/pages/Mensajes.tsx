import { useState, useEffect } from "react";
import AxiosClient from "../helpers/AxiosClient";
import Comment from "../components/Comment";
import Reply from "../components/Reply";
import swal from "sweetalert2";
import { AxiosError } from "axios";
import { Comment as CommentType, DataForm, ErrorAlert } from "../types";

const Mensajes: React.FC = () => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [errorAlert, setErrorAlert] = useState<ErrorAlert>({});
  const [reload, setReload] = useState<boolean>(false);
  const [dataForm, setDataForm] = useState<DataForm>({
    comment: "",
    email: "",
  });

  useEffect(() => {
    if (errorAlert.msg) {
      const timer = setTimeout(() => {
        setErrorAlert({});
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [errorAlert]);

  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await AxiosClient.get("/comments");
        setComments(response.data.msg);
      } catch (error: unknown) {
        const axiosError = error as AxiosError;
        setErrorAlert({
          msg:
            (axiosError.response?.data as { msg: string }).msg ||
            "Unexpected error",
          status: true,
          title: "Error adding comment",
          error: true,
        });
      }
    };
    getComments();
  }, [reload]);

  // Region functions to Handle Comments
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataForm({ ...dataForm, email: e.target.value });
  };

  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDataForm({ ...dataForm, comment: e.target.value });
  };

  const handleDelete = async (id: number) => {
    try {
      await AxiosClient.delete(`/comments/${id}`);
      setComments(comments.filter((comment) => comment.id !== id));
      setErrorAlert({
        msg: "Comment deleted successfully",
        status: true,
        title: "Comment deleted",
        error: false,
      });
    } catch (error) {
      const axiosError = error as AxiosError;
      setErrorAlert({
        msg:
          (axiosError.response?.data as { msg: string }).msg ||
          "Unexpected error",
        status: true,
        title: "Error deleting comment",
        error: true,
      });
    }
  };

  const handleEdit = async (id: number) => {
    try {
      const selectedComment = comments.find((comment) => comment.id === id);
      if (selectedComment) {
        setDataForm({
          id: selectedComment.id,
          email: selectedComment.email,
          comment: selectedComment.comment,
        });
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      setErrorAlert({
        msg:
          (axiosError.response?.data as { msg: string }).msg ||
          "Unexpected error",
        status: true,
        title: "Error editing comment",
        error: true,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!dataForm.email.trim() || !dataForm.comment.trim()) {
      setErrorAlert({
        msg: "All fields are required",
        status: true,
        title: "Error adding comment",
        error: true,
      });
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(dataForm.email)) {
      setErrorAlert({
        msg: "Email is not valid",
        status: true,
        title: "Error adding comment",
        error: true,
      });
      return;
    }

    try {
      if (dataForm.id) {
        await AxiosClient.put(`/comments/${dataForm.id}`, dataForm);
        setReload(!reload);
        setDataForm({ email: "", comment: "" });
        setErrorAlert({
          msg: "Comment edited successfully",
          status: true,
          title: "Comment edited",
          error: false,
        });
      } else {
        const response = await AxiosClient.post("/comments", dataForm);
        setComments([response.data.msg, ...comments]);
        setDataForm({ email: "", comment: "" });
        setErrorAlert({
          msg: "Comment added successfully",
          status: true,
          title: "Comment added",
          error: false,
        });
      }
      setReload(!reload);
    } catch (error) {
      const axiosError = error as AxiosError;
      setErrorAlert({
        msg:
          (axiosError.response?.data as { msg: string }).msg ||
          "Unexpected error",
        status: true,
        title: "Error adding comment",
        error: true,
      });
    }
  };

  if (errorAlert.msg) {
    swal.fire({
      title: errorAlert.title,
      text: errorAlert.msg,
      icon: errorAlert.error ? "error" : "success",
    });
  }

  return (
    <>
      <h1 className="text-center text-3xl font-bold text-slate-600 mt-14 mb-4">
        Leave comments
      </h1>
      <div className="flex flex-col">
        <form
          className="w-2/3 rounded bg-white flex flex-col mx-auto p-4"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            onChange={handleChangeEmail}
            value={dataForm.email}
            name="email"
            placeholder="Email"
            className="border p-2"
          />
          <textarea
            name="comment"
            className="border p-2 my-2"
            value={dataForm.comment}
            onChange={handleChangeComment}
            id="comment"
            placeholder="Add a comment"
          ></textarea>
          <div className="flex flex-row justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              {dataForm.id ? "Edit Comment" : "Add Comment"}
            </button>
          </div>
        </form>
      </div>
      <div>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id}>
              <Comment
                comment={comment}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
              {comment && (comment.replies ?? []).length > 0 && (
                <div className="bg-gray-100 w-2/3 rounded shadow-lg p-4 -my-4 mb-4 mx-auto">
                  Replies:
                  {comment?.replies?.map((reply) => (
                    <Reply
                      key={reply.id}
                      reply={reply}
                      handleEdit={handleEdit}
                      handleDelete={handleDelete}
                    />
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p>There are no comments</p>
        )}
      </div>
      <div className="grid grid-cols-4 justify-center items-center"></div>
    </>
  );
};

export default Mensajes;
