import axios from "axios";
import { useState, useTransition } from "react";

const AddMedias = () => {
  const [fD, setFD] = useState({
    title: "",
    type: "",
    author: "",
    publisher: "",
    year: "",
    availableCopies: "",
  });
  const [err, setErr] = useState("");
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState();

  const handelChange = (e) => {
    const { name, value } = e.target;
    setFD((p) => ({ ...p, [name]: value }));
  };

  const handleSub = (e) => {
    e.preventDefault();

    setErr("");
    setErr("");
    startTransition(async () => {
      try {
        const req = await axios.post("http://localhost:3012/medias", fD);
        if (req.status === 201 && req.data.message) {
          setSuccess(req.data.message);
        }
      } catch (error) {
        const e = error.response?.data?.message || "Sever error";
        setErr(e);
      }
    });
    console.log(fD);
  };
  return (
    <div className=" grid place-content-center h-screen">
      <form onSubmit={handleSub} className=" space-y-4 c min-w-96">
        <h2 className=" text-center font-bold text-2xl">Add New Media</h2>
        {err && <div className=" alert alert-error"> 😔 {err} </div>}
        {success && <div className=" alert alert-success"> 🌻 {success} </div>}

        <div className=" grid grid-cols-2 gap-4">
          <div className=" space-y-2 flex flex-col">
            <label className=" label" htmlFor="title">
              Title
            </label>
            <input
              name="title"
              type="text"
              required
              placeholder="Title"
              className=" input w-64"
              value={fD.title}
              onChange={handelChange}
              disabled={isPending}
            />
          </div>
          <div className=" space-y-2 flex flex-col">
            <label className=" label" htmlFor="lastName">
              Type
            </label>
            <select
              name="type"
              disabled={isPending}
              placeholder="Select type"
              className=" select "
            >
              <option value="Book">Book</option>
              <option value="DVD">DVD</option>
              <option value="Magazine">Magazine</option>
            </select>
          </div>
          <div className=" space-y-2 flex flex-col">
            <label className=" label" htmlFor="author">
              Author
            </label>
            <input
              name="author"
              type="author"
              required
              placeholder=" author"
              className=" input w-64"
              value={fD.author}
              onChange={handelChange}
              disabled={isPending}
            />
          </div>
          <div className=" space-y-2 flex flex-col">
            <label className=" label" htmlFor="publisher">
              publisher
            </label>
            <input
              name="publisher"
              type="text"
              required
              placeholder=" 078875***"
              className=" input w-64"
              value={fD.publisher}
              onChange={handelChange}
              disabled={isPending}
            />
          </div>
          <div className=" space-y-2 flex flex-col">
            <label className=" label" htmlFor="year">
              Year
            </label>
            <input
              name="year"
              type="text"
              required
              placeholder=" 078875***"
              className=" input w-64"
              value={fD.year}
              onChange={handelChange}
              disabled={isPending}
            />
          </div>
          <div className=" space-y-2 flex flex-col">
            <label className=" label" htmlFor="availableCopies">
              Available Copies
            </label>
            <input
              name="availableCopies"
              type="text"
              required
              placeholder=" 078875***"
              className=" input w-64"
              value={fD.availableCopies}
              onChange={handelChange}
              disabled={isPending}
            />
          </div>
        </div>
        <button disabled={isPending} className=" btn btn-secondary">
          Create new member{" "}
          {isPending && <span className=" loading loading-spinner" />}
        </button>
      </form>
    </div>
  );
};

export default AddMedias;
