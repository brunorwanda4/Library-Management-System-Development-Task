import axios from "axios";
import { useEffect, useState, useTransition } from "react";
import { useParams } from "react-router-dom";

const API_BASE_URL = "http://localhost:3012/members";

const EditMember = () => {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/${id}`);
        if (response.status === 200) {
          setMember(response.data);
          setFormData({
            firstName: response.data.firstName || "",
            lastName: response.data.lastName || "",
            email: response.data.email || "",
            phone: response.data.phone || "",
          });
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Server Error";
        setError(errorMessage);
      }
    };

    fetchMember();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const response = await axios.patch(`${API_BASE_URL}/${id}`, formData);
        if (response.status === 200 && response.data.message) {
          setSuccess(response.data.message);
          setMember(response.data.updatedMember || formData);
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || "Server error";
        setError(errorMessage);
      }
    });
  };

  if (!member && !error) {
    return <div className="grid place-content-center h-screen">Loading...</div>;
  }

  return (
    <div className="grid place-content-center h-screen">
      <form onSubmit={handleSubmit} className="space-y-4 c min-w-96">
        <h2 className="text-center font-bold text-2xl">Edit Member</h2>

        {error && (
          <div className="alert alert-error">
            <span>😔 {error}</span>
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            <span>🌻 {success}</span>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          {Object.entries(formData).map(([field, value]) => (
            <div key={field} className="space-y-2 flex flex-col">
              <label className="label" htmlFor={field}>
                {field.split(/(?=[A-Z])/).join(" ")}
              </label>
              <input
                name={field}
                type={
                  field === "email"
                    ? "email"
                    : field === "phone"
                    ? "tel"
                    : "text"
                }
                required
                placeholder={
                  field === "phone"
                    ? "078875***"
                    : `Enter ${field.split(/(?=[A-Z])/).join(" ")}`
                }
                className="input w-64"
                value={value}
                onChange={handleChange}
                disabled={isPending}
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="btn btn-secondary w-full"
        >
          {isPending ? (
            <span className="loading loading-spinner" />
          ) : (
            "Update Member"
          )}
        </button>
      </form>
    </div>
  );
};

export default EditMember;
