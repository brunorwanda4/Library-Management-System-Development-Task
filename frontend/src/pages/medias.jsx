import axios from "axios";
import { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { FaBook } from "react-icons/fa";
import DeleteMedia from "../components/delete-media";

const Medias = () => {
  const [medias, setMedias] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let intervalId;

    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3012/medias");
        if (res.data) {
          setMedias(res.data);
          setError("");
        }
      } catch (error) {
        const err = error.response?.data?.message || "Server error!";
        setError(err);
      }
    };
    fetchData();
    intervalId = setInterval(fetchData, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="c">
      <div className="flex justify-between items-center mb-10">
        <h1 className="flex space-x-2 items-center font-bold text-3xl">
          <FaBook /> <span>Media</span>
        </h1>
        <NavLink to={"/admin/medias/add"} className="btn btn-secondary">
          <BsPlus /> Add media
        </NavLink>
      </div>

      {error && <div className="alert alert-error">😔 {error}</div>}

      <table className="table table-zebra">
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
          {medias.map((item) => (
            <tr key={item.mediaId}>
              <td>{item.mediaId}</td>
              <td>{item.title}</td>
              <td>{item.type}</td>
              <td>{item.author}</td>
              <td>{item.publisher}</td>
              <td>{item.year}</td>
              <td>{item.availableCopies}</td>
              <td className="flex flex-row gap-2">
                <DeleteMedia media={item} />
                <NavLink
                  to={`/admin/medias/edit/${item.mediaId}`}
                  className="btn btn-sm btn-warning"
                >
                  Edit
                </NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Medias;
