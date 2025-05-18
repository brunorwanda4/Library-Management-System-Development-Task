import axios from "axios";
import { useState, useTransition } from "react";

const AddUser = () => {
  const [fD, setFD] = useState({
    username: "",
    password: "",
    role: "librarian",
  });
  const [isPending, startStart] = useTransition();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFD((p) => ({ ...p, [name]: value }));
  };

  const handleSub = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    startStart(async () => {
      try {
        const req = await axios.post("http://localhost:3012/users", fD);
        if (req.status === 201) {
          setSuccess(req.data.message || "User created");
        }
      } catch (error) {
        const e = error.response?.data?.message || "sever Error";
        setError(e);
      }
    });

    console.log(fD);
  };
  return (
    <div className="  grid place-content-center h-screen">
      <form
        onSubmit={handleSub}
        className=" space-y-4 w-96 bg-base-100 p-4 border border-base-content/20 card shadow-2xl"
        action=""
      >
        <h2 className=" text-2xl font-bold text-center">Add User</h2>
        {error && <div className=" alert alert-error">😔 {error}</div>}
        {success && <div className=" alert alert-success">🌻 {success}</div>}
        <div className=" space-y-2">
          <label htmlFor="" className=" label">
            username
          </label>
          <input
            value={fD.username}
            required
            name="username"
            onChange={handleChange}
            type="text"
            className=" input w-full"
            disabled={isPending}
            placeholder="username"
          />
          <label htmlFor="" className=" label">
            Password
          </label>
          <input
            type="password"
            className=" input w-full"
            placeholder="username"
            value={fD.password}
            required
            name="password"
            disabled={isPending}
            onChange={handleChange}
          />
          <div className=" flex flex-col  space-y-2">
            <label htmlFor="" className=" label">
              role
            </label>
            <select
              value={fD.role}
              required
              name="role"
              onChange={handleChange}
              className=" select w-full"
              disabled={isPending}
              id="role"
              placeholder={"Select role"}
            >
              <option value="librarian">librarian</option>
              <option value="assistant">assistant</option>
            </select>
          </div>
        </div>
        <button disabled={isPending} className=" btn btn-secondary">
          Create Account{" "}
          {isPending && <span className=" loading loading-spinner" />}
        </button>
      </form>
    </div>
  );
};

export default AddUser;
