import { History, LogOut, LucideReceiptText, UserSearch } from "lucide-react";
import SidePanelButton from "../../../components/sidePanelButton";
import { useState } from "react";
import { Link } from "react-router-dom";
import LaborRequestPage from "../laborRequestPage/laborRequestPage";
import OrderHistory from "../orderHistory/orderHistoryPage";
import TermsAndRules from "../termsAndRules/termsAndRules";
// import TermsAndRules from "../termsAndRules/termsAndRules";

export default function UserDashboard() {
    var [currentPage, changePage] = useState(0);

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
                                icon={<UserSearch />}
                                title="Labor Request"
                                isSelected={currentPage === 0 ? true : false}
                            />
                        </div>
                        <div onClick={(e) => changePage(1)}>
                            <SidePanelButton
                                icon={<History />}
                                title="Order History"
                                isSelected={currentPage === 1 ? true : false}
                            />
                        </div>
                        {/* <div onClick={(e) => changePage(3)}>
                            <SidePanelButton
                                icon={<LucideReceiptText />}
                                title="Feedbacks"
                                isSelected={currentPage === 3 ? true : false}
                            />
                        </div> */}
                        <div onClick={(e) => changePage(2)}>
                            <SidePanelButton
                                icon={<LucideReceiptText />}
                                title="Terms and Rules"
                                isSelected={currentPage === 2 ? true : false}
                            />
                        </div>
                    </div>
                </div>

                <div className="text-center py-16 pl-10 pr-5">
                    <Link to="/">
                        <div className="flex justify-center items-center text-white font-semibold py-2 rounded-xl bg-zinc-800 hover:bg-emerald-500 hover:text-black">
                            <LogOut size={20} />
                            <span className="pl-3">SIGN OUT</span>
                        </div>
                    </Link>
                </div>
            </div>

            {/* MAIN PANEL */}
            <div className="h-screen w-full p-5 overflow-scroll">
                <div className="h-full w-full rounded-xl bg-white text-black text-xl overflow-scroll ">
                    <div className="h-full overflow-scroll">
                        {currentPage === 0 ? (
                            <LaborRequestPage changePage={changePage} />
                        ) : currentPage === 1 ? (
                            <OrderHistory />
                        ) : (
                            <TermsAndRules />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
