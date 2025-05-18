import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import Dashboard from "./pages/dashboard";
import ProtectedRouters from "./pages/protect-routers";
const App = () => {
  return (
    <BrowserRouter>
      <main className=" min-h-screen bg-base-200">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route element={<ProtectedRouters />}>
            <Route path="/admin/*" element={<Dashboard />} />
          </Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
