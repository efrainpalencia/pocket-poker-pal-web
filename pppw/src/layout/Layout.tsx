import {Link, Outlet} from "react-router-dom";
import PPPLogo from "../assets/ppp-logo2.png"


export default function Layout() {

    return (
        <div className="flex min-h-screen overflow-hidden bg-secondary dark:text-white">
            <div className="flex flex-col flex-1 w-0">
                <nav className="h-16 border-b flex items-center justify-between px-4">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="">
                            <img className="h-10 w-10" src={PPPLogo} alt="Logo" />
                        </Link>
                    </div>

                    <div className="flex gap-4 text-sm">
                        <Link to="/" className="hover:underline">Home</Link>
                        <Link to="/chat" className="hover:underline">Chat</Link>
                        <Link to="/about" className="hover:underline">About</Link>
                    </div>
                </nav>
                <main className="flex flex-col flex-1 overflow-auto">
                    <Outlet />
                </main>
            </div>

        </div>
    )
}