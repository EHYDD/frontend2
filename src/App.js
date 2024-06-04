import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage/loginPage";
import AdminDashboard from "./pages/admin/adminDashboard/adminDashboard";
import UserDashboard from "./pages/user/userDashboard/userDashboard";
import { isMobile } from "react-device-detect";

function App() {
    return (
        <div>
            {isMobile ? (
                <div className="bg-white w-full h-screen flex justify-center items-center text-center">
                    <div className="w-fit h-fit">
                        <img
                            src="./assets/airlines-logo.png"
                            alt="logo"
                            className="m-auto w-full p-20"
                        />
                        <div className="px-10">
                            <span className="font-semibold text-black ">
                                Please make sure you are connected to Ethiopian
                                Airlines LAN and that you are using a PC/Desktop
                                to access this platform.
                            </span>
                        </div>
                    </div>
                </div>
            ) : (
                <Routes>
                    <Route path="/" element={<LoginPage />}></Route>
                    <Route
                        path="/dashboard"
                        element={<UserDashboard />}
                    ></Route>
                    <Route
                        path="/adminDashboard"
                        element={<AdminDashboard />}
                    ></Route>
                    x
                </Routes>
            )}
        </div>
    );
}

export default App;
