import { useState, useTransition } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const [fD, setFD] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState("");
  const [isPending, startTransition] = useTransition();
  const redirect = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFD((p) => ({ ...p, [name]: value }));
  };

  const handleSub = (e) => {
    e.preventDefault();
    setErr("");
    startTransition(async () => {
      try {
        const req = await axios.post("http://localhost:3012/login", fD);

        if (req.status === 200 && req.data.message === "login success full") {
          if (req.data.token && req.data.user) {
            localStorage.setItem("auth_token", req.data.token);
            localStorage.setItem("user", req.data.user);
            redirect("/admin/dashboard");
          }
        } else {
          setErr(req.data.message || "Something went wrong.");
        }
      } catch (error) {
        const backendMessage =
          error.response?.data?.message || "Server error occurred.";
        setErr(backendMessage);
      }
    });
  };

  return (
    <div className=" grid place-content-center min-h-screen">
      <form onSubmit={handleSub} className=" c min-w-96 space-y-4">
        <h2 className=" font-semibold  text-2xl text-center">
          Welcome Back 👋🏾
        </h2>
        {err && <div className=" alert alert-error">😔 {err}</div>}
        <div className=" flex flex-col w-full space-y-2">
          <label htmlFor="username" className=" label">
            username
          </label>
          <input
            value={fD.username}
            onChange={handleChange}
            name="username"
            className=" w-full input"
            type="text"
            placeholder="username"
            disabled={isPending}
            required
          />
          <label htmlFor="password" className=" label">
            Password
          </label>
          <input
            className=" w-full input"
            type="password"
            placeholder="password"
            name="password"
            value={fD.password}
            onChange={handleChange}
            disabled={isPending}
            required
          />
        </div>
        <button disabled={isPending} className=" btn btn-secondary">
          Login {isPending && <span className=" loading loading-spinner" />}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
