/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState(false);

    function login() {
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        console.log(username, password);
        if (username === "admin" && password === "admin") {
            navigate("/adminDashboard");
            setLoginError(false);
        } else if (username === "user" && password === "user") {
            navigate("/dashboard");
        } else {
            setLoginError(true);
        }
    }

    return (
        <div className="flex h-screen overflow-hidden text-black">
            <div className="w-7/12 h-screen  bg-zinc-900 grid items-center">
                <img
                    src="./assets/b.png"
                    alt="logo"
                    className="m-auto w-full h-max border"
                />
                <img
                    src="./assets/a.png"
                    alt="logo"
                    className="m-auto w-full h-min border"
                />
                <img
                    src="./assets/c.png"
                    alt="logo"
                    className="m-auto w-full object-cover"
                />
            </div>
            <div className="w-1/2 h-screen flex items-center bg-white">
                <div className="w-1/2 grid p-10 mx-auto">
                    {/* <span className="text-4xl font-bold pb-10"> Ethiopian Airlines </span> */}
                    <img
                        src="./assets/airlines-logo.png"
                        alt="logo"
                        className="m-auto w-full p-5"
                    />
                    <div className="h-14"></div>

                    {/* USERNAME */}
                    <label className="pb-2">Username or email</label>
                    <input
                        id="username"
                        type="email"
                        placeholder="email or username"
                        className="border rounded-lg px-3 py-1 bg-white"
                    />
                    <div className="h-2"></div>

                    {/* PASSWORD */}
                    <label className="pb-2">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="password"
                        className="border rounded-lg px-3 py-1 bg-white"
                    />
                    <div className="pt-2 text-right">
                        <span className="underline pr-2 hover:text-green-500 cursor-pointer">
                            Forgot Password?
                        </span>
                    </div>
                    {loginError === true ? (
                        <div className="text-red-500 pt-5 pb-6 text-center">
                            Incorrect Username or Password
                        </div>
                    ) : (
                        <div className="pb-6"> </div>
                    )}
                    {/* <Link to="/dashboard" onClick={(e) => login()}> */}
                    <div
                        className="bg-zinc-900 hover:bg-green-500 text-white hover:text-black text-center rounded-lg py-2 font-semibold"
                        onClick={(e) => login()}
                    >
                        Sign In
                    </div>
                    {/* </Link> */}
                </div>
            </div>
        </div>
    );
}
