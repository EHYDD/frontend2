import { History, LogOut, LucideReceiptText,  Settings, UserSearch } from "lucide-react";
import SidePanelButton from "../components/sidePanelButton";
import { useState } from "react";
import { Link } from "react-router-dom";
import TermsAndRules from "../TermsAndRules/termsAndRules";
import LaborRequestPage from "../laborRequestPage/laborRequestPage";

export default function Dashboard() {
    var [currentPage, changePage] = useState(0)
    
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
                        <div onClick={(e) => changePage(0) }>
                            <SidePanelButton 
                                icon={ <UserSearch /> }
                                title="Labor Request" 
                                isSelected = {currentPage === 0 ? true : false }
                            />
                        </div>
                        <div onClick={(e) => changePage(1) }>
                            <SidePanelButton 
                                icon={ <History /> }
                                title="Order History" 
                                isSelected = {currentPage === 1 ? true : false }
                            />
                        </div>
                        <div onClick={(e) => changePage(2) }>
                            <SidePanelButton 
                                icon={ <LucideReceiptText /> }
                                title="Terms and Rules" 
                                isSelected = {currentPage === 2 ? true : false }
                            />
                        </div>
                        <div onClick={(e) => changePage(3) }>
                            <SidePanelButton 
                                icon={ <Settings /> }
                                title="Settings" 
                                isSelected = {currentPage === 3 ? true : false }
                            />
                        </div>
                    </div>

                </div>
                
                
                <div className="text-center py-16 pl-10 pr-5">
                    <Link to="/">
                        <div 
                            className="flex justify-center text-white text-xl font-semibold py-5 rounded-2xl bg-zinc-800 hover:bg-emerald-500 hover:text-black"
                        > 
                            <LogOut size={20} />
                            <span className="pl-3" >
                                SIGN OUT 
                            </span>
                        </div>
                    </Link>
                </div>


            </div>

            {/* MAIN PANEL */}
            <div className="h-screen w-full p-5 overflow-scroll">
                <div className="h-full w-full rounded-xl bg-white text-black text-xl overflow-scroll ">
                    <div className="h-full overflow-scroll">
                        { 
                            currentPage === 0 ? 
                                <LaborRequestPage /> :
                            currentPage === 1 ? 
                            <div> ORDER HISTORY </div> :
                            currentPage === 2 ? 
                                <TermsAndRules />
                             :
                            <div> PROFILE SETTINGS </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}