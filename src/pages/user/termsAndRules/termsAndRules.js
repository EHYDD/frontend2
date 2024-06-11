import { Send, Trash2 } from "lucide-react";
import { useState } from "react";

export default function TermsAndRules() {
    const [chat, setChat] = useState([]);

    function sendtochat(e) {
        var userInput = document.getElementById("userInput").value;
        setChat([...chat, userInput]);
        document.getElementById("userInput").value = "";
    }

    function clearChat(e) {
        setChat([]);
    }
    return (
        <div className="h-[97vh] flex gap-8 justify-between overflow-clip">
            <div className="w-3/5 py-6 px-8">
                <span className="text-lg font-bold"> Terms and Rules </span>
                <br />
                <br />

                <span className="text-base font-bold">Terms:</span>
                <div className="w-full border-b border-b-black h-1 mt-3 mb-5"></div>

                <p className="font-normal text-base">
                    <span className="font-bold">Employee:</span> Any individual
                    hired by the airline to perform tasks related to flight
                    operations, including pilots, flight attendants, ground
                    crew, maintenance personnel, and administrative staff.
                </p>
                <p className="font-normal text-base">
                    <span className="font-bold">Shift:</span> A specific period
                    of time during which an employee is scheduled to work.
                </p>
                <p className="font-normal text-base">
                    <span className="font-bold">Schedule:</span> The
                    predetermined assignment of shifts to employees for a given
                    period, typically covering weeks or months.
                </p>
                <p className="font-normal text-base">
                    <span className="font-bold">Seniority:</span> The length of
                    service an employee has with the airline, often used to
                    determine preferences in scheduling and benefits.
                </p>
                <p className="font-normal text-base">
                    <span className="font-bold">Overtime:</span> Additional work
                    hours beyond the regular shift, usually compensated at a
                    higher rate.
                </p>
                <p className="font-normal text-base">
                    <span className="font-bold">Leave:</span> Authorized time
                    off granted to an employee, including vacation, sick leave,
                    and personal time.
                </p>
                <br />
                <br />

                <span className="text-base font-bold">Rules:</span>
                <div className="w-full border-b border-b-black h-1 mt-3 mb-5"></div>
                <p className="font-normal text-base">
                    <span className="font-bold">Fair Scheduling:</span> Shifts
                    should be assigned fairly, taking into account employee
                    preferences, seniority, and operational requirements.
                </p>
                <p className="font-normal text-base">
                    <span className="font-bold">Overtime Regulations:</span>
                    Overtime should be assigned based on predetermined criteria,
                    such as seniority or voluntary availability, and compensated
                    according to company policies and legal regulations.
                </p>
                <p className="font-normal text-base">
                    <span className="font-bold">Leave Management:</span>
                    Employees should request leave within a specified timeframe,
                    and approval should be based on operational needs and
                    available staffing.
                </p>
                <p className="font-normal text-base">
                    <span className="font-bold">Communication:</span> Clear
                    communication channels should be established for notifying
                    employees of their schedules, changes, and any relevant
                    updates.
                </p>
                <p className="font-normal text-base">
                    <span className="font-bold">Compliance:</span> The system
                    should adhere to all labor laws and regulations governing
                    working hours, breaks, overtime, and other labor-related
                    matters.
                </p>
                <p className="font-normal text-base">
                    <span className="font-bold">Flexibility:</span> The system
                    should allow for flexibility to accommodate unexpected
                    changes in flight schedules, weather conditions, or other
                    operational challenges.
                </p>
                <p className="font-normal text-base">
                    <span className="font-bold">Performance Tracking:</span> The
                    system may include mechanisms for tracking employee
                    performance, attendance, and adherence to schedules.
                </p>
                <p className="font-normal text-base">
                    <span className="font-bold">Security:</span> Access to the
                    labor management system should be restricted to authorized
                    personnel to ensure data security and confidentiality.
                </p>
                <p className="font-normal text-base">
                    <span className="font-bold">Feedback Mechanism:</span>
                    Employees should have a means to provide feedback on the
                    scheduling process, including suggestions for improvements
                    and addressing any concerns.
                </p>
                <p className="font-normal text-base">
                    <span className="font-bold">Continuous Improvement:</span>
                    Regular reviews of the labor management system should be
                    conducted to identify areas for improvement and ensure its
                    effectiveness in meeting the needs of both the airline and
                    its employees.
                </p>
                <div className="w-full border-b border-b-black h-1 mt-3 mb-5"></div>
            </div>

            {/* AI */}
            {/* <div className="w-5/12 text-white p-5 bg-zinc-900 border-4 rounded-tr-2xl rounded-br-2xl">
                <div className="h-full flex flex-col justify-between">
                    <div>
                        <div className="text-center pt-4 pb-8 text-base">
                            Chat With AI
                        </div>
                        <div className="flex gap-5 text-base">
                            <div className="flex h-fit justify-center items-center p-1 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500">
                                <div className="h-full w-full p-4 text-center text-zinc-400 rounded-2xl bg-zinc-900 hover:bg-transparent hover:text-black font-semibold">
                                    Ask Questions Relating The Terms and Rules
                                </div>
                            </div>
                            <div className="flex h-fit justify-center items-center p-1 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500">
                                <div className="h-full w-full p-4 text-center text-zinc-400 rounded-2xl bg-zinc-900 hover:bg-transparent hover:text-black font-semibold">
                                    Ask Questions Relating The Terms and Rules
                                </div>
                            </div>
                            <div className="flex h-fit justify-center items-center p-1 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500">
                                <div className="h-full w-full p-4 text-center text-zinc-400 rounded-2xl bg-zinc-900 hover:bg-transparent hover:text-black font-semibold">
                                    Ask Questions Relating The Terms and Rules
                                </div>
                            </div>
                        </div>
                        <div className="pt-10 text-base">
                            <div className="flex justify-between pb-10 text-zinc-500 ">
                                Conversation
                                <Trash2
                                    size={18}
                                    className="hover:text-white cursor-pointer"
                                    onClick={(e) => clearChat(e)}
                                />
                            </div>
                            {chat.length === 0 ? (
                                <div className="text-zinc-700 pt-52 text-center">
                                    No conversation yet
                                </div>
                            ) : (
                                chat.map((value, index) => {
                                    return (
                                        <div className="p-2">
                                            <div
                                                key={index}
                                                className="rounded-2xl border border-zinc-700 w-max max-w-96 py-2 px-4 hover:bg-zinc-800 cursor-pointer"
                                            >
                                                {value}
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </div>
                    <div className="rounded-2xl p-2 pr-3 border border-zinc-500 flex justify-between">
                        <input
                            id="userInput"
                            className="w-full outline-none bg-zinc-900 text-white font-normal text-base px-2"
                            placeholder="Chat with AI..."
                        />
                        <Send
                            className="hover:text-emerald-500 cursor-pointer"
                            onClick={(e) => sendtochat(e)}
                        />
                    </div>
                </div>
            </div> */}
        </div>
    );
}
