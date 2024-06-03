import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage/loginPage";
import AdminDashboard from "./pages/admin/adminDashboard/adminDashboard";
import UserDashboard from "./pages/user/userDashboard/userDashboard";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<LoginPage />}></Route>
                <Route path="/dashboard" element={<UserDashboard />}></Route>
                <Route
                    path="/adminDashboard"
                    element={<AdminDashboard />}
                ></Route>
                x
            </Routes>
        </div>
    );
}

export default App;
