import { useEffect, useState } from "react";
import AxiosClient from "../helpers/AxiosClient";
import swal from "sweetalert2";
import { ErrorAlert } from "../types";
import { AxiosError } from "axios";
export default function RepliesForm({
  id,
  dataform: { email, reply, replyId },
  handleReply,
}: {
  id: number;
  handleReply: () => void;
  dataform: {
    email: string;
    reply: string;
    replyId: number;
  };
}) {
  const [dataForm, setDataForm] = useState({
    id: id || 0,
    email: email || "",
    reply: reply || "",
    replyId: replyId || 0,
  });

  const [errorAlert, setErrorAlert] = useState<ErrorAlert>({});
  useEffect(() => {
    if (errorAlert.msg) {
      setTimeout(() => {
        setErrorAlert({});
      }, 2000);
    }
  }, [errorAlert]);
  console.log("dataForm", dataForm);
  //region Submit
  //this function will handle the submit of the form to add or edit a reply
  const handleSubmit = async () => {
    if (!dataForm.email.trim() || !dataForm.reply.trim()) {
      console.log("All fields are required");
      return;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(dataForm.email)) {
      console.log("Email is not valid");
      return;
    }
    if (dataForm?.replyId > 0) {
      try {
        const { data } = await AxiosClient.put(
          `/comments/replies/${dataForm.replyId}`,
          {
            email: dataForm.email,
            reply: dataForm.reply,
          }
        );
        setErrorAlert({
          title: data.title,
          msg: data.msg,
          error: false,
        });
      } catch (error) {
        const axiosError = error as AxiosError;
        setErrorAlert({
          msg:
            (axiosError.response?.data as { msg: string }).msg ||
            "Unexpected error",
          status: true,
          title: "Error editing reply",
          error: true,
        });
      }
    } else {
      try {
        const { data } = await AxiosClient.post("/comments/replies/", dataForm);
        console.log("data", data);
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
    }
    cleanState();
    handleReply();
  };

  //function to clean the state of the form
  const cleanState = () => {
    setDataForm({
      id: id,
      email: "",
      reply: "",
      replyId: 0,
    });
  };
  if (errorAlert.msg) {
    swal.fire({
      title: errorAlert.title,
      text: errorAlert.msg,
      icon: errorAlert.error ? "error" : "success",
    });
  }
  return (
    <div className="  w-2/3">
      <div className="border border-blue-300 rounded flex justify-center items-center   ">
        <form className=" flex flex-col p-2  items-center w-full">
          <input
            onChange={(e) =>
              setDataForm({ ...dataForm, email: e.target.value })
            }
            value={dataForm.email}
            className="w-full   border p-2 my-2"
            type="email"
            name="email"
            id="email"
            placeholder="email"
          />
          <textarea
            onChange={(e) =>
              setDataForm({ ...dataForm, reply: e.target.value })
            }
            value={dataForm.reply}
            className="w-full border p-2 my-2"
            name="reply"
            id="reply"
            placeholder="add a reply "
          ></textarea>
          <div className="flex flex-row justify-start items-center gap-3">
            <button
              onClick={handleSubmit}
              type="submit"
              className="bg-green-500 hover:bg-green-300 transition-colors px-4 text-white p-2 rounded flex flex-row items-center gap-2"
            >
              <span className="material-symbols-outlined">add</span>
              Add Reply
            </button>
            <button
              type="submit"
              className="bg-red-500 hover:bg-red-300 transition-colors px-4 text-white p-2 rounded flex flex-row items-center gap-2"
            >
              <span onClick={handleReply} className="material-symbols-outlined">
                cancel
              </span>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
