import axios from "axios";
import { useState, useTransition } from "react";

const AddMember = () => {
  const [fD, setFD] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
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
    setSuccess("");
    startTransition(async () => {
      try {
        const req = await axios.post("http://localhost:3012/members", fD);
        if (req.status === 201 && req.data.message) {
          setSuccess(req.data.message);
        }
      } catch (error) {
        const e = error.response?.data?.message || "Sever error";
        setErr(e);
      }
    });
  };
  return (
    <div className=" grid place-content-center h-screen">
      <form onSubmit={handleSub} className=" space-y-4 c min-w-96">
        <h2 className=" text-center font-bold text-2xl">Add New Member</h2>
        {err && <div className=" alert alert-error"> 😔 {err} </div>}
        {success && <div className=" alert alert-success"> 🌻 {success} </div>}

        <div className=" grid grid-cols-2 gap-4">
          <div className=" space-y-2 flex flex-col">
            <label className=" label" htmlFor="firstName">
              First name
            </label>
            <input
              name="firstName"
              type="text"
              required
              placeholder=" First Name"
              className=" input w-64"
              value={fD.firstName}
              onChange={handelChange}
              disabled={isPending}
            />
          </div>
          <div className=" space-y-2 flex flex-col">
            <label className=" label" htmlFor="lastName">
              Last name
            </label>
            <input
              name="lastName"
              type="text"
              required
              placeholder=" Last Name"
              className=" input w-64"
              value={fD.lastName}
              onChange={handelChange}
              disabled={isPending}
            />
          </div>
          <div className=" space-y-2 flex flex-col">
            <label className=" label" htmlFor="email">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder=" email"
              className=" input w-64"
              value={fD.email}
              onChange={handelChange}
              disabled={isPending}
            />
          </div>
          <div className=" space-y-2 flex flex-col">
            <label className=" label" htmlFor="phone">
              Phone
            </label>
            <input
              name="phone"
              type="text"
              required
              placeholder=" 078875***"
              className=" input w-64"
              value={fD.phone}
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

export default AddMember;
