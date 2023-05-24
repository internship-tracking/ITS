import { BrowserRouter, Routes, Route } from "react-router-dom";
import CompanyRegister from "./pages/auth/CompanyRegister";
import CompanyLogin from "./pages/auth/CompanyLogin";
import HomePage from "./pages/HomePage";
import HomePage2 from "./pages/HomePage2";
import NewApplication from "./pages/company/NewApplication";
import Application from "./pages/company/Application";
import CompanyPassword from "./pages/company/CompanyPassword";
import CompanyProfile from "./pages/company/CompanyProfile";
import Company from "./pages/company/Company";
import ApprovedApplication from "./pages/company/ApprovedApplication";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<HomePage2 />} />
          <Route path="/company/register" element={<CompanyRegister />} />
          <Route path="/company/login" element={<CompanyLogin />} />
          <Route path="/company" element={<Company />} />
          <Route path="/company/profile" element={<CompanyProfile />} />
          <Route path="/company/new" element={<NewApplication />} />
          <Route path="/company/application" element={<Application />} />
          <Route path="/company/password" element={<CompanyPassword />} />
          <Route path="/company/approved" element={<ApprovedApplication />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;