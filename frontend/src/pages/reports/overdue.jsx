import { useEffect, useState } from "react";
import axios from "axios";
import { BsArrowLeft } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const OverdueReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3012/reports/overdue-loans");
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
  }, []);

  return (
    <div className="p-4">
      <div className="flex items-center gap-4 mb-6">
        <NavLink to="/admin/reports" className="btn btn-ghost">
          <BsArrowLeft size={20} />
        </NavLink>
        <h1 className="text-3xl font-bold">Overdue Loans</h1>
      </div>

      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center my-8">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <>
          <div className="stats shadow mb-6">
            <div className="stat">
              <div className="stat-title">Total Overdue Items</div>
              <div className="stat-value">{data.length}</div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Member</th>
                  <th>Contact</th>
                  <th>Media</th>
                  <th>Loan Date</th>
                  <th>Due Date</th>
                  <th>Days Overdue</th>
                </tr>
              </thead>
              <tbody>
                {data.map((loan) => {
                  const dueDate = new Date(loan.dueDate);
                  const today = new Date();
                  const daysOverdue = Math.floor((today - dueDate) / (1000 * 60 * 60 * 24));
                  
                  return (
                    <tr key={loan.loanId}>
                      <td>
                        {loan.firstName} {loan.lastName}
                      </td>
                      <td>
                        <div>{loan.email}</div>
                        <div className="text-sm">{loan.phone}</div>
                      </td>
                      <td>
                        <div className="font-bold">{loan.title}</div>
                        <div className="text-sm">by {loan.author}</div>
                      </td>
                      <td>{new Date(loan.loanDate).toLocaleDateString()}</td>
                      <td>{new Date(loan.dueDate).toLocaleDateString()}</td>
                      <td>
                        <span className={`badge ${daysOverdue > 30 ? 'badge-error' : 'badge-warning'}`}>
                          {daysOverdue} days
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default OverdueReport;