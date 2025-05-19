import { useEffect, useState } from "react";
import axios from "axios";
import { BsArrowLeft } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const MostBorrowedReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [limit, setLimit] = useState(10);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:3012/reports/most-borrowed-media?limit=${limit}`);
      setData(res.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [limit]);

  return (
    <div className="p-4">
      <div className="flex items-center gap-4 mb-6">
        <NavLink to="/admin/reports" className="btn btn-ghost">
          <BsArrowLeft size={20} />
        </NavLink>
        <h1 className="text-3xl font-bold">Most Borrowed Media</h1>
      </div>

      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Number of results</span>
          </label>
          <select
            className="select select-bordered"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
          >
            <option value="5">Top 5</option>
            <option value="10">Top 10</option>
            <option value="20">Top 20</option>
            <option value="50">Top 50</option>
            <option value="100">Top 100</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center my-8">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Title</th>
                <th>Author</th>
                <th>Type</th>
                <th>Borrow Count</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={item.mediaId}>
                  <td>{index + 1}</td>
                  <td>{item.title}</td>
                  <td>{item.author}</td>
                  <td>{item.type}</td>
                  <td>{item.borrowCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MostBorrowedReport;