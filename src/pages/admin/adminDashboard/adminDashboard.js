import {
    CalendarSearch,
    CirclePlus,
    LineChart,
    LogOut,
    PersonStandingIcon,
    Plus,
    Sparkle,
    User,
    UserSearch,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SidePanelButton from "../../../components/sidePanelButton";
import AnalyticsPage from "../analyticsPage/analyticsPage";
import PriorityRequests from "../priorityRequestsPage/priorityRequestsPage";
import PendingRequests from "../pendingRequests/pendingRequests";
import MonthlySchedulePage from "../monthlySchedulePage/monthlySchedulePage";
import UserManagementPage from "../userManagementPage/userManagementPage";
import LaborerManagementPage from "../laborerManagementPage/laborerManagementPage";
import AddNewDataPage from "../addNewDataPage/addNewDataPage";
import AttendancePage from "../attendancePage/attendancePage";
import AppealsPage from "../appealsPage/appealsPage";

export default function AdminDashboard() {
    const navigate = useNavigate();

    var [currentPage, changePage] = useState(0);

    function logOut() {
        localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <div className="flex bg-zinc-900 overflow-hidden">
            {/* SIDE PANEL */}
            <div className="h-screen w-1/4 flex flex-col justify-between">
                <div>
                    {/* LOGO */}
                    <img
                        src="./assets/airlines-logo.png"
                        alt="logo"
                        className="m-auto w-full px-20 py-8"
                    />
                    <div className="h-14"></div>

                    {/* SIDE PANEL BUTTONS */}
                    <div className="pl-7 pr-2">
                        <div onClick={(e) => changePage(0)}>
                            <SidePanelButton
                                icon={<LineChart />}
                                title="Analytics"
                                isSelected={currentPage === 0 ? true : false}
                            />
                        </div>
                        {/* <div onClick={(e) => changePage(1)}>
                            <SidePanelButton
                                icon={<Sparkle />}
                                title="Priority Requests"
                                isSelected={currentPage === 1 ? true : false}
                            />
                        </div> */}
                        <div onClick={(e) => changePage(2)}>
                            <SidePanelButton
                                icon={<CirclePlus />}
                                title="Pending Requests"
                                isSelected={currentPage === 2 ? true : false}
                            />
                        </div>
                        <div onClick={(e) => changePage(3)}>
                            <SidePanelButton
                                icon={<CalendarSearch />}
                                title="Monthly Schedule"
                                isSelected={currentPage === 3 ? true : false}
                            />
                        </div>
                        <div onClick={(e) => changePage(4)}>
                            <SidePanelButton
                                icon={<User />}
                                title="User Management"
                                isSelected={currentPage === 4 ? true : false}
                            />
                        </div>
                        <div onClick={(e) => changePage(5)}>
                            <SidePanelButton
                                icon={<UserSearch />}
                                title="Laborer Management"
                                isSelected={currentPage === 5 ? true : false}
                            />
                        </div>
                        <div onClick={(e) => changePage(7)}>
                            <SidePanelButton
                                icon={<PersonStandingIcon />}
                                title="Attendance"
                                isSelected={currentPage === 7 ? true : false}
                            />
                        </div>
                        <div onClick={(e) => changePage(6)}>
                            <SidePanelButton
                                icon={<Plus />}
                                title="Add New Data"
                                isSelected={currentPage === 6 ? true : false}
                            />
                        </div>
                        <div onClick={(e) => changePage(8)}>
                            <SidePanelButton
                                icon={<Plus />}
                                title="Appeals"
                                isSelected={currentPage === 8 ? true : false}
                            />
                        </div>
                    </div>
                </div>

                <div className="text-center py-16 pl-10 pr-5">
                    <div
                        className="flex justify-center items-center text-white font-semibold py-2 rounded-xl bg-zinc-800 hover:bg-emerald-500 hover:text-black"
                        onClick={(e) => logOut()}
                    >
                        <LogOut size={20} />
                        <span className="pl-3"> SIGN OUT </span>
                    </div>
                </div>
            </div>

            {/* MAIN PANEL */}
            <div className="h-screen w-full p-5 overflow-scroll">
                <div className="h-full w-full rounded-xl bg-white text-black text-xl overflow-scroll ">
                    <div className="h-full overflow-scroll">
                        {currentPage === 0 ? (
                            <AnalyticsPage />
                        ) : currentPage === 1 ? (
                            <PriorityRequests />
                        ) : currentPage === 2 ? (
                            <PendingRequests />
                        ) : currentPage === 3 ? (
                            <MonthlySchedulePage />
                        ) : currentPage === 4 ? (
                            <UserManagementPage />
                        ) : currentPage === 5 ? (
                            <LaborerManagementPage />
                        ) : currentPage === 6 ? (
                            <AddNewDataPage />
                        ) : currentPage === 7 ? (
                            <AttendancePage />
                        ) : currentPage === 8 ? (
                            <AppealsPage />
                        ) : (
                            <div></div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
