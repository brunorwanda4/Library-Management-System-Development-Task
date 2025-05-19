import { useEffect, useState } from "react";
import axios from "axios";
import { BsArrowLeft } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const MemberActivityReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [days, setDays] = useState(30);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:3012/reports/member-activity?days=${days}`);
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
  }, [days]);

  return (
    <div className="p-4">
      <div className="flex items-center gap-4 mb-6">
        <NavLink to="/admin/reports" className="btn btn-ghost">
          <BsArrowLeft size={20} />
        </NavLink>
        <h1 className="text-3xl font-bold">Member Activity</h1>
      </div>

      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Activity Period (days)</span>
          </label>
          <select
            className="select select-bordered"
            value={days}
            onChange={(e) => setDays(e.target.value)}
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="60">Last 60 days</option>
            <option value="90">Last 90 days</option>
            <option value="180">Last 6 months</option>
            <option value="365">Last year</option>
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
                <th>Member</th>
                <th>Loans Count</th>
                <th>Last Activity</th>
                <th>Activity Level</th>
              </tr>
            </thead>
            <tbody>
              {data.map((member) => (
                <tr key={member.memberId}>
                  <td>
                    {member.firstName} {member.lastName}
                    <br />
                    <span className="text-sm text-gray-500">{member.email}</span>
                  </td>
                  <td>{member.loansCount}</td>
                  <td>
                    {member.lastLoanDate
                      ? new Date(member.lastLoanDate).toLocaleDateString()
                      : "No activity"}
                  </td>
                  <td>
                    <progress
                      className={`progress ${
                        member.loansCount > 5
                          ? "progress-success"
                          : member.loansCount > 2
                          ? "progress-warning"
                          : "progress-error"
                      }`}
                      value={member.loansCount}
                      max={Math.max(...data.map(m => m.loansCount), 10)}
                    ></progress>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MemberActivityReport;