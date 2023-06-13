import { BrowserRouter, Routes, Route } from "react-router-dom";
import CompanyRegister from "./pages/auth/CompanyRegister";
import CompanyLogin from "./pages/auth/CompanyLogin";
import HomePage from "./pages/HomePage";
import Company from "./pages/company/Company";
import HomePage2 from "./pages/HomePage2";
import NewApplication from "./pages/company/NewApplication";
import Application from "./pages/company/Application";
import SupervisorRegister from "./pages/auth/SupervisorRegister";
import SupervisorLogin from "./pages/auth/SupervisorLogin";
import Supervisor from "./pages/supervisor/Supervisor";
import Companies from "./pages/supervisor/Companies";
import SupervisorPassword from "./pages/supervisor/SupervisorPassword";
import SupervisorProfile from "./pages/supervisor/SupervisorProfile";
import Students from "./pages/supervisor/Students";
import InternshipInfo from "./pages/supervisor/InternshipInfo";
import InternshipApplications from "./pages/supervisor/Application";
import StudentRegister from "./pages/auth/StudentRegister";
import InternshipAnnouncements from "./pages/student/InternshipAnnouncements";
import StudentInternships from "./pages/student/StudentInternships";
import StudentApplications from "./pages/student/StudentApplications";
import StudentPassword from "./pages/student/StudentPassword";
import StudentProfile from "./pages/student/StudentProfile";



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
          <Route path="/company/new" element={<NewApplication />} />
          <Route path="/company/application" element={<Application />} />
          <Route path="/supervisor/register" element={<SupervisorRegister />} />
          <Route path="/supervisor/login" element={<SupervisorLogin />} />
          <Route path="/supervisor" element={<Supervisor />} />
          <Route path="/supervisor/companies" element={<Companies />} />
          <Route path="/supervisor/password" element={<SupervisorPassword />} />
          <Route path="/supervisor/profile" element={<SupervisorProfile />} />
          <Route path="/supervisor/students" element={<Students />} />
          <Route path="/supervisor/internshipinfos" element={<InternshipInfo />} />
          <Route path="/supervisor/applications" element={<InternshipApplications />} />
          <Route path="/student/register" element={<StudentRegister />} />
          <Route path="/student/password" element={<StudentPassword />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/student/announcements" element={<InternshipAnnouncements />} />
          <Route path="/student/internships" element={<StudentInternships />} />
          <Route path="/student/applications" element={<StudentApplications />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;