import { useEffect, useState } from "react";
import axios from "axios";
import { BsPlus } from "react-icons/bs";
import { FaPeopleArrows } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import DeleteMedia from "../components/delete-media";

const Loans = () => {
  const [loans, setLoans] = useState([]);
  const [error, setError] = useState("");

  const fetchLoans = async () => {
    try {
      const res = await axios.get("http://localhost:3012/loans");
      setLoans(res.data || []);
      setError("");
    } catch (err) {
      const message = err.response?.data?.message || "Server error!";
      setError(message);
    }
  };

  useEffect(() => {
    fetchLoans();
    const intervalId = setInterval(fetchLoans, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="p-4 c">
      <div className="flex justify-between items-center mb-6">
        <h1 className="flex items-center gap-2 text-3xl font-bold">
          <FaPeopleArrows />
          Loans
        </h1>
        <NavLink to="/admin/loans/add" className="btn btn-secondary">
          <BsPlus />
          Add Loan
        </NavLink>
      </div>

      {error && <div className="alert alert-error mb-4">😔 {error}</div>}

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>Member Name</th>
              <th>Media Title</th>
              <th>Media Type</th>
              <th>Loan Date</th>
              <th>Due Date</th>
              <th>Return Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan.mediaId}>
                <td>{loan.mediaId}</td>
                <td>
                  {loan.firstName} {loan.lastName}
                </td>
                <td className="line-clamp-1">{loan.title}</td>
                <td>{loan.type}</td>
                <td>
                  <time dateTime={loan.loanDate}>
                    {new Date(loan.loanDate).toDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </time>
                </td>
                <td>{loan.dueDate || "NOT"}</td>
                <td>{loan.returnDate || "NOT"}</td>
                <td>
                  <div className="flex gap-2">
                    <DeleteMedia media={loan} />
                    <NavLink
                      to={`/admin/medias/edit/${loan.mediaId}`}
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

export default Loans;
