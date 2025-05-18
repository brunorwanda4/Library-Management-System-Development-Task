import axios from "axios";
import { useEffect, useState, useTransition } from "react";
import { useParams } from "react-router-dom";

const EditMedia = () => {
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    author: "",
    publisher: "",
    year: "",
    availableCopies: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();
  const [media, setMedia] = useState({});
  const { id } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    startTransition(async () => {
      try {
        const req = await axios.get(`http://localhost:3012/medias/${id}`);
        if (req.status === 200) {
          const d = req.data;
          setMedia(d);
          setFormData({
            title: d.title || "",
            type: d.type || "",
            author: d.author || "",
            publisher: d.publisher || "",
            year: d.year || "",
            availableCopies: d.availableCopies || "",
          });
        }
      } catch (error) {
        const message = error.response?.data?.message || "Server error";
        setError(message);
      }
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const response = await axios.patch(
          `http://localhost:3012/medias/${media.mediaId}`,
          formData
        );
        if (response.status === 200 && response.data.message) {
          setSuccess(response.data.message);
        }
      } catch (err) {
        const message = err.response?.data?.message || "Server error";
        setError(message);
      }
    });
  };

  return (
    <div className="grid place-content-center h-screen">
      <form onSubmit={handleSubmit} className="space-y-4 min-w-96 c">
        <h2 className="text-center font-bold text-2xl">Update Media</h2>
        {error && <div className="alert alert-error">😔 {error}</div>}
        {success && <div className="alert alert-success">🌻 {success}</div>}

        <div className="grid grid-cols-2 gap-4">
          {[
            { name: "title", label: "Title", type: "text" },
            { name: "author", label: "Author", type: "text" },
            { name: "publisher", label: "Publisher", type: "text" },
            { name: "year", label: "Year", type: "text" },
            {
              name: "availableCopies",
              label: "Available Copies",
              type: "text",
            },
          ].map(({ name, label, type }) => (
            <div key={name} className="space-y-2 flex flex-col">
              <label htmlFor={name} className="label">
                {label}
              </label>
              <input
                name={name}
                type={type}
                required
                placeholder={label}
                className="input w-64"
                value={formData[name]}
                onChange={handleChange}
                disabled={isPending}
              />
            </div>
          ))}

          <div className="space-y-2 flex flex-col">
            <label htmlFor="type" className="label">
              Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              disabled={isPending}
              className="select"
              required
            >
              <option value="" disabled>
                Select type
              </option>
              <option value="Book">Book</option>
              <option value="DVD">DVD</option>
              <option value="Magazine">Magazine</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="btn btn-secondary"
        >
          update Media
          {isPending && <span className="loading loading-spinner" />}
        </button>
      </form>
    </div>
  );
};

export default EditMedia;
