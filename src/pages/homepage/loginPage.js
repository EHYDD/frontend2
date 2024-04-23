import { Link } from "react-router-dom";

export default function LoginPage() {
    return (
        <div className="flex h-screen overflow-hidden">
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
            <div className="w-1/2 h-screen flex items-center"> 
                <div className="w-1/2 grid p-10 mx-auto">
                    {/* <span className="text-4xl font-bold pb-10"> Ethiopian Airlines </span> */}
                    <img 
                        src="./assets/airlines-logo.png" 
                        alt="logo" 
                        className="m-auto w-full p-5"
                    />
                    <div className="h-14"></div>


                    {/* USERNAME */}
                    <label className="text-xl font-semibold pb-2"> Username or email </label>
                    <input 
                        type="email" 
                        placeholder="email or username" 
                        className="border rounded-lg px-5 py-2 text-xl" 
                    />
                    <div className="h-5"></div>

                    {/* PASSWORD */}
                    <label className="text-xl font-semibold pb-2"> Password </label>
                    <input 
                        type="email" 
                        placeholder="email or username" 
                        className="border rounded-lg px-5 py-2 text-xl" 
                    />
                    <div className="pt-2 pb-10 text-right">
                        <span className="underline text-lg pr-2 hover:text-green-500"> Forgot Password? </span>
                    </div>
                    <Link to="/dashboard">
                        <div className="bg-zinc-900 hover:bg-green-500 text-white hover:text-black text-center rounded-lg py-4 text-2xl font-semibold">
                            Sign In
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
