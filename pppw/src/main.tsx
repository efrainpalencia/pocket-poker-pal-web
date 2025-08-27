import React from 'react'
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react'

posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, {
    api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
    defaults: '2025-05-24',
});

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <PostHogProvider client={posthog}>
            <App />
            </PostHogProvider>
        </BrowserRouter>
    </React.StrictMode>
);
