import { useState, useTransition, useEffect } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const UpdateProfile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (user?.username) {
      setFormData((prev) => ({
        ...prev,
        username: user.username,
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    startTransition(async () => {
      try {
        const response = await axios.patch(
          `http://localhost:3012/users/${user?.id}`,
          formData
        );

        if (response.status === 200) {
          setSuccessMessage(
            response.data.message || "Profile updated successfully!"
          );
          setTimeout(() => setSuccessMessage(""), 3000);
          // Clear password field after successful update
          setFormData((prev) => ({ ...prev, password: "" }));
        } else {
          setErrorMessage(response.data.message || "Something went wrong.");
        }
      } catch (error) {
        const backendMessage =
          error.response?.data?.message || "Server error occurred.";
        setErrorMessage(backendMessage);
      }
    });
  };

  return (
    <div className="grid place-content-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="card min-w-96 space-y-4 p-6 bg-base-100 shadow-xl"
      >
        <h2 className="font-semibold text-2xl text-center">Update Profile</h2>

        {/* Status Messages */}
        {errorMessage && (
          <div className="alert alert-error">
            <span>😔 {errorMessage}</span>
          </div>
        )}
        {successMessage && (
          <div className="alert alert-success">
            <span>🌻 {successMessage}</span>
          </div>
        )}

        {/* Form Fields */}
        <div className="form-control w-full space-y-4">
          <div className="space-y-2">
            <label htmlFor="username" className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              id="username"
              value={formData.username}
              onChange={handleInputChange}
              name="username"
              className="input input-bordered w-full"
              type="text"
              placeholder="Username"
              disabled={isPending}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="label">
              <span className="label-text">New Password</span>
            </label>
            <input
              id="password"
              className="input input-bordered w-full"
              type="password"
              placeholder="New password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              disabled={isPending}
              required
              minLength="6"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="btn btn-primary w-full"
        >
          {isPending ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Update Profile"
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
