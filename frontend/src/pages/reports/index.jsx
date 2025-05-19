import { NavLink } from "react-router-dom";
import { BsBook, BsClockHistory, BsPeople, BsGraphUp } from "react-icons/bs";

const ReportsDashboard = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Reports Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Most Borrowed Card */}
        <NavLink 
          to="/admin/reports/most-borrowed"
          className="card bg-base-200 hover:bg-base-300 transition-colors cursor-pointer"
        >
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary text-primary-content">
                <BsBook size={24} />
              </div>
              <div>
                <h2 className="card-title">Most Borrowed</h2>
                <p>View most popular media items</p>
              </div>
            </div>
          </div>
        </NavLink>

        {/* Overdue Loans Card */}
        <NavLink 
          to="/admin/reports/overdue"
          className="card bg-base-200 hover:bg-base-300 transition-colors cursor-pointer"
        >
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-secondary text-secondary-content">
                <BsClockHistory size={24} />
              </div>
              <div>
                <h2 className="card-title">Overdue Loans</h2>
                <p>View all overdue items</p>
              </div>
            </div>
          </div>
        </NavLink>

        {/* Member Activity Card */}
        <NavLink 
          to="/admin/reports/member-activity"
          className="card bg-base-200 hover:bg-base-300 transition-colors cursor-pointer"
        >
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-accent text-accent-content">
                <BsPeople size={24} />
              </div>
              <div>
                <h2 className="card-title">Member Activity</h2>
                <p>View member borrowing activity</p>
              </div>
            </div>
          </div>
        </NavLink>

        {/* All Reports Card */}
        <div className="card bg-base-200">
          <div className="card-body">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-neutral text-neutral-content">
                <BsGraphUp size={24} />
              </div>
              <div>
                <h2 className="card-title">More Reports</h2>
                <p>Coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsDashboard;