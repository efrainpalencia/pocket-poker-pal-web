import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import PPPLogo from "../assets/ppp-logo2.png";

export default function Layout() {
    const [open, setOpen] = useState(false);
    const { pathname } = useLocation();

    // Close the mobile menu on route change
    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    return (
        <div className="min-h-screen flex flex-col bg-secondary dark:text-white">
            {/* Responsive Header */}
            <header className="border-b sticky top-0 z-40 bg-secondary/90 backdrop-blur supports-[backdrop-filter]:bg-secondary/60">
                <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
                    {/* Brand */}
                    <div className="flex items-center gap-2">
                        <Link to="/" className="shrink-0" aria-label="Go to homepage">
                            <img className="h-10 w-10" src={PPPLogo} alt="Poker Pocket Pal logo" />
                        </Link>
                        <span className="hidden sm:inline text-md font-semibold">
              Poker Pocket Pal
            </span>
                    </div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-6 text-sm">
                        <NavLink to="/" className="hover:underline">Home</NavLink>
                        <NavLink to="/chat" className="hover:underline">Chat</NavLink>
                        <NavLink to="/about" className="hover:underline">About</NavLink>
                    </nav>

                    {/* Mobile toggle */}
                    <button
                        type="button"
                        className="md:hidden inline-flex items-center justify-center rounded-lg p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                        aria-label="Toggle menu"
                        aria-expanded={open}
                        onClick={() => setOpen(v => !v)}
                    >
                        {/* Hamburger / Close (accessible, no external icon lib needed) */}
                        <svg
                            className={`h-6 w-6 transition-transform duration-200 ${open ? "rotate-90" : ""}`}
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                            strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
                        >
                            {open ? (
                                <path d="M18 6L6 18M6 6l12 12" />
                            ) : (
                                <>
                                    <path d="M3 6h18" />
                                    <path d="M3 12h18" />
                                    <path d="M3 18h18" />
                                </>
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Sheet */}
                <div
                    className={`
            md:hidden overflow-hidden transition-[max-height,opacity]
            ${open ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}
          `}
                >
                    <nav className="px-4 pb-3 pt-1">
                        <div className="flex flex-col gap-2 text-sm">
                            <NavLink
                                to="/"
                                className="rounded-lg px-3 py-2 hover:bg-white/5"
                                onClick={() => setOpen(false)}
                            >
                                Home
                            </NavLink>
                            <NavLink
                                to="/chat"
                                className="rounded-lg px-3 py-2 hover:bg-white/5"
                                onClick={() => setOpen(false)}
                            >
                                Chat
                            </NavLink>
                            <NavLink
                                to="/about"
                                className="rounded-lg px-3 py-2 hover:bg-white/5"
                                onClick={() => setOpen(false)}
                            >
                                About
                            </NavLink>
                        </div>
                    </nav>
                </div>
            </header>

            {/* Main content */}
            <main className="flex-1 overflow-auto">
                <Outlet />
            </main>

            {/* Footer (from previous step) */}
            <footer className="border-t">
                <div className="mx-auto max-w-7xl px-4 py-4 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
                    <div className="flex items-center gap-2">
                        <Link to="/" className="shrink-0" aria-label="Go to homepage">
                            <img className="h-8 w-8 md:h-10 md:w-10" src={PPPLogo} alt="logo" />
                        </Link>
                        <span className="text-sm md:text-base font-semibold">Poker Pocket Pal</span>
                    </div>
                    <nav className="flex flex-wrap items-center justify-center gap-4 text-sm">
                        <NavLink to="/" className="hover:underline">Home</NavLink>
                        <NavLink to="/chat" className="hover:underline">Chat</NavLink>
                        <NavLink to="/about" className="hover:underline">About</NavLink>
                    </nav>
                    <div className="text-xs sm:text-sm text-center">
                        © EF<span className="text-primary">AI</span>TECH SOLUTIONS LLC
                    </div>
                </div>
            </footer>
        </div>
    );
}
