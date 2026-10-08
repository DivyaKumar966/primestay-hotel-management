import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";

import App from "./App.jsx";
import store from "./redux/store.js";

import "./index.css";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <HelmetProvider>
            <Provider store={store}>
                <App />
            </Provider>
        </HelmetProvider>
    </StrictMode>
);