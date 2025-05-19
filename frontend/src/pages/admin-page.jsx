import { NavLink } from "react-router-dom";
import { BsBook, BsClockHistory, BsPeople } from "react-icons/bs";

const AdminPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Quick Reports Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <NavLink 
            to="/admin/reports/most-borrowed"
            className="card bg-base-200 hover:bg-base-300 transition-colors cursor-pointer"
          >
            <div className="card-body">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary text-primary-content">
                  <BsBook size={20} />
                </div>
                <div>
                  <h3 className="card-title">Most Borrowed</h3>
                  <p>View popular items</p>
                </div>
              </div>
            </div>
          </NavLink>

          <NavLink 
            to="/admin/reports/overdue"
            className="card bg-base-200 hover:bg-base-300 transition-colors cursor-pointer"
          >
            <div className="card-body">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-secondary text-secondary-content">
                  <BsClockHistory size={20} />
                </div>
                <div>
                  <h3 className="card-title">Overdue Loans</h3>
                  <p>Check overdue items</p>
                </div>
              </div>
            </div>
          </NavLink>

          <NavLink 
            to="/admin/reports/member-activity"
            className="card bg-base-200 hover:bg-base-300 transition-colors cursor-pointer"
          >
            <div className="card-body">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-accent text-accent-content">
                  <BsPeople size={20} />
                </div>
                <div>
                  <h3 className="card-title">Member Activity</h3>
                  <p>View member stats</p>
                </div>
              </div>
            </div>
          </NavLink>
        </div>
      </div>

      {/* Other dashboard content... */}
    </div>
  );
};

export default AdminPage;