import {Route, Routes } from "react-router-dom";
import Chat from "./routes/Chat";
import About from "./routes/About";
import Layout from "./layout/Layout.tsx";
import './App.css'
import Home from "./routes/Home.tsx";

export default function App() {
    return (
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/about" element={<About />} />
                </Route>
            </Routes>
    );
}
