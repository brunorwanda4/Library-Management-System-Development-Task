import { useEffect, useState } from "react";
import axios from "axios";
import { BsPlus } from "react-icons/bs";
import { FaBook } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import DeleteMedia from "../components/delete-media";

const Medias = () => {
  const [medias, setMedias] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let intervalId;

    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3012/medias");
        if (response.data) {
          setMedias(response.data);
          setError("");
        }
      } catch (err) {
        const message = err.response?.data?.message || "Server error!";
        setError(message);
      }
    };

    fetchData();
    intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="p-4 c">
      <div className="flex justify-between items-center mb-6">
        <h1 className="flex items-center gap-2 text-3xl font-bold">
          <FaBook />
          <span>Media</span>
        </h1>
        <NavLink to="/admin/medias/add" className="btn btn-secondary">
          <BsPlus />
          Add Media
        </NavLink>
      </div>

      {error && (
        <div className="alert alert-error mb-4">
          😔 {error}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Type</th>
              <th>Email</th>
              <th>Publisher</th>
              <th>Year</th>
              <th>Copies</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {medias.map((media) => (
              <tr key={media.mediaId}>
                <td>{media.mediaId}</td>
                <td>{media.title}</td>
                <td>{media.type}</td>
                <td>{media.author}</td>
                <td>{media.publisher}</td>
                <td>{media.year}</td>
                <td>{media.availableCopies}</td>
                <td>
                  <div className="flex gap-2">
                    <DeleteMedia media={media} />
                    <NavLink
                      to={`/admin/medias/edit/${media.mediaId}`}
                      className="btn btn-sm btn-warning"
                    >
                      Edit
                    </NavLink>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Medias;
