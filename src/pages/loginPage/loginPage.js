/* eslint-disable no-unused-vars */
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../../config/config";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { jwtDecode } from "jwt-decode";

let currentEmail = "";

export default function LoginPage() {
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState(false);
    const [enterOTP, setOTP] = useState(false);
    const [isSendingOTP, setSendingOTP] = useState(false);
    const [isSigningIn, setSigningIn] = useState(false);

    async function login() {
        setSendingOTP(true);

        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        currentEmail = email;

        let response = await axios.post(`${API_BASE}/auth/login`, {
            email: email.toString().trim(),
            password: password.toString().trim(),
        });
        if (response.status === 200) {
            // setOTP(true);
            let token = response.data["token"];
            let decoded = jwtDecode(token);
            localStorage.setItem("token", token);

            console.log(token);

            if (decoded["role"] === "Admin") {
                navigate("/adminDashboard");
                setLoginError(false);
            } else if (decoded["role"] === "User") {
                navigate("/dashboard");
                setLoginError(false);
            } else {
                setLoginError(true);
            }
        }
    }

    async function loginWithOTP() {
        setSigningIn(true);

        let otp = document.getElementById("otp").value;
        let response = await axios.post(`${API_BASE}/auth/verify-otp`, {
            email: currentEmail.toString().trim(),
            otp: otp.toString().trim(),
        });

        if (response.status === 200) {
            let token = response.data["token"];
            console.log(token);
            let decoded = jwtDecode(token);
            localStorage.setItem("token", token);
            // let savedToken = localStorage.getItem("token");
            // localStorage.removeItem("token");

            if (decoded["role"] === "Admin") {
                navigate("/adminDashboard");
                setLoginError(false);
            } else if (decoded["role"] === "User") {
                navigate("/dashboard");
                setLoginError(false);
            } else {
                setLoginError(true);
            }
        }
    }

    const [hidePassword, hideUnhidePassword] = useState(true);
    function hideUnhidePasswordFunc() {
        hideUnhidePassword(!hidePassword);
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
                    {enterOTP === true ? (
                        <div>
                            {/* OTP */}
                            <label className="pb-2"> OTP Number </label>
                            <input
                                id="otp"
                                type="text"
                                placeholder="OTP..."
                                className="border rounded-lg px-3 py-1 bg-white"
                            />
                            <div className="h-2"></div>
                            {isSigningIn === true ? (
                                <div className="bg-green-500 text-white text-center rounded-lg py-2 font-bold cursor-pointer">
                                    <Spin
                                        indicator={
                                            <LoadingOutlined
                                                style={{
                                                    fontSize: 18,
                                                    accentColor: "white",
                                                }}
                                                spin
                                            />
                                        }
                                    />
                                </div>
                            ) : (
                                <div
                                    className="bg-zinc-900 hover:bg-green-500 text-white hover:text-black text-center rounded-lg py-2 font-semibold cursor-pointer"
                                    onClick={(e) => loginWithOTP()}
                                >
                                    Sign In
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            {/* EMAIL */}
                            <label className="pb-2"> Email </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="email..."
                                className="border rounded-lg px-3 py-1 bg-white"
                            />
                            <div className="h-2"></div>

                            {/* PASSWORD */}
                            <label className="pb-2"> Password </label>
                            <div className="flex justify-center items-center">
                                <input
                                    id="password"
                                    type={
                                        hidePassword === true
                                            ? "password"
                                            : "text"
                                    }
                                    placeholder="password"
                                    className="border rounded-lg px-3 py-1 bg-white w-full"
                                />
                                {hidePassword === true ? (
                                    <Eye
                                        size={25}
                                        className="pl-2"
                                        onClick={(e) =>
                                            hideUnhidePasswordFunc()
                                        }
                                    />
                                ) : (
                                    <EyeOff
                                        size={25}
                                        className="pl-2"
                                        onClick={(e) =>
                                            hideUnhidePasswordFunc()
                                        }
                                    />
                                )}
                            </div>
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
                            {isSendingOTP === true ? (
                                <div className="bg-green-500 text-white text-center rounded-lg py-2 font-bold cursor-pointer">
                                    <Spin
                                        indicator={
                                            <LoadingOutlined
                                                style={{
                                                    fontSize: 18,
                                                    accentColor: "white",
                                                }}
                                                spin
                                            />
                                        }
                                    />
                                </div>
                            ) : (
                                <div
                                    className="bg-zinc-900 hover:bg-green-500 text-white hover:text-black text-center rounded-lg py-2 font-semibold cursor-pointer"
                                    onClick={(e) => login()}
                                >
                                    Sign In
                                </div>
                            )}
                        </div>
                    )}

                    {/* </Link> */}
                </div>
            </div>
        </div>
    );
}
