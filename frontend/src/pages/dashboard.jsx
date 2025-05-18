import { Route, Routes } from "react-router-dom";
import Members from "./members";
import Sidebar from "../components/side-bar";
import AdminPage from "./admin-page";
import AddMember from "./add-member";
import EditMember from "./edit-member";
import Medias from "./medias";
import AddMedias from "./add-medias";

const Dashboard = () => {
  return (
    <div className=" flex space-x-4 ">
      <Sidebar />
      <div className=" p-4 w-full min-h-screen">
        <Routes>
          <Route element={<AdminPage />} path="/dashboard" />
          <Route element={<Members />} path="/members" />
          <Route element={<AddMember />} path="/members/add" />
          <Route element={<EditMember />} path="/members/edit/:id" />
          <Route element={<Medias />} path="/medias" />
          <Route element={<AddMedias />} path="/medias/add" />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
